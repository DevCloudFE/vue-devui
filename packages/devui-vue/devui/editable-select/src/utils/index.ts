import { VNode } from 'vue';

/**
 * 动态获取class字符串
 * @param classStr 是一个字符串，固定的class名
 * @param classOpt 是一个对象，key表示class名，value为布尔值，true则添加，否则不添加
 * @returns 最终的class字符串
 */
export function className(
    classStr: string,
    classOpt?: { [key: string]: boolean; }
): string {
    let classname = classStr;
    if (typeof classOpt === 'object') {
        Object.keys(classOpt).forEach((key) => {
            classOpt[key] && (classname += ` ${key}`);
        });
    }

    return classname;
}
/**
 * 
 * @param condition 渲染条件
 * @param node1 待渲染的组件
 * @param node2  
 * @returns 最终被渲染的组件
 */
export function renderCondition(condition: unknown, node1: VNode, node2?: VNode): VNode {
    return !!condition ? node1 : node2;
}