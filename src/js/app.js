import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'lil-gui';

// const gui = new GUI();
const clock = new THREE.Clock()
const canvas = document.querySelector('.canvas')
/** Stats */
// const stats = Stats()
// document.body.appendChild(stats.dom)


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
camera.position.z = 5;

/** Controls */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)

  // pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Material
// const textureLoader = new THREE.TextureLoader()
const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );

// Geometry
const cube = new THREE.Mesh(
  new THREE.BoxGeometry( 1, 1, 1 ),
  material );
scene.add( cube );



const animate = () => {
  const elapsed = clock.getElapsedTime()

  cube.rotation.x = elapsed * 0.5;
  cube.rotation.y = elapsed * 0.5;

  controls.update()
  // stats.update()
  renderer.render( scene, camera );

  requestAnimationFrame( animate );
}

animate();
