import { mount } from '@vue/test-utils';
import TipsTemplate from '../src/read-tip-template';


describe('read-tip test', () => {

  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'readtip-target';
    document.body.appendChild(el);
  });

  afterEach(() => {
    // clean up
    document.body.outerHTML = '';
  });
  it('read-tip init render', async () => {
    // 基础用法

    const defaultTemplateProps = {
      position: 'top',
      appendToBody: false,
      selector: '#readtip-target',
      title: 'Name: Jack',
      content: 'This is Jack\'s profile',
    };
    mount(TipsTemplate, {
      props: {
        defaultTemplateProps
      }
    });

    expect(document.querySelector(defaultTemplateProps.selector)?.innerHTML).toContain(defaultTemplateProps.title);

    expect(document.querySelector(defaultTemplateProps.selector)?.innerHTML).toContain(defaultTemplateProps.content);


  });

  const position = ['top', 'left', 'right', 'bottom'];

  position.forEach(pos => {
    it(`read-tip position ${pos}`, async () => {
      // 基础用法

      const defaultTemplateProps = {
        position: pos,
        appendToBody: false,
        selector: '#readtip-target',
        title: 'Name: Jack',
        content: 'This is Jack\'s profile',
      };
      mount(TipsTemplate, {
        props: {
          defaultTemplateProps
        }
      });

      expect(document.querySelector(defaultTemplateProps.selector)?.innerHTML)
        .toContain('read-tip-container ' + defaultTemplateProps.position);

    });
  });

  it('read-tip appendToBody = true', async () => {
    // 基础用法

    const defaultTemplateProps = {
      position: 'top',
      appendToBody: true,
      selector: '#readtip-target',
      title: 'Name: Jack',
      content: 'This is Jack\'s profile',
    };
    mount(TipsTemplate, {
      props: {
        defaultTemplateProps
      }
    });

    expect(document.querySelector(defaultTemplateProps.selector)?.innerHTML).toBe('');

    expect(document.querySelector(defaultTemplateProps.selector)?.innerHTML).not.toContain(defaultTemplateProps.title);

    expect(document.querySelector(defaultTemplateProps.selector)?.innerHTML).not.toContain(defaultTemplateProps.content);


  });

  it('read-tip contentTemplate', async () => {
    // 基础用法

    const defaultTemplateProps = {
      position: 'top',
      appendToBody: false,
      selector: '#readtip-target',
      contentTemplate: true
    };
    mount(TipsTemplate, {
      props: {
        defaultTemplateProps
      },
      slots: {
        default: `<div> I am test </div>`
      }
    });

    expect(document.querySelector(defaultTemplateProps.selector)?.innerHTML).toContain('<div> I am test </div>');


  });

  it('read-tip dataFn', async () => {
    // 基础用法
    function getDataFromDB({ element, rule }) {
      return { content: element.innerHTML, title: rule.key };
    }
    const defaultTemplateProps = {
      appendToBody: false,
      selector: '#readtip-target',
      dataFn: getDataFromDB,
      key: 'GetData'
    };
    mount(TipsTemplate, {
      props: {
        defaultTemplateProps
      },

    });

    expect(document.querySelector(defaultTemplateProps.selector).innerHTML).toContain('GetData');
  });

  it('read-tip overlayClassName', async () => {
    function getDataFromDB({ element, rule }) {
      return { content: element.innerHTML, title: rule.key };
    }
    // 基础用法
    const defaultTemplateProps = {
      appendToBody: false,
      selector: '#readtip-target',
      dataFn: getDataFromDB,
      key: 'GetData',
      overlayClassName: 'red'
    };
    mount(TipsTemplate, {
      props: {
        defaultTemplateProps
      },

    });

    expect(document.querySelector(defaultTemplateProps.selector).innerHTML).toContain(defaultTemplateProps.overlayClassName);
  });
});


