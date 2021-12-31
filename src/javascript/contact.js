import "../css/style.css";
import "../css/contact.css";
import html from "../pages/contact.html";
import { gsap, Expo } from "gsap";

// transitions

const overlay = document.querySelector(".overlay");

// overlay events
function initOverlay() {
  const tl = gsap.timeline();
  tl.to(overlay, 1.1, {
    y: "-100%",
    ease: Expo.easeInOut,
  });
}

// on load event

window.addEventListener("load", function () {
  initOverlay();
});

// transition

const anchors = document.querySelectorAll(".transition-btn");

for (let i = 0; i < anchors.length; i++) {
  const anchor = anchors[i];

  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;

    if (target.nodeName === "SPAN") {
      target = target.parentElement.href;
    }

    const tl = gsap.timeline();

    tl.to(overlay, 1, {
      y: "0",
      ease: Expo.easeInOut,
    });

    setTimeout(() => {
      window.location.href = target;
    }, 1100);
  });
}
