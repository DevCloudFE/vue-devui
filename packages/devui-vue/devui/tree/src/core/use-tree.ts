import { ref } from 'vue';
import { treeData, treeDataId } from './data';
import TreeFactory from './tree-factory';

export default function useTree() {
  const treeFactory = new TreeFactory(treeDataId);
  console.log('treeFactory:', treeFactory, treeFactory._innerTree);
  console.log('tree:', treeFactory.getTree());
  
  // treeFactory._innerTree = [1, 2, 3];
  // console.log('treeFactory._innerTree:', treeFactory._innerTree);
  console.log(treeFactory.getNodes('node-1'));
  console.log(treeFactory.getNodes('Leaf', 'label'));
  console.log(treeFactory.getNodes('node-1'));
  
  return {};
}
