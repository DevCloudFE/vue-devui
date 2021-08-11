export default  {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el: HTMLElement) {
      // 聚焦元素
        el.className = 'mymain'
        let AllNodes:HTMLCollection = el.children ;
        let UlNodes:string, DivNodes:string;
        for (let m in AllNodes) {
           
               
                 if (AllNodes[m].className == 'step-nav') {
                    UlNodes = m
                    // console.log(AllNodes[m].className,'AllNodes[m].className',m)
                 } else if (AllNodes[m].className == 'mycontent') {
                    DivNodes = m
                 }
              
            
           
        }
        // let containerDiv  = parseDom('<div _ngcontent-pls-c237="" class="mysidebar"> <d-sticky _ngcontent-pls-c237="" style="position: relative;"> <div class="ulDivArea" style="top: auto; left: auto; position: static;"> </div> </d-sticky> </div>') ;
        // console.log(AllNodes,'stinnerHTML')
        // el.appendChild(containerDiv[0])
        // el.innerHTML = `<div _ngcontent-pls-c237="" class="mysidebar"> <d-sticky _ngcontent-pls-c237="" style="position: relative;"> <div class="ulDivArea" style="top: auto; left: auto; position: static;"> `
        //                 +HTMLDOMtoString(AllNodes[UlNodes])
        //                 +`</div> </d-sticky> </div>`
        //                 +HTMLDOMtoString(AllNodes[DivNodes])
        // console.log(HTMLDOMtoString(AllNodes[UlNodes]),DivNodes,'DivNodes');
    }
  };

  function parseDom(arg:string) {

    　　 var objE = document.createElement("div");
    
    　　 objE.innerHTML = arg;
    
    　　 return objE.childNodes;
    
    };
    function HTMLDOMtoString (HTMLDOM) {
        const div = document.createElement("div")
        div.appendChild(HTMLDOM)
        return div.innerHTML
    }
 