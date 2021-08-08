import { defineComponent, reactive, ref, Ref } from "vue";
import dLoading from "../../src/directive";

export default defineComponent({
  name: 'basicDemo',
  directives: {
    dLoading
  },
  setup() {
    const loadingStatus: Ref<Promise<unknown> | boolean> = ref(false)
    const datas: Array<number> = reactive([])
    const fetchTableData = () => {
      loadingStatus.value = true

      setTimeout(() => {
        datas.push(1,2,3)
        loadingStatus.value = false
      }, 2000)
    }

    return {
      datas,
      loadingStatus,
      fetchTableData
    }
  },
  render() {
    const {
      datas,
      loadingStatus,
      fetchTableData
    } = this

    return (
      <>
        <div>
          <button onClick={fetchTableData}>click me!</button>
        </div>
        <table
          v-dLoading={loadingStatus}
          style="width: 100%; text-align: left;"
        >
          <thead>
            <tr>
              <th>序号</th><th>姓名</th><th>队伍</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
          {
            datas.map((v: any, i: number) => {
              return (
                <tr>
                  <td>{i}</td><td>张家齐</td><td>跳水</td><td>跳水队</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </>
    )
  }
})