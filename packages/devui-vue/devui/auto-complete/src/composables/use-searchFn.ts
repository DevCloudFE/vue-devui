import { ref, Ref, SetupContext } from "vue";

export default function useSearchFn(ctx: SetupContext,source:Array<any>,searchFn:Function,formatter:Function): any {
    // 匹配结果
    const searchList = ref([])
    const handleSearch = (term: string) => {
        console.log("term: ", term);
        if (term == "") {
            console.log("term: kong");
            searchList.value = []
            return
        }
        let arr = []
        term = term.toLowerCase()
        if (!searchFn) {
            source.forEach((item) => {
                let cur = formatter(item)
                cur = cur.toLowerCase()
                if (cur.startsWith(term)) {
                    arr.push(item)
                }
            })
        } else {
            arr = searchFn(term)
        }
        searchList.value = arr
    }
    return {
        handleSearch,
        searchList
    }
}