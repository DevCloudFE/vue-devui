export function FoldIcon(): JSX.Element {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <polygon points="4.5 5 8 8.76923077 11.5 5 13 6.61538462 8 12 3 6.61538462"></polygon>
      </g>
    </svg>
  );
}

export function CopyIcon(): JSX.Element {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d={`M14,1 C14.5522847,1 15,1.44771525 15,2 L15,10 C15,10.5522847 14.5522847,11 14,11 L11,11 L11,14 
        C11,14.5522847 10.5522847,15 10,15 L2,15 C1.44771525,15 1,14.5522847 1,14 L1,6 C1,5.44771525 1.44771525,5 
        2,5 L5,5 L5,2 C5,1.44771525 5.44771525,1 6,1 L14,1 Z M10,6 L2,6 L2,14 L10,14 L10,6 Z M9,11 L9,12 L3,12 
        L3,11 L9,11 Z M14,2 L6,2 L6,5 L10,5 C10.5522847,5 11,5.44771525 11,6 L11,10 L14,10 L14,2 Z M9,8 L9,9 L3,9 L3,8 L9,8 Z`}
          fill="#babbc0"
          fill-rule="nonzero"></path>
      </g>
    </svg>
  );
}

export function CommentIcon(): JSX.Element {
  return (
    <svg width="12px" height="12px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d={`M14,1 C15.1045695,1 16,1.8954305 16,3 L16,11 C16,12.1045695 15.1045695,13 14,13 L11,13 L8,16 L5,13 L2,13 
          C0.8954305,13 0,12.1045695 0,11 L0,3 C0,1.8954305 0.8954305,1 2,1 L14,1 Z M14,3 L2,3 L2,11 L5,11 C5.47149598,11 
          5.92582641,11.1664898 6.28439337,11.4669131 L6.41421356,11.5857864 L8,13.171 L9.58578644,11.5857864 
          C9.91918444,11.2523884 10.3581707,11.0488544 10.8241472,11.0077406 L11,11 L14,11 L14,3 Z M8,6 C8.55228475,6
          9,6.44771525 9,7 C9,7.55228475 8.55228475,8 8,8 C7.44771525,8 7,7.55228475 7,7 C7,6.44771525 7.44771525,6
          8,6 Z M11,6 C11.5522847,6 12,6.44771525 12,7 C12,7.55228475 11.5522847,8 11,8 C10.4477153,8 10,7.55228475
          10,7 C10,6.44771525 10.4477153,6 11,6 Z M5,6 C5.55228475,6 6,6.44771525 6,7 C6,7.55228475 5.55228475,8
          5,8 C4.44771525,8 4,7.55228475 4,7 C4,6.44771525 4.44771525,6 5,6 Z`}
          fill="#5e7ce0"
          fill-rule="nonzero"></path>
      </g>
    </svg>
  );
}

export function UpExpandIcon(): string {
  return `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1365.000000,-11.000000)">
          <g transform="translate(1365.000000,11.000000)">
            <rect x="0" y="0" width="16" height="16"></rect>
            <g
              transform="translate(8.000000, 8.000000) scale(1, -1) translate(-8.000000, -8.000000) translate(1.000000, 4.000000)"
              fill="#71757F">
              <path
                d='M0.5,0 L13.5,0 C13.7761424,0 14,0.223857625 14,0.5 C14,0.776142375 13.7761424,1 13.5,1 L0.5,1 C0.223857625,1 
              0,0.776142375 0,0.5 C0,0.223857625 0.223857625,0 0.5,0 Z'></path>
              <polygon
                transform="translate(7.000000, 5.5000000) scale(1, -1) translate(-7.000000, -5.5000000)"
                points="7 3 10 8 4 8"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>`;
}

export function DownExpandIcon(): string {
  return `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1344.000000,-11.000000)">
          <g transform="translate(1344.000000,11.000000)">
            <rect x="0" y="0" width="16" height="16"></rect>
            <g transform="translate(1.000000, 5.000000)" fill="#71757F">
              <path
                d="M0.5,0 L13.5,0 C13.7761424,0 14,0.223857625 14,0.5 C14,0.776142375 13.7761424,1 13.5,1 L0.5,1 C0.223857625,1
              0,0.776142375 0,0.5 C0,0.223857625 0.223857625,0 0.5,0 Z"></path>
              <polygon
                transform="translate(7.000000,5.500000) scale(1, -1) translate(-7.000000, -5.500000)"
                points="7 3 10 8 4 8"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>`;
}

export function AllExpandIcon(): string {
  return `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1301.000000,-11.000000)">
          <rect x="1301" y="11" width="16" height="16"></rect>
          <path
            d="M1302.5,18 L1315.5,18 C1315.77614,18 1316,18.2238576 1316,18.5 1316,18.7761424 1315.77614,19 1315.5,19 L1302.5,19
          C1302.22386,19 1302,18.7761424 1302,18.5 C1302,18.2238576 1302.22386,18 1302.5,18 Z" fill="#71757F"></path>
          <polygon fill="#71757F" points="1309 11 1312 16 1306 16"></polygon>
          <polygon
            fill="#71757F"
            transform="translate(1309.000000, 23.500000) scale(1, -1) translate(-1309.000000, -23.500000)"
            points="1309 21 1312 26 1306 26"></polygon>
        </g>
      </g>
    </svg>`;
}
