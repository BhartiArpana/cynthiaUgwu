const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



var timeOut=0;
function cursorMovement(xScale,yScale){
    window.addEventListener('mousemove',(e)=>{
    //   console.log(e.clientX,e.clientY);
    document.querySelector("#miniCircle").style.transform=`translate(${e.clientX}px,${e.clientY}px) scale(${xScale},${yScale})`;
    })
}

function firstPageAnim(){
    const t1=gsap.timeline();
    t1.from("#nav",{
        opacity:0,
        y:40,
        duration:1,
       
    })
    t1.to(".boundingdown",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-.5
    })
    t1.to(".boundingUpper",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        stagger:0.2,
        delay:-1
    })
    t1.from("#heroFooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut,
        delay:-1
    })
}

function circleChapta(){
    let xScale=1;
    let yScale=1;

    let xpre=0;
    let ypre=0;

    window.addEventListener("mousemove",(e)=>{
        clearTimeout(timeOut);
        xScale= gsap.utils.clamp(.8,1.2,e.clientX-xpre);
        yScale= gsap.utils.clamp(.8,1.2,e.clientY-ypre);
        // var xdiff=e.clientX-xpre;
        // var ydiff=e.clientY-ypre;
        xpre=e.clientX;
        ypre=e.clientY;
    //     console.log(xdiff,ydiff)
    cursorMovement(xScale,yScale);
    timeOut=setTimeout(function(){
        document.querySelector("#miniCircle").style.transform=`translate(${e.clientX}px,${e.clientY}px) scale(1,1)`;
    })
     })
}

circleChapta();
cursorMovement();
firstPageAnim();

// teeno element ko select kro, uske baad teeno pr ek maousemove lagao, 
//maousemove ho to ye pta kro ki mause kaha pr h,jiska matlab hmause ki x and y position pata karo,
// ab mause ki x y position ke badle uss image ko show karo and us image ko move karo,
// move karte waqt rotate karo,and jaise jaise mause tez chale wiase waise rotation bhi tez ho jaye.

document.querySelectorAll(".elem").forEach((elem)=>{
    var rotate = 0;
    var diffrot=0; 
    
    elem.addEventListener('mouseleave',(e)=>{
        //    console.log(e)
        var diff = e.clientY-elem.getBoundingClientRect().top;
        
        gsap.to(elem.querySelector('img'),{
          opacity:0,
          ease:Power3,
          duration:.5,
        });
        });

    elem.addEventListener('mousemove',(e)=>{
    //    console.log(e)
     
    var diff = e.clientY-elem.getBoundingClientRect().top;
    diffrot=e.clientX-rotate;
    rotate=e.clientX;
    gsap.to(elem.querySelector('img'),{
      opacity:1,
      ease:Power3,
      top:diff,
      left:e.clientX,
      rotate:gsap.utils.clamp(-20,20,diffrot*0.5)
    });
    });
});