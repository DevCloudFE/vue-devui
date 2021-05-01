import { defineComponent } from 'vue';
import Panel from '../../panel';

export default defineComponent({
    name: 'd-panel-type',
    setup() {
        const isCollapsed = true;
        return () => {
            return (
                <div>
                    <Panel isCollapsed={ isCollapsed }>
                        {{
                            header: () => 'Panel with default Type',
                            body: () => 'This is body'
                        }}
                    </Panel>
                    <br/> <br/>
                    <Panel isCollapsed={ isCollapsed } type="primary">
                        {{
                            header: () => 'Panel with Primary Type',
                            body: () => 'This is body'
                        }}
                    </Panel>
                    <br/> <br/>
                    <Panel isCollapsed={ isCollapsed } type="success">
                        {{
                            header: () => 'Panel with Success Type',
                            body: () => 'This is body'
                        }}
                    </Panel>
                    <br/> <br/>
                    <Panel isCollapsed={ isCollapsed } type="info">
                        {{
                            header: () => 'Panel with Info Type',
                            body: () => 'This is body'
                        }}
                    </Panel>
                    <br/> <br/>
                    <Panel isCollapsed={ isCollapsed } type="warning">
                        {{
                            header: () => 'Panel with Warning Type',
                            body: () => 'This is body'
                        }}
                    </Panel>
                    <br/> <br/>
                    <Panel isCollapsed={ isCollapsed } type="danger">
                        {{
                            header: () => 'Panel with Danger Type',
                            body: () => 'This is body'
                        }}
                    </Panel>
                </div>
            )
        }
    }
})