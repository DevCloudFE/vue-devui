import type { SetupContext, Ref } from 'vue';
import { unref, ref } from 'vue';
import type {
  TreeItem,
  SelectType,
  ReverseTree,
  CheckableRelationType,
  TreeData,
} from '../deprecated-tree-types';
import { flatten } from '../utils';

interface IUseChecked {
  selected: Ref<SelectType>;
  onNodeClick: (item: TreeItem) => void;
}

export default function useChecked(
  cbr: Ref<CheckableRelationType>,
  ctx: SetupContext,
  data: TreeData
): IUseChecked {
  const selected = ref<SelectType>({});
  const flatData = flatten(data);

  const findPedigreeById = (id: string) => {
    const treeData = data;
    let parentLevel: ReverseTree = {};
    let childLevel: string[] = [];
    let target = undefined;
    const ergodic = (curr: TreeData, parentNode: ReverseTree) => {
      curr.every(({ children, id: itemId }) => {
        if (target) {
          return false;
        }
        if (itemId === id) {
          parentLevel = parentNode;
          childLevel = Array.isArray(children)
            ? flatten(children).map(({ id: key }) => key)
            : [];
          target = itemId;
          return false;
        }
        if (Array.isArray(children)) {
          ergodic(children, {
            id: itemId,
            children: children.map(({ id: key }) => key),
            parent: parentNode,
          });
        }
        return true;
      });
    };
    ergodic(treeData, {});
    return {
      parentLevel,
      childLevel,
    };
  };

  const generateParentObject = (
    parentLevel: ReverseTree,
    isSelected: boolean,
    checkId: string
  ): SelectType => {
    const state: SelectType = {};
    const currentSelected = unref(selected);
    const ergodic = (currObj: ReverseTree, isOverflow = false) => {
      const { id, children, parent } = currObj;
      if (!parent) {
        return;
      }
      if (isSelected) {
        const optional = children.filter(
          (item) => !currentSelected[item] || currentSelected[item] === 'none'
        );
        if (optional.length <= 1) {
          if (optional[0] === checkId) {
            state[id] = 'select';
          } else if (isOverflow) {
            state[id] = 'half';
          }
        } else {
          state[id] = 'half';
        }
        ergodic(parent, state[id] === 'select');
      } else {
        const optional = children.filter(
          (item) => currentSelected[item] && currentSelected[item] !== 'none'
        );
        if (optional.length <= 1) {
          if (optional[0] === checkId || isOverflow) {
            state[id] = 'none';
          }
        } else {
          state[id] = 'half';
        }
        ergodic(parent, state[id] === 'none');
      }
    };
    ergodic(parentLevel);
    return state;
  };

  const onNodeClick = (item: TreeItem): void => {
    const { id } = item;
    let currentSelected = Object.assign({}, unref(selected));
    const isSelected = currentSelected[id] === 'none' || !currentSelected[id];
    if (cbr.value === 'none') {
      currentSelected = Object.assign(currentSelected, {
        [id]: isSelected ? 'select' : 'none',
      });
    } else if (cbr.value === 'both') {
      const { parentLevel, childLevel } = findPedigreeById(id);
      currentSelected = Object.assign(
        currentSelected,
        Object.fromEntries(
          childLevel.map((key) => [key, isSelected ? 'select' : 'none'])
        ),
        generateParentObject(parentLevel, isSelected, id),
        { [id]: isSelected ? 'select' : 'none' }
      );
    } else if (cbr.value === 'upward') {
      const { parentLevel } = findPedigreeById(id);
      currentSelected = Object.assign(
        currentSelected,
        generateParentObject(parentLevel, isSelected, id),
        { [id]: isSelected ? 'select' : 'none' }
      );
    } else if (cbr.value === 'downward') {
      const { childLevel } = findPedigreeById(id);
      currentSelected = Object.assign(
        currentSelected,
        Object.fromEntries(
          childLevel.map((key) => [key, isSelected ? 'select' : 'none'])
        ),
        { [id]: isSelected ? 'select' : 'none' }
      );
    }
    selected.value = currentSelected;
    const currentSelectedItem = flatData.filter(
      ({ id: itemId }) => currentSelected[itemId] && currentSelected[itemId] !== 'none'
    );
    ctx.emit('nodeSelected', currentSelectedItem);
  };

  return {
    selected,
    onNodeClick,
  };
}
