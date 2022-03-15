import { BackTopProps, Position } from '../back-top-types';

export default function (props: BackTopProps): Position {
  const { bottom, right } = props;

  return {
    bottom,
    right
  };
}
