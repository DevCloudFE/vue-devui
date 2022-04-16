import {hightLightFn} from './utils';
interface Bind {
  value: string;
}

export default  {
  name: 'd-anchor',
  // 挂载事件到dom
  // 1.点击对应link高亮
  // 2.href+#+bing.value

  mounted(el: HTMLElement, binding: Bind): void {
    const parent: Element = el.parentNode  as Element;
    if (!parent.className) {
      parent.className = 'mycontent';
    }
    el.innerHTML = '<a class="box-anchor" style="display:none" href="#'+binding.value+'">?</a>' + el.innerHTML;
    el.className = 'section-block';
    // anchor-active-by-scroll
    el.setAttribute('name',binding.value);
    el.onclick = e => {
      hightLightFn(binding.value);

    };
  }
};

