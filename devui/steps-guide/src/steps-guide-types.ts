import type { ExtractPropTypes, PropType } from 'vue'
type Step = {
  title: string
  content: string
  selector: string
}
export const stepsGuideProps = {
  steps: Array as PropType<Step[]>
} as const

export type StepsGuideProps = ExtractPropTypes<typeof stepsGuideProps>
