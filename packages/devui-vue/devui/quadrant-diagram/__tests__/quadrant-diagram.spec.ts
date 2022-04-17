import { mount } from '@vue/test-utils';
import { reactive, nextTick } from 'vue';

import DQuadrantDiagram from '../src/quadrant-diagram';

describe('d-quadrant-diagram', () => {
  it('quadrantDiagramResponse', async () => {
    const view = reactive({
      height: 200,
      width: 200,
    });

    const wrapper = mount({
      components: { DQuadrantDiagram },
      template: `<d-quadrant-diagram :view='view'/>`,
      propsData: {
        view,
      },
      setup() {
        return {
          view
        };
      }
    });

    expect(wrapper.find('#devui-quadrant-axis-1').element['height']).toEqual(200);
    view.height = 400;
    await nextTick();
    expect(wrapper.find('#devui-quadrant-axis-1').element['height']).toEqual(400);
  });
});
