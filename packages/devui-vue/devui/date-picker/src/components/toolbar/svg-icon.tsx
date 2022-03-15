import { TIconSvgProps } from '../types';

export const Year = (props: TIconSvgProps) => {
  const { color = '#585d6b', rotate = 0 } = props;
  return (
    <svg style={{ transform: `rotate(${rotate}deg)` }} width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g fill={color} transform="translate(-1.000000, -1.000000)">
        <path d="M11,1.83333333 L11,10.1666667 L7,7.38833333 L7,10.1666667 L1,6 L7,1.83333333 L7,4.61033333 L11,1.83333333 Z" />
      </g>
    </svg>
  );
};

export const Month = (props: TIconSvgProps) => {
  const { color = '#585d6b', rotate = 0 } = props;
  return (
    <svg style={{ transform: `rotate(${rotate}deg)` }} width="6px" height="10px" viewBox="0 0 6 10" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g fill={color} transform="translate(-3.000000, -1.000000)">
        <polygon points="6 3 10.1666667 9 1.83333333 9" />
      </g>
    </svg>
  );
};
