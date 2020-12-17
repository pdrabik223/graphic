

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //Field of view, proporcje ekranu, jak blisko widzi kamera, jak daleko moze widziec
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.Geometry();
//geometry.vertices.push(new THREE.Vector3(0,0,-1));

var szerokosc = 3;     //szeroskosc
var m = szerokosc * 2;    //szerokosc pomnozona przez 2
var wysokosc = 3;      //wysokosc
var n = wysokosc;       //przypisanie zmiennej n wyskosci
var y = -2;             //wspolrzedna y
var z = 0;              //wspolrzedna z

//Petla wykonujaca sie  do rozmiaru podanej wyskosci 
for (var i = 0; i < n; i++) {
    var x = -2; //wspolrzedna x
    //Petla wykonujaca sie do rozmiaru podanej szerokosci
    for (var j = 0; j < m; j++) {
        //Punkty kolejnych kwadratow
        geometry.vertices.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x, y + 1, z), new THREE.Vector3(x + 1, y, z), new THREE.Vector3(x + 1, y + 1, z));

        if (i > 0) {
            j = j + (4 * m * i);
            geometry.faces.push(new THREE.Face3(j, j + 1, j + 2, 0xffff00));
            j = j - (4 * m * i);
        }
        else {
            geometry.faces.push(new THREE.Face3(j, j + 1, j + 2, 0xff00ff));
        }
        //Zwiekszenie zmiennej x o 2 
        x = x + 2;
    }
    //Zwiekszenie zmiennej y o 1
    y = y + 1;
}

//Materiał (rozmiar, tlumienie rozmiaru, kolor)
var material = new THREE.PointsMaterial(
    {
        size: 2,
        sizeAttenuation: false,
        color: 0xff0000
    });


var plaszczyzna = new THREE.Points(geometry, material);


var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(
    {
        color: 0xff0000,
        wireframe: true,
        side: THREE.DoubleSide
    }));


scene.add(mesh);

camera.position.z = 5;


function widthup() { szerokosc++; requestAnimationFrame(animate); };

function heightup() { wysokosc++; console.log(wysokosc);requestAnimationFrame(animate); };
function widthdown() { szerokosc--; onsole.log(szerokosc);requestAnimationFrame(animate); };
function heightdown() { wysokosc--; console.log(wysokosc);requestAnimationFrame(animate); };



var animate = function () {
    console.log(szerokosc);
    
    requestAnimationFrame(animate);

    // mesh.rotation.y += 0.01;            //Rotacja siatka
    //  plaszczyzna.rotation.y += 0.01;     //Rotacja punktami

    renderer.render(scene, camera);   //Wyrenderowanie sceny i kamery

};

animate();
