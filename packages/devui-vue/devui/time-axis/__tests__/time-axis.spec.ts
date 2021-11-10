import { mount } from '@vue/test-utils';
import DTimeAxis from '../src/time-axis';
import DTimeAxisItem from '../src/components/time-axis-item'
//cd packages/devui-vue
//yarn test --testMatch='**/**/time-axis.spec.ts'
describe('time-axis test', () => {
  const wrapper = mount({
    components: { DTimeAxis, DTimeAxisItem },
    template: `
    <d-time-axis>
      <d-time-axis-item time="2021-11-9">测试1</d-time-axis-item>
      <d-time-axis-item type="primary">
        <div>测试2</div>
        <template #time><div>2021-11-10</div></template>
        <template #dot><i class="icon-right-o" /></template>
        <template #extra><span>附加元素</span><template>
      </d-time-axis-item>
      <d-time-axis-item time="2021-11-11" type="success">测试3</d-time-axis-item>
      <d-time-axis-item time="2021-11-12" type="warning">测试4</d-time-axis-item>
      <d-time-axis-item time="2021-11-13" type="error">测试5</d-time-axis-item>
    </d-time-axis>
      `,
    setup() {
      return
    }
  });
  const timeAxisItems = wrapper.findAll('.devui-time-axis-item')

  it('should render correctly', async () => {
    //渲染的dom元素是有这个class
    expect(wrapper.classes()).toContain('devui-time-axis')
    //渲染正确子节点数
    expect(timeAxisItems.length).toBe(5)
    //看时间是否正确
    expect(timeAxisItems[0].find('.devui-time-axis-item-time').text()).toBe('2021-11-9')
    //看内容是否正确
    expect(timeAxisItems[0].find('.devui-time-axis-item-content').text()).toBe('测试1')
  })

  it('应该显示自定义内容', async () => {
    //有自定义的时间节点
    expect(timeAxisItems[1].find('.devui-time-axis-item-time div').html()).toBe('<div>2021-11-10</div>')
    //有自定义的内容
    expect(timeAxisItems[1].find('.devui-time-axis-item-content div').html()).toBe('<div>测试2</div>')
    //显示自定义时间点
    expect(timeAxisItems[1].find('.devui-time-axis-item-dot i').exists()).toBe(true)
    //显示时间点间的附加元素
    expect(timeAxisItems[1].find('.devui-time-axis-item-line-extra span').html()).toBe('<span>附加元素</span>')
  })

  it('type应该正确被渲染', async () => {
    expect(timeAxisItems[0].find('.devui-time-axis-item-dot').classes()).toContain('devui-time-axis-item-type-primary')
    expect(timeAxisItems[2].find('.devui-time-axis-item-dot').classes()).toContain('devui-time-axis-item-type-success')
    expect(timeAxisItems[3].find('.devui-time-axis-item-dot').classes()).toContain('devui-time-axis-item-type-warning')
    expect(timeAxisItems[4].find('.devui-time-axis-item-dot').classes()).toContain('devui-time-axis-item-type-error')

  })

  it('position信息应该正确被渲染', async () => {

    const wrapper = mount({
      components: { DTimeAxis, DTimeAxisItem },
      template: `
    <d-time-axis mode="alternative">
      <d-time-axis-item time="2021-11-9">测试1</d-time-axis-item>
      <d-time-axis-item time="2021-11-10">测试2</d-time-axis-item>
      <d-time-axis-item time="2021-11-11" position="right">测试3</d-time-axis-item>
      <d-time-axis-item time="2021-11-11" position="top">测试3</d-time-axis-item>
    </d-time-axis>
      `,
      setup() {
        return
      }
    });
    let timeAxisItems = wrapper.findAll('.devui-time-axis-item')
    //内容是否在正确的位置
    expect(timeAxisItems[0].find('.devui-time-axis-item-data-left .devui-time-axis-item-content').exists()).toBe(true)
    expect(timeAxisItems[1].find('.devui-time-axis-item-data-right .devui-time-axis-item-content').exists()).toBe(true)
    expect(timeAxisItems[2].find('.devui-time-axis-item-data-right .devui-time-axis-item-content').exists()).toBe(true)
    //设置横向时间轴
    await wrapper.setProps({ direction: 'horizontal' })
    timeAxisItems = wrapper.findAll('.devui-time-axis-item')
    expect(timeAxisItems[0].find('.devui-time-axis-item-data-bottom .devui-time-axis-item-content').exists()).toBe(true)
    expect(timeAxisItems[1].find('.devui-time-axis-item-data-top .devui-time-axis-item-content').exists()).toBe(true)
    expect(timeAxisItems[3].find('.devui-time-axis-item-data-top .devui-time-axis-item-content').exists()).toBe(true)

  })

  it('time-position信息应该正确被渲染', async () => {
    const wrapper = mount({
      components: { DTimeAxis, DTimeAxisItem },
      template: `
    <d-time-axis time-position="bottom">
      <d-time-axis-item time="2021-11-9">测试1</d-time-axis-item>
      <d-time-axis-item time="2021-11-10" time-position="left">测试2</d-time-axis-item>
    </d-time-axis>
      `,
      setup() {
        return
      }
    });
    const timeAxisItems = wrapper.findAll('.devui-time-axis-item')
    //时间是否在正确的位置
    expect(timeAxisItems[0].find('.devui-time-axis-item-data-left .devui-time-axis-item-time').exists()).toBe(false)
    expect(timeAxisItems[0].find('.devui-time-axis-item-axis .devui-time-axis-item-time').exists()).toBe(true)
    expect(timeAxisItems[1].find('.devui-time-axis-item-data-left .devui-time-axis-item-time').exists()).toBe(true)
    expect(timeAxisItems[1].find('.devui-time-axis-item-axis .devui-time-axis-item-time').exists()).toBe(false)
  })

  it('线条样式被正确渲染', async () => {
    const wrapper = mount({
      components: { DTimeAxis, DTimeAxisItem },
      template: `
    <d-time-axis>
      <d-time-axis-item time="2021-11-9" line-style="solid">测试1</d-time-axis-item>
      <d-time-axis-item time="2021-11-10" line-style="dashed">测试2</d-time-axis-item>
      <d-time-axis-item time="2021-11-11" line-style="dotted">测试3</d-time-axis-item>
      <d-time-axis-item time="2021-11-12" line-style="none">测试4</d-time-axis-item>
      <d-time-axis-item time="2021-11-13">测试5</d-time-axis-item>
    </d-time-axis>
      `,
      setup() {
        return
      }
    });
    const timeAxisItemAxis = wrapper.findAll('.devui-time-axis-item .devui-time-axis-item-axis')
    expect(timeAxisItemAxis[0].find('.devui-time-axis-item-line').classes()).toContain('devui-time-axis-item-line-style-solid')
    expect(timeAxisItemAxis[1].find('.devui-time-axis-item-line').classes()).toContain('devui-time-axis-item-line-style-dashed')
    expect(timeAxisItemAxis[2].find('.devui-time-axis-item-line').classes()).toContain('devui-time-axis-item-line-style-dotted')
    expect(timeAxisItemAxis[3].find('.devui-time-axis-item-line').classes()).toContain('devui-time-axis-item-line-style-none')
    expect(timeAxisItemAxis[4].find('.devui-time-axis-item-line').classes()).toContain('devui-time-axis-item-line-style-none')
  })
})
