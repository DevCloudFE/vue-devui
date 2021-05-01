import { defineComponent } from 'vue';
import Panel from '../../panel';

export default defineComponent({
    name: 'd-panel-basic',
    setup() {
        return () => {
            return (
                <div>
                    <Panel type="primary" isCollapsed={true}>
                        {{
                            header: () => 'Panel with foldable',
                            body: () => 'This is body'
                        }}
                    </Panel>
                    <br/> <br/>
                    <Panel>
                        {{
                            header: () => 'Panel with header and footer',
                            body: () => 'This is body',
                            footer: () => 'This is footer'
                        }}
                    </Panel>
                </div>
            )
        }
    }
})