import { defineComponent, toRefs } from 'vue';
import { buttonProps } from '../../devui/button/src/api';

export default defineComponent({
  name: 'DComponentApi',
  props: {
    data: {
      type: Object,
      default: buttonProps,
    },
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { data } = toRefs(props);

    return () => {
      return (
        <table>
          <thead>
            <tr>
              <th style="text-align:left;">
                参数名
              </th>
              <th style="text-align:left;">
                类型
              </th>
              <th style="text-align:left;">
                默认
              </th>
              <th style="text-align:left;">
                说明
              </th>
              <th style="text-align:left;">
                跳转 Demo
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Object.entries(data.value).map(([key, value]) => {
                return (
                  <tr>
                    <td style="text-align:left;">{ key }</td>
                    <td style="text-align:left;">
                      {
                        value.typeName
                          ? <a href={`#${value.typeName.toLowerCase()}`}>
                            { value.typeName }
                          </a>
                          : <code>{ value.type.name }</code>
                      }
                    </td>
                    <td style="text-align:left;">
                      {
                        value.defaultName || (typeof value.default === 'boolean' ? String(value.default) : value.default) || '--'
                      }
                    </td>
                    <td style="text-align:left;">{ value.required ? '必选' : '可选'}，{ value.desc }</td>
                    <td style="text-align:left;">
                      {
                        value.demo
                        && <a href={`#${value.demo}`}>
                          { value.demo }
                        </a>
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      );
    };
  },
});
