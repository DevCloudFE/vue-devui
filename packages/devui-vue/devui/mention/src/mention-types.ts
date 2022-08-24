import { ExtractPropTypes, PropType } from 'vue';

export interface IMentionSuggestionItem {
  value: string;
  id: string | number;
}


export const mentionProps = {
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'bottom'
  },
  suggestions: {
    type: Array as PropType<IMentionSuggestionItem[]>,
    required: true
  },
  notFoundContent: {
    type: String,
    default: 'No suggestion matched'
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  dmValueParse: {
    type: Object as PropType<IMentionSuggestionItem>,
    default: { value: 'value', id: 'id' }
  },
  trigger: {
    type: Array as PropType<string[]>,
    default: ['@']
  }
};


export type MentionProps = ExtractPropTypes<typeof mentionProps>;
