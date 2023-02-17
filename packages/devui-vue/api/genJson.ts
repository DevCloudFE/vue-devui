// 此文件用于生成hint脚本,直接使用tsx运行,可以在tsconfig里面exclue
// 所以,对于主要代码部分无侵入性
// 在主package已经集成了 pnpm hint,使用命令直接直接生成json-hint-api
// 由于生成逻辑通过ast解析提取jsdoc注释,所以比较慢
// 且,单独在api文件夹里放package.json,主要提供给tsx脚本一个type=module的参数
// 使用的时候注意依赖安装,尤其prettier的安装


import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { fileURLToPath } from 'url';

// @ts-ignore
const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);



// 如下注释保存,方便通过vsc手工获取需要导入的props
// import { } from '../devui/accordion/src/accordion.type';
// import { } from '../devui/alert/src/components/alert-type-icon';
// import { } from '../devui/color-picker/src/utils/color-utils-types';
// import { } from '../devui/date-picker/src/components/types';
// import { } from '../devui/grid/src/grid-types';
// import { } from '../devui/quadrant-diagram/type';
// import { } from '../devui/shared/components/popper-trigger/src/popper-trigger-types';
// import { } from '../devui/status/src/status-types';
// import { } from '../devui/table/src/components/body/body-types';
// import { } from '../devui/table/src/composables/use-table-types';
// import { } from '../devui/table/src/store/store-types';
// import { } from '../devui/tabs/src/components/tab-nav/tab-nav-types';
// import { } from '../devui/time-picker/src/types';
// import { } from '../devui/transfer/types';
// import { } from '../devui/tree/src/composables/use-tree-types';

