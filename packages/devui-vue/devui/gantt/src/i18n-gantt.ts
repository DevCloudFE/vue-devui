export const i18nText = {
  en: {
    today: 'today',
    monthsOfYear: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    yearDisplay(year: string): string {
      return `${year}`;
    },
    monthDisplay(strMonthIndex: string): string {
      return this.monthsOfYear[Number(strMonthIndex) - 1];
    },
    yearAndMonthDisplay(year: string, strMonthIndex: string): string {
      return this.yearDisplay(year) + this.monthDisplay(strMonthIndex);
    },
  },
  zh: {
    today: '今天',
    monthsOfYear: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    yearDisplay(year: string): string {
      return `${year}年`;
    },
    monthDisplay(strMonthIndex: string): string {
      return this.monthsOfYear[Number(strMonthIndex) - 1];
    },
    yearAndMonthDisplay(year: string, strMonthIndex: string): string {
      return this.yearDisplay(year) + this.monthDisplay(strMonthIndex);
    },
  },
};
