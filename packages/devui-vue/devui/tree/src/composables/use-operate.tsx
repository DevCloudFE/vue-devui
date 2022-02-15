import { ref, Ref } from 'vue'
import { TreeItem, TreeData } from '../tree-types'
import { deleteNode, getId } from '../util'

type TypeID = TreeItem['id']
interface TypeOperator {
  addable: boolean
  editable: boolean
  deletable: boolean
  handleAdd: () => void
  handleEdit: () => void
  handleDelete: () => void
}
interface TypeOperateIconReflect {
  id: TypeID
  renderIcon: (data: TreeItem) => JSX.Element
}
interface TypeeditStatusReflect {
  [id: TypeID]: boolean
}
interface TypeReturnUseOperate {
  editStatusReflect: Ref<TypeeditStatusReflect>
  operateIconReflect: Ref<Array<TypeOperateIconReflect>>
  handleReflectIdToIcon: TypeHandleReflectIdToIcon
}
type TypeUseOperate = (treeData: Ref<TreeData>) => TypeReturnUseOperate
type TypeHandleReflectIdToIcon = (item: TreeItem, mergeData: Ref<any>) => void

const reflectIconWithHandle = (data: TreeItem, operator: TypeOperator): JSX.Element => {
  const handleAdd = () => operator.handleAdd()
  const handleEdit = () => operator.handleEdit()
  const handleDelete = () => operator.handleDelete()
  return (
    <>
      { operator.addable && <span className="op-icons icon icon-add" onClick={handleAdd}></span> }
      { operator.editable && <span className="op-icons icon icon-edit" onClick={handleEdit}></span> }
      { operator.deletable && <span className="op-icons icon icon-close" onClick={handleDelete}></span> }
    </>
  )
}

const useOperate: TypeUseOperate = () => {
  const operateIconReflect = ref<Array<TypeOperateIconReflect>>([])
  const editStatusReflect = ref<TypeeditStatusReflect>({})
  
  const handleReflectIdToIcon: TypeHandleReflectIdToIcon = (item, mergeData) => {
    const { id = '', addable, editable, deletable } = item  
    const operator = {
      addable,
      editable,
      deletable,
      handleAdd: () => {
        const newItem: TreeItem = {
          id: getId(item.id),
          label: 'new item',
          level: item.level + 1,
          addable,
          editable,
          deletable
        }
        item.open = true
        if (item.children && Array.isArray(item.children)) {
          item.children.push(newItem)
        } else {
          item.children = [newItem]
        }
      },
      handleEdit: () => {
        editStatusReflect.value[id] = !editStatusReflect.value[id]
      },
      handleDelete: () => {
        mergeData.value = deleteNode(id, mergeData.value)
      },
    }
    const isNotExistedReflectItem = operateIconReflect.value.every(({ id: d }) => d != id)
    if (isNotExistedReflectItem) {
      editStatusReflect.value[id] = false
      operateIconReflect.value.push({ id, renderIcon: data => reflectIconWithHandle(data, operator) })
    }
  }

  return {
    operateIconReflect,
    editStatusReflect,
    handleReflectIdToIcon,
  }
}

export default useOperate
