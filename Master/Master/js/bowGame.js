function collision(meshA, meshB)
{

	var meshApos = meshA.getWorldPosition(new THREE.Vector3());
	var meshBpos = meshB.getWorldPosition(new THREE.Vector3());

	var distance = Math.sqrt(Math.pow(meshApos.x - meshBpos.x, 2)
           			       + Math.pow(meshApos.y - meshBpos.y, 2)
           			       + Math.pow(meshApos.z - meshBpos.z, 2));
	var sumRadius = meshA.geometry.parameters.radius + meshB.geometry.parameters.radius;	

	if (distance < sumRadius)
	{
		return true;
	}
	else
	{
		return false;
	}		
}

// -------------- Initial Setup --------------
// Scene
var scene = new THREE.Scene();
fogColor = new THREE.Color(0x000000);

scene.background = fogColor;
scene.fog = new THREE.Fog(fogColor, 20, 40);

var tree =[];
var target = [];
// Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -1;
camera.position.z = 4;
camera.position.y = 10;

// Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// -------------- Lights --------------
// Ambient light
var lightAmbient = new THREE.AmbientLight(0x888888);
scene.add(lightAmbient);

// Point light
var lightThis = new THREE.PointLight(0xffffff);
lightThis.position.set(3, 10, 3);
lightThis.intensity = 0.8;
scene.add(lightThis);


// -------------- Models --------------

// Tree Function
function spawnTrees()
{
    var treeGeom = new THREE.CylinderGeometry( 0.8, 0.6, 40, 32 );
    //Loader For textures
    var treeLoader = new THREE.TextureLoader();
    treeLoader.setCrossOrigin("anonymous");
    treeLoader.load
    (
        // resource URL
        'Media/tree.jpg',
        function (treeTexture) {

            // Loop and make array of trees
            var treeMat = new THREE.MeshPhongMaterial({map: treeTexture});
            for (var i = 0; i <= 30; i++)
            {
                tree[i] = new THREE.Mesh( treeGeom, treeMat );
                scene.add( tree[i] );
            }

            // Loops to place tree randomly
            //Left side Trees
            for (var j=0; j <= 15; j++ ){

                tree[j].position.z = 15 + Math.random() * 15-1 ;
                tree[j].position.x = Math.random() * 25 - 1;
            }
            //Right side Trees
            for (var l=16; l <= 30; l++ ){

                tree[l].position.z =  15 + Math.random() * 15-1;
                tree[l].position.x = Math.random() * -25 - 1;
            }

        }
    );

}
var floorLoader = new THREE.TextureLoader();
floorLoader.load(
    // resource URL
    'Media/floor.jpg',
    function (floorTexture) {
        var floorMat = new THREE.MeshPhongMaterial({map: floorTexture});
        var floorGeom = new THREE.PlaneGeometry(100, 100, 0, 0, 0, 0, 0),
            meshFloor = new THREE.Mesh(floorGeom, floorMat);

        meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
        scene.add(meshFloor);
    });

// set up the target vars
var radiusTop =0.5 , radiusBottom = 0.5, height = 0.5, radialSegments =7;

