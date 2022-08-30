import { defineComponent, PropType, computed, ExtractPropTypes } from 'vue';
import { handlePages } from '../utils';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { PreLinkIcon, NextLinkIcon } from '../components/page-link-icons';

const pageNumBtnProps = {
  size: {
    type: String as PropType<'lg' | '' | 'sm'>,
    default: '',
  },
  preLink: String,
  nextLink: String,
  lite: Boolean,
  cursor: Number,
  maxItems: Number,
  totalPages: Number,
  onChangeCursorEmit: Function as PropType<(v: number) => void>,
  showTruePageIndex: Boolean,
} as const;

type PageNumBtnProps = ExtractPropTypes<typeof pageNumBtnProps>;

export default defineComponent({
  props: pageNumBtnProps,
  emits: ['changeCursorEmit'],
  setup(props: PageNumBtnProps, { emit }) {
    // 页码较多时，计算中间的显示页码的起始页码数
    const showPageNum = computed(() => handlePages(props.cursor, props.maxItems, props.totalPages));

    // 点击页码
    const changeCursor = (pageSize: number) => {
      if (isNaN(pageSize)) {
        return;
      }
      const page = pageSize < 1 ? 1 : pageSize > props.totalPages ? props.totalPages : pageSize | 0;

      emit('changeCursorEmit', page);
    };
    // 上一页
    const prevChange = (page: number) => {
      if (props.cursor > 1) {
        const toPage = page === -1 ? props.cursor - 1 : page;

        emit('changeCursorEmit', toPage);
      }
    };
    // 下一页
    const nextChange = (page: number) => {
      if (props.cursor < props.totalPages) {
        const toPage = page === -1 ? props.cursor + 1 : page;

        emit('changeCursorEmit', toPage);
      }
    };

    return {
      showPageNum,
      changeCursor,
      prevChange,
      nextChange,
    };
  },
  render() {
    const { size, preLink, nextLink, lite, changeCursor, cursor, showPageNum, prevChange, totalPages, nextChange, showTruePageIndex } =
      this;
    const ns = useNamespace('pagination');

    return (
      <ul class={[ns.e('list'), size ? ns.m(size) : '']}>
        {/* 左侧上一页按钮 */}
        <li onClick={prevChange.bind(null, -1)} class={{ [ns.e('item')]: true, disabled: cursor <= 1 }}>
          {preLink && <a v-html={preLink} class={ns.e('link')}></a>}
          {!preLink && (
            <a class={ns.e('link')}>
              <PreLinkIcon />
            </a>
          )}
        </li>
        {!lite && (
          <>
            {/* 页码展示 */}
            {/* 单独展示第一页 */}
            <li onClick={changeCursor.bind(null, 1)} class={{ [ns.e('item')]: true, active: cursor === 1 }}>
              <a class={ns.e('link')}>1</a>
            </li>
            {
              // 是否展示第一个 ...
              showPageNum[0] > 2 && (
                <li onClick={prevChange.bind(null, showPageNum[0] - 1)} class={ns.e('item')}>
                  <a class={ns.e('link')}>...</a>
                </li>
              )
            }
            {
              // 中间显示页码
              (() => {
                const list = [];
                for (let i = showPageNum[0]; i <= showPageNum[1]; i++) {
                  list.push(
                    <li onClick={changeCursor.bind(null, i)} key={i} class={{ [ns.e('item')]: true, active: cursor === i }}>
                      <a class={ns.e('link')}>{i}</a>
                    </li>
                  );
                }
                return list;
              })()
            }
            {
              // 是否展示第二个 ...
              showPageNum[1] < totalPages - 1 && (
                <li onClick={nextChange.bind(null, showPageNum[1] + 1)} class={ns.e('item')}>
                  <a class={ns.e('link')}>...</a>
                </li>
              )
            }
            {
              // 是否单独展示最后一页
              showPageNum[1] < totalPages && (
                <li onClick={changeCursor.bind(null, totalPages)} class={{ [ns.e('item')]: true, active: cursor === totalPages }}>
                  <a class={ns.e('link')}>{totalPages}</a>
                </li>
              )
            }
            {
              // 在默认页码超出总页码的时候
              showTruePageIndex && cursor > totalPages && totalPages > 0 && (
                <>
                  {cursor > totalPages + 1 && (
                    <li class={[ns.e('item'), 'disabled']}>
                      <a class={ns.e('link')}>...</a>
                    </li>
                  )}
                  <li class={[ns.e('item'), 'disabled', 'active']}>
                    <a class={ns.e('link')}>{cursor}</a>
                  </li>
                </>
              )
            }
          </>
        )}
        {/* 右侧下一页按钮 */}
        <li onClick={nextChange.bind(null, -1)} class={{ [ns.e('item')]: true, disabled: cursor >= totalPages }}>
          {nextLink && <a v-html={nextLink} class={ns.e('link')}></a>}
          {!nextLink && (
            <a class={ns.e('link')}>
              <NextLinkIcon />
            </a>
          )}
        </li>
      </ul>
    );
  },
});
