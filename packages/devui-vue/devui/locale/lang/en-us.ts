export default {
  pagination: {
    totalItemText: 'Total',
    goToText: 'Go to',
    perPage: 'Size/Page',
    pageSize: 'Number of entries per page'
  },
  accordion: {
    loading: 'loading',
    noData: 'No Data',
  },
  autoCompleteDropdown: {
    latestInput: 'Latest input',
  },
  cascaderList: {
    noData: 'No data',
  },
  colorPicker: {
    foundationPanel: 'Foundation panel',
    advancedPanel: 'Advanced panel',
  },
  datePickerPro: {
    ok: 'OK',
    placeholder: 'select date',
    month1: 'Jan',
    month2: 'Feb',
    month3: 'Mar',
    month4: 'Apr',
    month5: 'May',
    month6: 'June',
    month7: 'July',
    month8: 'Aug',
    month9: 'Sep',
    month10: 'Oct',
    month11: 'Nov',
    month12: 'Dec',
    year: '年',
    startPlaceholder: 'select start date',
    endPlaceholder: 'select end date',
    getWeekDays(): Array<string> {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    },
    getTimeArr(): Array<string> {
      return ['Hr', 'Min', 'Sec'];
    },
    getYearMonthStr(year: number, month: number): string {
      return `${year} - ${month}`;
    },
  },
  editableSelect: {
    noRelatedRecords: 'No related records found',
    noData: 'No data',
  },
  input: {
    placeholder: 'Please enter',
  },
  splitterBar: {
    collapse: 'Collapse',
    expand: 'Expand',
  },
  stepsGuide: {
    previous: 'Previous',
    continue: 'Continue',
    ok: 'OK',
  },
  table: {
    selectAll: 'Select all',
    ok: 'OK',
  },
  timePopup: {
    ok: 'OK',
  },
  transfer: {
    unit: '',
    panelUnit: '',
    headerUnit: '',
    noData: 'No Data',
    placeholder: 'Please enter keywords',
  },
  tree: {
    loading: 'Loading',
    newNode: 'New node',
    selectPlaceholder: 'Please select',
  },
  upload: {
    placeholder: 'select file',
    getExistSameNameFilesMsg(sameNames: string): string {
      return `Duplicate files exist : "${sameNames}" `;
    },
    getAllFilesBeyondMaximalFileSizeMsg(maximalSize: number): string {
      return `Maximum file size (MB): ${maximalSize}. The selected files exceed the maximum value`;
    },
    getBeyondMaximalFileSizeMsg(filename: string, maximalSize: number): string {
      return `Maximum file size (MB): ${maximalSize}. Files whose size exceeds the maximum value: ${filename}`;
    },
    getNotAllowedFileTypeMsg(filename: string, scope: string): string {
      return `Files with unsupported types: ${filename}. Supported file types: ${scope}`;
    },
  },
  search: {
    placeholder: 'Enter a keyword',
  },
  select: {
    placeholder: 'Please select',
    noDataText: 'No data',
    noMatchText: 'No related records found',
    loadingText: 'Loading...',
  },
  tagInput: {
    maxTagsText: 'Maximum number reached: ',
    noData: 'No Data',
  },
  timeSelect: {
    placeholder: 'Please select time',
  },
  modal: {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Infomation'
  },
  autoComplete: {
    latestInput: 'Latest Input'
  },
  datePicker: {
    getWeekDays(): Array<string> {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    },
    today: 'Today',
    year: ' ',
    month: ' '
  },
  form: {
    minValue: 'The minimum value is',
    validSuccess: 'Verification passed',
    maxValue: 'The maximum value is',
    maxLength: 'The maximum length is',
    minLength: 'The minimum length is',
    isTrue: 'must be a true value',
    errorEmail: 'The email format is incorrect',
    errorRegular: 'Regular mismatch',
    notOnlySpace: 'Cannot be all spaces',
  },
  mention: {
    loading: 'Loading... '
  },
  quadrantDiagram: {
    xAxisLabel: 'Urgency',
    yAxisLabel: 'Importance',
    importantAndUrgent: 'Important and urgent',
    importantNoturgent: 'Important not urgent',
    notImportantNoturgent: 'Not important, not urgent',
    notImportantAndUrgent: 'Not important and urgent'
  },
  codeReview: {
    copyFilePath: 'Copy File Path'
  },
  editorMd: {
    undo: 'Undo',
    redo: 'Redo',
    clean: 'Clear format',
    header: '段落样式',
    normal: 'Text',
    h1: 'Title 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Title 4',
    h5: 'Title 5',
    h6: 'Title 6',
    font: 'Font',
    size: 'Font size',
    songti: 'Tahoma',
    yahei: 'Microsoft Yahei',
    kaiti: 'Regular script',
    heiti: 'Bold',
    lishu: 'Official script',
    bold: 'Bold',
    italic: 'Italic',
    underline: 'underline',
    strike: 'Strike through the line',
    color: 'Font color',
    background: 'Background color',
    orderedList: 'Ordered List',
    unorderedList: 'Unordered List',
    checkList: 'Task List',
    left: 'Left aligned',
    center: 'Center',
    right: 'Right aligned',
    image: 'Image',
    file: 'File',
    table: 'Table',
    link: 'hyperlink',
    code: 'In line code',
    codeBlock: 'Code block',
    blockQuote: 'Reference',
    superscript: 'Superscript',
    subscript: 'Subscript',
    globalLink: 'Global Link',
    emoji: 'emoji',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit full screen',
    help: 'Help',
    more: 'More',
    helpFormat: 'Format',
    helpInsert: 'Insert',
    helpOperation: 'Operation',
    mention: 'Mention someone',
    quickMenu: 'Shortcut Menu',
    toggleHelpPanel: 'Open/Close Help Panel',
    scrollTable: 'Horizontal scrolling table',
    mouseWheel: 'Mouse wheel',
    save: 'Save',
    copyCells: 'Copy',
    copyTable: 'Copy Table',
    cutCells: 'Cut',
    emptyCells: 'Empty content',
    insertRowUp: 'Insert row on',
    insertRowDown: 'Insert row below',
    insertColumnLeft: 'Insert row left',
    insertColumnRight: 'Insert row right',
    mergeCells: 'Merge Cells',
    unmergeCells: 'Split Cells',
    deleteRow: 'Delete the current row',
    deleteColumn: 'Delete the current column',
    deleteTable: 'Delete Table',
    defaultLinkText: 'Link',
    basicBlock: 'Card',
    linkPlaceholder: 'Please enter the link address and press Enter to confirm',
    char: 'character',
    word: 'Word',
    countLimitTips: '{{countUnit}} number exceeds the maximum allowed value',
    ieMsg: 'For a better experience, please use Chrome browser',
    loading: 'Loading...',
    pasting: 'You have pasted a lot of content and are working hard to load it. Please be patient and wait...'
  }
};
