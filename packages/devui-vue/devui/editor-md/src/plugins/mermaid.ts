import Mermaid from 'mermaid/dist/mermaid.core.mjs';

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
    return `<div class="mermaid" id="${options.id}">${code}</div>`;
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
      return render(code, options);
    }
    return defaultRenderer(tokens, idx, opts, env, self);
  };
}

let runningPromise: Promise<void> | null = null;

export function refreshMermaid(delay = 0, nodes?: HTMLElement | HTMLElement[]) {
  setTimeout(() => {
    const mermaidAny = Mermaid as any;
    let targetNodes: HTMLElement[] | undefined;
    if (nodes) {
      const list = Array.isArray(nodes) ? nodes : [nodes];
      targetNodes = list.flatMap(n => Array.from(n.querySelectorAll<HTMLElement>('.mermaid:not([data-processed])')));
      if (targetNodes.length === 0) {
        return;
      }
    }

    const run = (): Promise<void> => {
      try {
        let result: any;
        const hasRunApi = typeof mermaidAny.run === 'function';
        const shouldTarget = targetNodes !== undefined;

        if (hasRunApi) {
          result = shouldTarget ? mermaidAny.run({ nodes: targetNodes }) : mermaidAny.run();
        } else {
          result = shouldTarget ? mermaidAny.init(undefined, targetNodes) : mermaidAny.init();
        }

        return Promise.resolve(result).then(() => undefined);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    const next = () =>
      run().catch(() => {
        runningPromise = null;
      });
    
      if (runningPromise) {
        runningPromise = runningPromise.then(next, next);
      } else {
        runningPromise = next();
      }
  }, delay);
}
