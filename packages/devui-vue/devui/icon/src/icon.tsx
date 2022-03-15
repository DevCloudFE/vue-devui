import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'inherit'
    },
    color: {
      type: String,
      default: 'inherit'
    },
    classPrefix: {
      type: String,
      default: 'icon'
    }
  },
  setup(props) {
    return {
      ...props
    };
  },
  render() {
    const { name, size, color, classPrefix } = this;
    return /^((https?):)?\/\//.test(name) ? (
      <img
        src={name}
        alt={name.split('/')[name.split('/').length - 1]}
        style={{
          width: size,
          verticalAlign: 'text-bottom'
        }}
      />
    ) : (
      <i
        class={`${classPrefix} ${classPrefix}-${name}`}
        style={{
          fontSize: size,
          color
        }}
      ></i>
    );
  }
});
