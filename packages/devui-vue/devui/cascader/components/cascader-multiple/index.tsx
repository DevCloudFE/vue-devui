/**
 * 多选模式下的内容框
 */
import DTag from '../cascader-tag/';
import { MultiplePropsType } from '../../src/cascader-types';
import './index.scss';
export default (props: MultiplePropsType): JSX.Element => {
  return (
    <div class="devui-tags-input">
      <div class="devui-tags-box">
        { props.activeOptions.length > 0
          ? props.activeOptions.map(item => {
            return <DTag tag={item} tagList={props.activeOptions}></DTag>;
          })
          : <div class="devui-tags-placeholder">{ props.placeholder }</div>
        }
      </div>
    </div>
  );
};
