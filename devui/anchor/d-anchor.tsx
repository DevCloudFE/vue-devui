export default  {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement) {
    let parent: Element = el.parentNode  as Element;
    if (!parent.className) {
    parent.className = 'mycontent'
    
    console.log(parent )
    }
    el.className = 'section-block';
    // anchor-active-by-scroll
    el.setAttribute('name',el.innerText);
    console.log(el,'d-anchor')
     
    //   el.innerHTML = '5';
    }
  };
 