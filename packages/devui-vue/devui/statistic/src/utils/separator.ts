export type valueType = string | number;

export const separator = (
  SeparatorString: string, // value
  groupSeparator: string, // 千分位分隔符
): string => {
  const res = SeparatorString.replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + `${groupSeparator}`;
    });
  });
  return res;
};

export const isHasDot = (value: number): boolean => {
  if (!isNaN(value)) {
    return (value + '').indexOf('.') !== -1;
  }
  return false;
};
export const analysisValueType = (
  value: valueType, // 动态value 值
  propsValue: valueType, // 用户传入value
  groupSeparator: string, // 千位分隔符
  splitPrecisionNumber: number // 分割精度, 小数点
): string => {
  const fixedNumber =
    propsValue?.toString().indexOf('.') !== -1
      ? propsValue?.toString().length - propsValue?.toString().indexOf('.') - 1
      : 0;
  if (typeof value === 'number') {
    if (isHasDot(value)) {
      return splitPrecisionNumber
        ? separator(value.toFixed(splitPrecisionNumber).toString(), groupSeparator)
        : separator(value.toFixed(fixedNumber).toString(), groupSeparator);
    } else {
      return splitPrecisionNumber
        ? separator(value.toFixed(splitPrecisionNumber).toString(), groupSeparator)
        : separator(value.toString(), groupSeparator);
    }
  } else {
    return value;
  }
};
