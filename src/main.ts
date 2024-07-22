import './style.css'
import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('canvas')!

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const loader = new GLTFLoader();

const scene = new THREE.Scene();
// const axesHelper = new THREE.AxesHelper(10)
// scene.add(axesHelper)
scene.background = new THREE.Color('#212f46')
// scene.background = new THREE.Color('#81a9ff')
// #212f46
// scene.background = new THREE.Color('#2164FF')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );
camera.position.x = - .5
camera.position.y = .25
camera.position.z = 0.05
camera.rotation.y = - .5 * Math.PI

function transitionBackgroundColor(fromColor: string, toColor: string, duration: number) {
  const colorObj = { color: fromColor };
  
  gsap.to(colorObj, {
    color: toColor,
    delay: .25,
    duration: duration,
    onUpdate: () => {
      scene.background = new THREE.Color(colorObj.color);
    }
  });
}

ScrollTrigger.create({
  trigger: '#commu',
  start: "top 50%",
  onLeaveBack: () => {
    gsap.to(camera.position, {
      x: - .5,
      y: .25,
      z: 0.05,

      duration: 1,
      ease: "power1.inOut",
    })
    gsap.to(camera.rotation, {
      x: 0,
      y: - .5 * Math.PI,
      z: 0,
      duration: 1,
      ease: "power1.inOut",
    })
    transitionBackgroundColor("#81a9ff", "#212f46", 1)
  },
  onEnter: () => {
    gsap.to(camera.position, {
      x: 0.05,
      y: 0.15,
      z: .3,
      duration: 1,
      ease: "power1.inOut",
    })
    gsap.to(camera.rotation, {
      y: 0 * Math.PI,
      duration: 1,
      ease: "power1.inOut",
    })
    transitionBackgroundColor("#212f46", "#81a9ff", 1)
  },
  onLeave: () => console.log('leave'),
})

// gsap.to("#stats", {
//   opacity: 1,
//   duration: 1,
//   scrollTrigger: {
//     markers: true,
//     trigger: "#commu",
//     start: "top 50%"
//   }
// })

const renderer = new THREE.WebGLRenderer({ canvas ,antialias: true });

// const controls = new OrbitControls( camera, renderer.domElement );

loader.load('models/skyblock-ada/scene.gltf', (gltf) => {
  console.log(gltf.scene.position)
  const box = new THREE.Box3().setFromObject( gltf.scene );
  const center = box.getCenter( new THREE.Vector3() );
  gltf.scene.position.x += ( gltf.scene.position.x - center.x );
  gltf.scene.position.y += ( gltf.scene.position.y - center.y );
  gltf.scene.position.z += ( gltf.scene.position.z - center.z );
  console.log(gltf.scene.position)

  // const boxHelper = new THREE.BoxHelper( gltf.scene, 0xffff00 );

  console.log(gltf.scene)
  // gltf.scene.scale.set(10, 10, 10)
  scene.add(gltf.scene)
  // scene.add(boxHelper)
})

const isLandGroup = new THREE.Group()

const grassColor = '#526935'
const dirtColor = '#6a3300'
const woodColor = '#584528'
const leafColor = '#48ba2f'

