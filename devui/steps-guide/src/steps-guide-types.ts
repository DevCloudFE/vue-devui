import type { ExtractPropTypes } from 'vue'

// PropType
// export interface StepItem {
//   title: string // 引导标题
//   content: string // 引导介绍内容
// }
export const stepsGuideProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  title: String,
  content: String
} as const

export type StepsGuideProps = ExtractPropTypes<typeof stepsGuideProps>
