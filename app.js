const WIDTH = window.innerWidth-100
const HEIGHT = window.innerHeight-100

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set( 15, 15, 15 );
camera.lookAt( 0, 0, 0 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

var plane = new THREE.GridHelper(100, 10);
scene.add(plane);

window.addEventListener('resize', function(){
    var newWidth = window.innerWidth-100;
    var newHeight = window.innerHeight-100;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
})

//CUBES
let cubes = [];
function addCube(){
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: "white", wireframe: true});
    var cube = new THREE.Mesh(geometry, material);
    let X = Math.ceil(Math.random()*10) 
    let Y = Math.ceil(Math.random()*10) 
    let Z = Math.ceil(Math.random()*10)
    cube.position.set(X, Y, Z);
    scene.add(cube);
    cubes.push(cube);
}
window.addEventListener('click', addCube)

function baseLines(){
    var geometryX = new THREE.Geometry();
    geometryX.vertices.push(new THREE.Vector3( 0, 0, 0) );
    geometryX.vertices.push(new THREE.Vector3( 100, 0, 0) );
    var materialX = new THREE.LineBasicMaterial( {color: "red"} );

    var geometryY = new THREE.Geometry();
    geometryY.vertices.push(new THREE.Vector3( 0, 0, 0) );
    geometryY.vertices.push(new THREE.Vector3( 0, 100, 0) );
    var materialY = new THREE.LineBasicMaterial( {color: "green"} );

    var geometryZ = new THREE.Geometry();
    geometryZ.vertices.push(new THREE.Vector3( 0, 0, 0) );
    geometryZ.vertices.push(new THREE.Vector3( 0, 0, 100) );
    var materialZ = new THREE.LineBasicMaterial( {color: "blue"} );

    var lineX = new THREE.Line(geometryX, materialX);
    var lineY = new THREE.Line(geometryY, materialY);
    var lineZ = new THREE.Line(geometryZ, materialZ);
    scene.add(lineX);
    scene.add(lineY);
    scene.add(lineZ);

}


function update() {
    for (let i = 0; i < cubes.length; i++) {
        cubes[i].rotation.x += Math.random()/50;
        cubes[i].rotation.y += Math.random()/50;   
    }
}

function render() {
    renderer.render(scene, camera);
}

function loop() {
    requestAnimationFrame(loop);
    controls.update();
    update();
    render();
}

baseLines();
loop();