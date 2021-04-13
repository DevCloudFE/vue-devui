import ExamplePanelComponent from './app-demo-cell.vue';
import GetStartedComponent from './app-demo-cell.vue';
import ColorComponent from './app-demo-cell.vue';
import ThemeGuideComponent from './app-demo-cell.vue';

import accordionRoutes from '../../devui/accordion/demo/accordion.route'
import alertRoutes from '../../devui/alert/demo/alert.route'
import anchorRoutes from '../../devui/anchor/demo/anchor.route'
import autoCompleteRoutes from '../../devui/auto-complete/demo/auto-complete.route'
import avatarRoutes from '../../devui/avatar/demo/avatar.route'
import backTopRoutes from '../../devui/back-top/demo/back-top.route'
import badgeRoutes from '../../devui/badge/demo/badge.route'
import breadcrumbRoutes from '../../devui/breadcrumb/demo/breadcrumb.route'
import buttonRoutes from '../../devui/button/demo/button.route'
import cardRoutes from '../../devui/card/demo/card.route'

import carouselRoutes from '../../devui/carousel/demo/carousel.route'
import cascaderRoutes from '../../devui/cascader/demo/cascader.route'
import checkboxRoutes from '../../devui/checkbox/demo/checkbox.route'
import dataTableRoutes from '../../devui/data-table/demo/data-table.route'
import datepickerRoutes from '../../devui/datepicker/demo/datepicker.route'
import dragdropRoutes from '../../devui/dragdrop/demo/dragdrop.route'
import drawerRoutes from '../../devui/drawer/demo/drawer.route'
import dropdownRoutes from '../../devui/dropdown/demo/dropdown.route'
import editableSelectRoutes from '../../devui/editable-select/demo/editable-select.route'
import formRoutes from '../../devui/form/demo/form.route'

import fullscreenRoutes from '../../devui/fullscreen/demo/fullscreen.route'
import ganttRoutes from '../../devui/gantt/demo/gantt.route'
import imagePreviewRoutes from '../../devui/image-preview/demo/image-preview.route'
import inputNumberRoutes from '../../devui/input-number/demo/input-number.route'
import layoutRoutes from '../../devui/layout/demo/layout.route'
import loadingRoutes from '../../devui/loading/demo/loading.route'
import modalRoutes from '../../devui/modal/demo/modal.route'
import multiAutoCompleteRoutes from '../../devui/multi-auto-complete/demo/multi-auto-complete.route'
import paginationRoutes from '../../devui/pagination/demo/pagination.route'
import panelRoutes from '../../devui/panel/demo/panel.route'

import popoverRoutes from '../../devui/popover/demo/popover.route'
import progressRoutes from '../../devui/progress/demo/progress.route'
import quadrantDiagramRoutes from '../../devui/quadrant-diagram/demo/quadrant-diagram.route'
import radioRoutes from '../../devui/radio/demo/radio.route'
import rateRoutes from '../../devui/rate/demo/rate.route'
import readTipRoutes from '../../devui/read-tip/demo/read-tip.route'
import searchRoutes from '../../devui/search/demo/search.route'
import selectRoutes from '../../devui/select/demo/select.route'
import sliderRoutes from '../../devui/slider/demo/slider.route'
import splitterRoutes from '../../devui/splitter/demo/splitter.route'

import statusRoutes from '../../devui/status/demo/status.route'
import stepsGuideRoutes from '../../devui/steps-guide/demo/steps-guide.route'
import stickyRoutes from '../../devui/sticky/demo/sticky.route'
import tabsRoutes from '../../devui/tabs/demo/tabs.route'
import tagsRoutes from '../../devui/tags/demo/tags.route'
import tagsInputRoutes from '../../devui/tags-input/demo/tags-input.route'
import textInputRoutes from '../../devui/text-input/demo/text-input.route'
import textareaRoutes from '../../devui/textarea/demo/textarea.route'
import timeAxisRoutes from '../../devui/time-axis/demo/time-axis.route'
import timePickerRoutes from '../../devui/time-picker/demo/time-picker.route'

import toastRoutes from '../../devui/toast/demo/toast.route'
import toggleRoutes from '../../devui/toggle/demo/toggle.route'
import tooltipRoutes from '../../devui/tooltip/demo/tooltip.route'
import transferRoutes from '../../devui/transfer/demo/transfer.route'
import treeRoutes from '../../devui/tree/demo/tree.route'
import treeSelectRoutes from '../../devui/tree-select/demo/tree-select.route'
import uploadRoutes from '../../devui/upload/demo/upload.route'

