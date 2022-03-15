import { isPlainObject } from 'lodash-es';
import { coreName, coreRealName } from './utils';

export type ComponentMeta = {
  name: string;
  realName?: string;
  title: string;
  fullTitle?: string;
  category: string;
  parts: string[];
  status?: string;
  dir?: string;
};

export function isValidComponentMeta(obj: any) {
  return isPlainObject(obj) && !!obj.name && Array.isArray(obj.parts);
}

export function genMetaObj(meta: Partial<ComponentMeta> = {}) {
  return {
    $name: '组件英文名称',
    name: coreName(meta.name ?? ''),

    $realName: '组件 name 属性',
    realName: meta.realName ?? coreRealName(meta.name ?? ''),

    $title: '组件中文名称',
    title: meta.title ?? '',

    $fullTitle: '完整的组件标题，用于文档组件列表树使用',
    fullTitle: meta.fullTitle ?? `${coreName(meta.name ?? '')} ${meta.title ?? ''}`,

    $category: '组件分类',
    category: meta.category ?? '',

    $parts: '零部件集合',
    parts: meta.parts ?? [],

    $status: '组件开发进度：可设置百分比进度（10%、80%）或文字状态（待开发、开发中、已完成）',
    status: meta.status ?? '0%',

    $dir: '组件目录',
    dir: meta.dir ?? ''
  };
}

export default function genMetaTemplate(meta: Partial<ComponentMeta> = {}) {
  return JSON.stringify(genMetaObj(meta), null, 2);
}
