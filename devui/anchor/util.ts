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

    // curleft = curleft - container.offsetLeft;
    // curtop = curtop - container.offsetTop;
  
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


