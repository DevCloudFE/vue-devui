const componentI18n = require('../crowdin/en-US/pages/component.json')

function ensureLang (lang){
    return `/${lang}`
}

/**
 * @description  映射前缀（在每个组件路径前拼接 lang）
 * @param {*} item 
 * @param {*} lang 
 * @param {*} prefix 
 * @returns 
 */
function mapPrefix (item, lang='en-US', prefix = ''){
    if (item.children && item.children.length > 0){
        return {
            ...item,
            children: item.children.map((child)=>{
                return mapPrefix(child, lang, prefix)
            })
        }
    }
    return {
        ...item,
        link: `${ensureLang(lang)}${prefix}${item.link}`
    }
}

function getComponentsSideBar (){
    const componentSideBar = {}
    for (let key in componentI18n) {
        if (componentI18n[key].children && componentI18n[key].children.length > 0){
            componentSideBar[key] = {
                ...componentI18n[key],
                children: componentI18n[key].children.map((item)=>{
                    return mapPrefix(item)
                })
            }
        }else {
            componentSideBar[key] = {
                ...componentI18n[key],
                link: '/en-US'
            }
        }
    }
    return componentSideBar
}

getComponentsSideBar()