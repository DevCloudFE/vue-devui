import { defineComponent, ref, inject, Ref } from 'vue';
import { panelProps } from '../panel-types';
import Store from '../store';

export default defineComponent({
  name: 'DPanelHeader',
  props: panelProps,
  emits: ['toggle'],
  setup(props, ctx) {
    const beforeToggle = inject('beforeToggle');
    const keys = Object.keys(Store.state());
    const key = keys.pop();
    const isCollapsed = ref(Store.state()[key as string]) as Ref<boolean>;
    const changeFlag = ref();
    let header: JSX.Element | null = null;
    const res = ref(isCollapsed.value) as Ref<boolean>;
    let changeResult = true;
    const done = () => {
      res.value = !res.value;
      if (!changeFlag.value) {
        // 禁止折叠不影响展开
        if (res.value) {
          Store.setData(`${key}`, res.value);
          isCollapsed.value = res.value;
          ctx.emit('toggle', res.value);
        }
        return;
      }
      if (res.value !== undefined) {
        Store.setData(`${key}`, res.value);
        isCollapsed.value = res.value;
        ctx.emit('toggle', res.value);
      }
    };
    const canToggle = async (): Promise<boolean> => {
      if (beforeToggle) {
        const tmpRes = (beforeToggle as (value: Ref<boolean>, done?: () => void) => unknown)(isCollapsed, done);
        if (typeof tmpRes !== 'undefined') {
          if (tmpRes instanceof Promise) {
            changeResult = await tmpRes;
          } else {
            changeResult = tmpRes;
          }
        } else {
          changeResult = true;
        }
      }
      return changeResult;
    };
    canToggle().then((val) => (changeFlag.value = val));
    const toggleBody = (): void => {
      canToggle().then((val) => {
        changeFlag.value = val;
        if (!val) {
          // 禁止折叠不影响展开
          if (!isCollapsed.value) {
            Store.setData(`${key}`, !isCollapsed.value);
            isCollapsed.value = !isCollapsed.value;
            ctx.emit('toggle', isCollapsed.value);
          }
          return;
        }
        if (isCollapsed.value !== undefined) {
          Store.setData(`${key}`, !isCollapsed.value);
          isCollapsed.value = !isCollapsed.value;
          ctx.emit('toggle', isCollapsed.value);
        }
      });
    };
    return () => {
      if (ctx.slots.default) {
        header = (
          <div class='devui-panel-heading' onClick={toggleBody} style={{ cursor: changeFlag.value ? 'pointer' : 'auto' }}>
            {ctx.slots.default?.()}
          </div>
        );
      }
      return header;
    };
  },
});
