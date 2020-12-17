let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000); //Field of view, proporcje ekranu, jak blisko widzi kamera, jak daleko moze widziec
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);

scene.add(axesHelper);

let geometry = new THREE.Geometry();
geometry.vertices = [new THREE.Vector3(0,0,0),new THREE.Vector3(1,2,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,2,0),new THREE.Vector3(4,0,0)];

geometry.faces = [new THREE.Face3(1,0,2), new THREE.Face3(2,3,4)];

let material = new THREE.PointsMaterial({size: 0.1, sizeAttenuation: true, color: 0xff00ff});

let trojkaty= new THREE.Points(geometry, material);

let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.FrontSide}));

scene.add(mesh);
scene.add(trojkaty);

camera.position.z = 5;

let animate = function(){
    requestAnimationFrame(animate);
 
     mesh.rotation.y += 0.01;
     trojkaty.rotation.y += 0.01;
 
     renderer.render(scene, camera);
 };
 
 animate();

 //narysowac jakies trojkaty, podajemy ile paneli ma miec w pionie i poziomie, maja utworzyc prostokat
