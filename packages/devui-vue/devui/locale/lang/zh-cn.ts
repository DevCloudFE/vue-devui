export default {
  pagination: {
    totalItemText: '所有条目',
    goToText: '跳至',
    perPage: '条/页',
  },
  accordion: {
    loading: '加载中',
    noData: '没有数据',
  },
  autoCompleteDropdown: {
    latestInput: '最近输入',
  },
  cascaderList: {
    noData: '没有数据',
  },
  colorPicker: {
    foundationPanel: '基础面板',
    advancedPanel: '高级面板',
  },
  datePickerPro: {
    ok: '确定',
    placeholder: '请选择日期',
    month1: '1月',
    month2: '2月',
    month3: '3月',
    month4: '4月',
    month5: '5月',
    month6: '6月',
    month7: '7月',
    month8: '8月',
    month9: '9月',
    month10: '10月',
    month11: '11月',
    month12: '12月',
    year: '年',
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期',
    getWeekDays(): Array<string> {
      return ['日', '一', '二', '三', '四', '五', '六'];
    },
    getTimeArr(): Array<string> {
      return ['时', '分', '秒'];
    },
    getYearMonthStr(year: number, month: number): string {
      return `${year}年${month}月`;
    },
  },
  editableSelect: {
    noRelatedRecords: '找不到相关记录',
    noData: '没有数据',
  },
  input: {
    placeholder: '请输入',
  },
  splitterBar: {
    collapse: '收起',
    expand: '展开',
  },
  stepsGuide: {
    previous: '上一步',
    continue: '我知道啦，继续',
    ok: '我知道啦',
  },
  table: {
    selectAll: '全选',
    ok: '确定',
  },
  timePopup: {
    ok: '确定',
  },
  transfer: {
    unit: '项',
    panelUnit: '项',
    headerUnit: '项',
    noData: '暂无数据',
    placeholder: '请输入关键词搜索',
  },
  tree: {
    loading: '加载中',
    newNode: '新节点',
    selectPlaceholder: '请选择',
  },
  upload: {
    placeholder: '选择文件',
    getExistSameNameFilesMsg(sameNames: string): string {
      return `您上传的 "${sameNames}" 存在重名文件, 请重新选择文件`;
    },
    getAllFilesBeyondMaximalFileSizeMsg(maximalSize: number): string {
      return `最大支持上传${maximalSize}MB的文件, 您本次上传的所有文件超过可上传文件大小`;
    },
    getBeyondMaximalFileSizeMsg(filename: string, maximalSize: number): string {
      return `最大支持上传${maximalSize}MB的文件, 您上传的文件"${filename}"超过可上传文件大小`;
    },
    getNotAllowedFileTypeMsg(filename: string, scope: string): string {
      return `支持的文件类型: "${scope}", 您上传的文件"${filename}"不在允许范围内，请重新选择文件`;
    },
  },
  search: {
    placeholder: '请输入关键字',
  },
  select: {
    placeholder: '请选择',
    noDataText: '无数据',
    noMatchText: '找不到相关记录',
    loadingText: '加载中...',
  },
  tagInput: {
    maxTagsText: '已达到最大个数：',
  },
  timeSelect: {
    placeholder: '请选择时间',
  },
};
