import type { IconPropsType } from "../avatar-types";

export const IconBody = (props: IconPropsType): JSX.Element => {
  const { width, height } = props;
  return (
    <svg
      style={{
        width: `${width}px`,
        height: `${height}px`,
        verticalAlign: 'middle',
      }}
      viewBox="0 0 30 30"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="未命名"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <circle id="Oval" fill="#CACFD8" cx="15" cy="15" r="15"></circle>
        <path
          d="M14.9997866,16 C12.5145053,16 10.4997866,13.9852814 10.4997866,\
            11.5 C10.4997866,9.01471863 12.5145053,7 14.9997866,7 C17.485068,\
            7 19.4997866,9.01471863 19.4997866,11.5 C19.4997866,13.9852814 17.485068,\
            16 14.9997866,16 Z M23,23 L7,22.998553 C7,19.0122153 10.8892296,\
            16.5 14.9997866,16.5 C19.1103437,16.5 23,20 23,23 Z"
          id="形状结合"
          fill="#FFFFFF"
        ></path>
      </g>
    </svg>
  );
};
