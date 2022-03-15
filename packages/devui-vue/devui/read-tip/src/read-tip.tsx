import { defineComponent, ref, onMounted, reactive, onUnmounted } from 'vue';
import { readTipProps, ReadTipProps, ReadTipOptions } from './read-tip-types';
import './read-tip.scss';
import TipsTemplate from './read-tip-template';

export default defineComponent({
  name: 'DReadTip',
  props: readTipProps,
  emits: [],
  setup(props: ReadTipProps, ctx) {
    // 默认配置
    const defaultOptions: ReadTipOptions = {
      trigger: 'hover',
      showAnimate: false,
      mouseenterTime: 100,
      mouseleaveTime: 100,
      position: 'top',
      overlayClassName: '',
      appendToBody: true,
      rules: { selector: null },
    };
    // 合并基础配置
    const options = { ...defaultOptions, ...props.readTipOptions };
    const defaultSlot = ref(null);
    const onMouseenter = (rule) => () => {
      setTimeout(() => {
        if (rule.id) {
          const a = refRules.find(u => u.id === rule.id);
          a.status = true;
        }
        rule.status = true;
      }, rule.mouseenterTime || options.mouseenterTime);
    };
    const onMouseleave = (rule) => () => {
      setTimeout(() => {
        if (rule.id) {
          const a = refRules.find(u => u.id === rule.id);
          a.status = false;
        }
        rule.status = false;

      }, rule.mouseleaveTime || options.mouseleaveTime);
    };

    const init = (rules, trigger = 'hover') => {
      rules.map(rule => {
        rule.status = false;
        trigger = rule.trigger || trigger;
        rule.overlayClassName = rule.overlayClassName || options.overlayClassName;
        rule.position = rule.position || options.position;
        rule.contentTemplate = !!(ctx.slots.contentTemplate);
        if (!('appendToBody' in rule)) {rule.appendToBody = options.appendToBody;}
        const doms = defaultSlot.value.querySelectorAll(rule.selector);
        [...doms].map((dom, index) => {
          if (rule.appendToBody === false) {dom.style.position = 'relative';}
          let newRule = reactive({
            id: null
          });
          const id = rule.selector.slice(rule.selector[0] === '.' ? 1 : 0) + index;
          if (index > 0) {
            newRule = { ...rule };
            dom.id = id;
            newRule.id = id;
            rules.push(newRule);
          }

          if (trigger === 'hover') {
            dom.addEventListener('mouseenter', onMouseenter(newRule.id ? newRule : rule,));
            dom.addEventListener('mouseleave', onMouseleave(newRule.id ? newRule : rule));
          }
        });

      });
      return rules;
    };
    function show(dom, rule) {
      rule.status = true;
    }
    // 把传入的props.rules统一转为数组对象格式
    const rules = (rules) => {
      if (rules === null) {return;}
      if (typeof rules === 'object' && !Array.isArray(rules)) {
        rules = [rules];
      }
      rules = [...rules];
      Array.isArray(rules) && rules.map(rule => {
        rule.status = false;
      });
      return rules;
    };
    const refRules = reactive(rules(options.rules));
    const clickFn = () => {
      refRules.forEach(element => {
        element.status = false;
      });
    };
    onMounted(() => {
      init(refRules, options.trigger);
      // 点击其他位置 关闭弹框
      document.addEventListener('click', clickFn, true);

    });

    onUnmounted(() => {
      // 取消事件
      document.removeEventListener('click', clickFn);
    });

    // 添加点击事件 当前元素是click事件目标则弹框展示
    const onClick = (e: Event) => {
      for (const rule of refRules) {
        const doms = defaultSlot.value.querySelectorAll(rule.selector);
        for (const dom of doms) {
          if (doms.length > 1) {
            if (dom === e.target && rule.id) {
              show(dom, rule);
              return;

            } else if (dom === e.target && !rule.id && !dom.id) {
              show(dom, rule);
              return;
            }

          } else

          if (dom === e.target) {
            show(dom, rule);
            return;
          } else {
            rule.status = false;
          }
        }

      }

    };
    return () => {
      return (
        <div class="devui-read-tip" >
          <div ref={defaultSlot}
            onClick={onClick}
          >
            {
              ctx.slots?.default()
            }
          </div>

          {(refRules).map(rule => (
            <div
              data-test="todo"
            >
              {rule.status && (<TipsTemplate defaultTemplateProps={{ ...rule }} >
                {
                  rule.contentTemplate && ctx.slots?.contentTemplate()
                }
              </TipsTemplate>)

              }
            </div>
          )
          )}
        </div>
      );
    };
  }
});
