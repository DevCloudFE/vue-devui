let repeatCount = 0;
let cTimeout;
const timeoutIntervalSpeed = 10;
let hashName:string;
function elementPosition(obj: HTMLElement,container: HTMLElement) {
  let curleft = 0, curtop = 0;
  
    curleft = obj.offsetLeft;
    curtop = obj.offsetTop;
    
    console.table({
      'curleft':curleft,
      'curtop':curtop,
      'container.offsetLeft': container.offsetLeft,
      'container.offsetTop':container.offsetTop
    })
 
  return { x: curleft, y: curtop };
}
export function ScrollToControl(elem: HTMLElement, container: HTMLElement):void {
    hashName = elem.getAttribute('name');
    let scrollPos: number = elementPosition(elem, container).y - container.scrollTop;
    scrollPos = scrollPos - document.documentElement.scrollTop;
    const remainder: number = scrollPos % timeoutIntervalSpeed;
    const repeatTimes = Math.abs((scrollPos - remainder) / timeoutIntervalSpeed);
    if (scrollPos < 0 || elem.getBoundingClientRect().top < container.offsetTop) {
      console.log(elem.getBoundingClientRect().top, container.offsetTop,'container.offsetTop888888888888888888888888888')
      window.scrollBy(0, elem.getBoundingClientRect().top-container.offsetTop-16)
    }
    
    ScrollSmoothly(scrollPos, repeatTimes, container)

}
 

function ScrollSmoothly(scrollPos: number, repeatTimes: number, container: HTMLElement):void {
  
    console.log(repeatCount)
    if (repeatCount < repeatTimes) {
      scrollPos > 0
        ? container.scrollBy(0, timeoutIntervalSpeed)
        : container.scrollBy(0, -timeoutIntervalSpeed)
    }
    else {
      repeatCount = 0;
      clearTimeout(cTimeout);
      console.log(hashName)
      history.replaceState(null, null, document.location.pathname + '#' + hashName);
      hightLightFn(hashName)
      return ;
        
    }
    repeatCount++;
    cTimeout = setTimeout(() => {
      ScrollSmoothly(scrollPos, repeatTimes, container)
    }, 10)
    // cTimeout = setTimeout("ScrollSmoothly('"+scrollPos+"','"+repeatTimes+"','"+container+"')",10);
}

// 高亮切换
export function hightLightFn(hashName:string):void {
  const childLength = document.getElementsByClassName('mysidebar')[0].children.length
  for (let i =0; i< childLength; i++) {
    if (document.getElementsByClassName('mysidebar')[0].children[i].classList.value.indexOf('active') > -1) {
      document.getElementsByClassName('mysidebar')[0].children[i].classList.remove('active')
    }
  }
  document.getElementById(hashName).classList.add('active')
}
let activeLink = null;
let rootActiveLink = null;
const rootClassName = '';
export const setActiveLink = (timeId:string):void => {
 console.log(document.getElementsByClassName(timeId))
  const sidebarLinks = getSidebarLinks(timeId);
  const anchors = getAnchors(sidebarLinks);
  console.error(sidebarLinks,typeof sidebarLinks)
  for (let i = 0; i < anchors.length; i++) {
      const anchor:HTMLAnchorElement = anchors[i];
      const nextAnchor:HTMLAnchorElement = anchors[i + 1];
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);
      if (isActive) {
          history.replaceState(null, document.title, hash ? hash as string : ' ');
          activateLink(hash);
          return;
      }
  }
}
function throttleAndDebounce(fn:any, delay:number):any {
  let timeout:any;
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
export const onScroll = throttleAndDebounce(setActiveLink, 300);


function activateLink(hash:string | boolean) {
  deactiveLink(activeLink);
  deactiveLink(rootActiveLink);
  activeLink = document.querySelector(`.sidebar a[href="${hash}"]`);
  if (!activeLink) {
      return;
  }
  activeLink.classList.add('active');
  // also add active class to parent h2 anchors
  const rootLi = activeLink.closest('.sidebar-links > ul > li');
  if (rootLi && rootLi !== activeLink.parentElement) {
      rootActiveLink = rootLi.querySelector('a');
      rootActiveLink && rootActiveLink.classList.add('active');
  }
  else {
      rootActiveLink = null;
  }
}
function deactiveLink(link:HTMLElement):void {
  link && link.classList.remove('active');
}
function getPageOffset():number {
  return (document.querySelector('.nav-bar') as HTMLElement).offsetHeight;
}

function getAnchorTop(anchor:HTMLAnchorElement):number {
  const pageOffset = getPageOffset();
  return anchor.parentElement.offsetTop - pageOffset - 15;
}

function isAnchorActive(index:number, anchor:HTMLAnchorElement, nextAnchor:HTMLAnchorElement) {
  const scrollTop = window.scrollY;
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

function getSidebarLinks(rootClassName:string):Array<HTMLAnchorElement> {
  // .step-nav > li.active, .step-nav > li:hover
  console.log(`.${rootClassName} > .mysidebar > li.bar-link-item`,'__________________________')
  return [].slice.call(document.querySelectorAll(`.${rootClassName} > .step-nav > li.bar-link-item`));
}

function getAnchors(sidebarLinks:Array<HTMLAnchorElement>):Array<HTMLAnchorElement> {
  return [].slice
      .call(document.querySelectorAll('.header-anchor'))
      .filter((anchor:HTMLAnchorElement) => sidebarLinks.some(( sidebarLink:HTMLAnchorElement  ) =>  sidebarLink.hash === anchor.hash ));
}

 
export const randomId = function(n=8):string { // 生成n位长度的字符串
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789'; // 可以作为常量放到random外面
    let result = '';
    for(let i = 0; i < n; i++) {
        result += str[parseInt((Math.random() * str.length).toString())];
    }
    return result;
}


