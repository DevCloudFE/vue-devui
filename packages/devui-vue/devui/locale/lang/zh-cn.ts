export default {
  common: {
    lang: 'zh-cn'
  },
  pagination: {
    totalItemText: '所有条目',
    goToText: '跳至',
    perPage: '条/页',
    pageSize: '每页条数'
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
    commonColor: '常用颜色',
    solid: '纯色',
    linear: '线性渐变',
    radial: '径向渐变',
    used: '最近使用'
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
    noData: '暂无数据',
  },
  dataGrid: {
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
    warning: '提醒',
    upload: '上传',
    chooseFile: '选择文件',
    chooseFiles: '选择多个文件',
    preload: '预加载',
    uploading: '上传zhong...',
    uploaded: '已上传',
    uploadFailed: '上传失败',
    uploadSuccess: '上传成功!',
    delete: '删除',
    reUpload: '重新上传',
    cancelUpload: '取消上传',
    uploadFailedCount: '个文件上传失败',
    upLoading: '正在上传',
    addCount(filesCount: number): string {
      return `已添加${filesCount}个文件`
    }
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
    noData: '暂无数据',
  },
  timeSelect: {
    placeholder: '请选择时间',
  },
  relativeTime: {
    yearsAgo(num: number) {
      return num === 1 ? '去年' : `${num}年前`
    },
    monthsAgo(num: number) {
      return num === 1 ? '上个月' : `${num}个月前`
    },
    weeksAgo(num: number) {
      return num === 1 ? '上周' : `${num}周前`
    },
    daysAgo(num: number) {
      return num === 1 ? '昨天' : `${num}天前`
    },
    daysLater(num: number) {
      return num === 1 ? '明天' : `${num}天后`
    },
    weeksLater(num: number) {
      return num === 1 ? '下周' : `${num}周后`
    },
    monthsLater(num: number) {
      return num === 1 ? '下个月' : `${num}个月后`
    },
    yearsLater(num: number) {
      return num === 1 ? '明年' : `${num}年后`
    },
    hoursAgo: '小时前',
    minutesAgo: '分钟前',
    justnow: '刚刚',
    later: '稍后',
    minutesLater: '分钟后',
    hoursLater: '小时后'
  },
  modal: {
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息'
  },
  autoComplete: {
    latestInput: '最近输入',
    placeholder: '搜索',
  },
  datePicker: {
    getWeekDays(): Array<string> {
      return ['日', '一', '二', '三', '四', '五', '六'];
    },
    today: '今天',
    year: '年',
    month: '月'
  },
  form: {
    minValue: '最小值为',
    validSuccess: '校验通过',
    maxValue: '最大值为',
    maxLength: '最大长度为',
    minLength: '最小长度为',
    isTrue: '必须为true值',
    errorEmail: '邮箱格式不正确',
    errorRegular: '正则不匹配',
    notOnlySpace: '不能全为空格',
  },
  mention: {
    loading: '加载中... '
  },
  quadrantDiagram: {
    xAxisLabel: '紧急度',
    yAxisLabel: '重要度',
    importantAndUrgent: '重要紧急',
    importantNoturgent: '重要不紧急',
    notImportantNoturgent: '不重要不紧急',
    notImportantAndUrgent: '不重要紧急'
  },
  codeReview: {
    copyFilePath: '复制文件路径'
  },
  editorMd: {
    undo: '撤销',
    redo: '重做',
    clean: '清除格式',
    header: '段落样式',
    normal: '正文',
    h1: '标题1',
    h2: '标题2',
    h3: '标题3',
    h4: '标题4',
    h5: '标题5',
    h6: '标题6',
    font: '字体',
    size: '字号',
    songti: '宋体',
    yahei: '微软雅黑',
    kaiti: '楷体',
    heiti: '黑体',
    lishu: '隶书',
    bold: '粗体',
    italic: '斜体',
    underline: '下划线',
    strike: '删除线',
    color: '字体颜色',
    backgound: '背景色',
    orderedList: '有序列表',
    unorderedList: '无序列表',
    checkList: '任务列表',
    left: '左对齐',
    center: '居中',
    right: '右对齐',
    image: '图片',
    file: '文件',
    table: '表格',
    link: '超链接',
    code: '行内代码',
    codeBlock: '代码块',
    blockQuote: '引用',
    superScript: '上标',
    subScript: '下标',
    globalLink: '全局链接',
    emoji: '表情',
    fullScreen: '全屏',
    exitFullScreen: '退出全屏',
    help: '帮助',
    more: '更多',
    helpFormat: '格式',
    helpInsert: '插入',
    helpOperation: '操作',
    mention: '提及某人',
    quickMenu: '快捷菜单',
    toggleHelpPanel: '打开/关闭帮助面板',
    scrollTable: '水平滚动表格',
    mouseWheel: '鼠标滚轮',
    save: '保存',
    copyCells: '复制',
    copyTable: '复制表格',
    cutCells: '剪切',
    emptyCells: '清空内容',
    insertRowUp: '上插入行',
    insertRowDown: '下插入行',
    insertColumnLeft: '左插入行',
    insertColumnRight: '右插入行',
    mergeCells: '合并单元格',
    unmergeCells: '拆分单元格',
    deleteRow: '删除当前行',
    deleteColumn: '删除当前列',
    deleteTable: '删除表格',
    defaultLinkText: '链接',
    basicBlock: '卡片',
    linkPlaceholder: '请输入链接地址，按回车确认',
    char: '字符',
    word: '单词',
    counterLimitTips: '{{countUnit}}数超出最大允许值',
    ieMsg: '为了更好体验，请使用chrome浏览器',
    loading: '正在加载中...',
    pasting: '您粘贴内容较多, 正在努力加载中，请耐心等待...'
  }
};