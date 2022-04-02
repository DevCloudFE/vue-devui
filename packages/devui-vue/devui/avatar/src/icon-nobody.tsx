import type { IconPropsType } from "./avatar-types";
import { NOBODAY_ICON_SHAPE_PATH, NOBODAY_ICON_MASK_PATH } from "./config";

export const IconNobody = (props: IconPropsType): JSX.Element => {
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
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d={NOBODAY_ICON_SHAPE_PATH} id="形状结合" fill="#959EB2" ></path>
        <path d={NOBODAY_ICON_MASK_PATH} id="蒙版" fill="#CACFD8" fill-rule="nonzero" ></path>
      </g>
    </svg>
  );
};
