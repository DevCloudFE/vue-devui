import { ref } from 'vue'
import Icon from '../../../icon'
import './index.css'

type TProps = {
    width?: number
    value?: string
    onActive?: (el: Element) => void
}

const DatepickerInput = (props: TProps) => {
    const { width = 160, value = '', onActive } = props
    const container = ref<Element>()
    const handleClick = () => {
        if(container.value && typeof onActive === 'function') {
            onActive(container.value)
        }
    }
    return (
        <div
            ref={container}
            className="datapicker-input-border"
            style={{ width: `${width}px` }}
            onClick={handleClick}
        >
            <input className="datapicker-input" type="text" value={value} />
            <Icon name="calendar" size="16px" />
        </div>
    )
}

export default DatepickerInput