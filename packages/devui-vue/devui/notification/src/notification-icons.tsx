import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('notification');

const XLINK = { 'xmlns:xlink': 'http://www.w3.org/1999/xlink' };
const XLINK_HREF = { 'xlink:href': '#path-s' };

export function SuccessIcon(): JSX.Element {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...XLINK}
    >
      <defs>
        <polygon
          id="path-s"
          points="6.53553391 9.77817459 12.1923882 4.12132034 13.6066017 5.53553391
           6.53553391 12.6066017 3 9.07106781 4.41421356 7.65685425 6.53553391 9.77817459"></polygon>
      </defs>
      <g id="correct" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <mask id="mask-2" fill="white">
          <use {...XLINK_HREF}></use>
        </mask>
        <use id="Mask" class={ns.e('image-success-path')} {...XLINK_HREF}></use>
      </g>
    </svg>
  );
}

export function WarningIcon(): JSX.Element {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...XLINK}
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          class={ns.e('warning-outer')}
          d="M8.96244623,0.57254229 L15.8714442,13.4101975 C16.1549662,13.9370117
           15.9538562,14.5918482 15.4222523,14.8728158 C15.2642579,14.9563203 15.0879506,
           15 14.9088903,15 L1.09089441,15 C0.488410063,15 0,14.5159904 0,13.9189343 C0,13.7414873
           0.0440768395,13.5667684 0.128340519,13.4101975 L7.03733844,0.57254229 C7.32086049,
           0.0457280838 7.98165058,-0.153569987 8.51325441,0.127397589 C8.70423071,
           0.228333932 8.8605922,0.383286648 8.96244623,0.57254229 Z"></path>
        <path
          class={ns.e('warning-inner')}
          stroke-width="0.3"
          fill-rule="nonzero"
          d="M8.87894737,13 L7.08947368,13 L7.08947368,11.2105263 L8.87894737,11.2105263 L8.87894737,13 Z M8.62102372,9.86842105
           L7.32800539,9.86842105 L7,4.5 L8.96842105,4.5 L8.62102372,9.86842105 Z"></path>
      </g>
    </svg>
  );
}

export function InfoIcon(): JSX.Element {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...XLINK}
    >
      <g id="info" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path class={ns.e('image-info-path')} d="M7,13 L7,6 L9,6 L9,13 L7,13 Z M7,5 L7,3 L9,3 L9,5 L7,5 Z" id="info"></path>
      </g>
    </svg>
  );
}

export function ErrorIcon(): JSX.Element {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...XLINK}
    >
      <defs>
        <polygon
          id="path-e"
          points="8.07106781 6.65685425 10.8994949 3.82842712 12.3137085 5.24264069 9.48528137 8.07106781 12.3137085
           10.8994949 10.8994949 12.3137085 8.07106781 9.48528137 5.24264069 12.3137085 3.82842712 10.8994949 6.65685425
           8.07106781 3.82842712 5.24264069 5.24264069 3.82842712"></polygon>
      </defs>
      <g id="error" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <mask id="mask-2" fill="white">
          <use {...XLINK_HREF}></use>
        </mask>
        <use id="Mask" class={ns.e('image-error-path')} {...XLINK_HREF}></use>
      </g>
    </svg>
  );
}
