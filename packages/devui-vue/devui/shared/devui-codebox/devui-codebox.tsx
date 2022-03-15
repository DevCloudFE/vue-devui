import { defineComponent, ref } from 'vue';
import { DevuiSourceData } from './devui-source-data';
import CollapseIcon from './codebox-collapse-icon';
import CopyIcon from './codebox-copy-icon';
import CopiedIcon from './codebox-copied-icon';
import DevuiTabs from '../../tabs/tabs';
import DevuiTab from '../../tabs/tab';
import DevuiHighlight from '../devui-highlight/devui-highlight';

import './devui-codebox.scss';

export default defineComponent({
  name: 'DCodebox',
  props: {
    id: String,
    sourceData: {
      type: Array as () => DevuiSourceData[],
      default: []
    }
  },
  setup(props, ctx) {
    const sourceData  = props.sourceData;
    const expanded = ref(false);
    const _copied = ref(false);
    const codeTabID = ref('TSX');
    let componentCode: Array<any>;

    const toggleCode = () => {
      expanded.value = !expanded.value;
    };

    const copyCode = (code: string) => {
      copy(code).then(() => {
        _copied.value = true;
        setTimeout(() => {
          _copied.value = false;
        }, 1000);
      });
    };
    const copy = (value: string): Promise<string> => {
      const promise = new Promise<string>((resolve, reject): void => {
        let copyTextArea = null as unknown as HTMLTextAreaElement;
        try {
          copyTextArea = document.createElement('textarea');
          copyTextArea.style.height = '0px';
          copyTextArea.style.opacity = '0';
          copyTextArea.style.width = '0px';
          document.body.appendChild(copyTextArea);
          copyTextArea.value = value;
          copyTextArea.select();
          document.execCommand('copy');
          resolve(value);
        } finally {
          if (copyTextArea && copyTextArea.parentNode) {
            copyTextArea.parentNode.removeChild(copyTextArea);
          }
        }
      });
      return (promise);
    };

    return () => {
      return (
        <section class={{'code-box': true, 'expand': expanded.value}}>
          <section class='code-box-demo'>
            <div>
              {ctx.slots.default && ctx.slots.default()}
            </div>
          </section>
          <section class="code-box-meta markdown">
            {/* TODO: 待添加tootltip */}
            <span class="collapse" onClick={toggleCode}>
              <CollapseIcon></CollapseIcon>
            </span>
          </section>
          <section class={{ 'highlight-wrapper': true, 'highlight-wrapper-expand': expanded.value }}>
            <div style="padding: 0 20px">
              <DevuiTabs v-model={codeTabID.value}>
                {sourceData.map(item => {
                  return (
                    <DevuiTab title={item.title} id={item.title}>
                      <div class="highlight">
                        <div class="code-box-actions">
                          <span onClick={() => copyCode(item.code.default || item.code)}>
                            { !_copied.value ? <CopyIcon></CopyIcon> : <CopiedIcon></CopiedIcon>}
                          </span>
                        </div>
                        <DevuiHighlight code={item.code.default || item.code} language={item.language}></DevuiHighlight>
                      </div>
                    </DevuiTab>
                  );
                })}
              </DevuiTabs>
            </div>
          </section>
        </section>
      );
    };
  }
});
