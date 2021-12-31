import * as THREE from "three";
import "../css/style.css";
import "../css/index.css";
import html from "../index.html";
import { gsap, Expo } from "gsap";
import Experience from "./Experience/Experience.js";

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const experience = new Experience({
  // targetElement: document.querySelector(".experience"),
});

// page transitions

const loader = select(".loader");
const innerLoader = select(".inner-loader");
const spans = selectAll(".inner-loader h1 span");
const overlay = select(".overlay");

function pageLoader() {
  const tl = gsap.timeline();
  gsap.set(loader, {
    y: "0",
  });
  gsap.set(innerLoader, {
    opacity: 1,
  });
  tl.to(spans, 1.2, {
    delay: 5,
    rotation: 1000,
    y: "-100%",
    opacity: 0,
    ease: "back",
    stagger: 0.2,
  });
  tl.to(loader, 1.2, {
    y: "-100%",
    ease: Expo.easeInOut,
  });
}

// main loading do only one time
if (localStorage.getItem("first") === null) {
  pageLoader();
  localStorage.setItem("first", "nope!");
}

// localStorage.clear();

// overlay events
function initOverlay() {
  const tl = gsap.timeline();
  tl.fromTo(
    overlay,
    1,
    {
      y: "0",
      ease: Expo.easeInOut,
    },
    {
      y: "-100%",
      ease: Expo.easeInOut,
    }
  );
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
