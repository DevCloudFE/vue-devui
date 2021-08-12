export default  {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement,vndoe: Object) {
        console.log(vndoe,'vndoe')
      let parent: Element = el.parentNode  as Element;
      if (!parent.className) {
        parent.className = 'mysidebar step-nav'
        
        console.log(parent,'link-insert' )
      }
    //   el.setAttribute('_ngcontent-jxd-c234','')
        // if (el.parentNode.className)
    }
  };
 