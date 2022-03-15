import { computed } from 'vue';
import { TagProps } from '../tag-types';

export default function (props: TagProps) {
  return computed(() => {
    const { color, type } = props;
    const typeMap = {
      primary: '#5e7ce0',
      success: '#50d4ab',
      warning: '#fac20a',
      danger: '#f66f6a'
    };
    const colorMap = {
      'blue-w98': '#3383ff',
      'aqua-w98': '#39afcc',
      'olivine-w98': '#2fa898',
      'green-w98': '#4eb15e',
      'yellow-w98': '#b08d1a',
      'orange-w98': '#d47f35',
      'red-w98': '#f66f6a',
      'pink-w98': '#f3689a',
      'purple-w98': '#a97af8'
    };

    if (!color && type) {return typeMap[type];}
    // 判断传入的color是colorMap成员or颜色码
    const themeColor = colorMap[color] || color;
    return themeColor;
  });
}
