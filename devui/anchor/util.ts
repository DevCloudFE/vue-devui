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

export const setActiveLink = ():void => {
  const sidebarLinks = getSidebarLinks();
  const anchors = getAnchors(sidebarLinks);
  for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const nextAnchor = anchors[i + 1];
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);
      if (isActive) {
          history.replaceState(null, document.title, hash ? hash as string : ' ');
          activateLink(hash);
          return;
      }
  }
}

export const onScroll = throttleAndDebounce(setActiveLink, 300);


function activateLink(hash) {
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
function deactiveLink(link) {
  link && link.classList.remove('active');
}
function getPageOffset() {
  return (document.querySelector('.nav-bar') as HTMLElement).offsetHeight;
}

function getAnchorTop(anchor) {
  const pageOffset = getPageOffset();
  return anchor.parentElement.offsetTop - pageOffset - 15;
}

function isAnchorActive(index, anchor, nextAnchor) {
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

function getSidebarLinks():Array<number> {
  return [].slice.call(document.querySelectorAll('.sidebar a.sidebar-link-item'));
}

function getAnchors(sidebarLinks) {
  return [].slice
      .call(document.querySelectorAll('.header-anchor'))
      .filter((anchor) => sidebarLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash));
}

function throttleAndDebounce(fn, delay) {
    let timeout;
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

