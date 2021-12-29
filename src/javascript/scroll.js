import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

function customScroll() {
  const scroll__container = document.getElementById("scroll-container");
  //   scroll initialize
  const scroller = new LocomotiveScroll({
    el: scroll__container, //scroll element (scroll container)
    smooth: true, // smooth scroll enabled
    getDirection: true, // display scoll direction (up & down)
    lerp: 0.05, //scroll smoothness
    smartphone: {
      smooth: true, //smooth scroll enabled for mobile
    },
    tablet: {
      smooth: true, //smooth scroll enabled for tablet & ipad
    },
    offset: [0, 0],
    useKeyboard: true,
    // getSpeed: true,
    class: "is-inview",
    scrollbarClass: "c-scrollbar",
    scrollingClass: "has-scroll-scrolling",
    draggingClass: "has-scroll-dragging",
    smoothClass: "has-scroll-smooth",
    initClass: "has-scroll-init",
    multiplier: 1,
    firefoxMultiplier: 50,
    touchMultiplier: 2,
    scrollFromAnywhere: false,
  });
  window.addEventListener("load", function () {
    scroller.update();
  });
  window.addEventListener("resize", function () {
    scroller.update();
  });
}

export default customScroll;
