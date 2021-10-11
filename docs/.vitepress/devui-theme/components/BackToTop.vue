<template>
  <transition name="fade">
    <svg
      v-if="show"
      class="go-to-top"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49.484 28.284"
      @click="scrollToTop"
    >
      <g transform="translate(-229 -126.358)">
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(229 151.107) rotate(-45)"
        />
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(274.949 154.642) rotate(-135)"
        />
      </g>
    </svg>
  </transition>
</template>

<script lang="ts">
import { debounce } from 'lodash-es'
import { defineComponent, onMounted, computed, ref } from 'vue'
export default defineComponent({
  name: 'BackToTop',
  props: {
    threshold: {
      type: Number,
      default: 300,
    },
  },
  setup(props) {
    const scrollTop = ref<number | null>(null)
    const show = computed(() => {
      return scrollTop.value! > props.threshold
    })
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      scrollTop.value = 0
    }
    const getScrollTop = () => {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      )
    }
    onMounted(() => {
      scrollTop.value = getScrollTop()
      window.addEventListener(
        'scroll',
        debounce(() => {
          scrollTop.value = getScrollTop()
        }, 100)
      )
    })

    return {
      show,
      scrollToTop,
    }
  },
})
</script>

<style lang="scss" scoped>
.go-to-top {
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 2.5rem;
  width: 2rem;
  color: var(--devui-brand);
  z-index: 1;
}
.go-to-top:hover {
  color: var(--devui-brand-hover);
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
