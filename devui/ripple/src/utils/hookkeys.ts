import { App } from 'vue'
import { isVue3 } from './isVue3'

const getHooks = (app: App) => {
  return isVue3(app)
    ? {
        mounted: 'mounted',
        updated: 'updated'
      }
    : {
        mounted: 'inserted',
        updated: 'componentUpdated'
      }
}

export { getHooks }
