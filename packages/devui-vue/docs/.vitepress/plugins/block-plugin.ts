import path from 'path';
import fs from 'fs';
import { pathExistsSync } from 'path-exists';
import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import highlight from '../utils/highlight';
import parseInstruct from '../utils/parseInstruct';

const localMd = MarkdownIt();

export const blockPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        let content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        const sourceFileToken = tokens[idx + 2];
        const sourceObject = sourceFileToken.children?.[0] || {};
        const { content: instruct } = sourceObject;
        let filePath = '';
        let targetPath = '';
        let demoName = '';
        // 自定义 demo，从外部引入
        if (!content && instruct && sourceFileToken.type === 'inline') {
          const { filePathSuffix } = parseInstruct(instruct);
          filePath = path.join(__dirname, '../../components', `${filePathSuffix}.vue`);
          targetPath = path.join('../../components', `${filePathSuffix}.vue`).replace(new RegExp(`\\${path.sep}`, 'gim'), '/');
          if (pathExistsSync(filePath)) {
            demoName = path.basename(filePath, '.vue');
            content = fs.readFileSync(filePath, 'utf-8');
          }
        }
        return `
          <demo
            sourceCode="${md.utils.escapeHtml(content)}"
            lightCode="${encodeURIComponent(highlight(content, 'vue'))}"
            desc="${encodeURIComponent(localMd.render(description))}"
            :demoList="demoList"
            targetFilePath="${targetPath}"
          >
          ${content ? `<!--vue-demo:${content}:vue-demo-->` : ''}
        `;
      }
      return `</demo>`;
    },
  });
};
