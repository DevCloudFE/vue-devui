import Theme from './theme'
import dark from './themes/dark'
import light from './themes/light'

Theme.register('dark', dark)
Theme.register('light', light)

export { dark, light }

export default Theme
