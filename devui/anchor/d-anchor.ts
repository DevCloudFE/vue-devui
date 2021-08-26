import {hightLightFn} from './util'
interface Bind {
    value: string
  }        
  
export default  {
    // 挂载事件到dom
    // 1.点击对应link高亮
    // 2.href+#+bing.value

    mounted(el: HTMLElement, binding: Bind):void {
    const parent: Element = el.parentNode  as Element;
    if (!parent.className) {
        parent.className = 'mycontent'
    }
    el.innerHTML = '<a class="box-anchor"  href="#'+binding.value+'">?</a>' + el.innerHTML
    el.className = 'section-block';
    // anchor-active-by-scroll
    el.setAttribute('name',binding.value);
    el.onclick = e => {
        hightLightFn(binding.value);
   
        const classList   =  document.getElementById((e.target as HTMLElement).getAttribute('name')).classList;
        // classList.indexOf()
        console.log(classList)
        // classList.value == 'active' ? classList.remove("active"): classList.add("active")
        
    }
    //   el.innerHTML = '5';
    }
  };
 
 