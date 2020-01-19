(function(){
    var script=document.createElement('script');
    script.onload=function(){
        var stats=new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop(){
            stats.update();
            requestAnimationFrame(loop);
        });
    };
    script.src='//mrdoob.github.io/stats.js/build/stats.min.js';
    document.head.appendChild(script);
})()

const WIDTH = window.innerWidth-100;
const HEIGHT = window.innerHeight-100;

//CAMERA
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);

//RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

//CONTROLS
controls = new THREE.OrbitControls(camera, renderer.domElement);

//PLANE
var plane = new THREE.GridHelper(100, 10);
scene.add(plane);

//LIGHT
var light = new THREE.PointLight(0xFFFFFF, 4.0, 15);
light.position.set(0, 0, 0);
scene.add(light);
//BULB
var bulbGeometry = new THREE.SphereGeometry(1, 64, 32);
var bulbMaterial = new THREE.MeshBasicMaterial({color: 'orange', wireframe: true});
var bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
bulb.position.set(0, 0, 0);
scene.add(bulb);

//WINDOW
window.addEventListener('resize', function(){
    var newWidth = window.innerWidth-100;
    var newHeight = window.innerHeight-100;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
})

//CUBES
let cubes = [];
var cubeMaterials = [
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('./dice/1.png'), side: THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('./dice/2.png'), side: THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('./dice/3.png'), side: THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('./dice/4.png'), side: THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('./dice/5.png'), side: THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('./dice/6.png'), side: THREE.DoubleSide})
];
function addCube(){
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    //var material = new THREE.MeshFaceMaterial(cubeMaterials);
    var cube = new THREE.Mesh(geometry, cubeMaterials);
    let X = Math.ceil(Math.random()*10) 
    let Y = Math.ceil(Math.random()*10) 
    let Z = Math.ceil(Math.random()*10)
    cube.position.set(X, Y, Z);
    scene.add(cube);
    cubes.push(cube);
}
window.addEventListener('click', addCube)

//XYZ LINES
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

//APP
function update() {
    for (let i = 0; i < cubes.length; i++) {
        let speed = Math.random()/50;
        cubes[i].rotation.x += speed;
        cubes[i].rotation.y += speed;  
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