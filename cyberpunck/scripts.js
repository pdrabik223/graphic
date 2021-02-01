let scene, free_camera, static_camera;
let debug_mode = false;




const loader = new THREE.TextureLoader();



function init() {


    scene = new THREE.Scene();


    free_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    static_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

    static_camera.position.z = 0;
    static_camera.position.x = -110;
    static_camera.rotation.y -= 3.14 / 2;


    free_camera.position.z = 100;




    scene.background = new THREE.CubeTextureLoader().setPath('/cyberpunck/textures/skybox/').load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
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



    render();
}

let camera_counter = 0;

window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {

        case 48:

            scene.background.rotation.y += Math.Pi / 4;
            break;

        case 32: //space


            camera_counter++;


            break;


    }
}, false);




function render() {




    if (camera_counter % 2 == 0) renderer.render(scene, free_camera);
    else renderer.render(scene, static_camera);
    requestAnimationFrame(render);


}


init();
