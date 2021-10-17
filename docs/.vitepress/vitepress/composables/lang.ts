import { computed} from 'vue'
import { useRoute } from 'vitepress'
import { defaultLang } from '../constant'

export const useLang = () => {
    const route = useRoute()
    console.log('当前路由的状态:', route)
    return computed(()=>{
        const path = route.data?.relativePath
        let lang:string
        if (path?.includes('/')){
            lang = path.split('/').shift()
        }else{
            lang = defaultLang
        }
        return lang
    })
}