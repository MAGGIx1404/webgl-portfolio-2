import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

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

  // sticky navbar
  const navBar = select("#nav");
  scroller.on("scroll", (instance) => {
    navBar.setAttribute("data-direction", instance.direction);
  });

  // skew effect

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#scroll-container", {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  /* ADD LOCOSCROLL */

  /* ADD SKEW SECTION */

  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skew-el", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-1, 1); // don't let the skew go beyond 20 degrees.

  ScrollTrigger.create({
    scroller: "#scroll-container",
    trigger: ".scroll-container",

    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / -300);
      // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.4,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();
}

export default customScroll;
