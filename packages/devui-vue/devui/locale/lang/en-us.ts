export default {
  pagination: {
    totalItemText: 'Total',
    goToText: 'Go to',
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
  },
  timeSelect: {
    placeholder: 'Please select time',
  },
};
