let scene, free_camera, static_camera;
let debug_mode = false;



const raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


const loader = new THREE.TextureLoader();

let box_number = 9;
let box_array = new Array();
var box_collor_array = new Array();


const radius = 15;
const alpha = Math.PI / (box_number / 2);



function orbit(pivot, object, angle) {
    let R = Math.pow((object.position.x - pivot.x), 2) +
        Math.pow((object.position.y - pivot.y), 2) +
        Math.pow((object.position.z - pivot.z), 2);

    R = Math.sqrt(R);


    let to_return = new THREE.Vector3(
        pivot.x,
        pivot.y + R * Math.sin(Math.PI + angle),
        pivot.z + R * Math.cos(Math.PI + angle)

    );


    return to_return;


}


function init() {


    scene = new THREE.Scene();


    free_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    static_camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

    static_camera.position.z = 0;
    static_camera.position.x = -110;
    static_camera.rotation.y -= 3.14 / 2;


    free_camera.position.z = 100;




    scene.background = new THREE.CubeTextureLoader().setPath('/matkoj is a bunch of squares/textures/skybox/').load([
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







    for (let i = 0; i < box_number; i++) {

        box_array.push(new THREE.Mesh(
            new THREE.BoxGeometry(Math.sqrt(box_number), Math.sqrt(box_number), Math.sqrt(box_number)),
            new THREE.MeshBasicMaterial({ color: 0x5577ff, opacity: 0.7, transparent: true })));

        box_array[box_array.length - 1].position.set(-10, radius * Math.sin(alpha * i), radius * Math.cos(alpha * i));


        box_array[i].material.color.set('black');

        scene.add(box_array[box_array.length - 1]);
    }



    for (var i = 0; i < box_number; i++) {
        var red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
        var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
        var green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

        box_collor_array.push(new THREE.Color("rgb(" + parseInt(red, 16) + "," + parseInt(green, 16) + "," + parseInt(blue, 16) + ")"));
    }

    function sin_to_hex(i, phase) {
        var sin = Math.sin(Math.PI / box_number * 2 * i + phase);
        var int = Math.floor(sin * 127) + 128;
        var hex = int.toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    }





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
let mousex, mousey;


console.log(box_collor_array);

function onMouseMove(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    if (camera_counter % 2 == 0) raycaster.setFromCamera(mouse, free_camera);
    else raycaster.setFromCamera(mouse, static_camera);

    var intersects = raycaster.intersectObjects(box_array);

    if (intersects.length > 0) {


        for (var i = 0; i < box_array.length; i++) {

            if (intersects[0].object == box_array[i]) {

                box_array[i].material.color.set('white');
                return;


            }
        }

    } else color = (1, 0, 0);


}









window.addEventListener('mousemove', onMouseMove, false);

let anchor = new THREE.Vector3(10, 0, 0);
let beta = 0.01;

function render() {

    for (let i = 0; i < box_array.length; i++) {
        box_array[i].rotation.x += 0.05;
        box_array[i].rotation.y -= 0.05;
        box_array[i].rotation.z += 0.05;
    }

    beta += 0.01;
    for (let i = 0; i < box_array.length; i++) box_array[i].position.copy(orbit(anchor, box_array[i], beta + i * alpha));





    if (camera_counter % 2 == 0) renderer.render(scene, free_camera);
    else renderer.render(scene, static_camera);
    requestAnimationFrame(render);


}


init();
