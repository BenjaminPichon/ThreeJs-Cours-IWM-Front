import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 10, 70);
scene.add(camera);
var geometry = []

function setGeometry() {
  geometry = [
    new THREE.SphereGeometry(Math.floor(Math.random() * (10-4)+4), Math.floor(Math.random() * (40-1)+1), Math.floor(Math.random() * (40-1)+1)),
    new THREE.BoxGeometry(Math.floor(Math.random() * (10-4)+4), Math.floor(Math.random() * (40-1)+1), Math.floor(Math.random() * (40-1)+1)),
    new THREE.CylinderGeometry(Math.floor(Math.random() * (10-4)+4), Math.floor(Math.random() * (40-1)+1), Math.floor(Math.random() * (40-1)+1)),
    new THREE.CapsuleGeometry(Math.floor(Math.random() * (10-4)+4), Math.floor(Math.random() * (40-1)+1), Math.floor(Math.random() * (40-1)+1)),
    new THREE.ConeGeometry(Math.floor(Math.random() * (10-4)+4), Math.floor(Math.random() * (40-1)+1), Math.floor(Math.random() * (40-1)+1))
  ]
}

setGeometry()

const bulb_material = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.floor(Math.random() * 16777215)) });

var bulb_mesh = new THREE.Mesh(geometry[Math.floor(Math.random() * geometry.length)], bulb_material);
bulb_mesh.name = "bulb";
bulb_mesh.position.set(0, 0, 0);
scene.add(bulb_mesh);

const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xe0b2a4, 1.0);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

var mouse = new THREE.Vector2();

window.addEventListener("click", onclick, true);
var raycaster = new THREE.Raycaster();
function onclick(event) {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length) {
    setGeometry()
    bulb_mesh.material.color = new THREE.Color(Math.floor(Math.random() * 16777215))
    bulb_mesh.geometry = geometry[Math.floor(Math.random() * geometry.length)];
    bulb_mesh.position.set(Math.floor(Math.random() * (30 - (-30)) + (-30)), Math.floor(Math.random() *  (30 - (-30)) + (-30)), 0);
  } 
}
const tick = () => {
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
