import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

class Scene {

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );

    this.clock = new THREE.Clock()
    this.uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() }
    };

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( this.width, this.height );
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.onWindowResize();
    this.init();
  }
  init() {
    this.camera.position.z = 5;
    document.body.appendChild( this.renderer.domElement );
    this.scene.background = new THREE.Color( 0x0f0f0f );

    const geometry = new THREE.PlaneBufferGeometry( 2, 3 );
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });
    const mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
  }

  add(obj) {
    this.scene.add(obj)
  }

  onWindowResize() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( this.width, this.height );
    this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
    this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    this.render()
  }

  render() {
    const elapseTime = this.clock.getElapsedTime();
    this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render( this.scene, this.camera );
  }
}

export default Scene;
