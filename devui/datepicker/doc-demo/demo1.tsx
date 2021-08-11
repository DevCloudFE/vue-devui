import { defineComponent, reactive } from 'vue'
import DatePicker from '..'

export default defineComponent({
    name: 'DDatepickerDemo1',
    setup() {
        const state = reactive<{
            range: boolean
            showTime: boolean
        }>({
            range: false,
            showTime: false,
        })
        return () => {
            return (<div>
                <div style="line-height: 32px;font-size:13px;user-select:none">
                    <label style="margin-right:5px;border:1px solid #aaa;padding:5px 10px;border-radius:5px;cursor:pointer;">
                        <span>区域选择</span>
                        <input style="margin:0px;transform:translateX(3px) translateY(2px);" type="checkbox" onChange={() => state.range = !state.range} checked={state.range} />
                    </label>
                    <label style="margin-right:5px;border:1px solid #aaa;padding:5px 10px;border-radius:5px;cursor:pointer;">
                        <span>显示时间</span>
                        <input style="margin:0px;transform:translateX(3px) translateY(2px);" type="checkbox" onChange={() => state.showTime = !state.showTime} checked={state.showTime} />
                    </label>
                </div>
                <DatePicker range={state.range} showTime={state.showTime} />
            </div>)
        }
    }
})
