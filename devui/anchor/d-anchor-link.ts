import {ScrollToControl} from './util'
interface Bind {
  value: string
}        

export default  {
    // 当被绑定的元素挂载到 DOM 中时……
    // 1.点击滚动到对应位置，并且高亮
    // 2.到对应位置后，改变url后hash

    mounted(el: HTMLElement,binding: Bind):void {
        console.log(binding,'binding')
      const parent: Element = el.parentNode  as Element;
      if (!parent.className) {
        parent.className = 'mysidebar step-nav'
        
        console.log(parent,'link-insert' )
      }
      el.setAttribute('id', binding.value)

      el.onclick = () => {
        let scrollContainer;
        const scollToDomY = document.getElementsByName(binding.value)[0];
        console.log(scollToDomY,'scollToDomY>???????????????????')
        document.getElementsByClassName('scrollTarget').length 
            ? scrollContainer= document.getElementsByClassName('scrollTarget')[0]
            : scrollContainer=window;   
        console.log(scrollContainer,'scrollContainer_____________________+')
        ScrollToControl(scollToDomY,scrollContainer)
        // scollToDomY.scrollIntoView(true)
        // scroller(scollToDomY,scrollContainer,1000)
        // document.getElementsByClassName('scrollTarget').animate([
        //   { scrollTop: '1000' } 
        //       ], { 
        //           duration: 3000,
        //           iterations: Infinity
        // })
        // hashChange('#'+binding.value)

        // classList.value == 'active' ? classList.remove("active"): classList.add("active")
        
    }
        // if (el.parentNode.className)
    }
  };
