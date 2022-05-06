import type { AlertType } from '../alert-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

const ns = useNamespace('alert');
const AlertTypeIcon = (props: { type: AlertType }): JSX.Element => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class={[ns.e('icon'), props.type === 'danger' ? ns.em('icon', 'error') : ns.em('icon', props.type)]}>
    {(() => {
      switch (props.type) {
      case 'success':
        return (
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path fill-rule="nonzero" d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z"></path>
            <polygon
              stroke-width="0.3"
              fill-rule="nonzero"
              points="6.82767602 11.5282799 3 7.24668779 3.89864233 6.37912367 6.82767602 9.04910002 12.2964408 4 13 4.64144383"></polygon>
          </g>
        );
      case 'warning':
        return (
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              class="warning-outer"
              d="M8.96244623,0.57254229 L15.8714442,13.4101975 C16.1549662,13.9370117 \
              15.9538562,14.5918482 15.4222523,14.8728158 C15.2642579,14.9563203 15.0879506,15 \
              14.9088903,15 L1.09089441,15 C0.488410063,15 0,14.5159904 0,13.9189343 C0,13.7414873 \
              0.0440768395,13.5667684 0.128340519,13.4101975 L7.03733844,0.57254229 \
              C7.32086049,0.0457280838 7.98165058,-0.153569987 8.51325441,0.127397589 \
              C8.70423071,0.228333932 8.8605922,0.383286648 8.96244623,0.57254229 Z"></path>
            <path
              class="warning-inner"
              stroke-width="0.3"
              fill-rule="nonzero"
              d="M8.87894737,13 L7.08947368,13 L7.08947368,11.2105263 L8.87894737,11.2105263 \
              L8.87894737,13 Z M8.62102372,9.86842105 L7.32800539,9.86842105 L7,4.5 \
              L8.96842105,4.5 L8.62102372,9.86842105 Z"></path>
          </g>
        );
      case 'info':
        return (
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g fill-rule="nonzero">
              <path class="info-outer" d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z"></path>
              <path
                class="info-inner"
                d="M9.19008504,7 L8.79402696,13 L7.15622605,13 L6.73158434,7 L9.19008504,7 Z M9,3 L9,5 L7,5 L7,3 L9,3 Z"
                stroke-width="0.2"></path>
            </g>
          </g>
        );
      case 'danger':
        return (
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g fill-rule="nonzero">
              <path class="error-outer" d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z"></path>
              <path
                class="error-inner"
                d="M9,10.6 L9,12.6 L7,12.6 L7,10.6 L9,10.6 Z M9.1,3.1 L8.65924344,9.1 L7.28422786,9.1 L6.9,3.1 L9.1,3.1 Z"
                stroke-width="0.2"></path>
            </g>
          </g>
        );
      default:
        return null;
      }
    })()}
  </svg>
);

export default AlertTypeIcon;