function spawnTarget(){
    var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radialSegments );
    var targetLoader = new THREE.TextureLoader();
    targetLoader.load(
        // resource URL
        'Media/target.jpg',
        function ( targetTexture ) {
            var targetMat = new THREE.MeshBasicMaterial({map: targetTexture});
            for (var i = 0; i <= 4; i++) {
                target[i] = new THREE.Mesh(geometry, targetMat);
                target[i].rotation.x -= Math.PI / 2;
                scene.add(target[i]);

                // Place Static targets
                if(i == 3){
                    target[i].position.x = -4;
                    target[i].position.y = 1;
                    target[i].position.z = -10;
                }

                if(i == 4){
                    target[i].position.x = 4;
                    target[i].position.y = 1;
                    target[i].position.z = -10;
                }
            }

        });
    //legs for static targets
    var legMat = new THREE.MeshLambertMaterial(
        {
            color: 0x654321
        });
    var legGeom = new THREE.CylinderGeometry( 0.1, 0.1, 1.5, 20 );

    //Meshes
    var legLeftOne = new THREE.Mesh(legGeom, legMat);
    var legRightOne = new THREE.Mesh(legGeom, legMat);

    var legLeftTwo = new THREE.Mesh(legGeom, legMat);
    var legRightTwo = new THREE.Mesh(legGeom, legMat);

    //Rotation
    legLeftOne.rotation.z = 10;
    legRightOne.rotation.z = -10;

    legLeftTwo.rotation.z = 10;
    legRightTwo.rotation.z = -10;

    //Position
    legLeftOne.position.x = 4.5;
    legLeftOne.position.z = -10;
    legRightOne.position.x = 3.5;
    legRightOne.position.z = -10;

    legLeftTwo.position.x = -3.5;
    legLeftTwo.position.z = -10;
    legRightTwo.position.x = -4.5;
    legRightTwo.position.z = -10;

    //Add to Scene
    scene.add(legLeftOne);
    scene.add(legRightOne);

    scene.add(legLeftTwo);
    scene.add(legRightTwo);
}
// Create House Model for scene
function makeHouse(){
    //Material
    var houseMat= new THREE.MeshBasicMaterial( {color: 0x8B4513} );
    var roofMat= new THREE.MeshBasicMaterial( {color: 0x59332A} );
    var doorMat= new THREE.MeshBasicMaterial( {color: 0x704B48} );
    var winMat= new THREE.MeshBasicMaterial( {color: 0xABE9E9} );

    //Main Part of House
    var houseGeom = new THREE.BoxGeometry( 3, 3, 5 );
    var houseMesh = new THREE.Mesh( houseGeom, houseMat );
    scene.add(houseMesh);
    houseMesh.position.z = -5;
    houseMesh.position.x =8;
    houseMesh.position.y =1.5;

    // Roof of house
    var roofGeom = new THREE.BoxGeometry( 2.5, 2.5, 4.9 );
    var roofMesh = new THREE.Mesh( roofGeom, roofMat );
    scene.add(roofMesh);
    roofMesh.rotation.z = 95;
    roofMesh.position.z = -5;
    roofMesh.position.x =8;
    roofMesh.position.y =3;

    // Chimney
    var chimGeom = new THREE.BoxGeometry( 0.5, 0.5, 2);
    var chimMesh = new THREE.Mesh( chimGeom, roofMat );
    scene.add(chimMesh);
    chimMesh.rotation.x -= Math.PI / 2;
    chimMesh.position.z = -3;
    chimMesh.position.x =7;
    chimMesh.position.y =4;

    //Door
    var doorGeom = new THREE.BoxGeometry( 1.8, 0.1, 0.8 );
    var doorMesh = new THREE.Mesh( doorGeom, doorMat );
    scene.add(doorMesh);
    doorMesh.rotation.z -= Math.PI / 2;
    doorMesh.position.z = -5;
    doorMesh.position.x =6.4;
    doorMesh.position.y =1;

    //Window
    var winGeom = new THREE.BoxGeometry( 0.8, 0.1, 0.8 );
    var winMesh = new THREE.Mesh( winGeom, winMat );
    scene.add(winMesh);
    winMesh.rotation.z -= Math.PI / 2;
    winMesh.position.z = -3.5;
    winMesh.position.x =6.4;
    winMesh.position.y =1.7;
}

// Add models to scene
spawnTarget();
spawnTrees();
makeHouse();

// Rain Effect
// An array of particles
var geoArray = [];
var matArray = [];
var meshArray = [];
var iNumber = 400;

var posInititalArray = [];

