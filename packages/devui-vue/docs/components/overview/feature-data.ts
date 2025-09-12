type ICategory = 'general' | 'navigation' | 'feedback' | 'data-entry' | 'data-display' | 'layout';

type IStatus = 'done' | 'developing' | 'to-be-claimed';

interface IFeature {
  name: string;
  cnName: string;
  desc?: string;
  status?: IStatus;
}

interface IComponent {
  name: string;
  cnName: string;
  category: ICategory;
  desc?: string;
  version?: string;
  complex?: boolean;
  deprecated?: boolean;
  features: IFeature[] | string[];
}

export const CATEGORY_MAP = {
  'general': '通用',
  'navigation': '导航',
  'feedback': '反馈',
  'data-entry': '数据录入',
  'data-display': '数据展示',
  'layout': '布局',
};

export const STATUS_MAP = {
  'done': '✅',
  'developing': '🚧',
  'to-be-claimed': '⌛',
};

export const componentFeatureData: IComponent[] = [
  {
    name: 'button',
    cnName: '按钮',
    category: 'general',
    desc: '',
    version: 'v1.0',
    features: [
      {
        name: 'variant',
        cnName: '形态',
        desc: '',
        status: 'done',
      },
      {
        name: 'color',
        cnName: '主题色',
        desc: '',
        status: 'done',
      },
      {
        name: 'size',
        cnName: '尺寸',
        status: 'done',
      },
      {
        name: 'disabled',
        cnName: '禁用状态',
        status: 'done',
      },
      {
        name: 'loading',
        cnName: '加载中状态',
        status: 'done',
      },
      {
        name: 'icon',
        cnName: '图标按钮',
        status: 'done',
      },
      {
        name: 'button-group',
        cnName: '按钮组',
        status: 'done',
      },
    ]
  },
  {
    name: 'dragdrop',
    cnName: '拖拽',
    category: 'general',
    desc: '',
    version: 'v2.0',
    complex: true,
    features: [
      {
        name: 'basic',
        cnName: '基础拖拽',
        status: 'done',
      },
      {
        name: 'sort',
        cnName: '拖拽排序',
        status: 'done',
      },
      {
        name: 'tree',
        cnName: '多层树状拖拽',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '拖拽实体元素跟随',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '越边交换',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '外部放置位置',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '拖拽滚动容器增强',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '源占位符',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '批量拖拽',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '二维拖拽',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '拖拽预览',
        status: 'to-be-claimed',
      },
    ]
  },
  {
    name: 'fullscreen',
    cnName: '全屏',
    category: 'general',
    version: 'v1.0',
    features: [
      {
        name: 'mode',
        cnName: '全屏模式',
        status: 'done',
      },
      {
        name: 'z-index',
        cnName: '全屏层级',
        status: 'done',
      },
    ],
  },
  {
    name: 'icon',
    cnName: '图标',
    category: 'general',
    version: 'v1.0',
    features: [
      {
        name: 'name',
        cnName: '图标名称',
        status: 'done',
      },
      {
        name: 'color',
        cnName: '颜色',
        status: 'done',
      },
      {
        name: 'size',
        cnName: '尺寸',
        status: 'done',
      },
      {
        name: 'class-prefix',
        cnName: '自定义字体图标',
        status: 'done',
      },
    ],
  },
  {
    name: 'overlay',
    cnName: '遮罩层',
    category: 'general',
    version: 'v1.0',
    features: [
      {
        name: 'fixed-overlay',
        cnName: '固定遮罩层',
        status: 'done',
      },
      {
        name: 'flexible-overlay',
        cnName: '弹性遮罩层',
        status: 'done',
      },
    ],
  },
  {
    name: 'panel',
    cnName: '面板',
    category: 'general',
    version: 'v1.0',
    deprecated: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '默认状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '面板类型',
        status: 'done',
      },
      {
        name: '',
        cnName: '面板样式',
        status: 'done',
      },
      {
        name: '',
        cnName: '阻止折叠',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义内容',
        status: 'done',
      },
    ],
  },
  {
    name: 'ripple',
    cnName: '水波纹',
    category: 'general',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义颜色',
        status: 'done',
      },
    ],
  },
  {
    name: 'search',
    cnName: '搜索',
    category: 'general',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '搜索图标左置',
        status: 'done',
      },
      {
        name: '',
        cnName: '无边框',
        status: 'done',
      },
      {
        name: '',
        cnName: '双向绑定',
        status: 'done',
      },
      {
        name: '',
        cnName: '自动聚焦',
        status: 'done',
      },
    ],
  },
  {
    name: 'status',
    cnName: '状态',
    category: 'general',
    version: 'v1.0',
    deprecated: true,
    features: [
      {
        name: '',
        cnName: '类型',
        status: 'done',
      },
    ],
  },
  {
    name: 'sticky',
    cnName: '便贴',
    category: 'general',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '滚动容器',
        status: 'done',
      },
    ],
  },
  {
    name: 'virtual-list',
    cnName: '虚拟列表',
    category: 'general',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
    ],
  },
  {
    name: 'accordion',
    cnName: '手风琴',
    category: 'navigation',
    version: 'v2.0',
    deprecated: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '内置路由和链接类型',
        status: 'done',
      },
      {
        name: '',
        cnName: '使用模板',
        status: 'done',
      },
      {
        name: '',
        cnName: '复合层级',
        status: 'done',
      },
      {
        name: '',
        cnName: '改变键值',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'anchor',
    cnName: '锚点',
    category: 'navigation',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '异步加载',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '滚动容器',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: 'url锚点',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'back-top',
    cnName: '回到顶部',
    category: 'navigation',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
      {
        name: '',
        cnName: '滚动容器',
        status: 'done',
      },
    ],
  },
  {
    name: 'breadcrumb',
    cnName: '面包屑',
    category: 'navigation',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '传入source',
        status: 'done',
      },
      {
        name: '',
        cnName: '可下拉',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义分隔符',
        status: 'done',
      },
    ],
  },
  {
    name: 'dropdown',
    cnName: '下拉菜单',
    category: 'navigation',
    version: 'v1.0',
    complex: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '触发方式',
        status: 'done',
      },
      {
        name: '',
        cnName: '可关闭区域',
        status: 'done',
      },
      {
        name: '',
        cnName: '多级菜单',
        status: 'done',
      },
      {
        name: '',
        cnName: '单独使用',
        status: 'done',
      },
      {
        name: '',
        cnName: '关闭触发点设置',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '悬浮下拉',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '手动控制下拉',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '通过isOpen控制下拉',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '自动展开和自动聚焦',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '设置展开位置处理',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '支持添加图标',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'menu',
    cnName: '菜单',
    category: 'navigation',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义图标',
        status: 'done',
      },
      {
        name: '',
        cnName: '垂直菜单',
        status: 'done',
      },
      {
        name: '',
        cnName: '默认展开',
        status: 'done',
      },
      {
        name: '',
        cnName: '仅一项展开',
        status: 'done',
      },
      {
        name: '',
        cnName: '收缩菜单',
        status: 'done',
      },
      {
        name: '',
        cnName: '取消多选',
        status: 'done',
      },
      {
        name: '',
        cnName: '响应式参数',
        status: 'done',
      },
    ],
  },
  {
    name: 'nav-sprite',
    cnName: '精灵导航',
    category: 'navigation',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '指定容器',
        status: 'done',
      },
    ],
  },
  {
    name: 'pagination',
    cnName: '分页',
    category: 'navigation',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '极简模式',
        status: 'done',
      },
      {
        name: '',
        cnName: '多种配置',
        status: 'done',
      },
      {
        name: '',
        cnName: '特殊情况',
        status: 'done',
      },
    ],
  },
  {
    name: 'steps-guide',
    cnName: '操作指引',
    category: 'navigation',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '弹出位置',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
    ],
  },
  {
    name: 'tabs',
    cnName: '选项卡',
    category: 'navigation',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '类型',
        status: 'done',
      },
      {
        name: '',
        cnName: '禁用状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义模板',
        status: 'done',
      },
      {
        name: '',
        cnName: '拦截tab切换',
        status: 'done',
      },
      {
        name: '',
        cnName: '添加/删除',
        status: 'done',
      },
      {
        name: '',
        cnName: '标签位置的设置',
        status: 'done',
      },
    ],
  },
  {
    name: 'alert',
    cnName: '警告',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '可关闭',
        status: 'done',
      },
      {
        name: '',
        cnName: '不显示图标',
        status: 'done',
      },
    ],
  },
  {
    name: 'Drawer',
    cnName: '抽屉板',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '关闭后不销毁',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义模板',
        status: 'done',
      },
    ],
  },
  {
    name: 'loading',
    cnName: '加载中',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义样式',
        status: 'done',
      },
      {
        name: '',
        cnName: '多promise',
        status: 'done',
      },
      {
        name: '',
        cnName: '使用Subscription方式',
        status: 'done',
      },
      {
        name: '',
        cnName: '使用showLoading控制',
        status: 'done',
      },
      {
        name: '',
        cnName: '服务方式调用',
        status: 'done',
      },
    ],
  },
  {
    name: 'mention',
    cnName: '提及',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '异步用法',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义前缀',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义模板',
        status: 'done',
      },
    ],
  },
  {
    name: 'modal',
    cnName: '弹窗',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '标准对话框',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义对话框',
        status: 'done',
      },
      {
        name: '',
        cnName: '拦截对话框关闭',
        status: 'done',
      },
      {
        name: '',
        cnName: '信息提示',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '警告弹出框',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '弹出框按钮状态',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '自动聚焦',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '自定义内容模板',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '避免滚动和抖动',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'notification',
    cnName: '全局通知',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '超时时间',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义样式',
        status: 'done',
      },
      {
        name: '',
        cnName: '单独超时时间',
        status: 'done',
      },
      {
        name: '',
        cnName: '服务方式调用',
        status: 'done',
      },
    ],
  },
  {
    name: 'popover',
    cnName: '悬浮提示',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '弹出位置',
        status: 'done',
      },
      {
        name: '',
        cnName: '手动控制',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义提示内容',
        status: 'done',
      },
      {
        name: '',
        cnName: '父容器设置',
        status: 'done',
      },
      {
        name: '',
        cnName: '延时触发',
        status: 'done',
      },
    ],
  },
  {
    name: 'read-tip ',
    cnName: '阅读提示',
    category: 'feedback',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '多提示',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义模板',
        status: 'done',
      },
      {
        name: '',
        cnName: '异步获取数据',
        status: 'done',
      },
    ],
  },
  {
    name: 'result',
    cnName: '结果',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
    ],
  },
  {
    name: 'message',
    cnName: '全局提示',
    category: 'feedback',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '可关闭消息提示',
        status: 'done',
      },
      {
        name: '',
        cnName: '超时时间',
        status: 'done',
      },
      {
        name: '',
        cnName: '阴影和边框设置',
        status: 'done',
      },
      {
        name: '',
        cnName: '关闭回调',
        status: 'done',
      },
      {
        name: '',
        cnName: '多种用法',
        status: 'done',
      },
    ],
  },
  {
    name: 'tooltip',
    cnName: '提示',
    category: 'feedback',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '延时触发',
        status: 'done',
      },
    ],
  },
  {
    name: 'auto-complete',
    cnName: '自动补全',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义数据匹配方法',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义模板',
        status: 'done',
      },
      {
        name: '',
        cnName: '禁用状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '最近输入',
        status: 'done',
      },
      {
        name: '',
        cnName: '懒加载',
        status: 'done',
      },
    ],
  },
  {
    name: 'cascader',
    cnName: '级联菜单',
    category: 'data-entry',
    version: 'v2.0',
    complex: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '多选类型',
        status: 'done',
      },
      {
        name: '',
        cnName: '搜索类型',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '父级可选',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '模板类型',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '点击加载',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '下拉头模板',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'category-search',
    cnName: '分类搜索',
    category: 'data-entry',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '大数据优化展示',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'checkbox ',
    cnName: '复选框',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '复选框组',
        status: 'done',
      },
      {
        name: '',
        cnName: '拦截状态切换',
        status: 'done',
      },
      {
        name: '',
        cnName: '拦截复选框组的状态切换',
        status: 'done',
      },
    ],
  },
  {
    name: 'color-picker',
    cnName: '颜色选择器',
    category: 'data-entry',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '颜色透明度',
        status: 'done',
      },
      {
        name: '',
        cnName: '颜色模式',
        status: 'done',
      },
      {
        name: '',
        cnName: '历史颜色',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义基础面板',
        status: 'done',
      },
    ],
  },
  {
    name: 'date-picker',
    cnName: '日期选择器',
    category: 'data-entry',
    version: 'v2.0',
    complex: true,
    deprecated: true,
    features: [
      {
        name: '',
        cnName: '自动关闭',
        status: 'done',
      },
      {
        name: '',
        cnName: '日期范围选择器',
        status: 'done',
      },
      {
        name: '',
        cnName: '日期格式',
        status: 'done',
      },
      {
        name: '',
        cnName: '日期范围分隔符',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'date-picker-pro',
    cnName: '日期选择器',
    category: 'data-entry',
    version: 'v1.0',
    complex: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '显示时间',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义扩展区域',
        status: 'done',
      },
      {
        name: '',
        cnName: '年月选择器',
        status: 'done',
      },
      {
        name: '',
        cnName: '范围选择器',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义范围选择器模板',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义宿主',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '日历面板模式',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'editable-select',
    cnName: '可输入下拉选择框',
    category: 'data-entry',
    version: 'v1.0',
    deprecated: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '禁用状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义匹配方法',
        status: 'done',
      },
      {
        name: '',
        cnName: '异步数据',
        status: 'done',
      },
      {
        name: '',
        cnName: '懒加载',
        status: 'done',
      },
    ],
  },
  {
    name: 'form',
    cnName: '表单',
    category: 'data-entry',
    version: 'v1.0',
    complex: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: 'label横向排列',
        status: 'done',
      },
      {
        name: '',
        cnName: '弹窗表单',
        status: 'done',
      },
      {
        name: '',
        cnName: '多列表单',
        status: 'done',
      },
      {
        name: '',
        cnName: '模板驱动表单验证',
        status: 'done',
      },
      {
        name: '',
        cnName: '响应式表单验证',
        status: 'done',
      },
      {
        name: '',
        cnName: '指定表单状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '表单协同验证',
        status: 'done',
      },
      {
        name: '',
        cnName: '跨组件表单验证',
        status: 'done',
      },
      {
        name: '',
        cnName: '更新验证规则',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'input',
    cnName: '输入框',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '尺寸',
        status: 'done',
      },
      {
        name: '',
        cnName: '密码框',
        status: 'done',
      },
    ],
  },
  {
    name: 'input-icon',
    cnName: '图标输入框',
    category: 'data-entry',
    version: 'v2.0',
    deprecated: true,
    features: [
      {
        name: '',
        cnName: '图标名称',
        status: 'done',
      },
      {
        name: '',
        cnName: '颜色',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'input-number',
    cnName: '数字输入框',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '禁用状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '允许空值',
        status: 'done',
      },
      {
        name: '',
        cnName: '设置最大长度',
        status: 'done',
      },
      {
        name: '',
        cnName: '正则限制',
        status: 'done',
      },
      {
        name: '',
        cnName: '限制小数',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'multi-auto-complete',
    cnName: '多项自动补全',
    category: 'data-entry',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '自定义匹配方法',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '允许空值',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'radio',
    cnName: '单选框',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '相互独立的单选项',
        status: 'done',
      },
      {
        name: '',
        cnName: '条件切换',
        status: 'done',
      },
      {
        name: '',
        cnName: '单选框组条件切换',
        status: 'done',
      },
      {
        name: '',
        cnName: '禁用状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '排列方向',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义单选项',
        status: 'done',
      },
    ],
  },
  {
    name: 'select',
    cnName: '下拉选择框',
    category: 'data-entry',
    version: 'v1.0',
    complex: true,
    features: [
      {
        name: 'basic-select',
        cnName: '基础单选功能',
        status: 'done',
      },
      {
        name: 'size',
        cnName: '尺寸',
        status: 'done',
      },
      {
        name: 'multiple',
        cnName: '多选',
        status: 'done',
      },
      {
        name: 'disabled',
        cnName: '禁用',
        status: 'done',
      },
      {
        name: 'allow-clear',
        cnName: '可清空',
        status: 'done',
      },
      {
        name: 'option',
        cnName: '自定义下拉选项',
        status: 'done',
      },
      {
        name: 'option-group',
        cnName: '选项分组',
        status: 'done',
      },
      {
        name: 'filter',
        cnName: '选项过滤',
        status: 'done',
      },
      {
        name: 'allow-create',
        cnName: '新增选项',
        status: 'done',
      },
      {
        name: 'loading',
        cnName: '远程加载',
        status: 'done',
      },
    ],
  },
  {
    name: 'slider',
    cnName: '滑块',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '禁用状态',
        status: 'done',
      },
    ],
  },
  {
    name: 'switch',
    cnName: '开关',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '双向绑定',
        status: 'done',
      },
      {
        name: '',
        cnName: '回调事件',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义样式',
        status: 'done',
      },
    ],
  },
  {
    name: 'tag-input',
    cnName: '标签输入框',
    category: 'data-entry',
    version: 'v2.0',
    deprecated: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '双向绑定',
        status: 'done',
      },
      {
        name: '',
        cnName: '异步数据源',
        status: 'done',
      },
      {
        name: '',
        cnName: '虚拟滚动',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'textarea',
    cnName: '多行文本框',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '调整大小',
        status: 'done',
      },
      {
        name: '',
        cnName: '字符数限制',
        status: 'done',
      },
    ],
  },
  {
    name: 'time-picker',
    cnName: '时间选择器',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '格式化',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义模板',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'time-select',
    cnName: '时间下拉选择器',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '尺寸',
        status: 'done',
      },
      {
        name: '',
        cnName: '时间段',
        status: 'done',
      },
      {
        name: '',
        cnName: '事件',
        status: 'done',
      },
    ],
  },
  {
    name: 'transfer',
    cnName: '穿梭框',
    category: 'data-entry',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '可搜索',
        status: 'done',
      },
      {
        name: '',
        cnName: '可排序',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义穿梭框',
        status: 'done',
      },
      {
        name: '',
        cnName: '虚拟滚动',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'tree-select',
    cnName: '树形选择框',
    category: 'data-entry',
    version: 'v2.0',
    complex: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '标签化配置',
        status: 'done',
      },
      {
        name: '',
        cnName: '仅叶节点可选',
        status: 'done',
      },
      {
        name: '',
        cnName: '初始化完成时调用的钩子',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '可搜索',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义列表选项',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '自定义key',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '自定义区域',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '展开/收起icon',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '虚拟滚动',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'upload',
    cnName: '上传',
    category: 'data-entry',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '多文件上传',
        status: 'done',
      },
      {
        name: '',
        cnName: '自动上传',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
      {
        name: '',
        cnName: '动态上传参数',
        status: 'done',
      },
      {
        name: '',
        cnName: '任意区域上传',
        status: 'done',
      },
    ],
  },
  {
    name: 'avatar',
    cnName: '头像',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '头像显示规则',
        status: 'done',
      },
      {
        name: '',
        cnName: '基础配置',
        status: 'done',
      },
      {
        name: '',
        cnName: '特殊显示',
        status: 'done',
      },
    ],
  },
  {
    name: 'badge',
    cnName: '徽标',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '点状徽章',
        status: 'done',
      },
      {
        name: '',
        cnName: '计数徽章',
        status: 'done',
      },
      {
        name: '',
        cnName: '状态徽章',
        status: 'done',
      },
      {
        name: '',
        cnName: '徽章位置',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
    ],
  },
  {
    name: 'card',
    cnName: '卡片',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '使用图片',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义区域',
        status: 'done',
      },
    ],
  },
  {
    name: 'carousel',
    cnName: '轮播',
    category: 'data-display',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '指示器和切换箭头',
        status: 'done',
      },
      {
        name: '',
        cnName: '自动轮播',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义操作',
        status: 'done',
      },
    ],
  },
  {
    name: 'collapse',
    cnName: '折叠面板',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
    ],
  },
  {
    name: 'comment',
    cnName: '评论',
    category: 'data-display',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
    ],
  },
  {
    name: 'countdown',
    cnName: '倒计时',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '时间格式',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义前缀后缀',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义样式',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义内容',
        status: 'done',
      },
    ],
  },
  {
    name: 'dashboard',
    cnName: '仪表盘',
    category: 'data-display',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '更多设置',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'gantt',
    cnName: '甘特图',
    category: 'data-display',
    version: 'v2.0',
    complex: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '与表格结合',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'image-preview',
    cnName: '图片预览',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义开启预览窗口',
        status: 'done',
      },
      {
        name: '',
        cnName: '设置层级',
        status: 'done',
      },
    ],
  },
  {
    name: 'list',
    cnName: '列表',
    category: 'data-display',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'progress',
    cnName: '进度条',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '圆环形态',
        status: 'done',
      },
    ],
  },
  {
    name: 'quadrant-diagram',
    cnName: '象限图',
    category: 'data-display',
    version: 'v2.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'to-be-claimed',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'rate',
    cnName: '评分',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '只读模式',
        status: 'done',
      },
      {
        name: '',
        cnName: '动态模式',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
      {
        name: '',
        cnName: '半选模式',
        status: 'done',
      },
      {
        name: '',
        cnName: '类型',
        status: 'done',
      },
    ],
  },
  {
    name: 'skeleton',
    cnName: '骨架屏',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '组合',
        status: 'done',
      },
      {
        name: '',
        cnName: '细粒度模式',
        status: 'done',
      },
    ],
  },
  {
    name: 'statistic',
    cnName: '统计数值',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '数值动画',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义',
        status: 'done',
      },
    ],
  },
  {
    name: 'table',
    cnName: '表格',
    category: 'data-display',
    version: 'v1.0',
    complex: true,
    features: [
      {
        name: 'basic-table',
        cnName: '基础表格',
        status: 'done',
      },
      {
        name: 'table-style',
        cnName: '表格样式',
        status: 'done',
      },
      {
        name: 'row-check',
        cnName: '行勾选',
        status: 'done',
      },
      {
        name: 'index-column',
        cnName: '索引列',
        status: 'done',
      },
      {
        name: 'custom-column',
        cnName: '自定义列',
        status: 'done',
      },
      {
        name: 'cell-edit',
        cnName: '单元格编辑',
        status: 'done',
      },
      {
        name: 'custom-header',
        cnName: '自定义表头',
        status: 'done',
      },
      {
        name: 'empty',
        cnName: '空数据模板',
        status: 'done',
      },
      {
        name: 'fix-header',
        cnName: '固定表头',
        status: 'done',
      },
      {
        name: 'fix-column',
        cnName: '固定列',
        status: 'done',
      },
      {
        name: 'cell-merge',
        cnName: '单元格合并',
        status: 'done',
      },
      {
        name: 'header-group',
        cnName: '表头分组',
        status: 'done',
      },
      {
        name: 'sort',
        cnName: '排序',
        status: 'done',
      },
      {
        name: 'filter',
        cnName: '过滤',
        status: 'done',
      },
      {
        name: 'expand-row',
        cnName: '展开行',
        status: 'done',
      },
      {
        name: 'tree',
        cnName: '树形表格',
        status: 'done',
      },
      {
        name: 'lazy',
        cnName: '懒加载',
        status: 'done',
      },
      {
        name: 'virtual',
        cnName: '虚拟滚动',
        status: 'to-be-claimed',
      },
      {
        name: 'column-dragdrop',
        cnName: '列拖拽',
        status: 'to-be-claimed',
      },
      {
        name: 'row-dragdrop',
        cnName: '行拖拽',
        status: 'to-be-claimed',
      },
      {
        name: 'batch-row-dragdrop',
        cnName: '批量行拖拽',
        status: 'to-be-claimed',
      },
    ],
  },
  {
    name: 'tag',
    cnName: '标签',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '标签组',
        status: 'done',
      },
    ],
  },
  {
    name: 'timeline',
    cnName: '时间轴',
    category: 'data-display',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '设置方向',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义内容模板',
        status: 'done',
      },
      {
        name: '',
        cnName: '使用html',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义内容方向',
        status: 'done',
      },
      {
        name: '',
        cnName: '设置时间位置',
        status: 'done',
      },
      {
        name: '',
        cnName: '时间节点单独使用',
        status: 'done',
      },
    ],
  },
  {
    name: 'tree',
    cnName: '树',
    category: 'data-display',
    version: 'v1.0',
    complex: true,
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '可勾选',
        status: 'done',
      },
      {
        name: '',
        cnName: '默认状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '禁用状态',
        status: 'done',
      },
      {
        name: '',
        cnName: '自定义图标',
        status: 'done',
      },
      {
        name: '',
        cnName: '懒加载',
        status: 'done',
      },
      {
        name: '',
        cnName: '增删改查操作',
        status: 'done',
      },
      {
        name: '',
        cnName: '搜索过滤',
        status: 'done',
      },
      {
        name: '',
        cnName: '拖拽排序',
        status: 'done',
      },
      {
        name: '',
        cnName: 'treeFactory',
        status: 'done',
      },
      {
        name: '',
        cnName: '虚拟滚动',
        status: 'done',
      },
    ],
  },
  {
    name: 'grid',
    cnName: '栅格',
    category: 'layout',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '对齐',
        status: 'done',
      },
      {
        name: '',
        cnName: '子元素间距',
        status: 'done',
      },
      {
        name: '',
        cnName: 'flex填充',
        status: 'done',
      },
      {
        name: '',
        cnName: '左右偏移',
        status: 'done',
      },
      {
        name: '',
        cnName: '响应式布局',
        status: 'done',
      },
      {
        name: '',
        cnName: '栅格排序',
        status: 'done',
      },
    ],
  },
  {
    name: 'layout',
    cnName: '布局',
    category: 'layout',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '更多用法',
        status: 'done',
      },
    ],
  },
  {
    name: 'splitter',
    cnName: '分割器',
    category: 'layout',
    version: 'v1.0',
    features: [
      {
        name: '',
        cnName: '基本功能',
        status: 'done',
      },
      {
        name: '',
        cnName: '垂直布局',
        status: 'done',
      },
      {
        name: '',
        cnName: '组合布局',
        status: 'done',
      },
      {
        name: '',
        cnName: '制定折叠收起方向',
        status: 'done',
      },
      {
        name: '',
        cnName: '折叠收起菜单',
        status: 'done',
      },
    ],
  },
];
