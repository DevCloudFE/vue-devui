/**
 * 功能函数
 */

// 处理页码显示
// 1 ... 5 6 7 8 ... 11
export const handlePages = (cursor: number, maxItems: number, totalPages: number): number[] => {
  const currentPage = cursor; // 当前页码
  const maxPages = maxItems;  // 能显示的最大页码
  if (maxPages >= totalPages) {
    return [2, totalPages];
  }

  const midPages = maxPages - 2;    // 中间显示的页码
  // 1 ... 5 6 7 8 ... 11
  // 获取 5 和 8
  let midStart = currentPage - (midPages >> 1);
  let midEnd = currentPage + (midPages - 1 >> 1);

  if (midStart < 2) {
    midStart = 2;
    midEnd = maxPages - 2;
  }

  if (midEnd > totalPages) {
    midStart = totalPages - maxPages + 3;
    midEnd = totalPages;
  }

  return [midStart, midEnd];
};

// 处理极简模式下的页码下拉多选显示
export function liteSelectOptions(total: number): Array<{name: string; value: number}> {
  return new Array(total || 1).fill(0).map((v: number, index: number) => {
    return {
      name: `${index + 1}/${total}`,
      value: index + 1
    };
  });
}

