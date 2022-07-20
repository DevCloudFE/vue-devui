import { mount } from '@vue/test-utils';
import DTimeline from '../src/timeline';
import DTimelineItem from '../src/components/timeline-item';
describe('timeline test', () => {
  const wrapper = mount({
    components: { DTimeline, DTimelineItem },
    template: `
    <d-timeline>
      <d-timeline-item time="2021-11-9">测试1</d-timeline-item>
      <d-timeline-item type="primary">
        <div>测试2</div>
        <template #time><div>2021-11-10</div></template>
        <template #dot><i class="icon-right-o" /></template>
        <template #extra><span>附加元素</span></template>
      </d-timeline-item>
      <d-timeline-item time="2021-11-11" type="success">测试3</d-timeline-item>
      <d-timeline-item time="2021-11-12" type="warning">测试4</d-timeline-item>
      <d-timeline-item time="2021-11-13" type="error">测试5</d-timeline-item>
    </d-timeline>
      `,
    setup() {
      return;
    }
  });
  const timeAxisItems = wrapper.findAll('.devui-timeline-item');

  it('should render correctly', async () => {
    // 渲染的dom元素是有这个class
    expect(wrapper.classes()).toContain('devui-timeline');
    // 渲染正确子节点数
    expect(timeAxisItems.length).toBe(5);
    // 看时间是否正确
    expect(timeAxisItems[0].find('.devui-timeline-item-time').text()).toBe('2021-11-9');
    // 看内容是否正确
    expect(timeAxisItems[0].find('.devui-timeline-item-content').text()).toBe('测试1');
  });

  it('Custom content should be displayed', async () => {
    // 有自定义的时间节点
    expect(timeAxisItems[1].find('.devui-timeline-item-time div').html()).toBe('<div>2021-11-10</div>');
    // 有自定义的内容
    expect(timeAxisItems[1].find('.devui-timeline-item-content div').html()).toBe('<div>测试2</div>');
    // 显示自定义时间点
    expect(timeAxisItems[1].find('.devui-timeline-item-dot i').exists()).toBe(true);
    // 显示时间点间的附加元素
    expect(timeAxisItems[1].find('.devui-timeline-item-line-extra span').html()).toBe('<span>附加元素</span>');
  });

  it('type should be rendered correctly', async () => {
    expect(timeAxisItems[0].find('.devui-timeline-item-dot').classes()).toContain('devui-timeline-item-type-primary');
    expect(timeAxisItems[2].find('.devui-timeline-item-dot').classes()).toContain('devui-timeline-item-type-success');
    expect(timeAxisItems[3].find('.devui-timeline-item-dot').classes()).toContain('devui-timeline-item-type-warning');
    expect(timeAxisItems[4].find('.devui-timeline-item-dot').classes()).toContain('devui-timeline-item-type-error');

  });

  it('position should be rendered correctly', async () => {

    const wrapperPosition = mount({
      components: { DTimeline, DTimelineItem },
      template: `
    <d-timeline mode="alternative">
      <d-timeline-item time="2021-11-9">测试1</d-timeline-item>
      <d-timeline-item time="2021-11-10">测试2</d-timeline-item>
      <d-timeline-item time="2021-11-11" position="right">测试3</d-timeline-item>
      <d-timeline-item time="2021-11-11" position="top">测试3</d-timeline-item>
    </d-timeline>
      `,
      setup() {
        return;
      }
    });
    let timeAxisItemsPosition = wrapperPosition.findAll('.devui-timeline-item');
    // 内容是否在正确的位置
    expect(timeAxisItemsPosition[0].find('.devui-timeline-item-data-left .devui-timeline-item-content').exists()).toBe(true);
    expect(timeAxisItemsPosition[1].find('.devui-timeline-item-data-right .devui-timeline-item-content').exists()).toBe(true);
    expect(timeAxisItemsPosition[2].find('.devui-timeline-item-data-right .devui-timeline-item-content').exists()).toBe(true);
    // 设置横向时间轴
    await wrapperPosition.setProps({ direction: 'horizontal' });
    timeAxisItemsPosition = wrapperPosition.findAll('.devui-timeline-item');
    expect(timeAxisItemsPosition[0].find('.devui-timeline-item-data-bottom .devui-timeline-item-content').exists()).toBe(true);
    expect(timeAxisItemsPosition[1].find('.devui-timeline-item-data-top .devui-timeline-item-content').exists()).toBe(true);
    expect(timeAxisItemsPosition[3].find('.devui-timeline-item-data-top .devui-timeline-item-content').exists()).toBe(true);

  });

  it('time-position should be rendered correctly', async () => {
    const wrapperTimePosition = mount({
      components: { DTimeline, DTimelineItem },
      template: `
    <d-timeline time-position="bottom">
      <d-timeline-item time="2021-11-9">测试1</d-timeline-item>
      <d-timeline-item time="2021-11-10" time-position="left">测试2</d-timeline-item>
    </d-timeline>
      `,
      setup() {
        return;
      }
    });
    const timeAxisItemsTimePosition = wrapperTimePosition.findAll('.devui-timeline-item');
    // 时间是否在正确的位置
    expect(timeAxisItemsTimePosition[0].find('.devui-timeline-item-data-left .devui-timeline-item-time').exists()).toBe(false);
    expect(timeAxisItemsTimePosition[0].find('.devui-timeline-item-axis .devui-timeline-item-time').exists()).toBe(true);
    expect(timeAxisItemsTimePosition[1].find('.devui-timeline-item-data-left .devui-timeline-item-time').exists()).toBe(true);
    expect(timeAxisItemsTimePosition[1].find('.devui-timeline-item-axis .devui-timeline-item-time').exists()).toBe(false);
  });

  it('line-style should be rendered correctly', async () => {
    const wrapperLineStyle = mount({
      components: { DTimeline, DTimelineItem },
      template: `
    <d-timeline>
      <d-timeline-item time="2021-11-9" line-style="solid">测试1</d-timeline-item>
      <d-timeline-item time="2021-11-10" line-style="dashed">测试2</d-timeline-item>
      <d-timeline-item time="2021-11-11" line-style="dotted">测试3</d-timeline-item>
      <d-timeline-item time="2021-11-12" line-style="none">测试4</d-timeline-item>
      <d-timeline-item time="2021-11-13">测试5</d-timeline-item>
    </d-timeline>
      `,
      setup() {
        return;
      }
    });
    const timeAxisItemAxis = wrapperLineStyle.findAll('.devui-timeline-item .devui-timeline-item-axis');
    expect(timeAxisItemAxis[0].find('.devui-timeline-item-line').classes()).toContain('devui-timeline-item-line-style-solid');
    expect(timeAxisItemAxis[1].find('.devui-timeline-item-line').classes()).toContain('devui-timeline-item-line-style-dashed');
    expect(timeAxisItemAxis[2].find('.devui-timeline-item-line').classes()).toContain('devui-timeline-item-line-style-dotted');
    expect(timeAxisItemAxis[3].find('.devui-timeline-item-line').classes()).toContain('devui-timeline-item-line-style-none');
    expect(timeAxisItemAxis[4].find('.devui-timeline-item-line').classes()).toContain('devui-timeline-item-line-style-none');
  });
});
