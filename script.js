const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();


    tl.from("#nav", {
        y: '10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: '0',
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofooter", {
        y: '-5',
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

var timeout;

function circleChaptaKaro(){
    var xscale =1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(details){

        clearTimeout(timeout);
        
        xscale =  gsap.utils.clamp(.8,1.2,details.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,details.clientY - xprev);

        xprev = details.clientX;
        yprev = details.clientY;

       circleMouseFollower(xscale, yscale);
       timeout = setTimeout(function (){
                document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px , ${details.clientY}px) scale(1, 1)`;
       }, 100);
       

        // console.log(xdiff,ydiff);

    });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(details){
        // console.log(details);
        this.document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px , ${details.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleMouseFollower();
firstPageAnim();
circleChaptaKaro();


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot= 0;

    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: .5,
        });
    });

    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX
            // console.log("hello ji");

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * .5),

        });
    });
});