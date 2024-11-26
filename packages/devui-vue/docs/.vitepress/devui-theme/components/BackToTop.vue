<template>
  <transition name="fade">
    <div v-if="show" class="go-to-top" @click="scrollToTop">
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path
            d="M8.71335931,15.2865297 C8.61179683,16.2090609 7.32293758,16.1267953 7.27304695,15.2865297 C7.27175008,14.6475142 7.27175008,5.26479636 7.27175008,5.26479636 L2.83675052,9.54548344 C2.14185995,10.1440615 1.3143288,9.18731159 1.83135998,8.55773353 C3.79557855,6.65310872 7.3202657,3.24515592 7.40179694,3.16632781 C7.72696878,2.81306222 8.23887498,2.79476534 8.58495308,3.16632781 C9.23193739,3.7919215 14.0334057,8.42146792 14.1791557,8.58804603 C14.66614,9.19338972 13.8787807,10.0892021 13.2066089,9.58451469 C13.0329683,9.43717095 8.71468744,5.26462448 8.71468744,5.26462448 L8.71335931,15.2865297 Z M1.81868811,-8.54871729e-14 L14.1075619,-8.54871729e-14 L14.1075619,1.39509361 L1.81868811,1.39509361 L1.81868811,-8.54871729e-14 Z"
            fill="#FFFFFF"
            fill-rule="nonzero"
          ></path>
        </g>
      </svg>
    </div>
  </transition>
</template>

<script lang="ts">
import { debounce } from 'lodash-es';
import { defineComponent, onMounted, computed, ref } from 'vue';
export default defineComponent({
  name: 'BackToTop',
  props: {
    threshold: {
      type: Number,
      default: 300,
    },
  },
  setup(props) {
    const scrollTop = ref<number | null>(null);
    const show = computed(() => {
      return scrollTop.value! > props.threshold;
    });
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      scrollTop.value = 0;
    };
    const getScrollTop = () => {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };
    onMounted(() => {
      scrollTop.value = getScrollTop();
      window.addEventListener(
        'scroll',
        debounce(() => {
          scrollTop.value = getScrollTop();
        }, 100)
      );
    });

    return {
      show,
      scrollToTop,
    };
  },
});
</script>

<style lang="scss" scoped>
.go-to-top {
  cursor: pointer;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 2rem;
  right: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--devui-base-bg);
  box-shadow: 0 6px 16px 0 var(--devui-shadow);
  z-index: 1;

  &:hover {
    color: var(--devui-brand-hover);
  }

  & svg {
    width: 16px;
    height: 16px;

    path {
      fill: var(--devui-text);
    }
  }
}

@media (max-width: 959px) {
  .go-to-top {
    display: none;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
