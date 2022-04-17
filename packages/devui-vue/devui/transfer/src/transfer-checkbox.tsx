import { defineComponent } from 'vue';
import DCheckbox from '../../checkbox/src/checkbox';
import DTooltip from '../../tooltip/src/tooltip';
import transferCheckboxProps, { TransferCheckboxProps } from '../common/use-transfer-checkbox';

export default defineComponent({
  name: 'DTransferCheckbox',
  components: {
    DCheckbox,
    DTooltip
  },
  props: transferCheckboxProps,
  setup(props: TransferCheckboxProps) {
    /** data start **/
    const renderCheckbox = () => {
      return <DCheckbox
        label={props.data.key}
        value={props.data.value}
        disabled={props.data.disabled}
        class="devui-transfer-panel-body-list-item"
        key={props.id}>
      </DCheckbox>;
    };
    /** data end **/

    /** watch start **/
    /** watch end **/

    /** methods start **/
    /** methods end **/

    return () => {
      return (
        !props.showTooltip ? renderCheckbox() :
          <DTooltip class="devui-transfer-panel-body-list-tooltip"
            position={props.tooltipPosition}
            content={props.data.key}>{renderCheckbox()}
          </DTooltip>
      );
    };
  }
});
