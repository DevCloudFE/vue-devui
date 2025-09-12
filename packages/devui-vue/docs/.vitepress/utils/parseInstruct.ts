
type IParseInstruct = (instruct: string) => { [instruct: string]: boolean | string; filePathSuffix: string; };
/**
 * Parse Command
 * example:  button/demo/shape --use-code-box
 * result: {
 *  filePathSuffix: 'button/demo/shape',
 *  useCodeBox: true,
 * }
 */
const parseInstruct: IParseInstruct = (instruct) => {
  if (!instruct) {
    return { filePathSuffix: '' };
  }
  const commandArr = instruct.split(' ').filter((item) => item);
  const filePathSuffix = commandArr.filter((item) => !item.startsWith('-'))[0];
  const instructVal = {};
  commandArr.forEach((item) => {
    if (item.startsWith('-')) {
      let piece: string[] = item.split('-').filter((_item) => _item);
      piece = piece.map((_item, _i) => _i ? _item.slice(0, 1).toUpperCase() + _item.slice(1) : _item);
      const inst = piece.join('');
      Object.assign(instructVal, { [inst]: true });
    }
  });
  return {
    filePathSuffix,
    ...instructVal
  }
}

export default parseInstruct;