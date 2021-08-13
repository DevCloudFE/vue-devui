export default  {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement, binding: any) {
    let parent: Element = el.parentNode  as Element;
    if (!parent.className) {
    parent.className = 'mycontent'
    
    
    }
   
    el.className = 'section-block';
    // anchor-active-by-scroll
    el.setAttribute('name',binding.value);
    el.onclick = e => {
        
   
        let classList   =  document.getElementById((e.target as HTMLElement).getAttribute('name')).classList;
        // classList.indexOf()
        console.log(classList)
        classList.value == 'active' ? classList.remove("active"): classList.add("active")
     
    }
    //   el.innerHTML = '5';
    }
  };
 
 