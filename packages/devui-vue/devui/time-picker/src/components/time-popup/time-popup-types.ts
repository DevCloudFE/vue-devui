import { ExtractPropTypes } from 'vue';

export const timePopupProps = {
  showPopup: {
    type: Boolean,
    default: false,
  },
  popupTop: {
    type: Number,
    default: -100,
  },
  popupLeft: {
    type: Number,
    default: -100,
  },
  popupWidth: {
    type: Number,
    default: 300,
  },
  popupFormat: {
    type: String,
    default: 'hh:mm:ss',
  },
  minTime: {
    type: String,
    default: '00:00:00',
  },
  maxTime: {
    type: String,
    default: '23:59:59',
  },
  bindData: {
    type: String,
    default: '00:00:00',
  },
};

export type TimePopupProps = ExtractPropTypes<typeof timePopupProps>;
