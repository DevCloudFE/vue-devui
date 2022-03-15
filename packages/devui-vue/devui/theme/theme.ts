import Theme from './core/theme';
import dark from './themes/dark';
import light from './themes/light';

Theme.register('dark', dark);
Theme.register('light', light);

export { Theme };

export default Theme;
