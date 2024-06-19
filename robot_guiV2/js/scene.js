import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import  ModelLoader  from './model_loader.js';

const container = document.getElementById('scene-canvas');

const modelLoader = new ModelLoader();

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xF0F0F0 );
scene.up.set(0, 0, 1);

const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.001, 200 );
camera.up.set(0, 0, 1); 
camera.position.set( 5, -1, 2 );

camera.lookAt(0,0,0)

let robot = modelLoader.loadRobot("test", scene);


console.log("tesxt", robot);
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

scene.add( new THREE.AmbientLight( 0xffffff, 0.6 ) );

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.setScalar(1024);
directionalLight.position.set(5, 5, 30);
scene.add(directionalLight);

const axes = new THREE.AxesHelper(1);
//axes.rotation.x = Math.PI / 2;
scene.add(axes);

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50,50),
    new THREE.MeshPhongMaterial({color: 0xDDDDDD})
);
ground.position.z = -0.01;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(50, 100);
grid.material.opacity = 0.25;
grid.material.transparent = true;
grid.rotateX(Math.PI*0.5)
scene.add(grid);

const controls = new OrbitControls(camera, renderer.domElement );
controls.damping = 0.2;
controls.addEventListener('change', render );

window.addEventListener('resize', onWindowResize );

render();


function render() {

renderer.render(scene, camera );

}


function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    render();

}


let clientWidth_last = container.clientWidth;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    if(clientWidth_last != container.clientWidth){
        onWindowResize();
        console.log("resize");
    }
    clientWidth_last = container.clientWidth;
}
animate();

