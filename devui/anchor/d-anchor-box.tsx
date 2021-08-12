export default  {
    beforeMount(el: HTMLElement, vnode:Object) {
        console.log(vnode,'DivNodesinserted0000000000000')
    },
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement) {
       
      // 聚焦元素
        el.className = 'mycontainer mymain'
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
   
 