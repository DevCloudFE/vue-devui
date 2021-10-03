import type { ExtractPropTypes, PropType } from 'vue'
type positionType = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'
export type positionConf = {
  left: number
  top: number
  type: string
} 
export type Step = {
  title: string
  content: string
  trigger: string
  target?: string
  position?: positionType | positionConf
}
export const stepsGuideProps = {
  steps: Array as PropType<Step[]>
} as const

export type StepsGuideProps = ExtractPropTypes<typeof stepsGuideProps>
