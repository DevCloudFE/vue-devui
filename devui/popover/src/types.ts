export default {
  visible: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    default: ''
  },

  trigger: {
    type: String,
    default: 'click',
    validator: function (value: string) {
      return ['click', 'hover'].includes(value);
    }
  },
  controlled: {
    type: Boolean,
    default: false
  },

  propType: {
    type: String,
    default: 'default'
  }
}
