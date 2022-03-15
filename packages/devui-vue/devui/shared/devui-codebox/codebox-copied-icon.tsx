import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
          <defs>
            <polygon
              id="path-1"
              points="6.53553391 9.77817459 12.1923882 4.12132034 13.6066017 5.53553391 6.53553391 12.6066017 3 9.07106781 4.41421356 7.65685425 6.53553391 9.77817459"
            />
          </defs>
          <g id="status/whiteBG/correct" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1" />
            </mask>
            <use id="Mask" fill="#3DCCA6" xlinkHref="#path-1" />
          </g>
        </svg>
      );
    };
  }
});
