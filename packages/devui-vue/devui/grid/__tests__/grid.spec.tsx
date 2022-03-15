import { mount } from '@vue/test-utils';
import { Row, Col } from '../index';
import { Justify, Align, ColProps } from '../src/grid-types';
import { screenMedias } from '../src/use-screen';

describe('d-row', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });

  it('d-row init', () => {
    const wrapper = mount(Row);
    expect(wrapper.classes()).toEqual(['devui-row', 'devui-row-align-top', 'devui-row-justify-start']);
  });

  const justify: Justify[] = ['start', 'end', 'center', 'around', 'between'];
  justify.forEach(item => {
    it(`d-row justify ${item}`, () => {
      const wrapper = mount(Row, {
        props: { justify: item }
      });
      expect(wrapper.classes(`devui-row-justify-${item}`)).toBe(true);
    });
  });

  const align: Align[] = ['top', 'middle', 'bottom'];
  align.forEach(item => {
    it(`d-row align ${item}`, () => {
      const wrapper = mount(Row, {
        props: { align: item }
      });
      expect(wrapper.classes(`devui-row-align-${item}`)).toBe(true);
    });
  });

  it('d-row wrap', () => {
    const wrapper = mount(Row, {
      props: { wrap: true }
    });
    expect(wrapper.classes('devui-row-wrap')).toBe(true);
  });
});

describe('d-col', () => {

  const value = 8;

  it('d-col flex', () => {
    const component = <Row>
      <Col flex={value}></Col>
    </Row>;
    const wrapper = mount(component);
    expect(wrapper.find('.devui-col').attributes()).toMatchObject({ style: `flex: ${value} ${value} auto;` });
  });


  it('d-col order', () => {
    const component = <Row>
      <Col order={value}></Col>
    </Row>;
    const wrapper = mount(component);
    expect(wrapper.find('.devui-col').attributes()).toMatchObject({ style: `order: ${value};` });
  });

  const props: (keyof ColProps)[] = ['span', 'offset', 'pull', 'push'];
  props.forEach(item => {
    const prop = { [item]: value };
    const component = <Row>
      <Col { ...prop }></Col>
    </Row>;
    it(`d-col ${item}`, () => {
      const wrapper = mount(component);
      expect(wrapper.findAll(`.devui-col-${item}-${value}`).length).toBe(1);
    });
  });

  const sizes = Object.keys(screenMedias) as (keyof typeof screenMedias)[];
  sizes.forEach(item => {
    const prop = { [item]: value };
    const component = <Row>
      <Col { ...prop }></Col>
    </Row>;
    it(`d-col ${item} span`, () => {
      const wrapper = mount(component);
      console.log(wrapper.html());
      expect(wrapper.findAll(`.devui-col-${item}-span-${value}`).length).toBe(1);
    });
  });

  it('d-row gutter', () => {
    const component1 = <Row gutter={8}>
      <Col></Col>
    </Row>;
    const component2 = <Row gutter={[8, 8]}>
      <Col></Col>
    </Row>;
    // const component3 = <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 }}>
    //   <Col></Col>
    // </Row>
    const wrapper1 = mount(component1);
    const wrapper2 = mount(component2);
    // const wrapper3 = mount(component3)
    expect(wrapper1.find('.devui-col').attributes()).toMatchObject({ style: 'padding: 0px 4px 0px 4px;' });
    expect(wrapper2.find('.devui-col').attributes()).toMatchObject({ style: 'padding: 4px 4px 4px 4px;' });
    // expect(wrapper3.find('.devui-col').attributes()).toMatchObject({ style: 'padding: 4px 4px 4px 4px;' })
  });
});
