import type { CSSProperties } from 'vue';
import { defineComponent, reactive, ref, onMounted, Teleport, toRefs } from 'vue';
import { readTipProps, ReadTipProps, DefaultTemplateProps } from './read-tip-types';
import './read-tip.scss';

export default defineComponent({
  name: 'DReadTipTemplate',
  props: readTipProps,
  emits: [],
  setup(props: ReadTipProps, ctx) {
    const { defaultTemplateProps, } = toRefs(props);
    let rule: DefaultTemplateProps = defaultTemplateProps.value;
    const query = rule?.id ? `#${rule.id}` : rule.selector;

    const styles: CSSProperties = reactive({});
    if (typeof rule.dataFn === 'function') {
      const dataFn = rule.dataFn({ element: document.querySelector(query), rule });
      rule = { ...rule, ...dataFn };
    }

    const temp = ref(null);
    const deviation = (x: number) => {
      let deviationConstant = x > 24 ? 0 : -(x / 2) + 2;
      if (x <= 10) {
        deviationConstant = -10;
      }

      return deviationConstant;
    };
    onMounted(() => {
      const domBounding = document.querySelector(query)?.getBoundingClientRect();
      const { width, height } = domBounding;
      const distance = 10;
      let positionTop = 0;

      // 当前元素如果小于24px 会对渲染模板进行偏移 以免小箭头对不准指向的当前元素
      const heightDeviation = deviation(height);
      const widthDeviation = deviation(width);


      let positionLeft = 0;
      const targetDom = document.querySelector('.read-tip-container')?.getBoundingClientRect();
      if (rule.appendToBody) {
        positionTop = domBounding.y + document.documentElement.scrollTop;
        positionLeft = domBounding.x;
      }
      switch (rule.position) {
      case 'top':
        styles.top = positionTop - targetDom.height - distance + 'px';
        styles.left = positionLeft + widthDeviation + 'px';
        break;
      case 'left':
        styles.top = positionTop + heightDeviation + 'px';
        styles.left = positionLeft - targetDom.width - distance + 'px';
        break;
      case 'bottom':
        styles.top = positionTop + domBounding.height + distance + 'px';
        styles.left = positionLeft + widthDeviation + 'px';
        break;
      case 'right':
        styles.top = positionTop + heightDeviation + 'px';
        styles.left = positionLeft + domBounding.width + distance + 'px';
        break;
      }
    });
    return () => {
      return (
        <Teleport to={rule.appendToBody ? 'body' : query} >
          <div
            ref={temp}
            class={['read-tip-container', rule.position, rule.overlayClassName]}
            style={styles}
          >
            <span class='after' ></span>
            {
              rule.contentTemplate ? ctx.slots?.default?.() :
                (
                  <>
                    <div class="title">
                      {rule.title}
                    </div>
                    <div class="content">
                      {rule.content}
                    </div>
                  </>
                )
            }
          </div>
        </Teleport>
      );
    };
  }
});
