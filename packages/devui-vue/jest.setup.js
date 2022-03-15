import { config } from '@vue/test-utils';
import Icon from './devui/icon/src/icon';
import Button from './devui/button/src/button';
import Progress from './devui/progress/src/progress';
import fileDropDirective from './devui/upload/src/file-drop-directive';
config.global.components = {
  'd-icon': Icon,
  'd-button': Button,
  'd-progress': Progress,
};

config.global.directives = {
  FileDrop: fileDropDirective,
};
