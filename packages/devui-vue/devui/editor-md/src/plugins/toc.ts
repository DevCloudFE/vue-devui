import cloneDeep from 'lodash/cloneDeep';
import Token from 'markdown-it/lib/token';

const TOC = '[toc]';
const TOC_RE = /^\[toc\]/im;
const repeatAsterisk = (string: string, num: number) => new Array(num + 1).join(string) + '*';
const safeString = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/<[!\/a-z].*?>/gi, '')
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-');
};

let mdInstance: any = null;
export default function (md: any, options: Record<string, any>) {
  const opts: Record<string, any> = {
    maxLevel: 6,
    ...options,
  };
  let tocHtml = '';
  mdInstance = cloneDeep(md);

  const generateTree = (headings: Array<any>) => {
    const tree: Record<'nodes', Array<any>> = { nodes: [] };
    headings.forEach((heading) => {
      if (heading.level > opts.maxLevel) {
        return;
      }

      let lastItem = tree;
      for (let i = 1; i < heading.level; i++) {
        if (lastItem.nodes.length === 0) {
          lastItem.nodes.push({
            heading: {},
            nodes: [],
          });
        }
        lastItem = lastItem.nodes[lastItem.nodes.length - 1];
      }
      lastItem.nodes.push({
        heading: heading,
        nodes: [],
      });
    });
    return tree;
  };

  md.core.ruler.push('init_toc', (state: any) => {
    const tokens = state.tokens;
    const headings = [];
    let tocTokens = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'heading_close') {
        const heading = tokens[i - 1];
        const heading_close = tokens[i];
        if (heading.type === 'inline') {
          let content;
          if (heading.children && heading.children.length > 0 && heading.children[0].type === 'link_open') {
            content = heading.children[1].content;
            heading._tocAnchor = safeString(content);
          } else {
            content = heading.content;
            heading._tocAnchor = safeString(heading.children.reduce((s, t) => s + t.content, ''));
          }
          headings.push({
            content,
            anchor: safeString(content),
            level: Number(heading_close.tag.substr(1, 1)),
          });
        }
      }
    }
    const tocTree = generateTree(headings);
    const headerRecord = new Map<string, number>();
    const tocTree2Html = (nodes: any[], indent = 0) => {
      return nodes
        .map((item: any) => {
          let node = `${item.heading.content ? repeatAsterisk('  ', indent) : ''}`;
          if (item.heading.content) {
            if (headerRecord.has(item.heading.anchor)) {
              headerRecord.set(item.heading.anchor, headerRecord.get(item.heading.anchor)! + 1);
              node += ` [${item.heading.content}](#${item.heading.anchor}-${headerRecord.get(item.heading.anchor)})\n`;
            } else {
              headerRecord.set(item.heading.anchor, 0);
              node += ` [${item.heading.content}](#${item.heading.anchor})\n`;
            }
          } else {
            node += '\n';
          }
          if (item.nodes.length) {
            node += item.heading.content ? tocTree2Html(item.nodes, indent + 1) : tocTree2Html(item.nodes, indent);
          }
          return node;
        })
        .join('');
    };
    const toc = tocTree2Html(tocTree.nodes);
    tocTokens = mdInstance.parse(toc, {});
    tocHtml = mdInstance.renderer.render(tocTokens, mdInstance.options);
  });

  md.inline.ruler.after('emphasis', 'toc', (state: any, silent: any) => {
    let token;
    let match;

    if (silent) {
      return false;
    }
    match = TOC_RE.exec(state.src);
    match = !match ? [] : match.filter((m) => m);
    if (match.length < 1) {
      return false;
    }
    token = state.push('toc_open', 'toc', 1);
    token.markup = TOC;
    token = state.push('toc_body', '', 0);
    token = state.push('toc_close', 'toc', -1);

    state.pos = state.pos + TOC.length;
    return true;
  });

  const space = () => {
    return { ...new Token('text', '', 0), content: ' ' };
  };

  const renderAnchorLink = (anchor: any, linkOptions: Record<string, any>, tokens: any, idx: number) => {
    const attrs = [];
    if (linkOptions.anchorClassName !== null && linkOptions.anchorClassName !== undefined) {
      attrs.push(['class', linkOptions.anchorClassName]);
    }

    attrs.push(['href', `#${anchor}`]);

    const openLinkToken = {
      ...new Token('link_open', 'a', 1),
      attrs,
    };
    const closeLinkToken = new Token('link_close', 'a', -1);

    const renderAnchorLinkSymbol = () => {
      if (linkOptions.anchorLinkSymbolClassName) {
        return [
          {
            ...new Token('span_open', 'span', 1),
            attrs: [['class', linkOptions.anchorLinkSymbolClassName]],
          },
          {
            ...new Token('text', '', 0),
            content: linkOptions.anchorLinkSymbol,
          },
          new Token('span_close', 'span', -1),
        ];
      } else {
        return [
          {
            ...new Token('text', '', 0),
            content: linkOptions.anchorLinkSymbol,
          },
        ];
      }
    };

    if (linkOptions.wrapHeadingTextInAnchor) {
      tokens[idx + 1].children.unshift(openLinkToken);
      tokens[idx + 1].children.push(closeLinkToken);
    } else {
      const linkTokens = [openLinkToken, ...renderAnchorLinkSymbol(), closeLinkToken];

      const actionOnArray = {
        false: 'push',
        true: 'unshift',
      };

      if (linkOptions.anchorLinkSpace) {
        linkTokens[actionOnArray[linkOptions?.anchorLinkBefore]](space());
      }
      tokens[idx + 1].children[actionOnArray[linkOptions.anchorLinkBefore]](...linkTokens);
    }
  };

  const originalHeadingOpen =
    md.renderer.rules.heading_open ||
    function (...args: any[]) {
      const [tokens, idx, , , self] = args;
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.heading_open = function (...args: any[]) {
    const [tokens, idx, , ,] = args;

    const attrs = (tokens[idx].attrs = tokens[idx].attrs || []);
    const anchor = tokens[idx + 1]._tocAnchor;
    attrs.push(['id', anchor]);

    if (opts.anchorLink) {
      renderAnchorLink(anchor, opts, tokens, idx);
    }

    return originalHeadingOpen.apply(this, args);
  };

  md.renderer.rules.toc_open = () => '';
  md.renderer.rules.toc_close = () => '';
  md.renderer.rules.toc_body = () => tocHtml;
}
