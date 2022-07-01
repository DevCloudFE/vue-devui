let repeatCount = 0;
let cTimeout: NodeJS.Timeout;
const timeoutIntervalSpeed = 10;
let hashName: string | null;
// 滚动是由于点击产生
let scollFlag = false;
let activeLink: Element | null = null;
let rootActiveLink: Element | null = null;
let rootClassName = '';

function elementPosition(obj: HTMLElement) {
  let curleft = 0, curtop = 0;
  curleft = obj.offsetLeft;
  curtop = obj.offsetTop;
  return { x: curleft, y: curtop };
}

function getSidebarLinks(curRootClassName: string): Array<HTMLAnchorElement> {
  return [].slice.call(document.querySelectorAll(`.${curRootClassName} > .step-nav > li.bar-link-item > a`));
}

function getAnchors(sidebarLinks: Array<HTMLAnchorElement>): Array<HTMLAnchorElement> {
  return [].slice
    .call(document.querySelectorAll('.box-anchor'))
    .filter((anchor: HTMLAnchorElement) => sidebarLinks.some((sidebarLink: HTMLAnchorElement) =>  sidebarLink.hash === anchor.hash));
}

function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeout: NodeJS.Timeout;
  let called = false;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    }
    else {
      timeout = setTimeout(fn, delay);
    }
  };
}

function deactiveLink(link: Element | null): void {
  link && link.classList.remove('active');
}


// 高亮切换
export function hightLightFn(curHashName: string | null): void {

  const childLength = document.getElementsByClassName('mysidebar')[0].children.length;

  for (let i = 0; i < childLength; i++) {

    if (document.getElementsByClassName('mysidebar')[0].children[i].classList.value.indexOf('active') > -1) {

      document.getElementsByClassName('mysidebar')[0].children[i].classList.remove('active');
    }
  }

  if (curHashName) {
    document.getElementById(curHashName)?.classList.add('active');
  }

}

function activateLink(hash: string | boolean | null): void {
  deactiveLink(activeLink);
  deactiveLink(rootActiveLink);
  hash
    ? activeLink = document.querySelector(`${hash}`)
    : activeLink = document.querySelector(`.${rootClassName} ul li`);
  if (!activeLink) {
    return;
  }

  if (!scollFlag) {
    hash && hightLightFn((hash as string).split('#')[1]);
  }else {
    hightLightFn(hashName);
  }
  //
  // also add active class to parent h2 anchors
  const rootLi = activeLink.closest('.mycontainer > ul > li');
  if (rootLi && rootLi !== activeLink.parentElement) {
    rootActiveLink = rootLi;
    rootActiveLink && rootActiveLink.classList.add('active');
  }
  else {
    rootActiveLink = null;
  }
}

function getPageOffset(): number {
  return (document.querySelector('.mysidebar ') as HTMLElement).getBoundingClientRect().y;
}

function getAnchorTop(anchor: HTMLAnchorElement): number {
  const pageOffset = getPageOffset();
  return (anchor.parentElement?.offsetTop as number) - pageOffset - 5;
}

function isAnchorActive(index: number, anchor: HTMLAnchorElement, nextAnchor: HTMLAnchorElement) {
  let scrollTop: number;
  document.getElementsByClassName('scrollTarget').length
    ?  scrollTop = document.getElementsByClassName('scrollTarget')[0].scrollTop
    :  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (index === 0 && scrollTop === 0) {
    return [true, null];
  }

  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null];
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {

    return [true, decodeURIComponent(anchor.hash)];
  }

  return [false, null];
}

function scrollSmoothly(scrollPos: number, repeatTimes: number, container: HTMLElement): void {
  if (repeatCount <= repeatTimes) {
    scrollPos > 0
      ? container.scrollBy(0, timeoutIntervalSpeed)
      : container.scrollBy(0, -timeoutIntervalSpeed);
  }
  else {
    repeatCount = 0;
    clearTimeout(cTimeout);
    history.replaceState(null, '', document.location.pathname + '#' + hashName);

    hightLightFn(hashName);
    setTimeout(() => {
      scollFlag = false;
    }, 310);
    return ;

  }
  repeatCount ++;
  cTimeout = setTimeout(() => {
    scrollSmoothly(scrollPos, repeatTimes, container);
  }, 10);
}

export function scrollToControl(elem: HTMLElement, container: HTMLElement): void {
  hashName = elem.getAttribute('name');
  scollFlag = true;
  const tops = container.scrollTop >= 0 ?
    container.scrollTop  :
    -(document.getElementsByClassName('mycontainer')[0] as HTMLElement).offsetTop;
  let scrollPos: number = elementPosition(elem).y - tops ;

  scrollPos = scrollPos - document.documentElement.scrollTop;
  const remainder: number = scrollPos % timeoutIntervalSpeed;
  const repeatTimes = Math.abs((scrollPos - remainder) / timeoutIntervalSpeed);
  if (scrollPos < 0 && container || elem.getBoundingClientRect().top < container.offsetTop) {
    window.scrollBy(0, elem.getBoundingClientRect().top-container.offsetTop-16);
  }
  // 多个计时器达到平滑滚动效果
  scrollSmoothly(scrollPos, repeatTimes, container);
}

export const setActiveLink = (timeId?: string): void => {
  if (scollFlag) { return; }
  timeId ? rootClassName = timeId : rootClassName = document.getElementsByClassName('mymain')[0].id;

  const sidebarLinks = getSidebarLinks(rootClassName);
  const anchors = getAnchors(sidebarLinks);
  try {
    anchors.forEach((index, i)=> {

      const anchor: HTMLAnchorElement = anchors[i];
      const nextAnchor: HTMLAnchorElement = anchors[i + 1];

      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);
      if (isActive) {
        history.replaceState(null, document.title, hash ? hash as string : ' ');
        activateLink(hash);
        throw Error(hash + '');
      }
    });
  } catch (e) {
  }

};

export const onScroll = throttleAndDebounce(setActiveLink, 300);
