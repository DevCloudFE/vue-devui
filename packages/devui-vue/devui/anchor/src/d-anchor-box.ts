import { setActiveLink, onScroll,  } from './utils';
import { inBrowser, randomId } from '../../shared/utils';

export default {
  name: 'd-anchor-box',
  // 滚动区域
  // 1.监听window滚动或滚动容器滚动，切换link+active,改变#
  mounted(el: HTMLElement): void {
    const timeId = 'm' + randomId(8);
    el.id = timeId;
    // 添加ng class名
    const classList = el.classList;
    classList.add('mycontainer', 'mymain', timeId);
    // 监听window
    let windoScrollTop;
    const div = document.querySelector(`#${timeId}`) as HTMLElement;

    const mysidebar = document.querySelector(
      `#${timeId} .mysidebar`
    ) as HTMLElement;

    const mysidebarHeight = mysidebar.clientHeight;
    window.addEventListener('resize', () => {
      cssChange(mysidebar, 'absolute', 0, 0);
    });
    window.onscroll = function () {
      // 为了保证兼容性，这里取两个值，哪个有值取哪一个
      // scrollTop就是触发滚轮事件时滚轮的高度
      windoScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 16为padding 8px *2 (上下边距)
      if (!document.getElementsByClassName('scrollTarget').length) {
        if (windoScrollTop + mysidebarHeight - 16 >= div.offsetTop + div.clientHeight) {
          // 看不见 d-anchor-box区域
          cssChange(
            mysidebar,
            'absolute',
            div.clientHeight - mysidebarHeight - 8,
            0
          );
        } else if (windoScrollTop > div.offsetTop) {
          // 即将隐藏部分 box
          cssChange(
            mysidebar,
            'fixed',
            div.offsetTop,
            div.getBoundingClientRect().left
          );
        } else if (div.offsetTop >= windoScrollTop && windoScrollTop >= 0) {
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

    addEvent(div, 'scroll', function () {
      if (document.getElementsByClassName('scrollTarget').length) {
        cssChange(
          mysidebar,
          'fixed',
          div.getBoundingClientRect().top,
          div.getBoundingClientRect().left
        );
      }
    });

    //  监听window滚动或滚动容器滚动，切换link+active,改变#
    setActiveLink(timeId);
    document.getElementsByClassName('scrollTarget').length
      ? addEvent(div, 'scroll', onScroll)
      : window.addEventListener('scroll', onScroll);
  },
};

const cssChange = (
  mysidebar: HTMLElement,
  postion: string,
  top: number,
  left: number
) => {
  mysidebar.style.position = postion;
  mysidebar.style.top = top + 'px';
  mysidebar.style.left = left + 'px';
};
const addEvent = (function () {
  if (inBrowser && window.addEventListener) {
    return function (elm, type, handle) {
      elm.addEventListener(type, handle, false);
    };
  }
})();
