import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return () => {
      return (
        <svg class="devui-code-copy" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M10 4v-4h-7l-3 3v9h6v4h10v-12h-6zM3 1.414v1.586h-1.586l1.586-1.586zM1 11v-7h3v-3h5v3l-3 3v4h-5zM9 5.414v1.586h-1.586l1.586-1.586zM15 15h-8v-7h3v-3h5v10z"
          ></path>
        </svg>
      );
    };
  }
});
