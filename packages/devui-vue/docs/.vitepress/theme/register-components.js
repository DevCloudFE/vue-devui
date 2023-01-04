import Demo from '../demo/Demo.vue';
import DemoBlock from '../demo/DemoBlock.vue';

export function registerComponents(app) {
  app.component('Demo', Demo);
  app.component('DemoBlock', DemoBlock);
}
