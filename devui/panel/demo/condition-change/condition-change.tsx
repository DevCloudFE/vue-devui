import { defineComponent, ref } from 'vue';
import Panel from '../../panel';
import Button from '../../../button/button';

export default defineComponent({
    name: 'd-panel-condition-change',
    setup() {

        const isCollspaed = true;
        const panelToggle = ref(true);
        
        const beforeToggle = (isOpened: boolean) => {
            return isOpened ? panelToggle.value : true;
        }
        
        return () => {
            return (
                <div>
                    <Panel type="primary" isCollapsed={isCollspaed} beforeToggle={beforeToggle}>
                        {{
                            header: () => 'Panel with foldable',
                            body: () => 'This is body'
                        }}
                    </Panel>
                    <br/> <br/>
                    <Button btnClick={() => panelToggle.value = !panelToggle.value} bsStyle="primary" width={100}>
                        {panelToggle.value ? 'No collapsing' : 'Allow collapsing'}
                    </Button>
                </div>
            )
        }
    }
})