import { defineComponent, ref, renderSlot, SetupContext } from 'vue'

import './index.css'

type TProps = {
	show?: boolean
	background?: string
	xPosition?: 'left' | 'right'
	yPosition?: 'top' | 'bottom'
	xOffset?: number
	yOffset?: number
	children?: any
}

const PopPanel = (props: TProps, ctx: SetupContext) => {
	const container = ref<Element>()
	if (!props.show) {
		return null
	}
	const {
		xPosition = 'left', yPosition = 'top',
		xOffset = 0, yOffset = 0,
	} = props

	const left = xPosition === 'left' ? `${xOffset}px` : 'auto'
	const right = xPosition === 'right' ? `${xOffset}px` : 'auto'
	const top = yPosition === 'top' ? `${yOffset}px` : 'auto'
	const bottom = yPosition === 'bottom' ? `${yOffset}px` : 'auto'

	const children: any = renderSlot(ctx.slots, 'default')

	return (
		<div
			ref={container}
			className="datapicker-pop-panel"
			style={{ left, right, top, bottom }}
		>{children}</div>
	)
}

export default PopPanel