// import { accordionProps } from '../devui/accordion/src/accordion-types';
// import { alertProps } from '../devui/alert/src/alert-types';
// import { apiTableProps } from '../devui/shared/devui-api-table/devui-api-table.type';
// import { autoCompleteProps } from '../devui/auto-complete/src/auto-complete-types';
// import { avatarProps } from '../devui/avatar/src/avatar-types';
// import { backTopProps } from '../devui/back-top/src/back-top-types';
// import { badgeProps } from '../devui/badge/src/badge-types';
// import { bodyTdProps } from '../devui/table/src/components/body-td/body-td-types';
// import { breadcrumbItemProps } from '../devui/breadcrumb/src/breadcrumb-item-types';
// import { breadcrumbProps } from '../devui/breadcrumb/src/breadcrumb-types';
// import { buttonProps } from '../devui/button/src/button-types';
// import { cardProps } from '../devui/card/src/card-types';
// import { carouselProps } from '../devui/carousel/src/types';
// import { cascaderProps } from '../devui/cascader/src/cascader-types';
// import { checkboxProps } from '../devui/checkbox/src/checkbox-types';
// import { collapseProps } from '../devui/collapse/src/collapse-types';
// import { colorPickerAlphaSliderProps } from '../devui/color-picker/src/components/color-alpha-slider/color-picker-alpha-slider-types';
// import { colorPickerBasicColorProps } from '../devui/color-picker/src/components/color-basic/color-basic-types';
// import { colorPickerEditProps } from '../devui/color-picker/src/components/color-edit/color-picker-edit-types';
// import { colorPickerHistoryProps } from '../devui/color-picker/src/components/color-history/color-picker-history-types';
// import { colorPickerHueSliderProps } from '../devui/color-picker/src/components/color-hue-slider/color-picker-hue-slider-types';
// import { colorPickerPaletteProps } from '../devui/color-picker/src/components/color-palette/color-picker-palette-types';
// import { colorPickerProps } from '../devui/color-picker/src/color-picker-types';
// import { colorPickerProps as colorPickerPanelProps } from '../devui/color-picker/src/components/color-picker-panel/color-picker-panel-types';
// import { commentProps } from '../devui/comment/src/comment-types';
// import { countdownProps } from '../devui/countdown/src/countdown-types';
// import { datePickerProProps } from '../devui/date-picker-pro/src/date-picker-pro-types';
// import { datePickerProps } from '../devui/date-picker/src/date-picker-types';
// import { drawerProps } from '../devui/drawer/src/drawer-types';
// import { dropdownMenuProps } from '../devui/dropdown/src/dropdown-menu-types';
// import { dropdownProps } from '../devui/dropdown/src/dropdown-types';
// import { dropdownProps as dropdownProps2 } from '../devui/editable-select/src/components/dropdown/dropdown-types';
// import { editableSelectOptionProps } from '../devui/editable-select/src/components/option/option-types';
// import { editableSelectProps } from '../devui/editable-select/src/editable-select-types';
// import { filterProps } from '../devui/table/src/components/filter/filter-types';
// import { fixedOverlayProps } from '../devui/overlay/src/fixed-overlay/fixed-overlay-types';
// import { flexibleOverlayProps } from '../devui/overlay/src/flexible-overlay/flexible-overlay-types';
// import { formControlProps } from '../devui/form/src/components/form-control/form-control-types';
// import { formItemProps } from '../devui/form/src/components/form-item/form-item-types';
// import { formLabelProps } from '../devui/form/src/components/form-label/form-label-types';
// import { formProps } from '../devui/form/src/form-types';
// import { fullscreenProps } from '../devui/fullscreen/src/fullscreen-types';
// import { ganttProps } from '../devui/gantt/src/gantt-types';
// import { headerThProps } from '../devui/table/src/components/header-th/header-th-types';
// import { iconProps } from '../devui/icon/src/icon-types';
// import { imagePreviewProps } from '../devui/image-preview/src/image-preview-types';
// import { inputNumberProps } from '../devui/input-number/src/input-number-types';
// import { inputProps } from '../devui/input/src/input-types';
// import { loadingProps } from '../devui/loading/src/loading-types';
// import { mentionProps } from '../devui/mention/src/mention-types';
// import { menuItemProps } from '../devui/menu/src/components/menu-item/menu-item-types';
// import { menuProps } from '../devui/menu/src/menu-types';
// import { messageProps } from '../devui/message/src/message-types';
// import { modalProps } from '../devui/modal/src/modal-types';
// import { multiAutoCompleteProps } from '../devui/multi-auto-complete/src/multi-auto-complete-types';
// import { navSpriteProps } from '../devui/nav-sprite/src/nav-sprite-types';
// import { notificationProps } from '../devui/notification/src/notification-types';
// import { paginationProps } from '../devui/pagination/src/pagination-types';
// import { panelProps } from '../devui/panel/src/panel-types';
// import { popoverProps } from '../devui/popover/src/popover-types';
// import { popupLineProps } from '../devui/time-picker/src/components/popup-line/popup-line-types';
// import { progressProps } from '../devui/progress/src/progress-types';
// import { quadrantDiagramAxisProps } from '../devui/quadrant-diagram/src/components/axis/types';
// import { quadrantDiagramProps } from '../devui/quadrant-diagram/src/quadrant-diagram-types';
// import { radioProps } from '../devui/radio/src/radio-types';
// import { rangeDatePickerProProps } from '../devui/date-picker-pro/src/range-date-picker-types';
// import { rateProps } from '../devui/rate/src/rate-types';
// import { readTipProps } from '../devui/read-tip/src/read-tip-types';
// import { resultProps } from '../devui/result/src/result-types';
// import { searchProps } from '../devui/search/src/search-types';
// import { selectProps } from '../devui/select/src/select-types';
// import { skeletonItemProps } from '../devui/skeleton/src/components/skeleton-item-types';
// import { skeletonProps } from '../devui/skeleton/src/skeleton-types';
// import { sliderProps } from '../devui/slider/src/slider-types';
// import { sortProps } from '../devui/table/src/components/sort/sort-types';
// import { splitterBarProps } from '../devui/splitter/src/components/splitter-bar-types';
// import { splitterPaneProps } from '../devui/splitter/src/components/splitter-pane-types';
// import { splitterProps } from '../devui/splitter/src/splitter-types';
// import { statisticProps } from '../devui/statistic/src/statistic-types';
// import { stepProps } from '../devui/steps/src/step-types';
// import { stepsGuideProps } from '../devui/steps-guide/src/steps-guide-types';
// import { stepsProps } from '../devui/steps/src/steps-types';
// import { subMenuProps } from '../devui/menu/src/components/sub-menu/sub-menu-types';
// import { switchProps } from '../devui/switch/src/switch-types';
// import { tableColumnProps } from '../devui/table/src/components/column/column-types';
// import { TableHeaderProps } from '../devui/table/src/components/header/header.type';
// import { tableProps } from '../devui/table/src/table-types';
// import { tabProps } from '../devui/tabs/src/components/tab/tab-types';
// import { tabsProps } from '../devui/tabs/src/tabs-types';
// import { tagInputProps } from '../devui/tag-input/src/tag-input-types';
// import { tagProps } from '../devui/tag/src/tag-types';
// import { textareaProps } from '../devui/textarea/src/textarea-types';
// import { timeAxisItemProps } from '../devui/timeline/src/components/timeline-item-types';
// import { timeAxisProps } from '../devui/timeline/src/timeline-types';
// import { timePickerProps } from '../devui/time-picker/src/time-picker-types';
// import { timePopupProps } from '../devui/time-picker/src/components/time-popup/time-popup-types';
// import { timeSelectProps } from '../devui/time-select/src/time-select-types';
// import { tooltipProps } from '../devui/tooltip/src/tooltip-types';
// import { transferProps } from '../devui/transfer/src/transfer-types';
// import { treeProps } from '../devui/tree/src/tree-types';
// import { treeSelectProps } from '../devui/tree-select/src/tree-select-types';
// import { uploadProps } from '../devui/upload/src/upload-types';
// import { virtualListProps } from '../devui/virtual-list/src/virtual-list-types';


