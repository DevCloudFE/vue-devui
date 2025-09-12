import { mount } from '@vue/test-utils';
import { ref, Ref, nextTick, h, shallowReactive } from 'vue';
import { LoadingService, LoadingDirective } from '../index';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('loading', true);
// 全局属性
const globalOption = {
  directives: {
    Loading: LoadingDirective,
  },
};

describe('Loading as directive', () => {
  it('loading init render', async () => {
    const wrapper = mount(
      {
        template: `<div v-loading="true"></div>`,
      },
      {
        global: globalOption,
      }
    );

    await nextTick();
    const loadingEl = wrapper.find(ns.b());
    expect(loadingEl.exists()).toBeTruthy();
    const loadingMask = wrapper.find(ns.e('mask'));
    expect(loadingMask.exists()).toBeTruthy();
  });

  it('loading test mask', async () => {
    const wrapper = mount(
      {
        template: `<div v-loading="true" :backdrop="false"></div>`,
      },
      {
        global: globalOption,
      }
    );

    const loadingMask = wrapper.find(ns.e('mask'));
    expect(loadingMask.exists()).toBeFalsy();
  });

  it('loading test positionType', async () => {
    const wrapper = mount(
      {
        template: `<div v-loading="true" id="testLoading" positionType="absolute"></div>`,
      },
      {
        global: globalOption,
      }
    );

    const loadingPType = wrapper.find('#testLoading');
    expect(loadingPType).toBeTruthy();
    // @_ts-ignore
    // 不支持`ts-ignore`，强行修改确保eslint通过。@mrundef-210810
    const targetEle = loadingPType.wrapperElement.instance.vnode.el;
    expect(targetEle.parentNode.style.position).toEqual('absolute');
  });

  it('loading test loadingTemplateRef', async () => {
    const wrapper = mount(
      {
        template: `<div v-loading="true" id="testLoading" :loadingTemplateRef="ele"></div>`,
        data() {
          return {
            ele: h(
              'div',
              {
                className: 'test-component',
              },
              '正在加载中...'
            ),
          };
        },
      },
      {
        global: globalOption,
      }
    );

    await nextTick();
    const loadingComp = wrapper.find('.test-component');
    expect(loadingComp.exists()).toBeTruthy();
    expect(loadingComp.text()).toEqual('正在加载中...');

    const loadingContainer = wrapper.find(ns.e('wrapper'));
    expect(loadingContainer.exists()).toBeFalsy();
  });

  it('loading test vLoading', async () => {
    const wrapper = mount(
      {
        template: `
          <div>
            <button id="testbtn" @click="click"></button>
            <div v-loading="isShow"></div>
          </div>
        `,
        setup() {
          const isShow = ref(false);
          const click = () => {
            isShow.value = !isShow.value;
          };
          return {
            isShow,
            click,
          };
        },
      },
      {
        global: globalOption,
      }
    );

    await nextTick();
    const loadingContainer = wrapper.find(ns.b());
    expect(loadingContainer.exists()).toBeFalsy();
    const btn = wrapper.find('#testbtn');
    expect(btn.exists()).toBeTruthy();

    await btn.trigger('click');
    expect(wrapper.find(ns.b()).exists()).toBeTruthy();

    await btn.trigger('click');
    expect(wrapper.find(ns.b()).exists()).toBeFalsy();
  });

  it('loading test Promise', async () => {
    const wrapper = mount(
      {
        template: `
          <div>
            <button id="testbtn" @click="click"></button>
            <div v-loading="loading" id="testLoading"></div>
          </div>
        `,
        setup() {
          const loading: Ref<Promise<unknown> | undefined | boolean> = ref(false);

          const click = () => {
            loading.value = new Promise((res) => {
              res(111);
            });
          };

          return {
            loading,
            click,
          };
        },
      },
      {
        global: globalOption,
      }
    );

    const btn = wrapper.find('#testbtn');
    expect(btn.exists()).toBeTruthy();

    await btn.trigger('click');
    expect(wrapper.find(ns.e('wrapper')).exists()).toBeTruthy();
    // TODO 组件移除是在finally内部移除，在微任务队列末尾，这里好像检测不到
    setTimeout(() => {
      expect(wrapper.find(ns.e('wrapper')).exists()).toBeFalsy();
    });
  });

  it('loading test mutiple Promise', async () => {
    const wrapper = mount(
      {
        template: `
          <div>
            <button id="testbtn" @click="fetchMutiplePromise"></button>
            <div v-loading="promises.value" id="testLoading"></div>
          </div>
        `,
        setup() {
          const promises = shallowReactive({
            value: [],
          });
          const fetchMutiplePromise = () => {
            const list = [];
            for (let i = 0; i < 3; i++) {
              list.push(
                new Promise((res) => {
                  res(true);
                })
              );
            }
            promises.value = list;
          };

          return {
            fetchMutiplePromise,
            promises,
          };
        },
      },
      {
        global: globalOption,
      }
    );

    await nextTick();
    const btn = wrapper.find('#testbtn');
    expect(btn.exists()).toBeTruthy();

    await btn.trigger('click');
    expect(wrapper.find(ns.e('wrapper')).exists()).toBeTruthy();
    // TODO 组件移除是在finally内部移除，在微任务队列末尾，这里好像检测不到
    setTimeout(() => {
      expect(wrapper.find(ns.e('wrapper')).exists()).toBeFalsy();
    });
  });
});

