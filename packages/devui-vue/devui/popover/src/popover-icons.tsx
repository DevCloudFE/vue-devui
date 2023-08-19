import { useNamespace } from '@devui/shared/utils';

const ns = useNamespace('popover');

export function SuccessIcon(): JSX.Element {
  return (
    <svg class={[ns.e('icon'), ns.em('icon', 'success')]} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle cx="8" cy="8" r="7"></circle>
        <path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z" fill-rule="nonzero"></path>
        <polygon
          stroke-width="0.4"
          fill-rule="nonzero"
          points="8.16 10.48 7.32 11.32 6.48 10.48 6.48 10.48 3.6 7.68 4.44 6.84 7.28 9.68 11.52 5.44 12.36 6.28"></polygon>
      </g>
    </svg>
  );
}

export function WarningIcon(): JSX.Element {
  return (
    <svg class={[ns.e('icon'), ns.em('icon', 'warning')]} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <polygon points="7.5 1.74501946 1.39184847 13.5954649 7.08947368 14.2207621 13.9973698 13.5954649 10.9383683 5.61273879 8.40084114 1.27624313"></polygon>
        <path
          d={`M8.51325441,0.127397589 C8.70423071,0.228333932
          8.8605922,0.383286648 8.96244623,0.57254229 L15.8714442,13.4101975
          C16.1549662,13.9370117 15.9538562,14.5918482 15.4222523,14.8728158
          C15.2642579,14.9563203 15.0879506,15 14.9088903,15 L1.09089441,15
          C0.488410063,15 0,14.5159904 0,13.9189343 C0,13.7414873 0.0440768395,13.5667684
          0.128340519,13.4101975 L7.03733844,0.57254229 C7.32086049,0.0457280838 7.98165058,-0.153569987
          8.51325441,0.127397589 Z M8.87894737,11.2105263 L7.08947368,11.2105263 L7.08947368,13
          L8.87894737,13 L8.87894737,11.2105263 Z M8.96842105,4.5 L7,4.5 L7.08947368,9.86842105
          L8.87894737,9.86842105 L8.96842105,4.5 Z`}></path>
      </g>
    </svg>
  );
}

export function InfoIcon(): JSX.Element {
  return (
    <svg class={[ns.e('icon'), ns.em('icon', 'info')]} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle cx="8" cy="8" r="7"></circle>
        <g stroke-width="1">
          <path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M9,5 L7,5 L7,3 L9,3 L9,5 Z M9,12.6 L7,12.6 L7,6.6 L9,6.6 L9,12.6 Z"></path>
        </g>
      </g>
    </svg>
  );
}

export function ErrorIcon(): JSX.Element {
  return (
    <svg
      class={[ns.e('icon'), ns.em('icon', 'error')]}
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle cx="8" cy="8" r="7"></circle>
        <path
          d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M9,12.6 L7,12.6 L7,10.6 L9,10.6 L9,12.6 Z M9,9.1 L7,9.1 L6.9,3.1 L9.1,3.1 L9,9.1 Z"
          fill-rule="nonzero"></path>
      </g>
    </svg>
  );
}
