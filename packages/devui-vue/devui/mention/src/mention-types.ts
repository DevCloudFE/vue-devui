import { ExtractPropTypes, PropType } from 'vue';

export interface IMentionSuggestionItem {
  value: string;
  id: string | number;
}


export const mentionProps = {
  mentionPosition: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'bottom'
  },
  mentionSuggestions: {
    type: Array as PropType<IMentionSuggestionItem[]>,
    required: true
  },
  mentionNotFoundContent: {
    type: String as PropType<string>,
    default: 'No suggestion matched'
  },
  mentionLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  dmValueParse: {
    type: Object as PropType<IMentionSuggestionItem>,
    default: { value: 'value', id: 'id' }
  },
  mentionTrigger: {
    type: Array as PropType<string[]>,
    default: ['@']
  }
};


export type MentionProps = ExtractPropTypes<typeof mentionProps>;
