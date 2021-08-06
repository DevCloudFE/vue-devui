import { defineComponent, ref, reactive, onUpdated, onBeforeUpdate, SetupContext, EmitsOptions } from 'vue'

import './index.css'

type TProps = {
	show: boolean
	background?: string
	border?: string
	padding?: string
	hostArea?: any
	xPosition?: 'left' | 'right'
	yPosition?: 'top' | 'bottom'
}

export default defineComponent({
	name: 'DDatepickerPopPanel',
	props: {
		show: { type: Boolean },
		xPosition: { type: String },
		yPosition: { type: String },
		xOffset: { type: Number },
		yOffset: { type: Number },
		children: { type: Object }
	},
	setup(props) {

		console.log(props)

		const container = ref<Element>()

		return () => {
			if (!props.show) {
				return null
			}
			const {
				xPosition = 'left', yPosition = 'top',
				xOffset = 0, yOffset = 0,
				children = null,
			} = props

			return (
				<div
					ref={container}
					class="datapicker-pop-panel"
					style={{
						left: xPosition === 'left' ? `${xOffset}px` : 'auto',
						right: xPosition === 'right' ? `${xOffset}px` : 'auto',
						top: yPosition === 'top' ? `${yOffset}px` : 'auto',
						bottom: yPosition === 'bottom' ? `${yOffset}px` : 'auto',
					}}
				>{children}</div>)
		}
	}
})