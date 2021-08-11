import { defineComponent, reactive } from 'vue'
import DatePicker from '../datepicker'
import './demo1.scss'

export default defineComponent({
    name: 'DDatepickerDemo1',
    setup() {
        const state = reactive<{
            range: boolean
            showTime: boolean
        }>({
            range: false,
            showTime: true,
        })
        return () => {
            return (<div>
                <div className="devui-datepicker-demo1">
                    <label>
                        <span>区域选择</span>
                        <input type="checkbox" onChange={() => state.range = !state.range} checked={state.range} />
                    </label>
                    <label>
                        <span>显示时间</span>
                        <input type="checkbox" onChange={() => state.showTime = !state.showTime} checked={state.showTime} />
                    </label>
                </div>
                <DatePicker range={state.range} showTime={state.showTime} />
            </div>)
        }
    }
})
