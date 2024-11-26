import type { PropType, ExtractPropTypes, InjectionKey, Ref } from 'vue';
import { DEFAULT_TOOLBAR_CONFIG, IToolbarItemConfig } from './toolbar-config';
import { RenderRule } from 'markdown-it/lib/renderer';

export interface MDThemeToolbarConfig {
  icons: { [key: string]: string };
}

export interface MDThemeConfig {
  toolbar: MDThemeToolbarConfig;
}

export interface MdPlugin {
  plugin: any;
  opts?: Record<string, unknown>;
}

export interface ICustomXssRule {
  key: string;
  value: string[] | null;
}

export interface ICustomRenderRule {
  key: string;
  value: RenderRule;
}

export type Mode = 'editonly' | 'readonly' | 'normal';

export type ToolbarConfigProp = Array<string | string[]>;

const commonProps = {
  baseUrl: {
    type: String,
    default: null,
  },
  breaks: {
    type: Boolean,
    default: true,
  },
  customParse: {
    type: Function as PropType<(html: string) => string>,
    default: null,
  },
  renderParse: {
    type: Function as PropType<(html: string) => string>,
    default: null,
  },
  mdRules: {
    type: Object,
    default: () => ({}),
  },
  customRendererRules: {
    type: Array as PropType<Array<ICustomRenderRule>>,
    default: () => [],
  },
  customXssRules: {
    type: Array as PropType<Array<ICustomXssRule>>,
    default: () => [],
  },
  mdPlugins: {
    type: Array as PropType<Array<MdPlugin>>,
    default: () => [],
  },
};

export interface HintConfigItem {
  handler: (objs: { callback: (replaceText: string) => void; cursorHint: string; prefix: string }) => void;
}

export const editorMdProps = {
  ...commonProps,
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String as PropType<Mode>,
    default: 'normal',
  },
  customThemeConfig: {
    type: Object as PropType<MDThemeConfig>,
  },
  customToolbars: {
    type: Object as PropType<Record<string, IToolbarItemConfig>>,
  },
  disableChangeEvent: {
    type: Boolean,
    default: false,
  },
  editorContainerHeight: {
    type: Number,
  },
  imageUploadToServer: {
    type: Boolean,
    default: false,
  },
  hidePreviewView: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
  toolbarConfig: {
    type: Array as PropType<ToolbarConfigProp>,
    default: (): (string[] | string)[] => DEFAULT_TOOLBAR_CONFIG,
  },
  fullscreenZIndex: {
    type: Number,
    default: 10,
  },
  hintConfig: {
    type: Object as PropType<Record<string, HintConfigItem | number>>,
    default: {},
  },
  customHintReplaceFn: {
    type: Function as PropType<(prefix: string, row: any) => string>,
  },
  beforeShowHint: {
    type: Function as PropType<(value: string) => boolean>,
  },
};

export type EditorMdProps = ExtractPropTypes<typeof editorMdProps>;

export interface IEditorMdInjection {
  showFullscreen: Ref<boolean>;
  toolbars: Record<string, IToolbarItemConfig>;
  toolbarConfig: Ref<ToolbarConfigProp>;
  customToolbars: Ref<Record<string, IToolbarItemConfig> | undefined> | undefined;
  getEditorIns: () => any;
  t: (name: string) => string;
}

export const EditorMdInjectionKey: InjectionKey<IEditorMdInjection> = Symbol('d-editor-md');

export const mdRenderProps = {
  ...commonProps,
  content: {
    type: String,
    default: '',
  },
  disableRender: {
    type: Boolean,
    default: false,
  },
};

export type MdRenderProps = ExtractPropTypes<typeof mdRenderProps>;

export const mdToolbarItemProps = {
  config: {
    type: Object as PropType<IToolbarItemConfig>,
    default: () => ({}),
  },
};

export type MdToolbarItemProps = ExtractPropTypes<typeof mdToolbarItemProps>;
