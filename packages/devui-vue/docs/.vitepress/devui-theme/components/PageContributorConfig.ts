interface IContributingMap {
  [key: string]: Array<{
    avatar: string;
    homepage: string;
    founder?: boolean; // 组件创建者（从0到1创建组件）
    leader?: boolean; // 组件负责人（负责组件特性开发、缺陷修复、单元测试、文档完善）
    core?: boolean; // 核心开发者（对组件做出重大贡献）
  }>
}

export const CONTRIBUTORS_MAP: IContributingMap = {
  // 通用
  button: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/13329558?v=4',
      homepage: 'https://github.com/Zcating'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/39021499?v=4',
      homepage: 'https://github.com/daviForevel'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/24841685?v=4',
      homepage: 'https://github.com/qinwencheng'
    },
  ],
  dragdrop: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/61737780?v=4',
      homepage: 'https://github.com/asdlml6'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
  ],
  fullscreen: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/20532893?v=4',
      homepage: 'https://github.com/MICD0704'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
  ],
  icon: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/57666140?v=4',
      homepage: 'https://github.com/flingyp'
    },
  ],
  overlay: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/13329558?v=4',
      homepage: 'https://github.com/Zcating'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/10958003?v=4',
      homepage: 'https://github.com/liuxdi'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/23261843?v=4',
      homepage: 'https://github.com/to0simple'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/46524158?v=4',
      homepage: 'https://github.com/wakaka378'
    },
  ],
  panel: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/31283122?v=4',
      homepage: 'https://github.com/GaoNeng-wWw'
    },
  ],
  ripple: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/66500121?v=4',
      homepage: 'https://github.com/ErKeLost'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  search: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/29355875?v=4',
      homepage: 'https://github.com/SituC'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/22699218?v=4',
      homepage: 'https://github.com/xzxldl55'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
  ],
  status: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/25116549?v=4',
      homepage: 'https://github.com/LiuSuY'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  sticky: [
    {
      avatar: '',
      homepage: 'https://gitee.com/maizhiyuan'
    },
  ],

  // 导航
  accordion: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/74694190?v=4',
      homepage: 'https://github.com/Pineapple0919'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/10958003?v=4',
      homepage: 'https://github.com/liuxdi'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/28033581?v=4',
      homepage: 'https://github.com/annoyc'
    },
  ],
  anchor: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/43716517?v=4',
      homepage: 'https://github.com/Tmac2015'
    },
  ],
  'back-top': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/38075730?v=4',
      homepage: 'https://github.com/c0dedance'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/35223515?v=4',
      homepage: 'https://github.com/LadyChatterleyLover'
    },
  ],
  breadcrumb: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/28448589?v=4',
      homepage: 'https://github.com/jecyu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/63281354?v=4',
      homepage: 'https://github.com/angelanana'
    },
  ],
  dropdown: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/13329558?v=4',
      homepage: 'https://github.com/Zcating'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
  ],
  menu: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/31283122?v=4',
      homepage: 'https://github.com/GaoNeng-wWw'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
  ],
  'nav-sprite': [
    {
      avatar: '',
      homepage: 'https://gitee.com/flxy1028'
    },
  ],
  pagination: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/24663941?v=4',
      homepage: 'https://github.com/554246839'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  steps: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  'steps-guide': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/30283065?v=4?s=100',
      homepage: 'https://github.com/NidusP'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  tabs: [
    {
      avatar: '',
      homepage: 'https://gitee.com/flxy1028'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],

  // 反馈
  alert: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/91681351?v=4',
      homepage: 'https://github.com/chressYu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/10958003?v=4',
      homepage: 'https://github.com/liuxdi'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/39021499?v=4',
      homepage: 'https://github.com/daviForevel'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/48482395?v=4',
      homepage: 'https://github.com/GeorgeLeoo'
    },
  ],
  drawer: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/15092594?v=4',
      homepage: 'https://github.com/lnzhangsong'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/72056179?v=4',
      homepage: 'https://github.com/aolyang'
    },
  ],
  loading: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/24663941?v=4',
      homepage: 'https://github.com/554246839'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  message: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/71202421?v=4',
      homepage: 'https://github.com/79E'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/58357112?v=4',
      homepage: 'https://github.com/hxj9102'
    },
  ],
  modal: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/13329558?v=4',
      homepage: 'https://github.com/Zcating'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/50540342?v=4',
      homepage: 'https://github.com/Husky-Yellow'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/69743874?v=4',
      homepage: 'https://github.com/wowCheng'
    }
  ],
  notification: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/10958003?v=4',
      homepage: 'https://github.com/liuxdi'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/23261843?v=4',
      homepage: 'https://github.com/to0simple'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/31283122?v=4',
      homepage: 'https://github.com/GaoNeng-wWw'
    },
  ],
  popover: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/58327088?v=4',
      homepage: 'https://github.com/CatsAndMice'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/47918504?v=4',
      homepage: 'https://github.com/banlify'
    },
  ],
  'read-tip': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/62528887?v=4',
      homepage: 'https://github.com/whylost'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/26707568?v=4',
      homepage: 'https://github.com/panyongxu'
    },
  ],
  result: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/27618209?v=4',
      homepage: 'https://github.com/icjs-cc',
      founder: true,
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
  ],
  tooltip: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/61737780?v=4',
      homepage: 'https://github.com/asdlml6'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/26324442?v=4',
      homepage: 'https://github.com/zxlfly'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
  ],

  // 数据录入
  'auto-complete': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/26324442?v=4',
      homepage: 'https://github.com/zxlfly',
      founder: true,
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/66343210?v=4',
      homepage: 'https://github.com/Denver-Ning'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
  ],
  'multi-auto-complete': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/26324442?v=4',
      homepage: 'https://github.com/zxlfly',
      leader: true,
    },
  ],
  cascader: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/29355875?v=4',
      homepage: 'https://github.com/SituC'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
  ],
  checkbox: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/31237954?v=4',
      homepage: 'https://github.com/brenner8023',
      founder: true,
    },
    {
      avatar: '',
      homepage: 'https://gitee.com/liao-jianguo'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/13329558?v=4',
      homepage: 'https://github.com/Zcating'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/33192247?v=4',
      homepage: 'https://github.com/qiugu'
    },
  ],
  collapse: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/39021499?v=4',
      homepage: 'https://github.com/daviForevel'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  'color-picker': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/66500121?v=4',
      homepage: 'https://github.com/ErKeLost'
    },
  ],
  'date-picker': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/1510444?v=4',
      homepage: 'https://github.com/imnull'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/48482395?v=4',
      homepage: 'https://github.com/GeorgeLeoo'
    },
  ],
  'date-picker-pro': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/39021499?v=4',
      homepage: 'https://github.com/daviForevel'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/28448589?v=4',
      homepage: 'https://github.com/jecyu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/50767049?v=4',
      homepage: 'https://github.com/jCodeLife'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/58357112?v=4',
      homepage: 'https://github.com/hxj9102'
    },
  ],
  'editable-select': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/40349890?v=4',
      homepage: 'https://github.com/chenxi24',
      founder: true,
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
  ],
  form: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07',
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/42601044?v=4',
      homepage: 'https://github.com/AlanLee97',
      founder: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
  ],
  input: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/29355875?v=4',
      homepage: 'https://github.com/SituC',
      founder: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe',
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/48074435?v=4',
      homepage: 'https://github.com/elsaooo'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/39021499?v=4',
      homepage: 'https://github.com/daviForevel',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11595706?v=4',
      homepage: 'https://github.com/tycsbs',
    },
  ],
  'input-icon': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/1510444?v=4',
      homepage: 'https://github.com/imnull'
    },
  ],
  'input-number': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/16344566?v=4',
      homepage: 'https://github.com/git-Where',
      founder: true,
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
  ],
  radio: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/31237954?v=4',
      homepage: 'https://github.com/brenner8023',
      founder: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/22795131?v=4',
      homepage: 'https://github.com/xuehongjie',
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
  ],
  select: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/32935349?v=4',
      homepage: 'https://github.com/unfound',
      founder: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/39021499?v=4',
      homepage: 'https://github.com/daviForevel',
      core: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
  ],
  slider: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/27467603?v=4',
      homepage: 'https://github.com/xiaoboRao'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/54826175?v=4',
      homepage: 'https://github.com/ming-bin'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52768159?v=4',
      homepage: 'https://github.com/wang-zhaofei'
    },
  ],
  switch: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/31237954?v=4',
      homepage: 'https://github.com/brenner8023'
    },
    {
      avatar: '',
      homepage: 'https://gitee.com/vergil_lu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  'tag-input': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/31237954?v=4',
      homepage: 'https://github.com/brenner8023',
      founder: true,
    },
    {
      avatar: '',
      homepage: 'https://gitee.com/gu_yan'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  textarea: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/23047484?v=4',
      homepage: 'https://github.com/cuiaiguanggh',
      founder: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333',
      core: true,
    },
  ],
  'time-picker': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/58691226?v=4',
      homepage: 'https://github.com/qq154239735'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  'time-select': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  transfer: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/15258339?v=4',
      homepage: 'https://github.com/ForeseeBear'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  'tree-select': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/38213540?v=4',
      homepage: 'https://github.com/254311563'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
  ],
  upload: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/48074435?v=4',
      homepage: 'https://github.com/elsaooo'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],

  // 数据展示
  avatar: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/48074435?v=4',
      homepage: 'https://github.com/elsaooo'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
  ],
  badge: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/30541930?v=4',
      homepage: 'https://github.com/duqingyu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/20532893?v=4',
      homepage: 'https://github.com/MICD0704'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/24841685?v=4',
      homepage: 'https://github.com/qinwencheng'
    },
  ],
  card: [
    {
      avatar: '',
      homepage: 'https://gitee.com/vergil_lu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52768159?v=4',
      homepage: 'https://github.com/wang-zhaofei'
    },
  ],
  carousel: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/7751774?v=4',
      homepage: 'https://github.com/Roading'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  comment: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/40553790?v=4',
      homepage: 'https://github.com/nextniko'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  countdown: [
    {
      avatar: '',
      homepage: 'https://gitee.com/HeQinQins'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/41265413?v=4',
      homepage: 'https://github.com/Innei'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32407134?v=4',
      homepage: 'https://github.com/qinqinhe'
    },
  ],
  dashboard: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/7751774?v=4',
      homepage: 'https://github.com/Roading'
    },
  ],
  gantt: [
    {
      avatar: '',
      homepage: 'https://gitee.com/liuyingbin'
    },
  ],
  'image-preview': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/30541930?v=4',
      homepage: 'https://github.com/duqingyu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/10958003?v=4',
      homepage: 'https://github.com/liuxdi'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
  ],
  list: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
  ],
  progress: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/67035714?v=4',
      homepage: 'https://github.com/devin974'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  'quadrant-diagram': [
    {
      avatar: '',
      homepage: 'https://gitee.com/nowisfuture'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  rate: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/48074435?v=4',
      homepage: 'https://github.com/elsaooo'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/52314078?v=4',
      homepage: 'https://github.com/vaebe'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  skeleton: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/70649502?v=4',
      homepage: 'https://github.com/ivestszheng',
      founder: true,
      leader: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/15258339?v=4',
      homepage: 'https://github.com/ForeseeBear'
    },
    {
      avatar: '',
      homepage: 'https://gitee.com/georgeleeo_jxd'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  statistic: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/20873286?v=4',
      homepage: 'https://github.com/17714574361'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/66500121?v=4',
      homepage: 'https://github.com/ErKeLost'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  table: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/13329558?v=4',
      homepage: 'https://github.com/Zcating'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/70649502?v=4',
      homepage: 'https://github.com/ivestszheng'
    },
    {
      avatar: '',
      homepage: 'https://gitee.com/georgeleeo_jxd'
    },
    {
      avatar: '',
      homepage: 'https://gitee.com/weban'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/22699218?v=4',
      homepage: 'https://github.com/xzxldl55'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/22176126?v=4',
      homepage: 'https://github.com/TerminatorSd'
    },
  ],
  tag: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/38075730?v=4',
      homepage: 'https://github.com/c0dedance'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/8649913?v=4',
      homepage: 'https://github.com/lj1990111'
    },
  ],
  timeline: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/46488783?v=4',
      homepage: 'https://github.com/JensonMiao'
    },
  ],
  tree: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/9566362?v=4',
      homepage: 'https://github.com/kagol'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/46395105?v=4',
      homepage: 'https://github.com/sufuwang'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/87163017?v=4',
      homepage: 'https://github.com/faq0192'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/39021499?v=4',
      homepage: 'https://github.com/daviForevel'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/11143986?v=4',
      homepage: 'https://github.com/xingyan95'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32949033?v=4',
      homepage: 'https://github.com/newer2333'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/39939976?v=4',
      homepage: 'https://github.com/foolmadao'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/74694190?v=4',
      homepage: 'https://github.com/NoTwoBoy'
    },
  ],
  // 布局
  grid: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/54826175?v=4',
      homepage: 'https://github.com/ming-bin'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/76561071?v=4',
      homepage: 'https://github.com/liyao1520'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/34124930?v=4',
      homepage: 'https://github.com/Lonely-shang'
    },
  ],
  layout: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/54833732?v=4',
      homepage: 'https://github.com/zzztwx',
      founder: true,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  splitter: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/28448589?v=4',
      homepage: 'https://github.com/jecyu'
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
  'virtual-list': [
    {
      avatar: 'https://avatars.githubusercontent.com/u/40119767?v=4',
      homepage: 'https://github.com/linxiang07'
    },
  ],
}