export const routesConfig = [
  {
    path: '',
    redirect: '/components/button/demo',
    pathMatch: 'full',
    meta: {},
  },
  {
    path: 'get-start',
    component: GetStartedComponent,
    meta: { nodisplay: true },
  },
  {
    path: 'color',
    component: ColorComponent,
    meta: {nodisplay: true}
  },
  {
    path: 'theme-guide',
    component: ThemeGuideComponent,
    meta: { nodisplay: true },
  },
  {
    path: 'accordion',
    component: ExamplePanelComponent,
    children: accordionRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'Accordion',
      cnName: '手风琴',
    },
  },
  {
    path: 'alert',
    component: ExamplePanelComponent,
    children: alertRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Alert',
      cnName: '警告',
    },
  },
  {
    path: 'anchor',
    component: ExamplePanelComponent,
    children: anchorRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'Anchor',
      cnName: '锚点',
    },
  },
  {
    path: 'auto-complete',
    component: ExamplePanelComponent,
    children: autoCompleteRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'AutoComplete',
      cnName: '自动补全',
    },
  },
  {
    path: 'avatar',
    component: ExamplePanelComponent,
    children: avatarRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Avatar',
      cnName: '头像',
    },
  },
  {
    path: 'ImagePreview',
    component: ExamplePanelComponent,
    children: imagePreviewRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'ImagePreview',
      cnName: '图片预览',
    },
  },
  {
    path: 'breadcrumb',
    component: ExamplePanelComponent,
    children: breadcrumbRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'Breadcrumb',
      cnName: '面包屑',
    },
  },
  {
    path: 'back-top',
    component: ExamplePanelComponent,
    children: backTopRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'BackTop',
      cnName: '回到顶部',
    },
  },
  {
    path: 'button',
    component: ExamplePanelComponent,
    children: buttonRoutes,
    meta: {
      name: 'Button',
      cnName: '按钮',
    },
  },
  {
    path: 'badge',
    component: ExamplePanelComponent,
    children: badgeRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Badge',
      cnName: '徽标',
    },
  },
  {
    path: 'card',
    component: ExamplePanelComponent,
    children: cardRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Card',
      cnName: '卡片',
    },
  },
  {
    path: 'carousel',
    component: ExamplePanelComponent,
    children: carouselRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Carousel',
      cnName: '走马灯',
    },
  },
  {
    path: 'checkbox',
    component: ExamplePanelComponent,
    children: checkboxRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'CheckBox',
      cnName: '复选框',
    },
  },
  {
    path: 'common',
    component: ExamplePanelComponent,
    children: accordionRoutes,
    meta: {
      name: 'Common',
      cnName: '公共方法',
    },
  },
  {
    path: 'datatable',
    component: ExamplePanelComponent,
    children: dataTableRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'DataTable',
      cnName: '表格',
    },
  },
  {
    path: 'datepicker',
    component: ExamplePanelComponent,
    children: datepickerRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'DatePicker',
      cnName: '日期选择器',
    },
  },
  {
    path: 'multi-auto-complete',
    component: ExamplePanelComponent,
    children: multiAutoCompleteRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'MultiAutoComplete',
      cnName: '多项自动补全',
    },
  },
  {
    path: 'form',
    component: ExamplePanelComponent,
    children: formRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Form',
      cnName: '表单',
    },
  },
  {
    path: 'fullscreen',
    component: ExamplePanelComponent,
    children: fullscreenRoutes,
    meta: {
      name: 'Fullscreen',
      cnName: '全屏',
    },
  },
  {
    path: 'transfer',
    component: ExamplePanelComponent,
    children: transferRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Transfer',
      cnName: '穿梭框',
    },
  },
  {
    path: 'dragdrop',
    component: ExamplePanelComponent,
    children: dragdropRoutes,
    meta: {
      name: 'DragDrop',
      cnName: '拖拽',
    },
  },
  {
    path: 'drawer',
    component: ExamplePanelComponent,
    children: drawerRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Drawer',
      cnName: '抽屉板',
    },
  },
  {
    path: 'dropdown',
    component: ExamplePanelComponent,
    children: dropdownRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'DropDown',
      cnName: '下拉菜单',
    },
  },
  {
    path: 'editable-select',
    component: ExamplePanelComponent,
    children: editableSelectRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'EditableSelect',
      cnName: '可输入下拉选择框',
    },
  },
  {
    path: 'loading',
    component: ExamplePanelComponent,
    children: loadingRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Loading',
      cnName: '加载提示',
    },
  },
  {
    path: 'modal',
    component: ExamplePanelComponent,
    children: modalRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Modal',
      cnName: '模态弹窗',
    },
  },
  {
    path: 'pagination',
    component: ExamplePanelComponent,
    children: paginationRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'Pagination',
      cnName: '分页',
    },
  },
  {
    path: 'panel',
    component: ExamplePanelComponent,
    children: panelRoutes,
    meta: {
      name: 'Panel',
      cnName: '面板',
    },
  },
  {
    path: 'popover',
    component: ExamplePanelComponent,
    children: popoverRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Popover',
      cnName: '悬浮提示',
    },
  },
  {
    path: 'progress',
    component: ExamplePanelComponent,
    children: progressRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Progress',
      cnName: '进度条',
    },
  },
  {
    path: 'quadrant-diagram',
    component: ExamplePanelComponent,
    children: quadrantDiagramRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Quadrant Diagram',
      cnName: '象限图',
    },
  },
  {
    path: 'radio',
    component: ExamplePanelComponent,
    children: radioRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Radio',
      cnName: '单选框',
    },
  },
  {
    path: 'rate',
    component: ExamplePanelComponent,
    children: rateRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Rate',
      cnName: '等级评估',
    },
  },
  {
    path: 'search',
    component: ExamplePanelComponent,
    children: searchRoutes,
    meta: {
      name: 'Search',
      cnName: '搜索框',
    },
  },
  {
    path: 'select',
    component: ExamplePanelComponent,
    children: selectRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Select',
      cnName: '下拉选择框',
    },
  },
  {
    path: 'cascader',
    component: ExamplePanelComponent,
    children: cascaderRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Cascader',
      cnName: '级联菜单',
    },
  },
  {
    path: 'status',
    component: ExamplePanelComponent,
    children: statusRoutes,
    meta: {
      name: 'Status',
      cnName: '状态',
    },
  },
  {
    path: 'sticky',
    component: ExamplePanelComponent,
    children: stickyRoutes,
    meta: {
      name: 'Sticky',
      cnName: '便贴',
    },
  },
  {
    path: 'tabs',
    component: ExamplePanelComponent,
    children: tabsRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'Tabs',
      cnName: '选项卡切换',
    },
  },
  {
    path: 'tags',
    component: ExamplePanelComponent,
    children: tagsRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Tags',
      cnName: '标签',
    },
  },
  {
    path: 'tags-input',
    component: ExamplePanelComponent,
    children: tagsInputRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TagsInput',
      cnName: '标签输入',
    },
  },
  {
    path: 'time-axis',
    component: ExamplePanelComponent,
    children: timeAxisRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'TimeAxis',
      cnName: '时间轴',
    },
  },
  {
    path: 'toast',
    component: ExamplePanelComponent,
    children: toastRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Toast',
      cnName: '全局通知',
    },
  },
  {
    path: 'tooltip',
    component: ExamplePanelComponent,
    children: tooltipRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'Tooltip',
      cnName: '提示',
    },
  },
  {
    path: 'read-tip',
    component: ExamplePanelComponent,
    children: readTipRoutes,
    meta: {
      type: '反馈',
      enType: 'Feedback',
      name: 'ReadTip',
      cnName: '阅读提示',
      description: '阅读提示组件。',
      tmw: `当html文档中需要对特定内容进行提示时使用。`,
    },
  },
  {
    path: 'toggle',
    component: ExamplePanelComponent,
    children: toggleRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Toggle',
      cnName: '开关',
    },
  },
  {
    path: 'tree',
    component: ExamplePanelComponent,
    children: treeRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Tree',
      cnName: '树',
    },
  },
  {
    path: 'upload',
    component: ExamplePanelComponent,
    children: uploadRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Upload',
      cnName: '上传',
    },
  },
  {
    path: 'input-number',
    component: ExamplePanelComponent,
    children: inputNumberRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'InputNumber',
      cnName: '数字输入框',
    },
  },
  {
    path: 'tree-select',
    component: ExamplePanelComponent,
    children: treeSelectRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TreeSelect',
      cnName: '树形选择框',
    },
  },
  {
    path: 'slider',
    component: ExamplePanelComponent,
    children: sliderRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Slider',
      cnName: '滑动输入条',
    },
  },
  {
    path: 'splitter',
    component: ExamplePanelComponent,
    children: splitterRoutes,
    meta: {
      type: '布局',
      enType: 'Layout',
      name: 'Splitter',
      cnName: '分割器',
    },
  },
  {
    path: 'layout',
    component: ExamplePanelComponent,
    children: layoutRoutes,
    meta: {
      type: '布局',
      enType: 'Layout',
      name: 'Layout',
      cnName: '布局',
    },
  },
  {
    path: 'gantt',
    component: ExamplePanelComponent,
    children: ganttRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'Gantt',
      cnName: '甘特图',
    },
  },
  {
    path: 'text-input',
    component: ExamplePanelComponent,
    children: textInputRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TextInput',
      cnName: '文本框',
    },
  },
  {
    path: 'textarea',
    component: ExamplePanelComponent,
    children: textareaRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'Textarea',
      cnName: '多行文本框',
    },
  },
  {
    path: 'steps-guide',
    component: ExamplePanelComponent,
    children: stepsGuideRoutes,
    meta: {
      type: '导航',
      enType: 'Navigation',
      name: 'StepsGuide',
      cnName: '操作指引',
    },
  },
  {
    path: 'time-picker',
    component: ExamplePanelComponent,
    children: timePickerRoutes,
    meta: {
      type: '数据录入',
      enType: 'Data Entry',
      name: 'TimePicker',
      cnName: '时间选择器',
    },
  },
  {
    path: 'relative-time',
    component: ExamplePanelComponent,
    children: accordionRoutes,
    meta: {
      type: '数据展示',
      enType: 'Data Display',
      name: 'RelativeTime',
      cnName: '人性化时间转换',
    },
  },
];

export default routesConfig;
