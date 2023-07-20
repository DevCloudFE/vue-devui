import Mermaid from 'mermaid/dist/mermaid.js';

const DEFAULT_CONFIG = {
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'default',
  flowchart: {
    htmlLabels: true,
    useMaxWidth: false
  }
};

function render(code: string, options: Record<string, any>) {
  try {
    return `<div class="mermaid" id="${options.id}">${code}</div>`
  } catch (err: any) {
    return `<pre>${err.name}: ${err.message}</pre>`;
  }
}

export function mermaidRender(md: any, options = {}) {
  Mermaid.initialize(Object.assign(DEFAULT_CONFIG, options));

  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens: any, idx: any, opts: any, env: any, self: any) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info.startsWith('mermaid')) {
      return render(code, options)
    }
    return defaultRenderer(tokens, idx, opts, env, self)
  }
}

export function refreshMermaid(delay = 0) {
  setTimeout(() => {
    Mermaid.init();
  }, delay);
}