import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(20,10,20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(9, 20, 20);
light.castShadow = true;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

function createCube(color, x, y, z) {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: color } );
    const cube = new THREE.Mesh( geometry, material );

    cube.position.set(x, y, z);
    scene.add(cube);

    return cube;
}

//////// CHICKEN /////////

// neck
for (let x = -1; x > -5; x--) {
    for (let y = 0; y < 9; y++) {
        for (let z = -1; z > -5; z--) {
            createCube(0xffffff, x, y, z);
        }
    }
}

// eyes
createCube(0x000000, -2, 7, -1);
createCube(0x000000, -2, 7, -4);

// back
for (let x = -5; x > -9; x--) {
    for (let y = 0; y < 4; y++) {
        for (let z = -1; z > -5; z--) {
            createCube(0xffffff, x, y, z);
        }
    }
}

// right wing
for (let x = -2; x > -8; x--) {
    for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 2; z++) {
            createCube(0xf5f5f5, x, y, z);
        }
    }
}

// left wing
for (let x = -2; x > -8; x--) {
    for (let y = 0; y < 3; y++) {
        for (let z = -5; z > -7; z--) {
            createCube(0xf5f5f5, x, y, z);
        }
    }
}

// tail
for (let y = 1; y < 3; y++) {
    for (let z = -2; z > -4; z--) {
        createCube(0xf7f7f7, -9, y, z);
    }
}

// crest
for (let x = -2; x > -4; x--) {
    for (let z = -2; z >-4; z--) {
        createCube(0xf07ae0, x, 9, z);
    }
}

// beak
for (let x = 1; x > -1; x--) {
    for (let z = -2; z > -4; z--) {
        createCube(0xf7aa45, x, 6, z);
    }
}
for (let z = -2; z > -4; z--) {
    createCube(0xf07ae0, 0, 5, z);
}

// right leg
for (let y = -1; y > -4; y--) {
    createCube(0xf7aa45, -5, y, -1);
}
createCube(0xf7aa45, -5, -4, -1);
createCube(0xf7aa45, -6, -4, -1);
createCube(0xf7aa45, -5, -4, 0);
createCube(0xf7aa45, -5, -4, -2);
createCube(0xf7aa45, -4, -4, -1);
createCube(0xf7aa45, -3, -4, -1);

// left leg
for (let y = -1; y > -4; y--) {
    createCube(0xf7aa45, -5, y, -4);
}
createCube(0xf7aa45, -6, -4, -4);
createCube(0xf7aa45, -5, -4, -3);
createCube(0xf7aa45, -5, -4, -5);
createCube(0xf7aa45, -5, -4, -4);
createCube(0xf7aa45, -4, -4, -4);
createCube(0xf7aa45, -3, -4, -4);



//////// PENGUIN /////////

// body
for (let x = -1; x > -7; x--) {
    for (let y = -4; y < 6; y++) {
        for (let z = 13; z > 6; z--) {
            createCube(0x172a80, x, y, z);
        }
    }
}

// belly
for (let y = -4; y < 1; y++) {
    for (let z = 13; z > 6; z--) {
        createCube(0xffffff, -1, y, z);
    }
}

for (let y = -4; y < -1; y++) {
    for (let z = 13; z > 6; z--) {
        createCube(0xffffff, -2, y, z);
    }
}

for (let z = 12; z > 7; z--) {
    createCube(0xf0d18b, -1, 0, z);
}
for (let z = 11; z > 8; z--) {
    createCube(0xf0d18b, -1, -1, z);
}

// eyes
for (let x = -2; x > -4; x--) {
    for (let y = 2; y < 5; y++) {
        createCube(0x000000, x, y, 14);
    }
}
createCube(0xffffff, -2, 4, 14);
createCube(0xf0d18b, -4, 4, 13);
createCube(0xf0d18b, -4, 3, 13);
createCube(0xf0d18b, -5, 4, 13);

for (let x = -2; x > -4; x--) {
    for (let y = 2; y < 5; y++) {
        createCube(0x000000, x, y, 6);
    }
}
createCube(0xffffff, -2, 4, 6);
createCube(0xf0d18b, -4, 4, 7);
createCube(0xf0d18b, -4, 3, 7);
createCube(0xf0d18b, -5, 4, 7);

// beak
for (let z = 11; z > 8; z--) {
    createCube(0xff8229, 0, 2, z);
}

// legs
for (let z = 13; z > 11; z--) {
    createCube(0xff8229, 0, -4, z);
}
for (let z = 8; z > 6; z--) {
    createCube(0xff8229, 0, -4, z);
}

// right wing
for (let x = -3; x > -6; x--) {
    for (let y = -4; y < 1; y++) {
        createCube(0x172a80, x, y, 14);
    }
}
for (let y = -4; y < -2; y++) {
    createCube(0x172a80, -6, y, 14);
}

// left wing
for (let x = -3; x > -6; x--) {
    for (let y = -4; y < 1; y++) {
        createCube(0x172a80, x, y, 6);
    }
}
for (let y = -4; y < -2; y++) {
    createCube(0x172a80, -6, y, 6);
}


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 50;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();