// Create the particles for the rain in the scene
for (var i=0; i<iNumber; i++)
{
    geoArray.push(new THREE.SphereGeometry(0.1, 0.1, 5));
    matArray.push(new THREE.MeshPhongMaterial( {color: 0x2A5759, transparent: true, opacity: 0.5} ));
    meshArray.push(new THREE.Mesh(geoArray[i], matArray) );

    // Rain
    meshArray[i].position.y = 10 + Math.random()*10;
    meshArray[i].position.x = Math.random()*40 - 5;
    meshArray[i].position.z = Math.random()*40 - 5;


    // Backup initial position
    posInititalArray.push(new THREE.Vector3() );
    posInititalArray[i].x = meshArray[i].position.x;
    posInititalArray[i].y = meshArray[i].position.y;
    posInititalArray[i].z = meshArray[i].position.z;

    scene.add(meshArray[i]);
}

//Node spheres
var node_mat = new THREE.MeshPhongMaterial( { color: 0xCCCCCC } );
//Left Hand
var hand_geo = new THREE.SphereGeometry(0.05, 18, 18);
var meshLH = new THREE.Mesh(hand_geo, node_mat);
scene.add(meshLH);

//Add SlingRing to left hand
var slingRing = new SlingRing();
meshLH.add(slingRing);

//Add bow to left hand
var bow = new Bow();
meshLH.add(bow);

//Right Hand
var mRH = new THREE.MeshPhongMaterial( { color: 0x00CCCC } );
var meshRH = new THREE.Mesh(hand_geo, node_mat);
scene.add(meshRH);


//Shoulders
//Right
var shoulder_geo = new THREE.SphereGeometry(0.05, 18, 18);
var rightShoulder_msh = new THREE.Mesh(shoulder_geo, node_mat);
scene.add(rightShoulder_msh);
//Left
var leftShoulder_msh = new THREE.Mesh(shoulder_geo, node_mat);
scene.add(leftShoulder_msh);

//Attach quiver to right shoulder
var quiver_msh = new Quiver;
rightShoulder_msh.add(quiver_msh);
quiver_msh.position.y -= 0.1;
quiver_msh.position.z += 0.1;


// -------------- Extra Controls and Functions --------------
// Add mouse/camera controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// -------------- Movement --------------
var startX = 45;
var endX = -30;
var startY = 5;

function interpolateCurve(u) {
    if (u > 1) u = 1;
    if (u < 0) u = 0;

    x = u * (endX - startX) + startX;
    y = (Math.cos(u * 15) * 5) + startY;
    return [x, y,];
}

var startXTwo = -30;
var endXTwo = 50;
var startYTwo = 5;

function interpolateCurveTwo(j) {
    if (j > 1) j = 1;
    if (j < 0) j = 0;

    x = j * (endXTwo - startXTwo) + startXTwo;
    y = (Math.cos(j * 10) * 5) + startYTwo;
    return [x, y];
}

var startXThree = -25;
var endXThree = 50;
var startYThree = 5;

function interpolateCurveThree(i) {
    if (i > 1) i = 1;
    if (i < 0) i = 0;

    x = i * (endXThree - startXThree) + startXThree;
    y = (Math.cos(i * 30) * 5) + startYThree;
    return [x, y];
}


// get G
var G = [];
G[0] = 0;
for (var i = 1; i <= 20; i++) {
    pos1 = interpolateCurve((i - 1) * 0.05);
    pos2 = interpolateCurve(i * 0.05);

    // distance between the current point and the previous point
    distance = Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
    G[i] = distance + G[i - 1];

    console.log(G[i]);
}
// normalize arc length
for (var i = 1; i <= 20; i++) {
    G[i] /= G[20];

    console.log(G[i]);
}

function getUbyArcLen(arcLen) {
    for (var i = 0; i <= 20; i++) {
        if (G[i] > arcLen) {
            return (i - 1) * 1 / 20 + (arcLen - G[i - 1]) / (G[i] - G[i - 1]) * 1 / 20;
        }
    }

    return 1;
}

