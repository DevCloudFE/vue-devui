import { computed } from 'vue'
import { useRouter, useRoute } from 'vitepress'
import { PREFERRED_LANG_KEY } from '../constant'

import { useLang } from './lang'

export const useTranslation = () => {
    const route = useRoute()
    const router = useRouter()
    const lang = useLang()

    const languageMap = {
        'en-US': 'English',
        'zh-CN': '中文'
    }

    console.log('当前的 lang:', lang.value)

    const switchLang = (targetLang:string) => {
        console.log('触发国际化事件targetLang:', targetLang)
        if (lang.value === targetLang) return 
        console.log('useRoute:', route.path)
        const firstSlash = route.path.indexOf('/', 1)
        let goTo
        if (route.path === '/'){
            goTo = `/${targetLang}/`
        }else {
            goTo = `/${targetLang}/${route.path.slice(firstSlash + 1)}`
        }
        router.go(goTo)
    }

    return {
        languageMap,
        lang,
        switchLang,
      }
}