// 这个其实是从上面的import提炼出来的
let map = new Map([
    ["accordionProps", '../devui/accordion/src/accordion-types'],
    ["alertProps", '../devui/alert/src/alert-types'],
    ["apiTableProps", '../devui/shared/devui-api-table/devui-api-table.type'],
    ["autoCompleteProps", '../devui/auto-complete/src/auto-complete-types'],
    ["avatarProps", '../devui/avatar/src/avatar-types'],
    ["backTopProps", '../devui/back-top/src/back-top-types'],
    ["badgeProps", '../devui/badge/src/badge-types'],
    ["bodyTdProps", '../devui/table/src/components/body-td/body-td-types'],
    ["breadcrumbItemProps", '../devui/breadcrumb/src/breadcrumb-item-types'],
    ["breadcrumbProps", '../devui/breadcrumb/src/breadcrumb-types'],
    ["buttonProps", '../devui/button/src/button-types'],
    ["cardProps", '../devui/card/src/card-types'],
    ["carouselProps", '../devui/carousel/src/types'],
    ["cascaderProps", '../devui/cascader/src/cascader-types'],
    ["checkboxProps", '../devui/checkbox/src/checkbox-types'],
    ["collapseProps", '../devui/collapse/src/collapse-types'],
    ["colorPickerAlphaSliderProps", '../devui/color-picker/src/components/color-alpha-slider/color-picker-alpha-slider-types'],
    ["colorPickerBasicColorProps", '../devui/color-picker/src/components/color-basic/color-basic-types'],
    ["colorPickerEditProps", '../devui/color-picker/src/components/color-edit/color-picker-edit-types'],
    ["colorPickerHistoryProps", '../devui/color-picker/src/components/color-history/color-picker-history-types'],
    ["colorPickerHueSliderProps", '../devui/color-picker/src/components/color-hue-slider/color-picker-hue-slider-types'],
    ["colorPickerPaletteProps", '../devui/color-picker/src/components/color-palette/color-picker-palette-types'],
    ["colorPickerProps", '../devui/color-picker/src/color-picker-types'],
    ["colorPickerProps", '../devui/color-picker/src/components/color-picker-panel/color-picker-panel-types'],
    ["commentProps", '../devui/comment/src/comment-types'],
    ["countdownProps", '../devui/countdown/src/countdown-types'],
    ["datePickerProProps", '../devui/date-picker-pro/src/date-picker-pro-types'],
    ["datePickerProps", '../devui/date-picker/src/date-picker-types'],
    ["drawerProps", '../devui/drawer/src/drawer-types'],
    ["dropdownMenuProps", '../devui/dropdown/src/dropdown-menu-types'],
    ["dropdownProps", '../devui/dropdown/src/dropdown-types'],
    ["dropdownProps", '../devui/editable-select/src/components/dropdown/dropdown-types'],
    ["editableSelectOptionProps", '../devui/editable-select/src/components/option/option-types'],
    ["editableSelectProps", '../devui/editable-select/src/editable-select-types'],
    ["filterProps", '../devui/table/src/components/filter/filter-types'],
    ["fixedOverlayProps", '../devui/overlay/src/fixed-overlay/fixed-overlay-types'],
    ["flexibleOverlayProps", '../devui/overlay/src/flexible-overlay/flexible-overlay-types'],
    ["formControlProps", '../devui/form/src/components/form-control/form-control-types'],
    ["formItemProps", '../devui/form/src/components/form-item/form-item-types'],
    ["formLabelProps", '../devui/form/src/components/form-label/form-label-types'],
    ["formProps", '../devui/form/src/form-types'],
    ["fullscreenProps", '../devui/fullscreen/src/fullscreen-types'],
    ["ganttProps", '../devui/gantt/src/gantt-types'],
    ["headerThProps", '../devui/table/src/components/header-th/header-th-types'],
    ["iconProps", '../devui/icon/src/icon-types'],
    ["imagePreviewProps", '../devui/image-preview/src/image-preview-types'],
    ["inputNumberProps", '../devui/input-number/src/input-number-types'],
    ["inputProps", '../devui/input/src/input-types'],
    ["loadingProps", '../devui/loading/src/loading-types'],
    ["mentionProps", '../devui/mention/src/mention-types'],
    ["menuItemProps", '../devui/menu/src/components/menu-item/menu-item-types'],
    ["menuProps", '../devui/menu/src/menu-types'],
    ["messageProps", '../devui/message/src/message-types'],
    ["modalProps", '../devui/modal/src/modal-types'],
    ["multiAutoCompleteProps", '../devui/multi-auto-complete/src/multi-auto-complete-types'],
    ["navSpriteProps", '../devui/nav-sprite/src/nav-sprite-types'],
    ["notificationProps", '../devui/notification/src/notification-types'],
    ["paginationProps", '../devui/pagination/src/pagination-types'],
    ["panelProps", '../devui/panel/src/panel-types'],
    ["popoverProps", '../devui/popover/src/popover-types'],
    ["popupLineProps", '../devui/time-picker/src/components/popup-line/popup-line-types'],
    ["progressProps", '../devui/progress/src/progress-types'],
    ["quadrantDiagramAxisProps", '../devui/quadrant-diagram/src/components/axis/types'],
    ["quadrantDiagramProps", '../devui/quadrant-diagram/src/quadrant-diagram-types'],
    ["radioProps", '../devui/radio/src/radio-types'],
    ["rangeDatePickerProProps", '../devui/date-picker-pro/src/range-date-picker-types'],
    ["rateProps", '../devui/rate/src/rate-types'],
    ["readTipProps", '../devui/read-tip/src/read-tip-types'],
    ["resultProps", '../devui/result/src/result-types'],
    ["searchProps", '../devui/search/src/search-types'],
    ["selectProps", '../devui/select/src/select-types'],
    ["skeletonItemProps", '../devui/skeleton/src/components/skeleton-item-types'],
    ["skeletonProps", '../devui/skeleton/src/skeleton-types'],
    ["sliderProps", '../devui/slider/src/slider-types'],
    ["sortProps", '../devui/table/src/components/sort/sort-types'],
    ["splitterBarProps", '../devui/splitter/src/components/splitter-bar-types'],
    ["splitterPaneProps", '../devui/splitter/src/components/splitter-pane-types'],
    ["splitterProps", '../devui/splitter/src/splitter-types'],
    ["statisticProps", '../devui/statistic/src/statistic-types'],
    ["stepProps", '../devui/steps/src/step-types'],
    ["stepsGuideProps", '../devui/steps-guide/src/steps-guide-types'],
    ["stepsProps", '../devui/steps/src/steps-types'],
    ["subMenuProps", '../devui/menu/src/components/sub-menu/sub-menu-types'],
    ["switchProps", '../devui/switch/src/switch-types'],
    ["tableColumnProps", '../devui/table/src/components/column/column-types'],
    ["TableHeaderProps", '../devui/table/src/components/header/header.type'],
    ["tableProps", '../devui/table/src/table-types'],
    ["tabProps", '../devui/tabs/src/components/tab/tab-types'],
    ["tabsProps", '../devui/tabs/src/tabs-types'],
    ["tagInputProps", '../devui/tag-input/src/tag-input-types'],
    ["tagProps", '../devui/tag/src/tag-types'],
    ["textareaProps", '../devui/textarea/src/textarea-types'],
    ["timeAxisItemProps", '../devui/timeline/src/components/timeline-item-types'],
    ["timeAxisProps", '../devui/timeline/src/timeline-types'],
    ["timePickerProps", '../devui/time-picker/src/time-picker-types'],
    ["timePopupProps", '../devui/time-picker/src/components/time-popup/time-popup-types'],
    ["timeSelectProps", '../devui/time-select/src/time-select-types'],
    ["tooltipProps", '../devui/tooltip/src/tooltip-types'],
    ["transferProps", '../devui/transfer/src/transfer-types'],
    ["treeProps", '../devui/tree/src/tree-types'],
    ["treeSelectProps", '../devui/tree-select/src/tree-select-types'],
    ["uploadProps", '../devui/upload/src/upload-types'],
    ["virtualListProps", '../devui/virtual-list/src/virtual-list-types']
]);


