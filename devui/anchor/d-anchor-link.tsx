export default  {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement,binding: any) {
        console.log(binding,'binding')
      let parent: Element = el.parentNode  as Element;
      if (!parent.className) {
        parent.className = 'mysidebar step-nav'
        
        console.log(parent,'link-insert' )
      }
      el.setAttribute('id', binding.value)
        // if (el.parentNode.className)
    }
  };
 