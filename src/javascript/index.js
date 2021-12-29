import * as THREE from "three";
import "../css/style.css";
import "../css/index.css";
import html from "../index.html";
import Arrow from "../images/arrow.svg";
import gsap from "gsap";
import customscroll from "./scroll";

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

window.addEventListener("load", function () {
  init();
});

function init() {
  customscroll();
  sphere();
  scrollAnimation();
}

function sphere() {
  class Cloud {
    constructor() {
      this.config = {
        canvas: document.querySelector("#c"),
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
        aspectRatio: window.innerWidth / window.innerHeight,
        mouse: { x: 0, y: 0 },
      };

      this.particleConfig = {};
      this.particleConfig.number = 500;
      this.particleConfig.numVertices = this.particleConfig.number * 3;
      this.particleConfig.positions = new Float32Array(
        this.particleConfig.numVertices * 3
      );
      this.particleConfig.velocity = [];
      this.particleConfig.gap = 700;
      this.particleConfig.r = 350;

      this.lineConfig = {};
      this.lineConfig.positions = new Float32Array(
        this.particleConfig.numVertices * 3
      );
      this.lineConfig.colors = new Float32Array(
        this.particleConfig.numVertices * 3
      );
      this.lineConfig.connections = 0;

      this.onResize = this.onResize.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.animate = this.animate.bind(this);

      this.initCamera();
      this.initScene();
      this.initRenderer();
      this.initParticles();
      this.initLines();
      this.bindEvents();
      this.animate();
    }

    initStats() {
      this.stats = new Stats();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    }

    bindEvents() {
      window.addEventListener("resize", this.onResize);
      window.addEventListener("mousemove", this.onMouseMove);
    }

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.config.aspectRatio,
        1,
        1000
      );
      this.camera.position.z = 600;
    }

    initScene() {
      this.scene = new THREE.Scene();
    }

    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.config.canvas,
        antialias: true,
      });

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.config.winWidth, this.config.winHeight);
    }

    initParticles() {
      for (let i = 0; i < this.particleConfig.numVertices; i++) {
        // Square
        // let x = (Math.random() - 0.5) * this.particleConfig.gap;
        // let y = (Math.random() - 0.5) * this.particleConfig.gap;
        // let z = (Math.random() - 0.5) * this.particleConfig.gap;

        // Sphere
        let phi = Math.random() * Math.PI * 2;
        let theta = Math.random() * Math.PI;

        let x = this.particleConfig.r * Math.sin(theta) * Math.cos(phi);
        let y = this.particleConfig.r * Math.sin(theta) * Math.sin(phi);
        let z = this.particleConfig.r * Math.cos(theta);

        this.particleConfig.positions[3 * i] = x;
        this.particleConfig.positions[3 * i + 1] = y;
        this.particleConfig.positions[3 * i + 2] = z;

        this.particleConfig.velocity.push(
          new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          )
        );
      }

      this.pointsGeometry = new THREE.BufferGeometry();
      this.pointsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
      });

      this.pointsGeometry.addAttribute(
        "position",
        new THREE.BufferAttribute(this.particleConfig.positions, 3).setDynamic(
          true
        )
      );

      this.particleCloud = new THREE.Points(
        this.pointsGeometry,
        this.pointsMaterial
      );
      this.scene.add(this.particleCloud);
    }

    initLines() {
      this.lineGeometry = new THREE.BufferGeometry();
      this.lineGeometry.addAttribute(
        "position",
        new THREE.BufferAttribute(this.lineConfig.positions, 3).setDynamic(true)
      );
      this.lineGeometry.addAttribute(
        "color",
        new THREE.BufferAttribute(this.lineConfig.colors, 3).setDynamic(true)
      );

      this.lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 2,
        vertexColors: THREE.VertexColors,
        transparent: true,
      });

      this.lineMesh = new THREE.LineSegments(
        this.lineGeometry,
        this.lineMaterial
      );
      this.scene.add(this.lineMesh);
    }

    render() {
      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera);
    }

    animate() {
      let vertexPos = 0;
      let colorPos = 0;
      this.lineConfig.connections = 0;

      this.scene.rotation.y += 0.001;
      // this.camera.position.x += (this.config.mouse.x - this.camera.position.x) * 0.001;

      for (let i = 0; i < this.particleConfig.numVertices; i++) {
        this.particleConfig.positions[i * 3] +=
          this.particleConfig.velocity[i].x;
        this.particleConfig.positions[i * 3 + 1] +=
          this.particleConfig.velocity[i].y;
        this.particleConfig.positions[i * 3 + 2] +=
          this.particleConfig.velocity[i].z;

        if (
          this.particleConfig.positions[i * 3] < -this.particleConfig.r / 2 ||
          this.particleConfig.positions[i * 3] > this.particleConfig.r / 2
        ) {
          this.particleConfig.velocity[i].x =
            -this.particleConfig.velocity[i].x;
        }
        if (
          this.particleConfig.positions[i * 3 + 1] <
            -this.particleConfig.r / 2 ||
          this.particleConfig.positions[i * 3 + 1] > this.particleConfig.r / 2
        ) {
          this.particleConfig.velocity[i].y =
            -this.particleConfig.velocity[i].y;
        }
        if (
          this.particleConfig.positions[i * 3 + 2] <
            -this.particleConfig.r / 2 ||
          this.particleConfig.positions[i * 3 + 2] > this.particleConfig.r / 2
        ) {
          this.particleConfig.velocity[i].z =
            -this.particleConfig.velocity[i].z;
        }

        for (let j = i + 1; j < this.particleConfig.numVertices; j++) {
          const dx =
            this.particleConfig.positions[i * 3] -
            this.particleConfig.positions[j * 3];
          const dy =
            this.particleConfig.positions[i * 3 + 1] -
            this.particleConfig.positions[j * 3 + 1];
          const dz =
            this.particleConfig.positions[i * 3 + 2] -
            this.particleConfig.positions[j * 3 + 2];

          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const maxDist = 35;

          if (dist < maxDist) {
            let alpha = (maxDist - dist) * 0.025;

            this.lineConfig.positions[vertexPos++] =
              this.particleConfig.positions[i * 3];
            this.lineConfig.positions[vertexPos++] =
              this.particleConfig.positions[i * 3 + 1];
            this.lineConfig.positions[vertexPos++] =
              this.particleConfig.positions[i * 3 + 2];

            this.lineConfig.positions[vertexPos++] =
              this.particleConfig.positions[j * 3];
            this.lineConfig.positions[vertexPos++] =
              this.particleConfig.positions[j * 3 + 1];
            this.lineConfig.positions[vertexPos++] =
              this.particleConfig.positions[j * 3 + 2];

            this.lineConfig.colors[colorPos++] = alpha;
            this.lineConfig.colors[colorPos++] = alpha;
            this.lineConfig.colors[colorPos++] = alpha;
            this.lineConfig.colors[colorPos++] = alpha;
            this.lineConfig.colors[colorPos++] = alpha;
            this.lineConfig.colors[colorPos++] = alpha;

            this.lineConfig.connections++;
          }
        }
      }

      this.lineGeometry.setDrawRange(0, this.lineConfig.connections * 2);
      this.lineMesh.geometry.attributes.position.needsUpdate = true;
      this.lineMesh.geometry.attributes.color.needsUpdate = true;
      this.particleCloud.geometry.attributes.position.needsUpdate = true;

      requestAnimationFrame(this.animate);
      this.render();
    }

    onResize() {
      this.config.winWidth = window.innerWidth;
      this.config.winHeight = window.innerHeight;
      this.camera.aspect = this.config.winWidth / this.config.winHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.config.winWidth, this.config.winHeight);
    }

    onMouseMove(e) {
      this.config.mouse.x = e.clientX - this.config.winWidth / 2;
    }
  }

  new Cloud();
}

// scroll animation

function scrollAnimation() {
  console.log("hhi");
}
