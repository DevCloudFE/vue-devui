import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import pkg from 'xss';
import { mermaidRender, refreshMermaid } from '../plugins/mermaid';
import tocAndAnchor from '../plugins/toc';
import type { MdPlugin, ICustomXssRule, ICustomRenderRule } from '../editor-md-types';

const { filterXSS, getDefaultWhiteList, getDefaultCSSWhiteList, IWhiteList } = pkg;

export class MDRenderService {
  private xssWhiteList = getDefaultWhiteList();
  private cssWhiteList = getDefaultCSSWhiteList();
  private mdt = new MarkdownIt({
    linkify: true,
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (_) {}
      }
      return '';
    },
  });
  private baseUrl = '';
  private breaks = true;
  private renderParse: Function | undefined;

  constructor() {
    this.setDefaultXss();
    this.mdt
      .use(tocAndAnchor, {
        linkify: false,
        anchorLink: false,
      })
      .use(mermaidRender, { id: 'devui-mermaid' });
  }

  private setDefaultXss() {
    this.xssWhiteList['input'] = ['type', 'checked', 'disabled', 'class'];
    this.xssWhiteList['label'] = ['for'];
    this.xssWhiteList['ul'] = ['class'];
    this.xssWhiteList['div'] = ['class'];
    this.xssWhiteList['a'] = ['href', 'class', 'target', 'name'];
    this.xssWhiteList['ol'] = ['start'];

    this.xssWhiteList['p'] = ['class'];
    this.xssWhiteList['span'] = ['style', 'class', 'title', 'id'];
    this.xssWhiteList['svg'] = ['style', 'class', 'width', 'height', 'viewbox', 'preserveaspectratio', 'id', 'fill', 'stroke'];
    this.xssWhiteList['path'] = ['style', 'class', 'd', 'id', 'fill', 'stroke'];
    this.xssWhiteList['th'] = ['style'];
    this.xssWhiteList['td'] = ['style'];
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  setBreaks(breaks: boolean): void {
    this.breaks = breaks;
  }

  setRenderParse(func: Function): void {
    this.renderParse = func;
  }

  getXssWhiteList(): IWhiteList {
    return this.xssWhiteList;
  }

  setXssWhiteList(list: IWhiteList): void {
    this.xssWhiteList = list;
  }

  setCustomXssRules(rules: ICustomXssRule[]): void {
    if (rules) {
      rules.forEach((rule) => {
        if (rule['value'] === null) {
          delete this.xssWhiteList[rule['key']];
        } else {
          this.xssWhiteList[rule['key']] = rule['value'];
        }
      });
    }
  }

  setCustomRendererRules(rules: ICustomRenderRule[]): void {
    if (rules) {
      rules.forEach((rule) => {
        this.mdt.renderer.rules[rule['key']] = rule['value'];
      });
    }
  }

  setOptions(options = {}): void {
    this.mdt.set(options);
  }

  setPlugins(plugins: Array<MdPlugin>): void {
    plugins.forEach((item) => {
      const { plugin, opts } = item;
      this.mdt.use(plugin, opts);
    });
  }

  private onIgnoreTagAttr(tag: string, name: string, value: string, isWhiteAttr: boolean) {
    if (!isWhiteAttr && (name === 'id' || (tag === 'span' && name === 'style')
      || (tag === 'a' && name === 'href'))) {
      return name + '=' + value;
    }
  }

  private onTagAttr(tag: string, name: string, value: string, isWhiteAttr: boolean) {
    if (isWhiteAttr && (tag === 'a' && name === 'href')) {
      return name + '=' + value;
    }
  }

  private replaceInternalUrl(html: string) {
    return html.replace(/(<a[^>]+?href=["']?)#([^"']+)(["']?[^>]*)>/gi, `$1${this.baseUrl}#$2$3>`);
  }

  private handleHeaderId(html: string) {
    const headerRecord = new Map<string, number>();
    const reg = /<(h[1-6]) id="(.*?)">/gi;
    return html.replace(reg, (match, p1, p2, offset, string): string => {
      if (headerRecord.has(p2)) {
        headerRecord.set(p2, headerRecord.get(p2)! + 1);
        return `<${p1} id="${p2}-${headerRecord.get(p2)}">`;
      } else {
        headerRecord.set(p2, 0);
        return `<${p1} id="${p2}">`;
      }
    });
  }

  generateHTML(text: string): string {
    this.mdt.set({
      breaks: this.breaks,
    });
    let html = this.mdt.render(text);
    html = this.handleHeaderId(html);

    if (this.renderParse) {
      html = this.renderParse(html);
    }

    html = filterXSS(html, {
      whiteList: this.xssWhiteList,
      onIgnoreTagAttr: this.onIgnoreTagAttr,
      onTagAttr: this.onTagAttr,
      css: {
        whiteList: Object.assign({}, this.cssWhiteList, {
          top: true,
          left: true,
          bottom: true,
          right: true,
        }),
      },
    });

    setTimeout(() => {
      refreshMermaid();
    }, 0);

    return this.replaceInternalUrl(html);
  }

  public setRules(mdRules: Record<string, unknown>): void {
    if (mdRules) {
      Object.keys(mdRules).forEach((rule) => {
        this.mdt[rule].set(mdRules[rule]);
      });
    }
  }
}
