import { ref, Ref, SetupContext } from "vue";

export default function useSearchFn(ctx: SetupContext,allowEmptyValueSearch:Ref<Boolean>,source:Ref<Array<any>>,searchFn:Ref<Function>,formatter:Ref<Function>): any {
    // 匹配结果
    const searchList = ref([])
    const handleSearch = (term: string) => {
        if (term == ""&&!allowEmptyValueSearch.value) {
            searchList.value = []
            return
        }
        let arr = []
        term = term.toLowerCase()
        if (!searchFn.value) {
            source.value.forEach((item) => {
                let cur = formatter.value(item)
                cur = cur.toLowerCase()
                if (cur.startsWith(term)) {
                    arr.push(item)
                }
            })
        } else {
            arr = searchFn.value(term)
        }
        searchList.value = arr
    }
    return {
        handleSearch,
        searchList
    }
}