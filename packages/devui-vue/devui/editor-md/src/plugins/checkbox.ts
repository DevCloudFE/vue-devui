import * as _ from 'lodash';

const checkboxReplace = function (md: any, options: any) {
  let lastId: number;
  const arrReplaceAt = md.utils.arrayReplaceAt;
  lastId = 0;
  const defaults = {
    divWrap: false,
    divClass: 'checkbox',
    idPrefix: 'checkbox',
  };
  options = _.extend(defaults, options);
  const pattern = /\[(X|\s|\_|\-)\]\s(.*)/i;
  const createTokens = function (checked: any, label: any, Token: any) {
    let token;
    const nodes = [];
    /**
     * <div class="checkbox">
     */
    if (options.divWrap) {
      token = new Token('checkbox_open', 'div', 1);
      token.attrs = [['class', 'checkbox']];
      nodes.push(token);
    }

    /**
     * <input type="checkbox" id="checkbox{n}" checked="true">
     */
    const id = options.idPrefix + lastId;
    lastId += 1;
    token = new Token('checkbox_input', 'input', 0);
    token.attrs = [
      ['type', 'checkbox'],
      ['id', id],
    ];

    if (options.disabled) {
      token.attrs.push(['disabled', true]);
    }
    if (checked === true) {
      token.attrs.push(['checked', 'true']);
    }
    nodes.push(token);

    /**
     * <label for="checkbox{n}">
     */
    token = new Token('label_open', 'label', 1);
    token.attrs = [['for', id]];
    nodes.push(token);

    /**
     * content of label tag
     */
    token = new Token('text', '', 0);
    token.content = label;
    nodes.push(token);

    /**
     * closing tags
     */
    nodes.push(new Token('label_close', 'label', -1));
    if (options.divWrap) {
      nodes.push(new Token('checkbox_close', 'div', -1));
    }
    return nodes;
  };

  const splitTextToken = function (original: any, Token: any) {
    let checked;
    const text = original.content;
    const matches = text.match(pattern);

    if (matches === null) {
      return original;
    }
    checked = false;
    const value = matches[1];
    const label = matches[2];
    if (value === 'X' || value === 'x') {
      checked = true;
    }
    return createTokens(checked, label, Token);
  };

  return function (state: any) {
    let i, j, token, tokens;
    const blockTokens = state.tokens;
    j = 0;
    const l = blockTokens.length;
    while (j < l) {
      if (blockTokens[j].type !== 'inline') {
        j++;
        continue;
      }
      tokens = blockTokens[j].children;
      i = tokens.length - 1;
      while (i >= 0) {
        token = tokens[i];
        if (token.type === 'text' && pattern.test(token.content)) {
          blockTokens[j].children = tokens = arrReplaceAt(tokens, i, splitTextToken(token, state.Token));
        }
        i--;
      }
      j++;
    }
  };
};

export function checkbox(md: any, options: any) {
  md.core.ruler.push('checkbox', checkboxReplace(md, options));
}
