import { ref, Ref } from 'vue';
import { TreeItem, TreeData } from '../tree-types';

type TypeID = TreeItem['id'];
interface TypeOperator {
  addable: boolean;
  editable: boolean;
  deletable: boolean;
  handleAdd: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}
interface TypeOperateIconReflect {
  id: TypeID;
  renderIcon: (data: TreeItem) => JSX.Element;
}
interface TypeeditStatusReflect {
  [id: TypeID]: boolean;
}
interface TypeReturnUseOperate {
  editStatusReflect: Ref<TypeeditStatusReflect>;
  operateIconReflect: Ref<Array<TypeOperateIconReflect>>;
  handleReflectIdToIcon: TypeHandleReflectIdToIcon;
}
type TypeUseOperate = (treeData: Ref<TreeData>) => TypeReturnUseOperate;
type TypeHandleReflectIdToIcon = (id: TypeID, operate: TypeOperator) => void;

const reflectIconWithHandle = (data: TreeItem, operator: TypeOperator): JSX.Element => {
  const handleAdd = (payload: MouseEvent) => operator.handleAdd();
  const handleEdit = (payload: MouseEvent) => operator.handleEdit();
  const handleDelete = (payload: MouseEvent) => operator.handleDelete();
  return (
    <>
      { operator.addable && <span class="op-icons icon icon-add" onClick={handleAdd}></span> }
      { operator.editable && <span class="op-icons icon icon-edit" onClick={handleEdit}></span> }
      { operator.deletable && <span class="op-icons icon icon-close" onClick={handleDelete}></span> }
    </>
  );
};

const useOperate: TypeUseOperate = (treeData) => {
  const operateIconReflect = ref<Array<TypeOperateIconReflect>>([]);
  const editStatusReflect = ref<TypeeditStatusReflect>({});

  const handleReflectIdToIcon: TypeHandleReflectIdToIcon = (id, operator) => {
    const isNotExistedReflectItem = operateIconReflect.value.every(({ id: d }) => d != id);
    if (isNotExistedReflectItem) {
      editStatusReflect.value[id] = false;
      operateIconReflect.value.push({ id, renderIcon: data => reflectIconWithHandle(data, operator) });
    }
  };

  return {
    operateIconReflect,
    editStatusReflect,
    handleReflectIdToIcon,
  };
};

export default useOperate;
