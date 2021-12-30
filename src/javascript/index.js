import * as THREE from "three";
import "../css/style.css";
import "../css/index.css";
import html from "../index.html";
import Arrow from "../images/arrow.svg";
import gsap from "gsap";
import Experience from "./Experience/Experience.js";

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const experience = new Experience({
  // targetElement: document.querySelector(".experience"),
});
