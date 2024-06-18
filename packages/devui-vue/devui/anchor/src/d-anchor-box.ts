import { setActiveLink, onScroll } from './utils';
import { inBrowser, randomId } from '../../shared/utils';

const cssChange = (mysidebar: HTMLElement, postion: string, top: number, left: number) => {
  mysidebar.style.position = postion;
  mysidebar.style.top = top + 'px';
  mysidebar.style.left = left + 'px';
};

const addEvent = (function () {
  if (inBrowser && 'addEventListener' in window) {
    return function (elm: Element, type: string, handle: EventListenerOrEventListenerObject) {
      elm.addEventListener(type, handle, false);
    };
  }
})();

const removeEvent = (function () {
  if (inBrowser && 'removeEventListener' in window) {
    return function (elm: Element, type: string, handle: EventListenerOrEventListenerObject) {
      elm.removeEventListener(type, handle, false);
    };
  }
})();

export default {
  name: 'DAnchorBox',
  // 滚动区域
  // 1.监听window滚动或滚动容器滚动，切换link+active,改变#
  mounted(el: HTMLElement): void {
    const timeId = 'm' + randomId(8);
    el.id = timeId;
    // 添加ng class名
    const classList = el.classList;
    classList.add('mycontainer', 'mymain', timeId);
    // 监听window
    let windowScrollTop;
    const div = document.querySelector(`#${timeId}`) as HTMLElement;

    const mysidebar = document.querySelector(`#${timeId} .mysidebar`) as HTMLElement;
    // 假设 this.sidebar 的类型为 HTMLElement

    const mysidebarHeight = mysidebar.clientHeight;
    window.addEventListener('resize', () => {
      cssChange(mysidebar, 'absolute', 0, 0);
    });
    window.onscroll = function () {
      // 为了保证兼容性，这里取两个值，哪个有值取哪一个
      // scrollTop就是触发滚轮事件时滚轮的高度
      windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 16为padding 8px *2 (上下边距)
      if (!document.getElementsByClassName('scrollTarget').length) {
        if (windowScrollTop + mysidebarHeight - 16 >= div.offsetTop + div.clientHeight) {
          // 看不见 d-anchor-box区域
          cssChange(mysidebar, 'absolute', div.clientHeight - mysidebarHeight - 8, 0);
        } else if (windowScrollTop > div.offsetTop) {
          // 即将隐藏部分 box
          cssChange(mysidebar, 'fixed', div.offsetTop, div.getBoundingClientRect().left);
        } else if (div.offsetTop >= windowScrollTop && windowScrollTop >= 0) {
          // 刚开始滚动
          cssChange(mysidebar, 'absolute', 0, 0);
        } else {
          cssChange(mysidebar, 'absolute', div.clientHeight - mysidebarHeight - 8, 0);
        }
      } else {
        // 刚开始滚动
        cssChange(mysidebar, 'absolute', div.scrollTop, 0);
      }
    };

    addEvent?.(div, 'scroll', function () {
      if (document.getElementsByClassName('scrollTarget').length) {
        cssChange(mysidebar, 'fixed', div.getBoundingClientRect().top, div.getBoundingClientRect().left);
      }
    });

    //  监听window滚动或滚动容器滚动，切换link+active,改变#
    setActiveLink(timeId);
    document.getElementsByClassName('scrollTarget').length
      ? addEvent?.(div, 'scroll', onScroll)
      : window.addEventListener('scroll', onScroll);
  },
  unmounted(el: HTMLElement): void {
    const mysidebar = document.querySelector(`#${el.id} .mysidebar`) as HTMLElement;
    window.removeEventListener('resize', () => {
      cssChange(mysidebar, 'absolute', 0, 0);
    });
    window.onscroll = null;
    removeEvent?.(el, 'scroll', onScroll);
    document.getElementsByClassName('scrollTarget').length
      ? removeEvent?.(el, 'scroll', onScroll)
      : window.removeEventListener('scroll', onScroll);
    el.remove();
  },
};
