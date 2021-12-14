import { ref, Ref, SetupContext } from "vue";

export default function useSearchFn(ctx: SetupContext,allowEmptyValueSearch:Ref<Boolean>,source:Ref<Array<any>>,searchFn:Ref<Function>,formatter:Ref<Function>): any {
    const searchList = ref([])
    const showNoResultItemTemplate = ref(false)
    const handleSearch =async (term: string) => {
        if (term == ""&&!allowEmptyValueSearch.value) {
            searchList.value = []
            showNoResultItemTemplate.value=false
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
            arr = await searchFn.value(term)
        }
        searchList.value = arr
        if(searchList.value.length==0){
            showNoResultItemTemplate.value=true
        }else{
            showNoResultItemTemplate.value=false
        }
    }
    
    return {
        handleSearch,
        searchList,
        showNoResultItemTemplate
    }
}