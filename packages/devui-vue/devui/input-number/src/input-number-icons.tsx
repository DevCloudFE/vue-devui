import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('input-number');

export function IncIcon(): JSX.Element {
  return (
    <svg class={ns.e('icon-arrow')} width="1em" height="1em" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M12.1464466,6.85355339 L8.35355339,10.6464466 C8.15829124,10.8417088 7.84170876,10.8417088 7.64644661,10.6464466 \
          L3.85355339,6.85355339 C3.65829124,6.65829124 3.65829124,6.34170876 3.85355339,6.14644661 C3.94732158,6.05267842 \
          4.07449854,6 4.20710678,6 L11.7928932,6 C12.0690356,6 12.2928932,6.22385763 12.2928932,6.5 C12.2928932,6.63260824 \
          12.2402148,6.7597852 12.1464466,6.85355339 Z"
          fill-rule="nonzero"></path>
      </g>
    </svg>
  );
}

export function DecIcon(): JSX.Element {
  return (
    <svg class={ns.e('icon-arrow')} width="1em" height="1em" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M12.1464466,6.85355339 L8.35355339,10.6464466 C8.15829124,10.8417088 7.84170876,10.8417088 7.64644661,10.6464466 \
          L3.85355339,6.85355339 C3.65829124,6.65829124 3.65829124,6.34170876 3.85355339,6.14644661 C3.94732158,6.05267842 \
          4.07449854,6 4.20710678,6 L11.7928932,6 C12.0690356,6 12.2928932,6.22385763 12.2928932,6.5 C12.2928932,6.63260824 \
          12.2402148,6.7597852 12.1464466,6.85355339 Z"
          fill-rule="nonzero"></path>
      </g>
    </svg>
  );
}
