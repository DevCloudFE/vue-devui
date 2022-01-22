import { mount } from '@vue/test-utils'
import { Tag } from '../index'

describe('tag test', () => {
  it('init render', async () => {
    // 渲染完毕有.devui-tag的div存在
    const wrapper = mount(Tag)
    expect(wrapper.find('.devui-tag').exists()).toBeTruthy()
  })
  it('props type', () => {
    const wrapper = mount(Tag, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.find('.devui-tag span').classes()).toContain('devui-tag-primary')
  })
  it('props color', () => {
    const wrapper = mount(Tag, {
      propsData: {
        color: 'red-w98' //#f66f6a rgb(246, 111, 106)
      }
    })
    expect(wrapper.find('.devui-tag span').attributes('style')).toContain('rgb(246, 111, 106)')
  })
  it('props color custom', () => {
    const wrapper = mount(Tag, {
      propsData: {
        color: '#aa2116' //rgb(170, 33, 22)
      }
    })
    expect(wrapper.find('.devui-tag span').attributes('style')).toContain('rgb(170, 33, 22)')
  })
  it('props titleContent', () => {
    const titleContent = 'tagTitle test'
    const wrapper = mount(Tag, {
      props: { titleContent }
    })
    expect(wrapper.get('.devui-tag span').attributes('title')).toBe(titleContent)
  })
  // 可关闭的btn应该正常显示
  it('props deletable show', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        deletable: false
      }
    })
    expect(wrapper.find('.remove-button').exists()).toBeFalsy()
    // 重新设置属性应不渲染
    await wrapper.setProps({ deletable: true })
    expect(wrapper.find('.remove-button').exists()).toBeTruthy()
  })
  // 关闭功能的测试（点击后隐藏 触发tagDelete Event）
  it('props deletable hide', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        deletable: true
      }
    })
    const btn = wrapper.find('.remove-button')
    expect(btn.exists()).toBeTruthy()
    await btn.trigger('click')
    // await wrapper.vm.$nextTick() // 等待事件处理完成
    expect(wrapper.find('.devui-tag').exists()).toBeFalsy()
  })
  it('event tagDelete', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        deletable: true
      }
    })
    await wrapper.find('.remove-button').trigger('click')
    expect(wrapper.emitted('tagDelete').length).toBeGreaterThan(0)
    // expect(wrapper.emitted('tagDelete')).toBeTruthy()
  })

  // 选中backgroundColor为主题色，color为白色
  it('props checked', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        type: 'primary' //对应颜色：rgb(94, 124, 224)
      }
    })
    expect(wrapper.find('.devui-tag span').attributes('style')).toContain(
      'color: rgb(94, 124, 224);'
    )
    await wrapper.setProps({ checked: true })
    expect(wrapper.find('.devui-tag span').attributes('style')).toContain(
      'background-color: rgb(94, 124, 224);'
    )
    expect(wrapper.emitted('checkedChange').length).toBeGreaterThan(0)
  })
  it('event checkedChange', async () => {
    const wrapper = mount(Tag)
    await wrapper.setProps({ checked: true })
    expect(wrapper.emitted('checkedChange').length).toBeGreaterThan(0)
    expect(wrapper.emitted('checkedChange')[0]).toEqual([true])
    await wrapper.setProps({ checked: false })
    expect(wrapper.emitted('checkedChange').length).toBeGreaterThan(1)
    expect(wrapper.emitted('checkedChange')[1]).toEqual([false])
  })

  it('event click', async () => {
    const wrapper = mount(Tag)
    await wrapper.find('.devui-tag').trigger('click')
    expect(wrapper.emitted('click').length).toBeGreaterThan(0)
  })
})
