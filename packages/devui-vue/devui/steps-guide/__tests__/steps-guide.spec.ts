import { mount } from '@vue/test-utils';
import StepsGuideDemo from './steps-guide-demo';
describe('d-steps-guide', () => {
  it('guide step', async () => {
    const wrapper = mount(StepsGuideDemo)

    await wrapper.vm.handleClick(2)
    expect(wrapper.vm.stepIndex).toBe(2)

    await wrapper.vm.handleClick(1)
    expect(wrapper.vm.stepIndex).toBe(1)

    await wrapper.vm.handleClick(0)
    expect(wrapper.vm.stepIndex).toBe(0)

    await wrapper.vm.handleClose()
    expect(wrapper.vm.stepIndex).toBe(-1)
  });
});