function ease(t) {
    if (t > 1) t = 1;
    if (t < 0) t = 0;

    return (Math.sin(t * Math.PI - Math.PI / 2) + 1) / 2;
}


// init json array
var jsonFrm = 0;
var jsonMotion = null;

//usage:
readTextFile("archermotion.json", function(text){
    jsonMotion = JSON.parse(text);
    var count = Object.keys(jsonMotion).length;
    //console.log(count);
    jsonFrm = count;
    iFrame = 0;
});


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {//} && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Kinectron codes starting from here///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Initialize kinectron
kinectron = new Kinectron("192.168.60.56"); // Define and create an instance of kinectron
kinectron.makeConnection(); // Create connection between remote and application
kinectron.startTrackedBodies(getBodies); // Start tracked bodies and set callback

// The getBodies callback function: called once every time kinect obtain a frame
function getBodies(skeleton)
{
    meshLH.position.x = skeleton.joints[kinectron.HANDLEFT].cameraX;
    meshLH.position.y = skeleton.joints[kinectron.HANDLEFT].cameraY;
    meshLH.position.z = skeleton.joints[kinectron.HANDLEFT].cameraZ;
    meshRH.position.x = skeleton.joints[kinectron.HANDRIGHT].cameraX;
    meshRH.position.y = skeleton.joints[kinectron.HANDRIGHT].cameraY;
    meshRH.position.z = skeleton.joints[kinectron.HANDRIGHT].cameraZ;

    head_msh.position.x = skeleton.joints[kinectron.HEAD].cameraX;
    head_msh.position.y = skeleton.joints[kinectron.HEAD].cameraY;
    head_msh.position.z = skeleton.joints[kinectron.HEAD].cameraZ;

    //Left arm
    //Shoulder
    leftShoulder_msh.position.x = skeleton.joints[kinectron.SHOULDERLEFT].cameraX;
    leftShoulder_msh.position.y = skeleton.joints[kinectron.SHOULDERLEFT].cameraY;
    leftShoulder_msh.position.z = skeleton.joints[kinectron.SHOULDERLEFT].cameraZ;

    LeftArm.geometry.vertices[0].x = skeleton.joints[kinectron.SPINESHOULDER].cameraX;
    LeftArm.geometry.vertices[0].y = skeleton.joints[kinectron.SPINESHOULDER].cameraY;
    LeftArm.geometry.vertices[0].z = skeleton.joints[kinectron.SPINESHOULDER].cameraZ;

    LeftArm.geometry.vertices[1].x = skeleton.joints[kinectron.SHOULDERLEFT].cameraX;
    LeftArm.geometry.vertices[1].y = skeleton.joints[kinectron.SHOULDERLEFT].cameraY;
    LeftArm.geometry.vertices[1].z = skeleton.joints[kinectron.SHOULDERLEFT].cameraZ;

    LeftArm.geometry.vertices[2].x = skeleton.joints[kinectron.ELBOWLEFT].cameraX;
    LeftArm.geometry.vertices[2].y = skeleton.joints[kinectron.ELBOWLEFT].cameraY;
    LeftArm.geometry.vertices[2].z = skeleton.joints[kinectron.ELBOWLEFT].cameraZ;

    LeftArm.geometry.vertices[3].x = skeleton.joints[kinectron.HANDLEFT].cameraX;
    LeftArm.geometry.vertices[3].y = skeleton.joints[kinectron.HANDLEFT].cameraY;
    LeftArm.geometry.vertices[3].z = skeleton.joints[kinectron.HANDLEFT].cameraZ;
    LeftArm.geometry.verticesNeedUpdate = true;

    //Right arm
    //Shoulder
    rightShoulder_msh.position.x = skeleton.joints[kinectron.SHOULDERRIGHT].cameraX;
    rightShoulder_msh.position.y = skeleton.joints[kinectron.SHOULDERRIGHT].cameraY;
    rightShoulder_msh.position.z = skeleton.joints[kinectron.SHOULDERRIGHT].cameraZ;

    RightArm.geometry.vertices[0].x = skeleton.joints[kinectron.SPINESHOULDER].cameraX;
    RightArm.geometry.vertices[0].y = skeleton.joints[kinectron.SPINESHOULDER].cameraY;
    RightArm.geometry.vertices[0].z = skeleton.joints[kinectron.SPINESHOULDER].cameraZ;

    RightArm.geometry.vertices[1].x = skeleton.joints[kinectron.SHOULDERRIGHT].cameraX;
    RightArm.geometry.vertices[1].y = skeleton.joints[kinectron.SHOULDERRIGHT].cameraY;
    RightArm.geometry.vertices[1].z = skeleton.joints[kinectron.SHOULDERRIGHT].cameraZ;

    RightArm.geometry.vertices[2].x = skeleton.joints[kinectron.ELBOWRIGHT].cameraX;
    RightArm.geometry.vertices[2].y = skeleton.joints[kinectron.ELBOWRIGHT].cameraY;
    RightArm.geometry.vertices[2].z = skeleton.joints[kinectron.ELBOWRIGHT].cameraZ;

    RightArm.geometry.vertices[3].x = skeleton.joints[kinectron.HANDRIGHT].cameraX;
    RightArm.geometry.vertices[3].y = skeleton.joints[kinectron.HANDRIGHT].cameraY;
    RightArm.geometry.vertices[3].z = skeleton.joints[kinectron.HANDRIGHT].cameraZ;
    RightArm.geometry.verticesNeedUpdate = true;

    //Spine
    Spine.geometry.vertices[0].x = skeleton.joints[kinectron.HEAD].cameraX;
    Spine.geometry.vertices[0].y = skeleton.joints[kinectron.HEAD].cameraY;
    Spine.geometry.vertices[0].z = skeleton.joints[kinectron.HEAD].cameraZ;

    Spine.geometry.vertices[1].x = skeleton.joints[kinectron.NECK].cameraX;
    Spine.geometry.vertices[1].y = skeleton.joints[kinectron.NECK].cameraY;
    Spine.geometry.vertices[1].z = skeleton.joints[kinectron.NECK].cameraZ;

    Spine.geometry.vertices[2].x = skeleton.joints[kinectron.SPINEMID].cameraX;
    Spine.geometry.vertices[2].y = skeleton.joints[kinectron.SPINEMID].cameraY;
    Spine.geometry.vertices[2].z = skeleton.joints[kinectron.SPINEMID].cameraZ;

    Spine.geometry.vertices[3].x = skeleton.joints[kinectron.SPINEBASE].cameraX;
    Spine.geometry.vertices[3].y = skeleton.joints[kinectron.SPINEBASE].cameraY;
    Spine.geometry.vertices[3].z = skeleton.joints[kinectron.SPINEBASE].cameraZ;
    Spine.geometry.verticesNeedUpdate = true;

    pelvis_msh.position.x = skeleton.joints[kinectron.SPINEBASE].cameraX;
    pelvis_msh.position.y = skeleton.joints[kinectron.SPINEBASE].cameraY;
    pelvis_msh.position.z = skeleton.joints[kinectron.SPINEBASE].cameraZ;
}
var score =0;
var iFrame = 0;
var arrows = []; //0 = latest arrow
var state = 0; //0 = no arrow, 1 = equipped, 2 = nocked

// -------------- Animate Function --------------
function animate() {
    // Move the Particle array to create rain effect
    for (var i=0; i<iNumber; i++)
    {
        meshArray[i].position.y = meshArray[i].position.y - 0.2;
        if (meshArray[i].position.y < 0)
        {
            meshArray[i].position.y = 10;
        }
    }

    // -------------- Movement --------------
    var steps = 1500;
    var u = iFrame / steps;
    if (u <= 1) {
        console.log(u);
    } else if (u >= 1) {
        u = 0;
        iFrame = 0;

    }
    requestAnimationFrame(animate);

    pos = interpolateCurve(u);
    target[0].position.x = pos[0];
    target[0].position.y = pos[1];
    target[0].position.z = -10;

    pos = interpolateCurveTwo(getUbyArcLen(u));
    target[1].position.x = pos[0];
    target[1].position.y = pos[1];
    target[1].position.z = -12;

    pos = interpolateCurveThree(u);
    target[2].position.x = pos[0];
    target[2].position.y = pos[1];
    target[2].position.z = -8;


    /*JSON*/
    if (jsonFrm>0) {
        getBodies(jsonMotion[iFrame]);
        iFrame ++;
        iFrame = iFrame % jsonFrm;   //Keep looping the frame
    }

    //Skip first 30 frames
    if(iFrame > 30)
    {
        /*SLINGRING*/
        slingRing.contact(meshRH);
        if(slingRing.percentage >= 100)
        {
            //Back to main menu
            meshLH.material.color.setHex(0x0000FF);
        }

        /*ARCHER*/
        //Shoulder contact
        if(collision(meshRH, rightShoulder_msh))
        {
            //If no arrow is equipped
            if(state == 0)
            {
                arrows.unshift(new Arrow(0.5)); //Add new arrow at #0
                arrows[0].equip(meshRH);//Attach new arrow to hand
                state = 1

                //Cull old arrows
                if(arrows.length> 5)
                {
                    arrows.pop();
                }
            }
            //If currently equipped arrow is nocked, shoot it
            else if(state == 2)
            {
                arrows[0].shoot();
                state = 0;
                bow.reset();
            }
        }

        //Check hand contact, nock arrow
        if(collision(meshRH, meshLH))
        {
            if(arrows.length > 0 && state < 2)
            {
                arrows[0].nock(meshLH);
                state = 2;
            }
        }

        //Arrow animation
        //  length/rotation if nocked,
        //  movement if shot
        for(let i =0; i < arrows.length; i++)
        {
            if(arrows[i] !=null)
            {
                arrows[i].animate();
            }
        }

        if(state == 2)
        {
            if(!bow.nocked)
            {
                bow.nock(meshRH);
            }
            bow.animate();
        }
    }

    //Check hand contact
    if(collision(meshRH, meshLH))
    {
        //Attach arrow to both hands?
    }

    /*
    // Target Arrow Collisions
    // Moving Targets Give More Points
    if (collision (target[0],tempArrow) || collision (target[1],tempArrow)||collision (target[2],tempArrow) && tempArrow.active == true){

        // Increase the score and Print to UI
        score = score + 2;
        document.getElementById("displayScore").innerHTML = "Score:"+score;

        //Set Arrow to stop when it hits target, set active to false so that it stops registering collision
        tempArrow.velocity = 0;
        tempArrow.active = false;
        if (collision (target[0],tempArrow)){
            // Set temp arrows new parent to be target so that the arrow moves with the target (emulating arrow sticking in target)
            tempArrow.parent = target[0];
        }
        else if (collision (target[1],tempArrow)){
            tempArrow.parent = target[1];
        }
        else if(collision (target[2],tempArrow)){
            tempArrow.parent = target[2];
        }

    }

    if (collision (target[3],tempArrow) || (target[4],tempArrow)&& tempArrow.active == true){

        // Increase the score and Print to UI
        score = score + 1;
        document.getElementById("displayScore").innerHTML = "Score:"+score;

        //Set Arrow to stop when it hits target, set active to false so that it stops registering collision
        tempArrow.velocity = 0;
        tempArrow.active = false;
    }

*/
    iFrame++;

    renderer.render(scene, camera);
}

animate();