const blocksData: [number, number, number, string][] = [
  [0, 0, 0, grassColor],
  [1, 0, 0, grassColor],
  [2, 0, 0, grassColor],
  [1, 0, 0, grassColor],
  [0, 0, 1, grassColor],
  [1, 0, 1, grassColor],
  [2, 0, 1, grassColor],
  [0, 0, -1, grassColor],
  [1, 0, -1, grassColor],
  [2, 0, -1, grassColor],
  [1, 0, 2, grassColor],
  [0, 0, 2, grassColor],
  [-1, 0, 0, grassColor],
  [-1, 0, 1, grassColor],
  [-1, 0, 2, grassColor],
  [-2, 0, 0, grassColor],
  [-2, 0, 1, grassColor],
  [-1, 0, -1, grassColor],
  [-2, 0, -1, grassColor],
  [-1, 0, -2, grassColor],
  [0, 0, -2, grassColor],
  [1, 0, -2, grassColor],

  [0, -1, 0, dirtColor],
  [1, -1, 0, dirtColor],
  [2, -1, 0, dirtColor],
  [1, -1, 0, dirtColor],
  [0, -1, 1, dirtColor],
  [1, -1, 1, dirtColor],
  [2, -1, 1, dirtColor],
  [0, -1, -1, dirtColor],
  [1, -1, -1, dirtColor],
  [2, -1, -1, dirtColor],
  [1, -1, 2, dirtColor],
  [0, -1, 2, dirtColor],
  [-1, -1, 0, dirtColor],
  [-1, -1, 1, dirtColor],
  [-1, -1, 2, dirtColor],
  [-2, -1, 0, dirtColor],
  [-2, -1, 1, dirtColor],
  [-1, -1, -1, dirtColor],
  [-2, -1, -1, dirtColor],
  [-1, -1, -2, dirtColor],
  [0, -1, -2, dirtColor],
  [1, -1, -2, dirtColor],

  [-1, -2, -1, dirtColor],
  [-1, -2, 0, dirtColor],
  [-1, -2, 1, dirtColor],
  [0, -2, -1, dirtColor],
  [0, -2, 0, dirtColor],
  [0, -2, 1, dirtColor],
  [1, -2, -1, dirtColor],
  [1, -2, 0, dirtColor],
  [1, -2, 1, dirtColor],

  [0, -3, 0, dirtColor],

  [0, 1, 0, woodColor],
  [0, 2, 0, woodColor],
  [0, 3, 0, woodColor],

  // [-2, 4, -2, leafColor],
  [-1, 4, -2, leafColor],
  [0, 4, -2, leafColor],
  [1, 4, -2, leafColor],
  // [2, 4, -2, leafColor],
  [-2, 4, -1, leafColor],
  [-1, 4, -1, leafColor],
  [0, 4, -1, leafColor],
  [1, 4, -1, leafColor],
  [2, 4, -1, leafColor],
  [-2, 4, 0, leafColor],
  [-1, 4, 0, leafColor],
  [0, 4, 0, leafColor],
  [1, 4, 0, leafColor],
  [2, 4, 0, leafColor],
  [-2, 4, 1, leafColor],
  [-1, 4, 1, leafColor],
  [0, 4, 1, leafColor],
  [1, 4, 1, leafColor],
  [2, 4, 1, leafColor],
  // [-2, 4, 2, leafColor],
  [-1, 4, 2, leafColor],
  [0, 4, 2, leafColor],
  [1, 4, 2, leafColor],
  // [2, 4, 2, leafColor],
  
  // [-2, 5, -2, leafColor],
  [-1, 5, -2, leafColor],
  [0, 5, -2, leafColor],
  [1, 5, -2, leafColor],
  // [2, 5, -2, leafColor],
  [-2, 5, -1, leafColor],
  [-1, 5, -1, leafColor],
  [0, 5, -1, leafColor],
  [1, 5, -1, leafColor],
  [2, 5, -1, leafColor],
  [-2, 5, 0, leafColor],
  [-1, 5, 0, leafColor],
  [0, 5, 0, leafColor],
  [1, 5, 0, leafColor],
  [2, 5, 0, leafColor],
  [-2, 5, 1, leafColor],
  [-1, 5, 1, leafColor],
  [0, 5, 1, leafColor],
  [1, 5, 1, leafColor],
  [2, 5, 1, leafColor],
  // [-2, 5, 2, leafColor],
  [-1, 5, 2, leafColor],
  [0, 5, 2, leafColor],
  [1, 5, 2, leafColor],
  // [2, 5, 2, leafColor],

  [0, 6, 0, leafColor],
  [0, 7, 0, leafColor],
  [1, 6, 0, leafColor],
  [1, 7, 0, leafColor],
  [-1, 6, 0, leafColor],
  [-1, 7, 0, leafColor],
  [0, 6, 1, leafColor],
  [0, 7, 1, leafColor],
  [0, 6, -1, leafColor],
  [0, 7, -1, leafColor],
]

function addBlocks() {
  if(!blocksData.length) return
  const [block] = blocksData.splice(getRandomInt(blocksData.length), 1)
  const [x, y, z, color] = block
  const cubeGeometry = new THREE.BoxGeometry(1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(x, y ,z)

  isLandGroup.add(cube)
  setTimeout(addBlocks, 20)
}

// scene.add(isLandGroup);

// const offset = new THREE.Vector3();
let d = {
  distance: 1
};

function animation() {
  // const {distance} = d
	// offset.x = distance * Math.sin( time * 0.0005 );
	// offset.y = 8
  // offset.z = distance * Math.cos( time * 0.0005 );

  // camera.position.copy( isLandGroup.position ).add( offset );
  // const {x, y, z} = isLandGroup.position
  // camera.lookAt(new THREE.Vector3(x, y, z));

	renderer.render( scene, camera );

}

renderer.setAnimationLoop(animation)

renderer.setSize(window.innerWidth, window.innerHeight);
addBlocks()

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

canvas.addEventListener('mouseenter', () => {
  // gsap.to(d, { distance: 10 })
})

canvas.addEventListener('mouseleave', () => {
  gsap.to(d, { distance: 1 })
})

const statsTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#stats",
  }
})

function getRandomNumber() {
  return Math.floor(Math.random() * 5001);
}

gsap.utils.toArray<Element>("#stats .stat").forEach((stat, i) => {
  const count = getRandomNumber() / 5000

  let statTl = gsap.timeline();
  
  statTl.to(stat, {
    opacity: 1,
    duration: .75
  });

  statTl.to(stat.querySelector('.progress'), {
    width: count * stat.querySelector('.progress-p')!.getBoundingClientRect().width,
    duration: .5
  }, "<.5");

  stat.querySelector('span')!.textContent = `${(count * 5000).toFixed(0).padStart(4, " ")}/5000`
  
  statsTl.add(statTl, "<" + i / 4);
})


// gsap.utils.toArray<Element>("#stats .stat").forEach((stat, i) => {
//   statsTl.to(stat, {
//     opacity: 1,
//     duration: 1
//   }, "<.5")
//   statsTl.to(stat.querySelector('.progress'), {
//     width: getRandomNumber(),
//     duration: .5
//   }, "<.5")
// })