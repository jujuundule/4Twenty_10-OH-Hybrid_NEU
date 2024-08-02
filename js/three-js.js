// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Enable anti-aliasing
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);


// Add lights to the scene, so we can actually see the 3D model
// Improved lighting setup
const topLight = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
topLight.position.set(100, 100, 100); // Position top-left-ish
topLight.castShadow = true; // Enable shadows
topLight.shadow.mapSize.width = 2048; // Increase shadow map resolution
topLight.shadow.mapSize.height = 2048; // Increase shadow map resolution
topLight.shadow.bias = -0.001; // Adjust bias to prevent shadow acne
scene.add(topLight);

const sideLight = new THREE.DirectionalLight(0xffffff, 10);
sideLight.position.set(-100, 100, -100); // Position opposite side
sideLight.castShadow = true; // Enable shadows
sideLight.shadow.mapSize.width = 2048; // Increase shadow map resolution
sideLight.shadow.mapSize.height = 2048; // Increase shadow map resolution
sideLight.shadow.bias = -0.001; // Adjust bias to prevent shadow acne
scene.add(sideLight);

const spotLight = new THREE.SpotLight(0xffffff, 5);
spotLight.position.set(50, 50, 50);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048; // Increase shadow map resolution
spotLight.shadow.mapSize.height = 2048; // Increase shadow map resolution
spotLight.shadow.bias = -0.001; // Adjust bias to prevent shadow acne
scene.add(spotLight);

const hemiLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 4); // (sky color, ground color, intensity)
scene.add(hemiLight);

const ambientLight = new THREE.AmbientLight(0x333333, 4);
scene.add(ambientLight);

// Keep the 3D object on a global variable so we can access it later
let object;

// Set which object to render
let objToRender = "vape_1ml";

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  `mediafiles/models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true; // Ensure the object can cast shadows
        node.receiveShadow = true; // Ensure the object can receive shadows
      }
    });
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Set how far the camera will be from the 3D model
camera.position.z = 25;

// This adds controls to the camera, so we can rotate/pan it with the mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05; // Damping factor for smoother interaction
controls.enableZoom = false; // Disable zooming

// Restrict rotation to the y-axis
// controls.minPolarAngle = Math.PI / 2; // Restrict vertical rotation
// controls.maxPolarAngle = Math.PI / 2; // Restrict vertical rotation

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // Slowly rotate the object
  if (object) {
    object.rotation.y += 0.005; // Adjust this value for speed
  }

  controls.update(); // Required if controls.enableDamping is set to true
  renderer.render(scene, camera);
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the 3D rendering
animate();