import { parseFiles } from '@structured-types/api';


let all = {} as any;


// 提取出来props等hint提示,并且把jsdoc提取出来当作description
// @ts-ignore
for await (const [key, val] of map) {
    // @ts-ignore
    all[key] = (await import(val))[key];
    // console.log('ccc_all_key',all[key]);

    let obj = parseFiles([val,]);
    // @ts-ignore
    let ps: any[] = obj['']?.properties;


    // console.log('ccc_obj',ps.filter(x => x.name==='shadow')[0]['description']);

    Object.keys(all[key]).forEach(x => {
        // console.log('ccc_prop',obj[key]["properties"][x]);
        all[key][x]['description'] ??= (obj[key]?.['properties'].filter(y => y.name === x)?.[0])?.description ?? '';
    });

}




console.log('ccc_all', all);



// 如果不提取comment可以直接使用如下定义,速度要快很多,省去了ast解析的时间
// let all = {
//     accordionProps,
//     alertProps,
//     apiTableProps,
//     autoCompleteProps,
//     avatarProps,
//     backTopProps,
//     badgeProps,
//     bodyTdProps,
//     breadcrumbItemProps,
//     breadcrumbProps,
//     buttonProps,
//     cardProps,
//     carouselProps,
//     cascaderProps,
//     checkboxProps,
//     collapseProps,
//     colorPickerAlphaSliderProps,
//     colorPickerBasicColorProps,
//     colorPickerEditProps,
//     colorPickerHistoryProps,
//     colorPickerHueSliderProps,
//     colorPickerPaletteProps,
//     colorPickerProps,
//     colorPickerPanelProps,
//     commentProps,
//     countdownProps,
//     datePickerProProps,
//     datePickerProps,
//     drawerProps,
//     dropdownMenuProps,
//     dropdownProps,
//     dropdownProps2,  // mistake maybe
//     editableSelectOptionProps,
//     editableSelectProps,
//     filterProps,
//     fixedOverlayProps,
//     flexibleOverlayProps,
//     formControlProps,
//     formItemProps,
//     formLabelProps,
//     formProps,
//     fullscreenProps,
//     ganttProps,
//     headerThProps,
//     iconProps,
//     imagePreviewProps,
//     inputNumberProps,
//     inputProps,
//     loadingProps,
//     mentionProps,
//     menuItemProps,
//     menuProps,
//     messageProps,
//     modalProps,
//     multiAutoCompleteProps,
//     navSpriteProps,
//     notificationProps,
//     paginationProps,
//     panelProps,
//     popoverProps,
//     popupLineProps,
//     progressProps,
//     quadrantDiagramAxisProps,
//     quadrantDiagramProps,
//     radioProps,
//     rangeDatePickerProProps,
//     rateProps,
//     readTipProps,
//     resultProps,
//     searchProps,
//     selectProps,
//     skeletonItemProps,
//     skeletonProps,
//     sliderProps,
//     sortProps,
//     splitterBarProps,
//     splitterPaneProps,
//     splitterProps,
//     statisticProps,
//     stepProps,
//     stepsGuideProps,
//     stepsProps,
//     subMenuProps,
//     switchProps,
//     tableColumnProps,
//     TableHeaderProps,
//     tableProps,
//     tabProps,
//     tabsProps,
//     tagInputProps,
//     tagProps,
//     textareaProps,
//     timeAxisItemProps,
//     timeAxisProps,
//     timePickerProps,
//     timePopupProps,
//     timeSelectProps,
//     tooltipProps,
//     transferProps,
//     treeProps,
//     treeSelectProps,
//     uploadProps,
//     virtualListProps

// };


// 保存生成的object到api路径
let pa = __dirnameNew;  // path
Object.keys(all).forEach(x => {
    let val = JSON.stringify(all[x], null, "\n");
    val = prettier.format(val, {
        "trailingComma": "es5",
        "tabWidth": 4,
        "semi": false,
        "singleQuote": true,
        "parser": 'json',
    });

    fs.writeFileSync(path.join(pa, "/devui", "d-" + x.replace("Props", "") + ".json"), val);
});


// import { parseFiles } from '@structured-types/api';


// let files = parseFiles(['../sum.ts']);
// // let files = parseFiles(['../devui/alert/src/alert-types.ts'])
// console.log('ccc_cicin_jsdoc',files['cardProps']?.properties);






