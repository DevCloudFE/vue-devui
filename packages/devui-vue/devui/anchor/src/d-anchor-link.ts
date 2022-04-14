import { scrollToControl } from './utils';
interface Bind {
  value: string;
}

export default  {
  name: 'd-anchor-link',
  // 当被绑定的元素挂载到 DOM 中时……
  // 1.点击滚动到对应位置，并且高亮
  // 2.到对应位置后，改变url后hash

  mounted(el: HTMLElement,binding: Bind): void {
    const parent: Element = el.parentNode  as Element;
    if (!parent.className) {
      parent.className = 'mysidebar step-nav';
    }
    el.className = 'bar-link-item';
    el.innerHTML += '<a class="d-d-anchor" style="display:none" href="#'+binding.value+'">?</a>';
    el.setAttribute('id', binding.value);

    el.onclick = () => {
      let scrollContainer: any;
      const scollToDomY = document.getElementsByName(binding.value)[0];
      document.getElementsByClassName('scrollTarget').length
        ? scrollContainer = document.getElementsByClassName('scrollTarget')[0]
        : scrollContainer = window;
      scrollToControl(scollToDomY, scrollContainer);

    };
  }
};
