import type { PropType, ExtractPropTypes, VNode } from 'vue'
export interface commentPropsITF {
  [prop: string]: any
}

export const commentProps = {
  actions: {
    type:Object as PropType<commentPropsITF>,
    default:null
  },
  author: {
    type:Object as PropType<commentPropsITF>,
    default:null
  },
  avatar: {
    type:Object as PropType<commentPropsITF>,
    default:null
  },
  content: {
    type:Object as PropType<commentPropsITF>,
    default:null
  },
  datetime: {
    type:Object as PropType<commentPropsITF>,
    default:null
  },

} as const

export type CommentProps = ExtractPropTypes<typeof commentProps>
