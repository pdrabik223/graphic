let scene, free_camera, first_person_camera, third_person_camera, budynek_a_camera, budynek_b_camera;
let debug_mode = true;


let sunLight,moonLight;
let orbitals_x = 50;
let orbitals_y = 50;

let px = 0, py = 0.5, pz = 0;

let camera_counter = 0;
const loader = new THREE.TextureLoader();

let color = '#edebbf';
let intensity = 1
let distance = 300
let decay = 0.1;


let mooncolor = '#4961b6';
let moonintensity = 2
let moondistance = 300
let moondecay = 0.2;

let player_obj_geometry, player_obj_material;
let sun_geometry, sun_material, moon_geometry, moon_material;
let cube;

let player = new THREE.Group();
let orbitals = new THREE.Group();




function init() {

	scene = new THREE.Scene();
	



	free_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
	free_camera.position.z = 10;

	first_person_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

	first_person_camera.position.set(px, py, pz);
	
	third_person_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

	third_person_camera.position.set(px, py + 2, pz + 5);


	budynek_a_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
	budynek_a_camera.position.y += 5;
	budynek_a_camera.position.x += 15;
	budynek_a_camera.position.z += 15;


	budynek_b_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

	budynek_b_camera.position.y += 5;
	budynek_b_camera.position.x += -17;
	budynek_b_camera.position.z += -15;


	scene.background = new THREE.CubeTextureLoader().setPath('/teemtrees/city/textures/skybox/').load([
		'mxp.png',
		'mxm.png',
		'mup.png',
		'mbot.png',
		'mzp.png',
		'mzm.png'
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

	let directionalLight = new THREE.DirectionalLight(0xff8c19);
	directionalLight.position.set(0, 0, 100);

	const directionalLight_helper = new THREE.DirectionalLightHelper(directionalLight);
	if (debug_mode) scene.add(directionalLight_helper);
	//scene.add(directionalLight);


	//directionalLight.target.position.set(0,0,0); //it's like 3am and i dont know simply idk

	//scene.add(directionallight.target);

	sunLight = new THREE.PointLight(color, intensity, distance, decay);
	sunLight.position.set(orbitals_x, orbitals_y, 0);
	
	moonLight = new THREE.PointLight(mooncolor, moonintensity, moondistance, moondecay);
	moonLight.position.set(-orbitals_x, -orbitals_y, 0);


	const sun_helper = new THREE.PointLightHelper(sunLight);
	if (debug_mode) scene.add(sun_helper);


	const moon_helper = new THREE.PointLightHelper(moonLight);
	if (debug_mode) scene.add(moon_helper);




	player_obj_geometry = new THREE.BoxGeometry(1, 1, 1);
	player_obj_material = new THREE.MeshStandardMaterial({ color: 0xff3030, metalness: 1.0 });

	cube = new THREE.Mesh(player_obj_geometry, player_obj_material);

	

	cube.position.set(px, py, pz);


	const plane_material = [
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/grass.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/hell.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
	];
	const road_material = [
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/road.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/hell.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/border.png') }),
	];


	const budynek_material = [
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/Budynek_left.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/Budynek_right.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/Budynek_up.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/Budynek_down.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/Budynek_front.png') }),
		new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/Budynek_back.png') }),
	];




	const plane_geometry = new THREE.BoxGeometry(100, 0.5, 100);

	plane = new THREE.Mesh(plane_geometry, plane_material);

	scene.add(plane);
	plane.position.y -= 0.5;

	const road_geometry = new THREE.BoxGeometry(20, 0.5, 99);
	road = new THREE.Mesh(road_geometry, road_material);
	scene.add(road);
	road.position.y -= 0.3;


	const budynek_a_geometry = new THREE.BoxGeometry(10, 11, 10);

	budynek_a = new THREE.Mesh(budynek_a_geometry, budynek_material);

	scene.add(budynek_a);
	budynek_a.position.y += 5;
	budynek_a.position.x += 15;
	budynek_a.position.z += 15;

	budynek_a.rotation.y += 4.71;

	budynek_b = new THREE.Mesh(budynek_a_geometry, budynek_material);
	scene.add(budynek_b);
	budynek_b.position.y += 5;
	budynek_b.position.x += -17;
	budynek_b.position.z += -15;
	budynek_b.rotation.y += 1.6;


	sun_geometry = new THREE.SphereBufferGeometry(50, 32, 32);
	sun_material = new THREE.MeshBasicMaterial({ map: loader.load('/teemtrees/city/textures/sun.png') });
	const sun_sphere = new THREE.Mesh(sun_geometry, sun_material);

	
	sun_sphere.position.set(250, 250, 0);


	moon_geometry = new THREE.SphereBufferGeometry(30, 32, 32);
	moon_material = new THREE.MeshLambertMaterial({ map: loader.load('/teemtrees/city/textures/moon.png') });


	const moon_sphere = new THREE.Mesh(moon_geometry, moon_material);
	moon_sphere.position.set(-250, -250, 0);
	
	
	orbitals.add(moon_sphere);
	orbitals.add(sun_sphere);
	orbitals.add(sunLight);
	orbitals.add(moonLight);


	player.add(cube);
	player.add(first_person_camera);
	player.add(third_person_camera);
	
	scene.add(player);
	scene.add(orbitals);
	
	render();
}

let angle = 0.0;
let icrement = 1;
let full_rotation = 360;

let step = 0.4;

window.addEventListener('keydown', function (event) {
	switch (event.keyCode) {
		case 37: // Left
			player.rotation.y += 0.07;
			//	cube.rotation.z+=0.1;
		//	first_person_camera.rotation.y += 0.07;

			//third_person_camera.position.set(cube.position.x, cube.position.y + 2, cube.position.z + 5);
			//third_person_camera.rotation.set(cube.rotation);
			break;

		case 39: // Right
			//	cube.position.x+=0.5;

			player.rotation.y -= 0.07;
			//first_person_camera.rotation.y -= 0.07;
		//	third_person_camera.position.set(cube.position.x, cube.position.y + 2, cube.position.z + 5);
		//	third_person_camera.rotation.set(cube.rotation);
			break;

		case 38: // Up
			player.position.z -= Math.cos(player.rotation.y) * step;
			player.position.x -= Math.sin(player.rotation.y) * step;
			//	cube.rotation.x-=0.1;
		//	first_person_camera.position.z -= Math.cos(cube.rotation.y) * step;
		//	first_person_camera.position.x -= Math.sin(cube.rotation.y) * step;
		//	third_person_camera.position.set(cube.position.x, cube.position.y + 2, cube.position.z + 5);
		//	third_person_camera.rotation.set(cube.rotation);
			break;


		case 40: // Down
			player.position.z += Math.cos(player.rotation.y) * step;
			player.position.x += Math.sin(player.rotation.y) * step;
			//	cube.rotation.x+=0.1;
			//first_person_camera.position.z -= Math.cos(cube.rotation.y) * step;
		//	first_person_camera.position.x -= Math.sin(cube.rotation.y) * step;
		//	third_person_camera.position.set(cube.position.x, cube.position.y + 2, cube.position.z + 5);
		//	third_person_camera.rotation.set(cube.rotation);
			break;


		case 32: //space
			camera_counter++;
			console.log(camera_counter % 5)
			break;

	}
}, false);




function render() {
	//console.log(orbitals_x, orbitals_y, angle, cube.rotation);

	
	orbitals.rotation.z+=0.005;


	switch (camera_counter % 5) {
		case 0:
			renderer.render(scene, free_camera);
			break;
		case 1:
			renderer.render(scene, first_person_camera);
			break;
		case 2:
			renderer.render(scene, third_person_camera);
			break;
		case 3:
			budynek_a_camera.lookAt(player.position);
			renderer.render(scene, budynek_a_camera);
			break;
		case 4:
			budynek_b_camera.lookAt(player.position);
			renderer.render(scene, budynek_b_camera);

			break;



		default:
			renderer.render(scene, free_camera);

	}


	//renderer.render(scene, free_camera);
	requestAnimationFrame(render);
	//controls.update();
	//camera.lookAt(cube.position.x,cube.position.y,cube.position.z);
}

init();
