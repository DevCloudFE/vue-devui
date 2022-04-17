import type { App } from 'vue';
import { FixedOverlay } from './src/fixed-overlay';
import { FlexibleOverlay } from './src/flexible-overlay';
import { inBrowser } from '../shared/utils/common-var';

export * from './src/fixed-overlay/fixed-overlay-types';
export * from './src/flexible-overlay/flexible-overlay-types';

export { FlexibleOverlay, FixedOverlay };

export default {
  title: 'Overlay 遮罩层',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(FixedOverlay.name, FixedOverlay);
    app.component(FlexibleOverlay.name, FlexibleOverlay);

    if (inBrowser && !document.getElementById('d-overlay-anchor')) {
      const overlayAnchor = document.createElement('div');
      overlayAnchor.setAttribute('id', 'd-overlay-anchor');
      overlayAnchor.style.position = 'fixed';
      overlayAnchor.style.left = '0';
      overlayAnchor.style.top = '0';
      overlayAnchor.style.zIndex = '1000';
      document.body.appendChild(overlayAnchor);
    }
  },
};
