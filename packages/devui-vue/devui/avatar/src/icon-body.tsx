import type { IconPropsType } from "./avatar-types";
import { BODY_ICON_PATH } from "./config";

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
        <path d={BODY_ICON_PATH} id="形状结合" fill="#FFFFFF" ></path>
      </g>
    </svg>
  );
};
