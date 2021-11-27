import type { PropType, ExtractPropTypes } from 'vue'

export const commentProps = {
  actions: {

  }, 
  author: {

  },
  avatar: {},

  content: {

  } ,
  prefixCls: {

  },
  datetime: {
    
  }

} as const

export type CommentProps = ExtractPropTypes<typeof commentProps>
