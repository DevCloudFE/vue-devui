import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DAutoComplete from '../src/auto-complete';

// delay api
const wait = (delay = 300) =>
  new Promise(resolve => setTimeout(() => resolve(true), delay))
describe('auto-complete', () => {
  it('init render & KeyboardEvent ', async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :dAutoCompleteWidth="450"
        />
      `,
      setup() {
        const value = ref('')
        const source = [
          'C#',
          'C',
          'C++',
          'CPython',
          'CoffeeScript',
        ]
        return {
          value,
          source,
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.trigger('click')
    await nextTick()
    expect(wrapper.find('.devui-select-open').exists()).toBe(true)
    expect(wrapper.find('.devui-dropdown-item').exists()).toBe(false)
    expect(wrapper.find('.devui-auto-complete').attributes('style')).toContain(
      'width: 450px'
    )
    await input.setValue('c')
    await nextTick()
    expect(wrapper.find('.devui-dropdown-menu').exists()).toBe(true)
    await wait(300)
    await nextTick()
    expect(wrapper.find('.devui-list-unstyled').element.childElementCount).toBe(5)
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await nextTick()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await nextTick()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await nextTick()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await nextTick()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await nextTick()
    expect(wrapper.vm.value).toBe('C++')
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.find('.devui-select-open').exists()).toBe(false)
  })
  it('disabled ', async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <div>
          <d-auto-complete
            :source="source"
            v-model="value"
            :disabled="isDisabled"
          /> 
          <button @click="toggle">{{ isDisabled ? 'Enable AutoComplete' : 'Disable AutoComplete' }}</button>
        </div>
      `,
      setup() {
        const value = ref('')
        const isDisabled = ref(false)
        const source = [
          'C#',
          'C',
          'C++',
          'CPython',
          'CoffeeScript',
        ]
        function toggle(){
          isDisabled.value= !isDisabled.value
        }
        return {
          value,
          source,
          isDisabled,
          toggle
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    const button = wrapper.find('button')
    expect(input.element.value).toBe('')
    expect(button.element.innerHTML).toBe('Disable AutoComplete')
    await input.trigger('click')
    await nextTick()
    await input.setValue('c')
    await nextTick()
    await wait(300)
    await nextTick()
    expect(wrapper.find('ul .selected').exists()).toBe(true)
    const li = wrapper.find('ul .selected')
    li.trigger('click')
    await nextTick()
    expect(wrapper.vm.value).toBe('C#')
    expect(wrapper.find('.devui-select-open').exists()).toBe(false)
    button.trigger('click')
    await  nextTick()
    expect(button.element.innerHTML).toBe('Enable AutoComplete')
    expect(input.element.disabled).toBe(true)
  })
  it('Customized data matching method ', async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          v-model="value"
          :searchFn="searchFn"
          disabledKey="disabled"
          isSearching
          :formatter="formatter"
        > 
          <template #searchingTemplate="slotProps" >
            <div id="devui-is-searching-template">
                {{slotProps}}
            </div>
          </template>
        </d-auto-complete>
      `,
      setup() {
        const value = ref('')
        const mySource = ref([
          {
            label:'C#',
            disabled:false
          },{
            label:'C++',
            disabled:false
          },{
            label:'CPython',
            disabled:false
          },{
            label:'Java',
            disabled:false
          },{
            label:'JavaScript',
            disabled:false
          },{
            label:'Go',
            disabled:false
          },{
            label:'Ruby',
            disabled:false
          },{
            label:'F#',
            disabled:false
          },{
            label:'TypeScript',
            disabled:false
          },{
            label:'SQL',
            disabled:true
          },{
            label:'LiveScript',
            disabled:false
          },{
            label:'CoffeeScript',
            disabled:false
          }
        ])
        const formatter = (item) =>{
          return item.label;
        }
        //trem：input输入内容
        const searchFn =async (trem)=>{
          const arr = []
          await new Promise((resolve)=>{
            setTimeout(() => {
              resolve(1)
            }, 500);
          })
          mySource.value.forEach((item) => {
            let cur = item.label
            cur = cur.toLowerCase()
            if (cur.startsWith(trem)) {
                arr.push(item)
            }
          })
          return arr
        }
        return {
          value,
          searchFn,
          formatter
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.trigger('click')
    await nextTick()
    expect(wrapper.find('.devui-select-open').exists()).toBe(true)
    await input.setValue('c')
    await nextTick()
    await wait(300)
    expect(wrapper.find('#devui-is-searching-template').exists()).toBe(true)
    expect(wrapper.find('#devui-is-searching-template').element.innerHTML).toBe('c')
    await wait(500)
    await nextTick()
    expect(wrapper.find('.devui-list-unstyled').element.childElementCount).toBe(4)
    await input.setValue('s')
    await nextTick()
    await wait(300)
    await nextTick()
    await wait(500)
    expect(wrapper.find('li.disabled').exists()).toBe(true)
    expect(wrapper.find('li.disabled').element.innerHTML).toBe('SQL')
  })

  it('Customized template display', async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
        > 
          <template #itemTemplate="slotProps" >
            <div>
              第{{slotProps.index}}项: {{slotProps.item}}
            </div>
          </template>
          <template #noResultItemTemplate="slotProps" >
            <div id="noResultItemTemplate">
                {{slotProps}}
            </div>
          </template>
        </d-auto-complete>
      `,
      setup() {
        const value = ref('')
        const source = ref([
          'C#',
          'C',
          'C++',
          'CPython',
          'Java',
          'JavaScript',
          'Go',
          'Python',
          'Ruby',
          'F#',
          'TypeScript',
          'SQL',
          'LiveScript',
          'CoffeeScript',
        ])
    
        return {
          value,
          source
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.trigger('click')
    await nextTick()
    expect(wrapper.find('.devui-select-open').exists()).toBe(true)
    await input.setValue('c')
    await nextTick()
    await wait(300)
    expect(wrapper.find('.devui-list-unstyled').exists()).toBe(true)
    expect(wrapper.find('.devui-list-unstyled').element.childElementCount).toBe(5)
    expect(wrapper.find('.selected div').element.innerHTML).toBe(' 第0项: C#')
    await input.setValue('cc')
    await nextTick()
    await wait(300)
    await nextTick()
    expect(wrapper.find('#noResultItemTemplate').exists()).toBe(true)
    expect(wrapper.find('#noResultItemTemplate').element.innerHTML).toBe('cc')
  })

  it('selectValue & transInputFocusEmit ', async () => {
    const transInputFocusEmitCB = jest.fn()
    const selectValueCB = jest.fn()
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :delay="300"
          :transInputFocusEmit="transInputFocusEmit"
          :selectValue="selectValue"
        />
      `,
      setup() {
        const value = ref('')
        const source = [
          'C#',
          'C',
          'C++',
          'CPython',
          'CoffeeScript',
        ]
        const selectValue = (e)=>{
          selectValueCB(e)
        }
        const transInputFocusEmit = (e)=>{
          transInputFocusEmitCB(e)
        }
        return {
          value,
          source,
          selectValue,
          transInputFocusEmit
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.trigger('focus')
    await nextTick()
    await input.setValue('c')
    await nextTick()
    await wait(300)
    await nextTick()
    expect(transInputFocusEmitCB).toHaveBeenCalledTimes(1)
    const li = wrapper.find('ul .selected')
    li.trigger('click')
    await nextTick()
    expect(selectValueCB).toHaveBeenCalledTimes(1)
  })
  it('allowEmptyValueSearch ', async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :allowEmptyValueSearch="allowEmptyValueSearch"
        />
      `,
      setup() {
        const value = ref('')
        const allowEmptyValueSearch = ref(true)
        const source = [
          'C#',
          'C',
          'C++',
          'CPython',
          'CoffeeScript',
        ]
        
        return {
          value,
          source,
          allowEmptyValueSearch
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.trigger('focus')
    await nextTick()
    expect(wrapper.find('ul').element.childElementCount).toBe(5)
  })

  it('appendToBody & appendToBodyDirections', async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template: `
        <d-auto-complete
          :source="source"
          v-model="value"
          :appendToBodyDirections="appendToBodyDirections"
          :allowEmptyValueSearch="allowEmptyValueSearch"
        />
      `,
      setup() {
        const value = ref('')
        const allowEmptyValueSearch = ref(true)
        const source = [
          'CC#',
          'C',
          'C++',
          'CPython',
          'CoffeeScript',
        ]
        const appendToBodyDirections =  ref({
          originX: 'left',
          originY: 'bottom',
          overlayX: 'left',
          overlayY: 'top',
        })
        return {
          value,
          source,
          allowEmptyValueSearch,
          appendToBodyDirections
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.trigger('focus')
    await nextTick()
    await input.setValue('c')
    await nextTick()
    await wait(300)
    await nextTick()
    expect(wrapper.find('ul').element.childElementCount).toBe(5)
    expect(wrapper.find('.selected').element.innerHTML).toBe('CC#')
  })

  it('latestSource',async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template:`
        <div>
          <d-auto-complete
            :source="source"
            v-model="value"
            :latestSource="latestSource"
          /> 
        </div>
      `,
      setup(){
        const value = ref('')
        const latestSource = ref(['JavaScript','TypeScript'])
        const source = ref([
          'C#',
          'C',
          'C++',
          'Java',
          'JavaScript'
        ])
        
        return {
          value,
          source,
          latestSource
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.trigger('click')
    await nextTick()
    expect(wrapper.find('ul .devui-popup-tips').exists()).toBe(true)
    await input.setValue('j')
    await wait(300)
    await nextTick()
    const li = wrapper.find('ul .selected')
    li.trigger('click')
    await nextTick()
    expect(wrapper.vm.value).toBe('Java')
  })
  it('enableLazyLoad',async () => {
    const wrapper = mount({
      components: {'d-auto-complete': DAutoComplete },
      template:`
        <div>
          <d-auto-complete
            ref="autoCompleteRef"
            :source="source"
            v-model="value"
            enableLazyLoad
            :load-more="loadMore"
          /> 
        </div>
      `,
      setup(){
        const value = ref('')
        const source = ref([
          'C#',
          'C',
          'C++',
          'CPython',
          'Java',
          'JavaScript',
          'Go',
          'Python',
          'Ruby',
          'F#',
          'TypeScript',
          'SQL',
          'LiveScript',
          'CoffeeScript',
          'C1',
          'C2',
          'C3',
          'C4',
          'C5',
          'C6',
          'C7',
        ])
        const autoCompleteRef =ref(null)
        
        const loadMore = () => {
          setTimeout(() => {
            source.value.push('lazyData'+source.value.length)
            autoCompleteRef.value?.loadFinish()
          },3000)
        }
        return {
          value,
          source,
          loadMore,
          autoCompleteRef
        }
      }
    })
    expect(wrapper.find('.devui-auto-complete').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    await input.setValue('c')
    await nextTick()
    expect(wrapper.find('.devui-dropdown-menu').exists()).toBe(true)
    await wait(300)
    await nextTick()
    expect(wrapper.find('.devui-dropdown-item').exists()).toBe(true)
    const ul = wrapper.find('.devui-list-unstyled')
    const makeScroll = async (
      dom: Element,
      name: 'scrollTop',
      offset: number
    ) => {
      const eventTarget = dom === document.documentElement ? window : dom
      dom[name] = offset
      const evt = new CustomEvent('scroll', {
        detail: {
          target: {
            [name]: offset,
          },
        },
      })
      eventTarget.dispatchEvent(evt)
      return await wait(3000)
    }
    await makeScroll(ul.element, 'scrollTop', 500)
    await nextTick()
    expect(wrapper.vm.value).toBe('c')
    await nextTick()
    await input.setValue('')
    const length = wrapper.vm.source.length
    expect(wrapper.vm.source[length - 1]).toBe('lazyData21')
    await input.setValue('la')
    await wait(300)
    await nextTick()
    expect(wrapper.find('.devui-dropdown-item').element.innerHTML).toBe('lazyData21')
  })
})