describe('Loading as Service', () => {
  it('service init', async () => {
    const loading = LoadingService.open();

    await nextTick();
    const ele = document.querySelector(ns.b());
    expect(ele).toBeTruthy();
    expect(ele.parentNode === document.body).toBe(true);

    loading.loadingInstance.close();
    await nextTick();
    const ele2 = document.querySelector(ns.b());
    expect(ele2).toBe(null);
  });

  it('service target', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const loading = LoadingService.open({
      target: div,
    });

    await nextTick();
    const ele = document.querySelector(ns.b());
    expect(ele).toBeTruthy();
    expect(ele.parentNode === div).toBe(true);

    loading.loadingInstance.close();
  });

  it('service message', async () => {
    const loading = LoadingService.open({
      message: '正在加载中...',
    });

    await nextTick();
    const ele = document.querySelector(ns.b());
    expect(ele).toBeTruthy();
    expect(ele.textContent).toBe('正在加载中...');

    loading.loadingInstance.close();
  });

  it('service Style', async () => {
    const loading = LoadingService.open({
      positionType: 'absolute',
      view: {
        top: '40%',
        left: '60%',
      },
      zIndex: 1000,
    });

    await nextTick();
    const ele = document.querySelector(ns.b());
    expect(ele).toBeTruthy();
    // @_ts-ignore
    // 不支持`ts-ignore`，强行修改确保eslint通过。@mrundef-210810
    expect(ele.parentNode.style.position).toBe('absolute');

    const loadingEle = ele.querySelector(ns.e('area'));
    // @_ts-ignore
    // 不支持`ts-ignore`，强行修改确保eslint通过。@mrundef-210810
    const style = loadingEle.style;
    expect(style.top).toBe('40%');
    expect(style.left).toBe('60%');
    expect(style.zIndex).toBe('1000');

    loading.loadingInstance.close();
  });

  it('service template', async () => {
    const loading = LoadingService.open({
      loadingTemplateRef: h(
        'div',
        {
          className: 'test-class',
        },
        '正在加载中'
      ),
    });

    await nextTick();
    const ele = document.querySelector('.test-class');
    expect(ele).toBeTruthy();
    expect(ele.textContent).toBe('正在加载中');

    const originEle = document.querySelector(ns.e('wrapper'));
    expect(originEle).toBeFalsy();

    loading.loadingInstance.close();
  });

  it('service mask', async () => {
    const loading = LoadingService.open({
      backdrop: false,
    });

    await nextTick();

    const wrapper = document.querySelector(ns.e('wrapper'));
    const mask = document.querySelector(ns.e('mask'));

    expect(wrapper).toBeTruthy();
    expect(mask).toBeFalsy();

    loading.loadingInstance.close();
  });
});
