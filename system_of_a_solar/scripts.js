let scene, free_camera;
let debug_mode = true;





const loader = new THREE.TextureLoader();

let color = '#edebbf';
let intensity = 1
let distance = 300
let decay = 0.1;


let player_obj_geometry, player_obj_material;

let sun, Arrakis, ziemia, vulkan, donut, weird_thing;
let cherry, moon;

let ancor_point;

let cherry_group;


function init() {

	scene = new THREE.Scene();




	free_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)

	free_camera.position.z = 10;




	scene.background = new THREE.CubeTextureLoader().setPath('/teemtrees/system_of_a_solar/textures/skybox/').load([
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

	// ziemia

	ziemia = new THREE.Mesh(
		new THREE.SphereGeometry(10, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));
	scene.add(ziemia);
	ziemia.position.set(60, 90, 0);



	moon = new THREE.Mesh(
		new THREE.SphereGeometry(10, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));
	scene.add(moon);
	moon.position.set(90, 90, 0);




	// vulkan

	vulkan = new THREE.Mesh(
		new THREE.SphereGeometry(10, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));
	scene.add(vulkan);
	vulkan.position.set(120, 120, 0);

	// donut

	donut = new THREE.Mesh(
		new THREE.TorusGeometry(10, 3, 16, 100),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));

	scene.add(donut);
	donut.position.set(150, 180, 0);


	cherry = new THREE.Mesh(
		new THREE.SphereGeometry(4, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));

	cherry.position.set(180, 200, 0);


	ancor_point = new THREE.Mesh(
		new THREE.SphereGeometry(0, 0, 0, 0),
		new THREE.MeshBasicMaterial({ color: 0xff3030 ,castShadow : true,receiveShadow : true}));

	//ancor_point.normalize();
	ancor_point.position.set(193,200,0)

	cherry_group = new THREE.Group()
	cherry_group.add(cherry);
	cherry_group.add(ancor_point);
	scene.add(cherry_group);


	// weird_thing

	weird_thing = new THREE.Mesh(
		new THREE.SphereGeometry(10, 20, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff3030 }));

	scene.add(weird_thing);
	weird_thing.position.set(200, 160, 0);



	render();
}






let x = 0;
function render() {
	x+=0.001;
	cherry_group.rotation+=0.001;

	renderer.render(scene, free_camera);

	requestAnimationFrame(render);
}

init();
