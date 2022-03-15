import { coreClassName } from './utils';

export default function genStyleTemplate(name: string) {
  return `\
.${coreClassName(name)} {
  /* your style */
}`;
}
