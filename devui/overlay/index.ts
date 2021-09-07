import type { App } from 'vue'
import {FixedOverlay} from './src/fixed-overlay';
import {FlexibleOverlay } from './src/flexible-overlay';

FlexibleOverlay.install = function(app: App) {
  app.component(FlexibleOverlay.name, FlexibleOverlay);
}

FixedOverlay.install = function(app: App) {
  app.component(FixedOverlay.name, FixedOverlay);
}

export { FlexibleOverlay, FixedOverlay }

export default {
  title: 'Overlay 浮层',
  category: '通用',
  install(app: App): void {
    app.use(FixedOverlay as any);
    app.use(FlexibleOverlay as any);
    if (!document.getElementById('d-overlay-anchor')) {
      const overlayAnchor = document.createElement('div');
      overlayAnchor.setAttribute('id', 'd-overlay-anchor');
      overlayAnchor.style.position = 'fixed';
      overlayAnchor.style.left = '0';
      overlayAnchor.style.top = '0';
      overlayAnchor.style.zIndex = '1000';
      document.body.appendChild(overlayAnchor);  
    }
  }
}
