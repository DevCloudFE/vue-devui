import { mount } from '@vue/test-utils';
import StepsGuideDemo from './steps-guide-demo';
document.body.innerHTML = `
  <button class="top-left">Top-left</button>
  <button class="top">Top</button>
  <button class="top-right">Top-right</button>
  <button class="right">Right</button>
  <button class="bottom-right">Bottom-right</button>
  <button class="bottom">Bottom</button>
  <button class="bottom-left">Bottom-left</button>
  <button class="left">Left</button>`;

describe('d-steps-guide', () => {
  it('test steps change', async () => {
    const wrapper = mount(StepsGuideDemo);

    await wrapper.get('.top').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(1);
    expect(document.querySelector('.devui-steps-guide').className).toContain('top');

    await wrapper.get('.right').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(3);
    expect(document.querySelector('.devui-steps-guide').className).toContain('right');

    await wrapper.get('.bottom').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(5);
    expect(document.querySelector('.devui-steps-guide').className).toContain('bottom');

    await wrapper.get('.left').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(7);
    expect(document.querySelector('.devui-steps-guide').className).toContain('left');

    await wrapper.get('.top-left').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(0);
    expect(document.querySelector('.devui-steps-guide').className).toContain('top-left');

    await wrapper.get('.top-right').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(2);
    expect(document.querySelector('.devui-steps-guide').className).toContain('top-right');

    await wrapper.get('.bottom-right').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(4);
    expect(document.querySelector('.devui-steps-guide').className).toContain('bottom-right');

    await wrapper.get('.bottom-left').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(6);
    expect(document.querySelector('.devui-steps-guide').className).toContain('bottom-left');

    await wrapper.get('.close').trigger('click');
    expect(wrapper.vm.stepIndex).toBe(-1);
    expect(document.querySelector('.devui-steps-guide')).toBe(null);
  });
});
