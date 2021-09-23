import type { ExtractPropTypes } from 'vue'

export const stepsGuideProps = {
  title: String,
  content: String
} as const

export type StepsGuideProps = ExtractPropTypes<typeof stepsGuideProps>
