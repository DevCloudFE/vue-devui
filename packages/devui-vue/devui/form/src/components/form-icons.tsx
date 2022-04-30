export function HelpTipsIcon(): JSX.Element {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g>
          <path
            d="M8.5,8.95852078 L8.5,11 L7.5,11 L7.5,8.5 C7.5,8.22385763 \
            7.72385763,8 8,8 C9.1045695,8 10,7.1045695 10,6 C10,4.8954305 \
            9.1045695,4 8,4 C6.8954305,4 6,4.8954305 6,6 L5,6 C5,4.34314575 \
            6.34314575,3 8,3 C9.65685425,3 11,4.34314575 11,6 C11,7.48649814 \
            9.91885667,8.72048173 8.5,8.95852078 L8.5,8.95852078 Z M8,16 C3.581722,16 \
            0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 \
            12.418278,16 8,16 Z M8,15 C11.8659932,15 15,11.8659932 15,8 C15,4.13400675 11.8659932,1 8,1 \
            C4.13400675,1 1,4.13400675 1,8 C1,11.8659932 4.13400675,15 8,15 Z M7.5,12 L8.5,12 L8.5,13 L7.5,13 L7.5,12 Z"
            fill="#293040"
            fill-rule="nonzero"></path>
        </g>
      </g>
    </svg>
  );
}

export function ErrorIcon(): JSX.Element {
  return (
    <svg width="14px" height="14px" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle cx="8" cy="8" r="8"></circle>
        <polygon
          points="8.07106781 6.65685425 10.8994949 3.82842712 12.3137085 \
        5.24264069 9.48528137 8.07106781 12.3137085 10.8994949 10.8994949 12.3137085 \
        8.07106781 9.48528137 5.24264069 12.3137085 3.82842712 10.8994949 6.65685425 \
        8.07106781 3.82842712 5.24264069 5.24264069 3.82842712"></polygon>
      </g>
    </svg>
  );
}

export function SuccessIcon(): JSX.Element {
  return (
    <svg width="14px" height="14px" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle cx="8" cy="8" r="8"></circle>
        <polygon
          points="6.53553391 9.77817459 12.1923882 4.12132034 13.6066017 5.53553391 \
        6.53553391 12.6066017 3 9.07106781 4.41421356 7.65685425 6.53553391 9.77817459"></polygon>
      </g>
    </svg>
  );
}

export function PendingIcon(): JSX.Element {
  return (
    <svg width="14px" height="14px" viewBox="0 0 16 16">
      <g id="loading" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M8,0 C12.4,0 16,3.6 16,8 C16,12.4 12.4,16 8,16 C3.6,16 0,12.4 0,8 C0,3.6 3.6,0 8,0 \
          Z M8,1 C4.15,1 1,4.15 1,8 C1,11.85 4.15,15 8,15 C11.85,15 15,11.85 15,8 C15,4.15 11.85,1 8,1 Z"
          fill-rule="nonzero"></path>
        <path d="M8,0 C12.4,0 16,3.6 16,8 L15,8 C15,4.15 11.85,1 8,1 L8,0 Z" fill-rule="nonzero"></path>
      </g>
    </svg>
  );
}
