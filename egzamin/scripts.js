let scene, free_camera;

const loader = new THREE.TextureLoader();

let color = '#edebbf';
let intensity = 1
let distance = 300
let decay = 0.1;
let paTeRatop;

let player;
function init() {





    scene = new THREE.Scene();




    free_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    free_camera.position.z = 20;

    scene.background = new THREE.CubeTextureLoader().setPath('/graphic/egzamin/textures/skybox/').load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ]);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);


    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // defaul



    controls = new THREE.OrbitControls(free_camera, renderer.domElement);
    controls.update();



    document.body.appendChild(renderer.domElement);


    //  let ambient = new THREE.AmbientLight(0x555555, 1);
    //scene.add(ambient);

    const light = new THREE.DirectionalLight(0x444444, 4, 100);
    light.position.set(50, 50, 50); //default; light shining from top
    light.castShadow = true; // default false

    scene.add(light);

    scene.add(new THREE.DirectionalLightHelper(light, 5))

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 1080; // default
    light.shadow.mapSize.height = 1080; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 1000; // defaul




    let plate = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 1, 40), new THREE.MeshLambertMaterial({ map: loader.load('/graphic/egzamin/textures/white_rock_hard.jpg')/* color: 0xff0000 */ }));
    scene.add(plate);
    plate.position.set(10, 0, 10);
    plate.castShadow = true;


    plate.receiveShadow = true;


    let cake_material = [new THREE.MeshLambertMaterial({ map: loader.load('/graphic/egzamin/textures/pie_from_the_side.jpg') }),
    new THREE.MeshLambertMaterial({ map: loader.load('/graphic/egzamin/textures/good_apple pie_black_small.png') })];


    let cake = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 3, 40), cake_material);

    scene.add(cake);
    cake.position.set(10, 2, 10);
    cake.castShadow = true;






    let cake2 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 3, 40), cake_material);
    scene.add(cake2);
    cake2.position.set(0, 7, 0);
    cake2.castShadow = true;



    let paTeRAstand = new THREE.Mesh(new THREE.CylinderGeometry(1, 4, 5, 40), new THREE.MeshLambertMaterial({
        color: 0x444444,
        opacity: 0.5,
        transparent: true,


    }));
    scene.add(paTeRAstand);
    paTeRAstand.position.set(0, 2.5, 0);

    let paTeRa = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 0.5, 40), new THREE.MeshLambertMaterial({
        color: 0x444444, opacity: 0.5,
        transparent: true,


    }));




    paTeRa.position.set(0, 5, 0);

    paTeRatop = new THREE.Mesh(new THREE.SphereGeometry(7, 20, 20, 0, 3.1416), new THREE.MeshLambertMaterial({
        color: 0x444444, opacity: 0.5,
        transparent: true,


    }));
    paTeRatop.rotation.x += -3.14 / 2;
    paTeRatop.position.set(0, 5, 0);
    scene.add(paTeRatop);




    scene.add(paTeRa);
    let table = new Array();

    table[0] = new THREE.Mesh(new THREE.CubeGeometry(50, 1, 50),
        new THREE.MeshLambertMaterial({ map: loader.load('/graphic/egzamin/textures/hard_wood.jpg')/* color: 0xff0000 */ }));

    for (let i = 1; i < 5; i++) {
        table[i] = new THREE.Mesh(new THREE.CubeGeometry(2.5, 25, 2.5),
            new THREE.MeshLambertMaterial({ map: loader.load('/graphic/egzamin/textures/hard_wood.jpg') /*color: 0xff0000*/ }));

    }


    table[0].position.set(0, -0.5, 0);

    table[1].position.set(-22.5, -12.5, 22.5);
    table[2].position.set(22.5, -12.5, 22.5);
    table[3].position.set(22.5, -12.5, -22.5);
    table[4].position.set(-22.5, -12.5, -22.5);




    for (let i = 0; i < 5; i++) {
        table[i].castShadow = true;


        table[i].receiveShadow = true;
    }







    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);


    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);



    for (let i = 0; i < 5; i++) scene.add(table[i]);





    render();
}


let framecounter = 0;
let rotationleft = true;


function render() {
    framecounter++;
    renderer.render(scene, free_camera);
    requestAnimationFrame(render);

    if (rotationleft) {
        paTeRatop.rotation.y += 0.03;


    } else paTeRatop.rotation.y -= 0.03;
    if (paTeRatop.rotation.y > 3.14 / 4) rotationleft = false;
    if (paTeRatop.rotation.y < 0) rotationleft = true;
}
init();
