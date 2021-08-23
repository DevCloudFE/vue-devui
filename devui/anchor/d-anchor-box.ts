export default  {
    // 滚动区域
    // 1.监听window滚动或滚动容器滚动，切换link+active,改变#
    // 2.
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement):void {
       
      // 添加ng class名
      const classList   =  el.classList;
      console.error(classList)
      classList.add('mycontainer','mymain');
        // 监听window
        let windoScrollTop;
        let toTheBottom = false;
        const div = document.getElementsByClassName('mycontainer')[0] as HTMLElement;
        const mysidebar  =  document.getElementsByClassName('mysidebar')[0] as HTMLElement
        const mysidebarHeight =    mysidebar.clientHeight;   
        mysidebar.children[0].classList.add('active')
        window.onscroll = function() {
          //为了保证兼容性，这里取两个值，哪个有值取哪一个
          //scrollTop就是触发滚轮事件时滚轮的高度
          windoScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          console.log(mysidebar.clientHeight,'mysidebar.clientHeight__________________',windoScrollTop,div.getBoundingClientRect().top)
          // 16为padding 8px *2 (上下边距)
          if (!document.getElementsByClassName('scrollTarget').length ) {
              if ( (windoScrollTop + mysidebarHeight-16) >= (div.offsetTop + div.clientHeight)  ) {
                // 看不见 d-anchor-box区域
                console.log('windoScrollTop > mysidebar.clientHeight滚动距离' + windoScrollTop);
                toTheBottom = true;
                // windoScrollTop-mysidebar.clientHeight
                mysidebar.style.position = 'absolute';
                mysidebar.style.top = div.clientHeight -mysidebarHeight-8 +  'px';
                mysidebar.style.left ='0px';
                console.log(2222222222)
              }else  if (windoScrollTop > div.offsetTop){
                // 即将隐藏部分 box
                toTheBottom = false;
                mysidebar.style.position = 'fixed';
                mysidebar.style.top = div.offsetTop+'px';
                mysidebar.style.left = div.getBoundingClientRect().left+'px';
                console.log(2222222222)
              }else if (div.offsetTop >=  windoScrollTop && windoScrollTop >= 0) {
                // 刚开始滚动
                toTheBottom = false;
                mysidebar.style.position = 'absolute';
                mysidebar.style.top =  '0px';
                mysidebar.style.left =  '0px';
                console.log(2222222222)
              }else {
                // 
                toTheBottom = true;
                mysidebar.style.position = 'absolute';
                mysidebar.style.top =  div.clientHeight - mysidebarHeight - 8 +  'px';
                mysidebar.style.left = '0px';
                console.log(2222222222)
              }
          }else {
             // 刚开始滚动
             toTheBottom = false;
             mysidebar.style.position = 'absolute';
             mysidebar.style.top = div.scrollTop+'px';
             mysidebar.style.left =  '0px';
            console.log(2222222222)
          }
          
        }
       
   
       addEvent(div,'scroll', function(){
            const scrollHeight = div.scrollHeight;
            const scrollTop    = div.scrollTop;
            const height       = div.clientHeight;
            // console.log(scrollTop,"scroll________")
            
            console.log()
            if((scrollTop + height) >= scrollHeight && toTheBottom) {
              console.log(scrollHeight,'到底了');
              console.log('window滚动距离' + windoScrollTop);
              // mysidebar.style.position = 'absolute';
              // mysidebar.style.top =  '0px';
              // mysidebar.style.left =  '0px';
              // mysidebar.style.height =  'auto';
            } else if(document.getElementsByClassName('scrollTarget').length ){
             
              mysidebar.style.position = 'fixed';
              mysidebar.style.top = div.getBoundingClientRect().top+'px';
              mysidebar.style.left = div.getBoundingClientRect().left+'px';
              // mysidebar.style.height = height+'px';
              console.log('div滚动距离' + scrollTop);
            }
       });
       
      //  监听window滚动或滚动容器滚动，切换link+active,改变#

    }
  };

  const addEvent = (function(){
    if(window.addEventListener){
     return function(elm, type, handle){
       console.log(elm,'__________')
       elm.addEventListener(type, handle, false);
     }
    }
    
   })();
 