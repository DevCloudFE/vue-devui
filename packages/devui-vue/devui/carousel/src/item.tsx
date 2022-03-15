import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DCarouselItem',
  render() {
    const {
      $slots
    } = this;
    const children = $slots.default?.();

    return (
      <div class="d-carousel-item ">
        { children }
      </div>
    );
  }
});
