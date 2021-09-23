import { defineComponent, toRefs } from 'vue'
import { tableProps, TableProps } from './table-types'
import './table.scss'

export default defineComponent({
  name: 'DTable',
  props: tableProps,
  emits: [],
  setup(props: TableProps) {
    const { data } = toRefs(props)

    const renderTableHead = () => {
      return Object.entries(data.value[0]).map(col => <th>{ col[0] }</th>)
    }

    const renderTableCell = (row) => {
      return Object.entries(row).map(col => <td>{ col[1] }</td>)
    }

    const renderTableBody = () => {
      return data.value.map(row => (
        <tr>{ renderTableCell(row) }</tr>
      ))
    }
    
    return () => (
      <div class="devui-table">
        <table>
          <thead>
            <tr>
              { renderTableHead() }
            </tr>
          </thead>
          <tbody>
            { renderTableBody() }
          </tbody>
        </table>
      </div>
    )
  },
})
