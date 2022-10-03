const ts = require('typescript');
const { extra, extraType } = require('./use-extra');
const {readFileSync} = require('fs');

class componentNode {
  /**
   *
   * @param {String} name componentName
   * @param {Boolean} ready
   */
  constructor(name){
    this.name = name;
    /** @type {componentNode} */
    this.children = [];
    this.type = '';
    this.isComponet = false;
  }
  /**
   *
   * @param {(node: componentNode) => void} callback
   */
  forEachChild(callback){
    for (const child of this.children){
      callback(child);
    }
  }
}

class componentRelationTree{
  constructor(){
    /**
     * @type {componentNode}
     */
    this.root = new componentNode('root');
  }
  /**
   *
   * @param {componentNode} node component relation Node. Used to describe the relationship between components
   */
  insert(node){
    if (!this.#_hasSameNode(node)){
      this.root.children.push(node);
    }
  }
  /**
   *
   * @param {componentNode} node
   * @param {componentNode | componentNode[]} child
   */
  insertChild(node, children){
    if (this.#_hasSameNode(node)){
      for (const child of this.root.children){
        if (child.name === node.name){
          if (children instanceof Array){
            child.childen.push(...children);
          } else {
            child.children.push(children);
          }
        }
      }
    }
  }
  /**
   *
   * @param {string} name component name
   * @return {componentNode}
   */
  find(name){
    for (const child of this.root.children){
      if (child.name === name){
        return child;
      }
    }
  }
  /**
   *
   * @param {componentNode} node
   * @return {Boolean}
   */
  #_hasSameNode(node){
    let idx=0;
    let hasSame = false;
    while (this.root.children.length !== idx){
      /** @type {componentNode} */
      const child = this.root.children[idx++];
      hasSame = child.name === node.name;
    }
    return hasSame;
  }
}

/**
 * @param {string} indexPath
 * @return {string}
 */
function readIndexFile(indexPath){
  return readFileSync(indexPath).toString();
}
/**
 *
 * @param {string[]} componentPaths component fold paths
 */
exports.useRelationTree = function (componentPaths){
  /**
   * @type {ts.SourceFile[]}
   */
  const tsPrograms = [];
  const tree = new componentRelationTree();
  tree.root.type = 'root';
  for (const path of componentPaths){
    tsPrograms.push(ts.createSourceFile('', readIndexFile(path)));
  }
  for (const program of tsPrograms){
    /**
     * @type {ts.ExportDeclaration[]}
     */
    const sourceFile = program.getSourceFile();
    program.forEachChild((node) => {
      if (ts.isExportAssignment(node)){
        /**
         * @type {ts.ObjectLiteralElement}
         */
        const exportObject = node.getChildAt(0, sourceFile);
        /** @type {ts.Node[]} */
        const properties = exportObject.parent.expression.properties;
        /** @type {componentNode} */
        let componentTreeNode;
        properties.forEach((property) => {
          if (ts.isPropertyAssignment(property)){
            const Identifier = property.getChildAt(0, sourceFile).getText(sourceFile);
            const value = property.getChildAt(2, sourceFile).getText(sourceFile);
            if (Identifier === 'title'){
              componentTreeNode = new componentNode(value.split(' ')[0].slice(1), true);
            }
          } else {
            /** @type {ts.MethodDeclaration} */
            const method = property;
            /** @type {ts.Block} */
            const block = method.body.getChildAt(1, sourceFile);
            const blockChildren = block.getChildren(sourceFile);
            for (const child of blockChildren){
              const childCode = child.getFullText(sourceFile);
              const nodeName = extra(childCode);
              const nodeType = extraType(childCode);
              const childNode = new componentNode(nodeName);
              childNode.type = nodeType;
              childNode.isComponet = nodeType === 'component';
              if (nodeName){
                componentTreeNode.children.push(childNode);
              }
            }
          }
        });
        tree.insert(componentTreeNode);
      }
    });
  }
  return tree.root;
};
