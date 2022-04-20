import { ref, Ref } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { TreeData, TreeItem } from '../deprecated-tree-types';

interface TypeReflectValue {
  // 外部传入
  id: keyof ({ [key: string]: TypeReflectValue });
  onGetNodeData: () => Promise<TreeData>;  // 懒加载获取数据函数, 当前是节点 children
  renderLoading?: (id: string) => ComponentInternalInstance | null; // loadingTemplate 挂载
  // useLazy 内部使用
  loadingTargetId?: string;  // loadingTemplate 挂载节点 id
  dataSource?: TreeData; // 懒加载数据
}
interface TypeReflect {
  [key: string]: TypeReflectValue;
}
type TypeHandleInit = (item: TreeItem, value: TypeReflectValue) => void;
type TypeGetLazyData = (key: keyof TypeReflect) => Promise<TreeItem | undefined | unknown>;
type TypeUseLazy = () => {
  lazyNodesReflect: Ref<TypeReflect>;
  handleInitLazyNodeReflect: TypeHandleInit;
  getLazyData: TypeGetLazyData;
};

const useLazy: TypeUseLazy = () => {
  const reflect = ref<TypeReflect>({});

  const handleInit: TypeHandleInit = (item, value) => {
    if (!item.isParent) {
      return;
    }
    const key = reflect.value[value.id]?.id.toString();
    if (!key) {
      reflect.value[value.id] = {
        ...value,
        loadingTargetId: `devui-tree_loadingTemplate-${value.id}`,
        dataSource: null
      };
    }
  };

  const getLazyData: TypeGetLazyData = async (key) => {
    const ds = reflect.value[key];
    if (ds.dataSource) {
      return ds.dataSource;
    }
    const handleLoading = reflect.value[key].renderLoading(reflect.value[key].loadingTargetId);
    try {
      reflect.value[key].dataSource = await ds.onGetNodeData();
    } catch(e) {
      console.error(e);
    } finally {
      handleLoading.loadingInstance.close();
    }
    return reflect.value[key].dataSource;
  };

  return {
    lazyNodesReflect: reflect,
    handleInitLazyNodeReflect: handleInit,
    getLazyData,
  };
};

export default useLazy;
