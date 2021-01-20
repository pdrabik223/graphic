let scene, free_camera;
let debug_mode = true;

function orbit(pivot, object, angle_x, angle_y, angle_z) {
	let R = Math.pow((object.position.x - pivot.position.x), 2) +
		Math.pow((object.position.y - pivot.position.y), 2) +
		Math.pow((object.position.z - pivot.position.z), 2);

	R = Math.sqrt(R);
console.log(R);

	let to_return = new THREE.Vector3(
		pivot.position.x,
		pivot.position.y + R * Math.sin(Math.PI * angle_x / 180),
		pivot.position.z + R * Math.cos(Math.PI * angle_x / 180)
		
		);


	return to_return;


}

function moonorbit(pivot, angle_x, R) {

	console.log(R);

	let to_return = new THREE.Vector3(
		50,
		pivot.position.y + R * Math.sin(Math.PI * angle_x / 180),
		pivot.position.z + R * Math.cos(Math.PI * angle_x / 180)
		
		);


	return to_return;


}




const loader = new THREE.TextureLoader();

let color = '#edebbf';
let intensity = 1
let distance = 300
let decay = 0.1;


let player_obj_geometry, player_obj_material;

let sun, Arrakis, ziemia, vulkan, donut, weird_thing;
let pivot_Arrakis, pivot_ziemia, pivot_vulkan, pivot_donut, pivot_weird_thing,pivot_moon;



let cherry, moon;

let ancor_point;

let cherry_group;


function init() {

	scene = new THREE.Scene();




	free_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)

	free_camera.position.z = 100;




	scene.background = new THREE.CubeTextureLoader().setPath('/graphic/system_of_a_solar/textures/skybox/').load([
		'XP.png',
		'XN.png',
		'YP.png',
		'YN.png',
		'ZP.png',
		'ZN.png'
	]);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls = new THREE.OrbitControls(free_camera, renderer.domElement);
	controls.update();


	document.body.appendChild(renderer.domElement);


	const axesHelper = new THREE.AxesHelper(5);
	if (debug_mode) scene.add(axesHelper);



	let ambient = new THREE.AmbientLight(0x555555, 0.5);
	scene.add(ambient);



	//sun
	sun = new THREE.Mesh(new THREE.SphereGeometry(20, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));
	scene.add(sun);
	sun.position.set(0, 0, 0);


	// diuna

	Arrakis = new THREE.Mesh(
		new THREE.SphereGeometry(10, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));
	scene.add(Arrakis);
	Arrakis.position.set(30, 45, 0);


	pivot_Arrakis = new THREE.Object3D();
	pivot_Arrakis.position.set(30, 0, 0);



	// ziemia

	ziemia = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 1, 30 ),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));
	scene.add(ziemia);
	ziemia.position.set(60, 90, 0);
	ziemia.rotation.z+=Math.PI*90/180;

	
	pivot_ziemia = new THREE.Object3D();
	pivot_ziemia.position.set(60, 0, 0);

	moon = new THREE.Mesh(
		new THREE.SphereGeometry(2, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0x0000ff }));
	scene.add(moon);
	moon.position.set(50, 90, 0);
	
	pivot_moon =  new THREE.Object3D();
	//pivot_moon.position.set(ziemia.position);
	console.log(pivot_moon.position);

	// vulkan

	vulkan = new THREE.Mesh(
		new THREE.SphereGeometry(10, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));
	scene.add(vulkan);
	vulkan.position.set(120, 120, 0);

	pivot_vulkan = new THREE.Object3D();
	pivot_vulkan.position.set(120, 0, 0);

	// donut

	donut = new THREE.Mesh(
		new THREE.TorusGeometry(10, 3, 16, 100),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));

	scene.add(donut);
	donut.position.set(150, 180, 0);
	pivot_donut = new THREE.Object3D();
	pivot_donut.position.set(150, 0, 0);

	
	


	// weird_thing

	weird_thing = new THREE.Mesh(
		new THREE.SphereGeometry(10, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));

	scene.add(weird_thing);
	weird_thing.position.set(150, 180, 0);

	pivot_weird_thing = new THREE.Object3D();
	pivot_weird_thing.position.set(150, 0, 0);


	render();
}





angle_arrakis = 0;
angle_ziemia = 0, angle_vulkan = 0, angle_donut = 0, angle_weird_thing = 0;

function render() {
	

	angle_arrakis += 0.1;
	Arrakis.position.copy(orbit(pivot_Arrakis, Arrakis, angle_arrakis, 0, 0));
	Arrakis.rotation.x+=Math.random()/10;
	Arrakis.rotation.y+=Math.random()/10;
	Arrakis.rotation.z+=Math.random()/10;

	angle_ziemia += 0.4;
	ziemia.position.copy(orbit(pivot_ziemia, ziemia, angle_ziemia, 0, 0));
	

	pivot_moon.position.x = ziemia.position.x;
	
	pivot_moon.position.y = ziemia.position.y;
	
	pivot_moon.position.z = ziemia.position.z;


	moon.position.copy(moonorbit(pivot_moon,angle_weird_thing,8));


	angle_vulkan += 1.4;
	vulkan.position.copy(orbit(pivot_vulkan, vulkan, angle_vulkan, 0, 0));
	vulkan.rotation.x+=Math.random()/10;
	vulkan.rotation.y+=Math.random()/10;
	vulkan.rotation.z+=Math.random()/10;

	angle_donut -= 1.3;
	donut.position.copy(orbit(pivot_donut, donut, angle_donut, 0, 0));
	donut.rotation.x+=Math.random()/10;
	donut.rotation.y+=Math.random()/10;
	donut.rotation.z+=Math.random()/10;



	angle_weird_thing += 1.4;
	weird_thing.position.copy(orbit(pivot_weird_thing, weird_thing, angle_weird_thing, 0, 0));
	weird_thing.rotation.x+=Math.random()/10;
	weird_thing.rotation.y+=Math.random()/10;
	weird_thing.rotation.z+=Math.random()/10;


	renderer.render(scene, free_camera);

	requestAnimationFrame(render);
}

init();
