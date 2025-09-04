# 主题定制
 
`DevUI Theme`是`DevUI`提供的一个框架无关的通用主题定制方案，内置丰富的主题，并支持自定义主题。
 
`DevUI Theme`提供了5种内置主题：
 
内置主题：
- 无限主题`infinityTheme`（默认主题）
- 紫罗兰主题`provenceTheme`
- 蜜糖主题`sweetTheme`
- 深邃夜空主题`deepTheme`
- 追光主题`galaxyTheme`
 
### 安装 DevUI Theme
 
```shell
npm i devui-theme
```
 
### 初始化主题
 
```ts
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
 
// 使用无限主题
ThemeServiceInit({ infinityTheme }, 'infinityTheme');
```
 
### 切换主题
 
```ts
import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';

import { infinityTheme } from 'devui-theme';
 
// 初始是 infinityTheme 无限主题
const themeService = ThemeServiceInit({ infinityTheme }, 'infinityTheme');
 
// 可以动态切换成 galaxyTheme 追光主题
themeService.applyTheme(galaxyTheme);
```
 
### 自定义主题
 
可以通过给`ThemeServiceInit`传参支持自定义主题。
 
#### 创建自定义主题
 
可以通过`new Theme`新建一个主题，并从默认主题里面改变颜色、字号、圆角、阴影值等。
 
创建一个`my-theme.ts`文件，写入以下内容：
 
```ts
import { Theme, devuiLightTheme, devuiDarkTheme } from 'devui-theme';
 
export const myLightTheme: Theme = new Theme({
  id: 'my-light-theme',
  name: 'My Light Theme',
  cnName: '我的浅色主题',
  data: Object.assign({}, devuiLightTheme.data, {
    'devui-global-bg': '#ccc',
  }),
  isDark: false,
});
 
export const myDarkTheme: Theme = new Theme({
  id: 'my-dark-theme',
  name: 'My Dark Theme',
  cnName: '我的深色主题',
  data: Object.assign({}, devuiDarkTheme.data, {
    'devui-global-bg': '#333',
  }),
  isDark: true,
});
```
 
#### 使用自定义主题
 
只需要将自定义主题传到`ThemeServiceInit`的第一个参数即可完成自定义主题的注册。
 
```ts
import { ThemeServiceInit } from 'devui-theme';
import { myLightTheme, myDarkTheme } from './my-theme';
 
ThemeServiceInit(
  {
    'my-light-theme': myLightTheme,
    'my-dark-theme': myDarkTheme,
  },
  'my-light-theme'
);
```
 
### API
 
<br>
<br>
 
#### ThemeServiceInit 函数
 
`ThemeServiceInit`的函数定义如下：
 
```ts
ThemeServiceInit(
    themes?: {[themeName: string]: Theme},
    defaultThemeName?: string,
    extraData?: {[themeName: string]: {
      appendClasses?: Array<string>,
      cssVariables?: {
        [cssVarName: string]: string
      }
    }},
    ieSupport = true
): ThemeService;
```
 
- themes: 可以用于切换的所有主题 Map 对象，key 值为主题名字，value 为主题类实例。
- defaultThemeName: 默认主题名字，为 themes 中的一个，在 localStorage 没有指定上一次的主题名字的情况下会使用 defaultThemeName。
- extraData: 主题的额外数据，用于做三方库兼容，key 值为主题名字， value 为对象，appendClasses 字段指定 body 绑定的类，cssVariables 为主题额外的自定义变量。
- ieSupport：是否打开 ie 支持，目前使用 css-var-polyfill 方案支持 ie 切换主题。
 
`ThemeServiceInit`函数返回一个`themeService`实例，该实例主要包含以下变量和方法：
 
- `currentTheme`：获取当前主题
- `applyTheme`：动态切换主题
 
#### Theme 主题类
 
主题类用来创建自定义主题，主要包含以下属性：
 
```ts
export class Theme {
  id: ThemeId;                    // 主题ID
  name: string;                   // 主题名称
  cnName?: string;                // 主题中文名称
  data: {                         // 主题变量数据
    [cssVarName: string]: string;
  };
  isDark?: boolean;               // 是否是深色主题
}
```

# 组件国际化
 
我们提供了一种比较简洁的方法，可以方便的进行组件的国际化。
内置支持中文（zh-CN）和英文（en-US）两种，也支持自定义其他语言，并且可以在添加的语言列表中任意随意切换。

<a href="https://github.com/DevCloudFE/vue-devui/tree/dev/packages/devui-vue/devui/locale/lang" target="_blank">多语言文件格式</a>

在main.ts中引用并注册即可（不调用则默认是中文）:


 #### 初始化

```ts
import { createApp } from 'vue';
import LocalInstall from 'vue-devui/locale';
const app = createApp(App);
// 直接初始化使用
app.use(LocalInstall);

// 指定语言初始化使用
app.use(LocalInstall, 'en-US');
```

 #### 切换语言
```ts
import { Locale } from 'vue-devui/locale';
Locale.use('zh-CN');

// 使用自定义语言，假如你有一个多语言文件为jaJP（具体的文件格式参照上述链接中的多语言文件格式）
Locale.add({ 'ja-JP': jaJP });
Locale.use('ja-JP');
```

有些组件暂未完备国际化配置，欢迎各位同学查漏补缺，[加入我们](/contributing/)，贡献代码。