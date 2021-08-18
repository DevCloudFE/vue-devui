export default  {
    beforeMount(el: HTMLElement, vnode:Object) {
        console.log(vnode,'DivNodesinserted0000000000000')
    },
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement) {
      let addEvent = (function(){
        if(window.addEventListener){
         return function(elm, type, handle){
           console.log(elm,"__________")
          elm.addEventListener(type, handle, false);
         }
        }
        
       })();
       
       
      // 添加ng class名
        el.className = 'mycontainer mymain'
        // 监听windo
        let windoScrollTop;
        let toTheBottom: Boolean = false;
        let div = document.getElementsByClassName("mycontainer")[0];
        let mysidebar  =  document.getElementsByClassName('mysidebar')[0] as HTMLElement


        window.onscroll = function() {
          //为了保证兼容性，这里取两个值，哪个有值取哪一个
          //scrollTop就是触发滚轮事件时滚轮的高度
          windoScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      
          if (windoScrollTop > mysidebar.clientHeight) {
            console.log("滚动距离" + windoScrollTop);
              mysidebar.style.position = 'absolute';
              mysidebar.style.top = div.getBoundingClientRect().top-windoScrollTop +'px';
              mysidebar.style.left =  '0px';
          }else if (toTheBottom){
            // div滚动条到最底部,window滚动条开始滚动
            console.log(div.getBoundingClientRect().top,windoScrollTop)
              mysidebar.style.top = div.getBoundingClientRect().top-windoScrollTop +'px';
              (mysidebar.children[0] as HTMLElement).style.padding = windoScrollTop + "px 0 0 0"
          }else if (!toTheBottom) {

          }
        }
       
   
       addEvent(div,'scroll', function(){
            let scrollHeight = div.scrollHeight;
            let scrollTop    = div.scrollTop;
            let height       = div.clientHeight;
            console.log(scrollTop,"scroll________")
            
            console.log()
            if((scrollTop + height) >= scrollHeight) {
              console.log(scrollHeight,'到底了');
              console.log("window滚动距离" + windoScrollTop);
              // mysidebar.style.position = 'absolute';
              // mysidebar.style.top =  '0px';
              // mysidebar.style.left =  '0px';
              toTheBottom = true;
         
              // mysidebar.style.height =  'auto';
            } else {
              toTheBottom = false;
              mysidebar.style.position = 'fixed';
              mysidebar.style.top = div.getBoundingClientRect().top+'px';
              mysidebar.style.left = div.getBoundingClientRect().left+'px';
              mysidebar.style.height = height+'px';
            }
       });
        // let AllNodes:HTMLCollection = el.children ;
        // console.log( AllNodes,'DivNodesinserted0');
        // let UlNodes:string, DivNodes:string;
        // for (let m in AllNodes) {
           
               
        //          if (AllNodes[m].className == 'step-nav') {
        //             UlNodes = m
        //             // console.log(AllNodes[m].className,'AllNodes[m].className',m)
        //          } else if (AllNodes[m].className == 'mycontent') {
        //             DivNodes = m
        //          }
              
            
           
        // }
        // console.log(HTMLDOMtoString(AllNodes[UlNodes]),HTMLDOMtoString(AllNodes[DivNodes]),'DivNodes????????')
        // el.innerHTML = '<div _ngcontent-pls-c237="" class="mysidebar"> <d-sticky _ngcontent-pls-c237="" style="position: relative;"> <div class="ulDivArea" style="top: auto; left: auto; position: static;"> '
        //                 +HTMLDOMtoString(AllNodes[UlNodes])
        //                 +'</div> </d-sticky> </div>'
        //                 +HTMLDOMtoString(AllNodes[DivNodes])

    }
  };

//   function parseDom(arg:string) {

//     　　 var objE = document.createElement("div");
    
//     　　 objE.innerHTML = arg;
    
//     　　 return objE.childNodes;
    
//     };
    // function HTMLDOMtoString (HTMLDOM: HTMLElement) {
    //     if (HTMLDOM)  {
    //         let divA = document.createElement("div")
    //         console.log(HTMLDOM,"__________HTMLDOM")
    //         divA.appendChild(HTMLDOM) 
    //         return divA.innerHTML
    //     }
      
    // }
   
 