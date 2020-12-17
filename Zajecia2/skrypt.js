let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000); //Field of view, proporcje ekranu, jak blisko widzi kamera, jak daleko moze widziec
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//let geometry = new THREE.SphereGeometry(1.5,6,6);
let geometry = new THREE.Geometry();
//geometry.vertices.push(new THREE.Vector3(0,0,-1));

let material = new THREE.PointsMaterial({size: 0.1, sizeAttenuation: true, color: 0xff00ff}); // sizeAttenuation uwzglednia kwestie kamery i perspektywy

let dot = new THREE.Points(geometry, material);


let pi = Math.PI;
let radius=7;


for (var i = -pi; i < pi; i += 0.06) {
    geometry.vertices.push(
      new THREE.Vector3(
        0 + radius * Math.cos( pi * i/1080),
        0 + radius * Math.sin(pi * i/1080),
        0
      ));
  
    for (let j = 0; j < 2 * pi; j += 0.05) {
      geometry.vertices.push(
        new THREE.Vector3(
          0 + radius * Math.cos(pi * i) * Math.cos( pi * j),
          0 + radius * Math.cos(pi * i) * Math.sin(pi * j),
          0 + radius * Math.sin(pi * i)
        )
      );
      scene.add(dot);
    }
}; 
    
    camera.position.z=20;
    renderer.render(scene,camera);


// for(var i=-1; i<1; i+=0.25)
// {
//     geometry.vertices.push(new THREE.Vector3((0 + radius*Math.cos((2*pi*i)/2)), (0 + radius*Math.sin((2*pi*i)/2)), 0));
//     scene.add(dot)
// }

// camera.position.z=5;
// renderer.render(scene,camera);
    

// //ZROBIC KOLKO

 let animate = function(){
   requestAnimationFrame(animate);

    dot.rotation.y += 0.01;
    dot.rotation.z += 0.01;

    renderer.render(scene, camera);
};

animate();
