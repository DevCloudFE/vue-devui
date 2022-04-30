import { computed, ref } from 'vue';
import { CascaderItemPropsType } from '../../src/cascader-types';
import { useListClassName } from '../../hooks/use-cascader-class';
import { updateCheckOptionStatus } from '../../hooks/use-cascader-multiple';
import { singleChoose } from '../../hooks/use-cascader-single';
import './index.scss';
export const DCascaderItem = (props: CascaderItemPropsType) => {
  const { cascaderItem, ulIndex, liIndex, cascaderItemNeedProps, cascaderOptions } = props;
  const { multiple, stopDefault, valueCache, activeIndexs, trigger, confirmInputValueFlg, tagList} = cascaderItemNeedProps;
  const isTriggerHover = trigger === 'hover';
  const rootClasses = useListClassName(props);
  const { updateStatus } = updateCheckOptionStatus(tagList);
  const disbaled = computed(() => cascaderItem?.disabled); // 当前项是否被禁用
  // 触发联动更新
  const updateValues = () => {
    if (stopDefault.value) {return;}
    // 删除当前联动级之后的所有级
    activeIndexs.splice(ulIndex, activeIndexs.length - ulIndex);
    // 更新当前渲染视图的下标数组
    activeIndexs[ulIndex] = liIndex;
    if (!multiple) { // 单选点击选项就更新，多选是通过点击checkbox触发数据更新
      singleChoose(ulIndex, valueCache, cascaderItem);
    }
  };
  // 鼠标hover（多选模式下只能点击操作触发）
  const mouseEnter = () => {
    if (disbaled.value || multiple) {return;}
    updateValues();
  };
  const mouseenter = {
    [ isTriggerHover && 'onMouseenter' ]: mouseEnter
  };
  // 鼠标click
  const mouseClick = () => {
    if (disbaled.value) {return;}
    updateValues();
    if (!multiple && (!cascaderItem.children || cascaderItem?.children?.length === 0)) {
      confirmInputValueFlg.value = !confirmInputValueFlg.value;
    }
  };
  const checkboxChange = () => {
    updateStatus(cascaderItem, cascaderOptions, ulIndex);
  };
  return (
    <li class={rootClasses.value}>
      { multiple &&
        <div class="cascader-li__checkbox">
          <d-checkbox checked={cascaderItem?.checked} disabled={cascaderItem.disabled} halfchecked={cascaderItem?.halfChecked} onChange={checkboxChange}/>
        </div>
      }
      <div class="cascader-li__wraper" {...mouseenter} onClick={mouseClick}>
        { cascaderItem.icon &&
          <div class={'cascader-li__icon' + (cascaderItem.disabled ? ' disabled' : '')}>
            <d-icon name={ cascaderItem.icon } size="inherit"></d-icon>
          </div>
        }
        <div class="dropdown-item-label">
          <span>{ cascaderItem.label }</span>
        </div>
        {
          cascaderItem?.children?.length > 0 && <d-icon name="chevron-right" size="16px" color="inherit"></d-icon>
        }
      </div>
    </li>
  );
};
