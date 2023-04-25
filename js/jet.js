var jetMeshMaterials = [
    new THREE.MeshPhongMaterial({
        color: new THREE.Color("black"),
        specular: new THREE.Color("blue"),
        shininess: 1,
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide,
    }),
    new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xe2eaec),
        specular: new THREE.Color("white"),
        shininess: 5,
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide
    }),
    new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xe2eaec),
        specular: new THREE.Color("white"),
        shininess: 2,
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide,
        wireframe: true
    }),
    new THREE.MeshPhongMaterial({
        color: new THREE.Color("black"),
        specular: new THREE.Color("white"),
        shininess: 10,
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide,
        wireframe: true
    }),
    new THREE.MeshPhongMaterial({
        color: new THREE.Color("white"),
        specular: new THREE.Color("white"),
        shininess: 10,
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide
    }),
    new THREE.MeshPhongMaterial({
        color: new THREE.Color("silver"),
        specular: new THREE.Color("white"),
        shininess: 10,
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide
    }),

]

var wingSize = {
    h: 32,
    w: 3,
    l: 45,
}

var intakeSize = {
    h: 10,
    w: 10,
    l: 10,
}

var finSize = {
    h: 22,
    w: 2,
    l: 30,
}

var bodySize = {
    h: 3.5,
    w: 80,
    l: 20,
    d: 4
}


function createWingL() {
    //HINT: (x, z) is your plane, y is your height
    //1. Define typed arrays
    const positions = new Float32Array([
        0, +wingSize.w / 2, -wingSize.l / 2, //0x
        0, -wingSize.w / 2, -wingSize.l / 2, //1x
        wingSize.h, -wingSize.w / 2, -wingSize.l / 2, //2x
        0, -wingSize.w / 2, wingSize.l / 2, //4x
        0, +wingSize.w / 2, +wingSize.l / 2, //5x
        wingSize.h / 3 * 1.2, -wingSize.w / 2, wingSize.l / 2 //6x
    ]);
    const normals = new Float32Array([
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        -1, 0, 0,
        -1, 0, 0,
    ]);
    const indices = new Uint16Array([
        0, 4, 1, //bottom 1
        1, 4, 3, //bottom 2
        0, 1, 2, //back 1
        1, 3, 2, //right 1
        5, 3, 2, //right 2
        3, 5, 4, //top 1
        0, 2, 5, //left 1
        0, 4, 5, //left 2
    ]);

    //2. Create BufferGeometry instance and set attributes
    const wingGeom = new THREE.BufferGeometry();
    wingGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    wingGeom.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    wingGeom.setIndex(new THREE.BufferAttribute(indices, 1));

    //3. Calculate face normals
    wingGeom.computeVertexNormals();

    //4. Return BufferGeometry instance
    return wingGeom;
}


function createWingR() {
    var wingGeom = new THREE.BufferGeometry();
    
    // vertices
    var vertices = new Float32Array([
        0, wingSize.w / 2, wingSize.l / 2, // 0x
        0, -wingSize.w / 2, wingSize.l / 2, // 1x
        wingSize.h, -wingSize.w / 2, wingSize.l / 2, // 2x
        0, -wingSize.w / 2, -wingSize.l / 2, // 4x
        0, wingSize.w / 2, -wingSize.l / 2, // 5x
        wingSize.h / 3 * 1.2, -wingSize.w / 2, -wingSize.l / 2 // 6x
    ]);
    
    wingGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    // faces
    var indices = new Uint16Array([
        0, 4, 1,
        1, 4, 3,
        0, 1, 2,
        1, 3, 2,
        5, 3, 2,
        3, 5, 4,
        0, 2, 5,
        0, 4, 5
    ]);
    
    wingGeom.setIndex(new THREE.BufferAttribute(indices, 1));
    wingGeom.computeVertexNormals();
    
    return wingGeom;
}


function createtailfin() {
    var finGeom = new THREE.BufferGeometry();
    var vertices = new Float32Array([
        0, finSize.w / 2, finSize.l / 2, //0x
        0, -finSize.w / 2, finSize.l / 2, //1x
        finSize.h, 0, finSize.l / 2, //2x
        0, -finSize.w / 2, -finSize.l / 2, //4x        
        0, finSize.w / 2, -finSize.l / 2, //5x  
        finSize.h / 3 * 1.2, 0, -finSize.l / 2 //6x
    ]);
    finGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    var indices = new Uint16Array([
        0, 4, 1,
        1, 4, 3,
        0, 1, 2,
        1, 3, 2,
        5, 3, 2,
        3, 5, 4,
        0, 2, 5,
        0, 4, 5
    ]);
    finGeom.setIndex(new THREE.BufferAttribute(indices, 1));

    finGeom.computeVertexNormals();

    return finGeom;
}

function createIntake() {
    const intakeSize = { w: 10, h: 10, l: 10 };
    
    const intakeGeom = new THREE.BufferGeometry();
  
    // vertices
    const vertices = new Float32Array([
      intakeSize.w / 2, 0, -intakeSize.l / 2, // 0
      -intakeSize.w / 2, 0, -intakeSize.l / 2, // 1
      -intakeSize.w / 2, intakeSize.h, -intakeSize.l / 2, // 2
      intakeSize.w / 2, intakeSize.h, -intakeSize.l / 2, // 3
      -intakeSize.w / 2, 0, intakeSize.l / 2, // 4
      intakeSize.w / 2, 0, intakeSize.l / 2, // 5
    ]);
    intakeGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
    // faces
    const indices = new Uint16Array([
      0, 5, 1,
      1, 5, 4,
      0, 1, 2,
      0, 2, 3,
      3, 5, 0,
      1, 4, 2,
      3, 2, 5,
      2, 4, 5,
    ]);
    intakeGeom.setIndex(new THREE.BufferAttribute(indices, 1));
  
    intakeGeom.computeVertexNormals();
  
    return intakeGeom;
}
  

function createtailThruster(i) {
    var Thruster = new THREE.Object3D();
    var backGeom = new THREE.CylinderGeometry(6, 4, 30, 20);
    var backMesh = new THREE.Mesh(backGeom, jetMeshMaterials[i]);

    var frontGeom = new THREE.BoxGeometry(10,30, 10)
    var frontMesh = new THREE.Mesh(frontGeom, jetMeshMaterials[i])

    let radius =  5;
    let height = 10;
    let radialSegments = 4;
    let heightSegments = 10;
    let openEnded = true;

    let intakeGeom = createIntake();
    const intakeMesh = new THREE.Mesh(intakeGeom, jetMeshMaterials[i])

    Thruster.add(backMesh)
    Thruster.add(frontMesh)
    Thruster.add(intakeMesh)
    frontMesh.position.set(27,-4,0)
    intakeMesh.position.set(47,1,0)

    backMesh.rotateZ(THREE.Math.degToRad(-105));
    frontMesh.rotateZ(THREE.Math.degToRad(90))
    intakeMesh.rotation.set(THREE.Math.degToRad(180), THREE.Math.degToRad(90), 0);
    return Thruster;
}

function createNose(i) {
    var NoseColomn = new THREE.Object3D();
    var shaftGeom = new THREE.CylinderGeometry(5, 5, 70, 20);
    var shaftMesh = new THREE.Mesh(shaftGeom, jetMeshMaterials[i]);

    var curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        7, 37,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );

    var points = curve.getPoints( 50 );
    var cockpitGeom = new THREE.LatheGeometry( points );
    var cockpitMesh = new THREE.Mesh(cockpitGeom, jetMeshMaterials[i]);

    curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        5, 38,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );

    points = curve.getPoints( 50 );
    var noseGeom = new THREE.LatheGeometry( points );
    var noseMesh = new THREE.Mesh(noseGeom, jetMeshMaterials[i]);

    curve = new THREE.EllipseCurve(
        4,  0,            // ax, aY
        6, 5,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );

    points = curve.getPoints( 50 );
    var glassGeom = new THREE.LatheGeometry( points );
    var glassMesh = new THREE.Mesh(glassGeom, jetMeshMaterials[0]);


    NoseColomn.add(shaftMesh)
    NoseColomn.add(cockpitMesh)
    NoseColomn.add(noseMesh)
    NoseColomn.add(glassMesh)

    shaftMesh.position.set(20,-2,0)
    cockpitMesh.position.set(20,1,0)
    noseMesh.position.set(44,-2,0)
    glassMesh.position.set(33,3.5,0)


    shaftMesh.rotateZ(THREE.Math.degToRad(-90));
    cockpitMesh.rotateZ(THREE.Math.degToRad(-90));
    noseMesh.rotateZ(THREE.Math.degToRad(-90));
    glassMesh.rotateX(THREE.Math.degToRad(-90));
    return NoseColomn;
}

function createMainBody() {
    var bodyGeom = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        -bodySize.w / 5, 0, -bodySize.l / 1.2,
        bodySize.w / 5, 0, -bodySize.l,
        bodySize.w / 3.5, 0, -bodySize.l / 1.1,
        bodySize.w / 2.3, 0, -bodySize.l / 1.9,
        bodySize.w / 2, 0, -bodySize.l / 4,
        bodySize.w / 2, 0, bodySize.l / 4,
        bodySize.w / 2.3, 0, bodySize.l / 1.9, //6x
        bodySize.w / 3.5, 0, bodySize.l / 1.1, //7x
        bodySize.w / 5, 0, bodySize.l, //8x
        -bodySize.w / 5, 0, bodySize.l / 1.2, //9x
        -bodySize.w / 5, 0, bodySize.l / 4, //10x
        -bodySize.w / 2, 0, bodySize.l / 4, //11x
        -bodySize.w / 2, 0, -bodySize.l / 4, //12x
        -bodySize.w / 5, 0, -bodySize.l / 4, //13x

        //vertices on top
        -bodySize.w / 5, bodySize.h, -bodySize.l / 1.2 + bodySize.d, //14x
        bodySize.w / 5 - bodySize.d, bodySize.h, -bodySize.l + bodySize.d, //15x
        bodySize.w / 3.5 - bodySize.d, bodySize.h, -bodySize.l / 1.1 + bodySize.d, //16x
        bodySize.w / 2.3 - bodySize.d, bodySize.h, -bodySize.l / 1.9 + bodySize.d, //17x
        bodySize.w / 2 - bodySize.d, bodySize.h, -bodySize.l / 4 + bodySize.d, //18x
        bodySize.w / 2 - bodySize.d, bodySize.h, bodySize.l / 4 - bodySize.d, //19x
        bodySize.w / 2.3 - bodySize.d, bodySize.h, bodySize.l / 1.9 - bodySize.d, //20x
        bodySize.w / 3.5 - bodySize.d, bodySize.h, bodySize.l / 1.1 - bodySize.d, //21x
        bodySize.w / 5 - bodySize.d, bodySize.h, bodySize.l - bodySize.d, //22x
        -bodySize.w / 5, bodySize.h, bodySize.l / 1.2 - bodySize.d, //23x
        -bodySize.w / 5, bodySize.h, bodySize.l / 4, //24x
        -bodySize.w / 2, bodySize.h, bodySize.l / 4, //25x
        -bodySize.w / 2, bodySize.h, -bodySize.l / 4, //26x
        -bodySize.w / 5, bodySize.h, -bodySize.l / 4, //27x
    ]);
    bodyGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
   
    indices = new Uint16Array([
        4, 5, 3,
        3, 5, 6,
        3, 6, 2,
        2, 6, 7,
        2, 7, 1,
        7, 1, 8,
        1, 8, 0,
        0, 8, 9,
        13, 10, 12,
        10, 12, 11,
        18, 19, 17,
        17, 19, 20,
        16, 17, 20,
        16, 20, 21,
        15, 16, 21,
        15, 21, 22,
        14, 15, 22,
        14, 22, 23,
        24, 25, 26,
        24, 26, 27,
        0, 14, 27,
        0, 27, 13,
        27, 13, 26,
        13, 26, 12,
        26, 12, 25,
        12, 25, 11,
        11, 25, 24,
        11, 24, 10,
        10, 24, 23,
        10, 23, 9,
        9, 23, 22,
        9, 22, 8,
        8, 22, 21,
        8, 21, 7,
        7, 21, 20,
        7, 20, 6,
        6, 20, 19,
        6, 19, 5,
        5, 19, 18,
        5, 18, 4,
        4, 18, 17,
        4, 17, 3,
        3, 17, 16,
        3, 16, 2,
        2, 16, 15,
        2, 15, 1,
        1, 15, 14,
        1, 14, 0

    ]);

    bodyGeom.setIndex(new THREE.BufferAttribute(indices, 1));

    bodyGeom.computeVertexNormals();

    return bodyGeom;
}

function createFrontLandingGear(i) {
    var j = 4
    if(i == 3) { j = i - 1}
    var gear = new THREE.Object3D();
    var wheelGeom = new THREE.CylinderGeometry(2, 2, .5, 20);
    var wheelMesh = new THREE.Mesh(wheelGeom, jetMeshMaterials[i]);
    var wheel2Mesh = new THREE.Mesh(wheelGeom, jetMeshMaterials[i]);

    var tireGeom = new THREE.TorusGeometry( 3, 1, 16, 30 )
    var tireMesh = new THREE.Mesh(tireGeom, jetMeshMaterials[0])
    var tire2Mesh  = new THREE.Mesh(tireGeom, jetMeshMaterials[0])

    var shaftGeom = new THREE.CylinderGeometry(1, 1, 5, 20);
    var shaftMesh = new THREE.Mesh(shaftGeom, jetMeshMaterials[j]);

    var topGeom = new THREE.CylinderGeometry(1.5, 1.5, 8, 20)
    var topMesh = new THREE.Mesh(topGeom, jetMeshMaterials[j])

    var rodGeom = new THREE.CylinderGeometry(1, 1, 20, 20)
    var rodMesh = new THREE.Mesh(rodGeom, jetMeshMaterials[j])

    var connectorGeom = new THREE.CylinderGeometry(.5, .5, 7, 20)
    var connectorMesh = new THREE.Mesh(connectorGeom, jetMeshMaterials[5])

    var connectorTGeom = new THREE.CylinderGeometry(1, 1, 4, 20)
    var connectorTMesh = new THREE.Mesh(connectorTGeom, jetMeshMaterials[j])

    gear.add(wheelMesh)
    gear.add(wheel2Mesh)
    gear.add(tireMesh)
    gear.add(tire2Mesh)
    gear.add(shaftMesh)
    gear.add(topMesh)
    gear.add(rodMesh)
    gear.add(connectorMesh)
    gear.add(connectorTMesh)

    wheelMesh.position.set(0,-10,-3)
    tireMesh.position.set(0,-10,-3)
    wheel2Mesh.position.set(0,-10,3)
    tire2Mesh.position.set(0,-10,3)
    shaftMesh.position.set(0,-10,0)
    topMesh.position.set(0,-4,0)
    rodMesh.position.set(0,0,0)
    connectorMesh.position.set(-3,-2,0)
    connectorTMesh.position.set(-5,0,0)

    wheelMesh.rotateX(THREE.Math.degToRad(-90));
    wheel2Mesh.rotateX(THREE.Math.degToRad(-90));
    shaftMesh.rotateX(THREE.Math.degToRad(90))
    //topMesh.rotateZ(THREE.Math.degToRad(-70))
    //rodMesh.rotateZ(THREE.Math.degToRad(-10))
    connectorMesh.rotateZ(THREE.Math.degToRad(40))
    connectorTMesh.rotateZ(THREE.Math.degToRad(40))
    return gear;
}

function createBackLandingGearL(i) {
    var j = 4
    if(i == 3) { j = i - 1}
    var gear = new THREE.Object3D();
    var wheelGeom = new THREE.CylinderGeometry(2, 2, .5, 20);
    var wheelMesh = new THREE.Mesh(wheelGeom, jetMeshMaterials[i]);

    var tireGeom = new THREE.TorusGeometry( 3, 1, 16, 30 )
    var tireMesh = new THREE.Mesh(tireGeom, jetMeshMaterials[0])

    var shaftGeom = new THREE.CylinderGeometry(1, 1, 3, 20);
    var shaftMesh = new THREE.Mesh(shaftGeom, jetMeshMaterials[j]);

    var topGeom = new THREE.CylinderGeometry(1, 1, 8, 20)
    var topMesh = new THREE.Mesh(topGeom, jetMeshMaterials[j])

    var rodGeom = new THREE.CylinderGeometry(1, 1, 8, 20)
    var rodMesh = new THREE.Mesh(rodGeom, jetMeshMaterials[j])

    var connectorGeom = new THREE.CylinderGeometry(.5, .5, 6, 20)
    var connectorMesh = new THREE.Mesh(connectorGeom, jetMeshMaterials[5])

    var connectorTGeom = new THREE.CylinderGeometry(1, 1, 4, 20)
    var connectorTMesh = new THREE.Mesh(connectorTGeom, jetMeshMaterials[j])

    gear.add(wheelMesh)
    gear.add(tireMesh)
    gear.add(shaftMesh)
    gear.add(topMesh)
    gear.add(rodMesh)
    gear.add(connectorMesh)
    gear.add(connectorTMesh)

    wheelMesh.position.set(0,-5,-2)
    tireMesh.position.set(0,-5,-2)
    shaftMesh.position.set(0,-5,0)
    topMesh.position.set(3,-4,2)
    rodMesh.position.set(7,0,2)
    connectorMesh.position.set(4,-2,2)
    connectorTMesh.position.set(6,1,2)

    wheelMesh.rotateX(THREE.Math.degToRad(-90));
    shaftMesh.rotateX(THREE.Math.degToRad(90))
    topMesh.rotateZ(THREE.Math.degToRad(-70))
    rodMesh.rotateZ(THREE.Math.degToRad(-10))
    connectorMesh.rotateZ(THREE.Math.degToRad(-30))
    connectorTMesh.rotateZ(THREE.Math.degToRad(-40))
    return gear;
}

function createBackLandingGearR(i) {
    var j = 4
    if(i == 3) { j = i - 1}
    var gear = new THREE.Object3D();
    var wheelGeom = new THREE.CylinderGeometry(2, 2, .5, 20);
    var wheelMesh = new THREE.Mesh(wheelGeom, jetMeshMaterials[i]);

    var tireGeom = new THREE.TorusGeometry( 3, 1, 16, 30 )
    var tireMesh = new THREE.Mesh(tireGeom, jetMeshMaterials[0])

    var shaftGeom = new THREE.CylinderGeometry(1, 1, 3, 20);
    var shaftMesh = new THREE.Mesh(shaftGeom, jetMeshMaterials[j]);

    var topGeom = new THREE.CylinderGeometry(1, 1, 8, 20)
    var topMesh = new THREE.Mesh(topGeom, jetMeshMaterials[j])

    var rodGeom = new THREE.CylinderGeometry(1, 1, 8, 20)
    var rodMesh = new THREE.Mesh(rodGeom, jetMeshMaterials[j])

    var connectorGeom = new THREE.CylinderGeometry(.5, .5, 6, 20)
    var connectorMesh = new THREE.Mesh(connectorGeom, jetMeshMaterials[5])

    var connectorTGeom = new THREE.CylinderGeometry(1, 1, 4, 20)
    var connectorTMesh = new THREE.Mesh(connectorTGeom, jetMeshMaterials[j])

    gear.add(wheelMesh)
    gear.add(tireMesh)
    gear.add(shaftMesh)
    gear.add(topMesh)
    gear.add(rodMesh)
    gear.add(connectorMesh)
    gear.add(connectorTMesh)

    wheelMesh.position.set(0,-5,2)
    tireMesh.position.set(0,-5,2)
    shaftMesh.position.set(0,-5,0)
    topMesh.position.set(3,-4,-2)
    rodMesh.position.set(7,0,-2)
    connectorMesh.position.set(4,-2,-2)
    connectorTMesh.position.set(6,1,-2)

    wheelMesh.rotateX(THREE.Math.degToRad(-90));
    shaftMesh.rotateX(THREE.Math.degToRad(90))
    topMesh.rotateZ(THREE.Math.degToRad(-70))
    rodMesh.rotateZ(THREE.Math.degToRad(-10))
    connectorMesh.rotateZ(THREE.Math.degToRad(-30))
    connectorTMesh.rotateZ(THREE.Math.degToRad(-40))
    return gear;
}



function createJetObject(i) {

    var jet = new THREE.Object3D();
    jet.name = "jet";
    var wingLGeom = createWingL(); 

    let wingLMesh = new THREE.Mesh(wingLGeom, jetMeshMaterials[i]);
    jet.add(wingLMesh);
    wingLMesh.position.set(-16,1,36)

    var wingRGeom = createWingR(); 

    let wingRMesh = new THREE.Mesh(wingRGeom, jetMeshMaterials[i]);

    jet.add(wingRMesh);
    wingRMesh.position.set(-16,1,-35)

    var TailBRGeom = createtailfin(); 

    let TailBRMesh = new THREE.Mesh(TailBRGeom, jetMeshMaterials[i]);

    jet.add(TailBRMesh);
    TailBRMesh.position.set(-50,4,-23)
    TailBRMesh.rotateY(THREE.Math.degToRad(10));

    var TailBLGeom = createtailfin(); 

    let TailBLMesh = new THREE.Mesh(TailBLGeom, jetMeshMaterials[i]);

    jet.add(TailBLMesh);
    TailBLMesh.position.set(-50,4,23)
    TailBLMesh.rotateX(THREE.Math.degToRad(180));
    TailBLMesh.rotateY(THREE.Math.degToRad(10));

    var TailTRGeom = createtailfin(); 

    let TailTRMesh = new THREE.Mesh(TailTRGeom, jetMeshMaterials[i]);

    jet.add(TailTRMesh);
    TailTRMesh.position.set(-40,15,-12)
    TailTRMesh.rotateX(THREE.Math.degToRad(75));

    var TailTLGeom = createtailfin(); 

    let TailTLMesh = new THREE.Mesh(TailTLGeom, jetMeshMaterials[i]);

    jet.add(TailTLMesh);
    TailTLMesh.position.set(-40,15,12)
    TailTLMesh.rotateX(THREE.Math.degToRad(105));

    var thruster1 = createtailThruster(i)

    jet.add(thruster1);
    thruster1.position.set(-28,1,7)

    var thruster2 = createtailThruster(i)

    jet.add(thruster2);
    thruster2.position.set(-28,1,-7)

    var tailgear1 = createBackLandingGearL(i)
    tailgear1.name = `tailgear1${i}`

    jet.add(tailgear1);
    tailgear1.position.set(-4,-12,-7)

    var tailgear2 = createBackLandingGearR(i)
    tailgear2.name = `tailgear2${i}`

    jet.add(tailgear2);
    tailgear2.position.set(-4,-12,7)

    var frontgear = createFrontLandingGear(i)
    frontgear.name = `frontgear${i}`

    jet.add(frontgear);
    frontgear.position.set(30,-8,0)

    var nose = createNose(i)

    jet.add(nose);
    nose.position.set(0, 0, 0)

    var bodyGeom = createMainBody(); 

    let bodyMesh = new THREE.Mesh(bodyGeom, jetMeshMaterials[i]);

    jet.add(bodyMesh)     
    return jet
}

function createJet() {
    var jetFull = new THREE.Object3D();
    jet = createJetObject(1);
    jet.name = "main"
    jetoutline = createJetObject(3);
    jetoutline.name = "outline"
    jetFull.add(jet)
    jetFull.add(jetoutline)
    return jetFull
}


function createBezierCurve(cpList, steps, points_on_curve) {
    var N = Math.round(steps) + 1 || tMax; // number of vertices
    var positions = new Float32Array(N * 3);

    var curve = new THREE.CubicBezierCurve3();
    var cp = cpList[0];
    curve.v0.set(cp[0], cp[1], cp[2]);
    cp = cpList[1];
    curve.v1.set(cp[0], cp[1], cp[2]);
    cp = cpList[2];
    curve.v2.set(cp[0], cp[1], cp[2]);
    cp = cpList[3];
    curve.v3.set(cp[0], cp[1], cp[2]);

    var j, stepSize = 1 / (N - 1);
    for (j = 0; j < N; j++) {
        var point = curve.getPoint(j * stepSize);
        positions[j * 3] = point.x;
        positions[j * 3 + 1] = point.y;
        positions[j * 3 + 2] = point.z;
        points_on_curve.push(point);
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
}

var gearRotation = 0;


var jet_takeoff_cp_list = [
    [-150, 40, 0],
    [100, 40, 0],
    [100, 70, 0],
    [200, 120, 0],
]

var jet_flight1_cp_list = [


    [200, 120, 0],
    [400, 80, 100],
    [100, 140, 200],
    [-200, 120, 150],
]

var jet_flight2_cp_list = [

    [-200, 120, 150],
    [-400, 140, 50],
    [-400, 140, -100],


    [-200, 120, -100],
]

var jet_flight3_cp_list = [
    [-200, 120, -100],
    [0, 140, -100],
    [100, 140, -50],
    [200, 120, 0],
    

]

    

function play_animation_jet(jet, cp_list, finished_callback){
    let points_on_curve = []
    let time_step = 0;
    createBezierCurve(cp_list, 100, points_on_curve)

    //draw curve
    let curve_geometry = createBezierCurve(cp_list, 100, points_on_curve)
    let curve_material = new THREE.LineBasicMaterial({color: "red"});
    let curve = new THREE.Line(curve_geometry, curve_material);
    scene.add(curve);

    //place spheres at each point control point  
    for (let i = 0; i < cp_list.length; i++){
        let point = cp_list[i]
        let sphere_geometry = new THREE.SphereGeometry( 5, 82, 82 );
        let sphere_material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        let sphere = new THREE.Mesh( sphere_geometry, sphere_material );
        sphere.position.set(point[0], point[1], point[2])
        scene.add( sphere );
    }


    let animation_speed = 100
    let max_animation_speed = 20
    let animation_speed_decrement = 4
    animation_speed = max_animation_speed //disabling temporarily until i can figure out how to make it work with combined curves
    function anim(){
        if (points_on_curve.length > 0 && time_step < (points_on_curve.length/2)-1){
            let point = points_on_curve[time_step]
            let next_point = points_on_curve[time_step + 1]
            jet.position.set(point.x, point.y, point.z)
            jet.lookAt(next_point.x, next_point.y, next_point.z)
            //rotate jet to account for look at being off
            jet.rotateY(-THREE.Math.degToRad(90));
            time_step += 1
            
            animation_speed -= animation_speed_decrement
            if (animation_speed < max_animation_speed){
                animation_speed = max_animation_speed
            }
            clearInterval(animation_interval)
            animation_interval = setInterval(anim, animation_speed)
            console.log(animation_speed)
        }
        else{
            clearInterval(animation_interval)
            finished_callback()
        }
        render();

    }
    let animation_interval = setInterval(anim, animation_speed)
    return animation_interval

}


function play_animation_list_jet(jet, list, const_list){


    play_animation_jet(jet, list[0], function(){

        let new_list = list.slice(1)
        if (new_list.length > 0){
            play_animation_list_jet(jet, new_list, const_list)
        }else{
            play_animation_list_jet(jet, const_list, const_list)
        }

    })


}

function play_jet_retract_gear(jet){


    let time_increment = 0
    let time_step = 0
    let gear_interval = setInterval(function(){
        if(gearRotation < 90 && time_step > 100) {
            jet.getObjectByName("main").getObjectByName("frontgear1").rotateZ(THREE.Math.degToRad(5))
            jet.getObjectByName("main").getObjectByName("tailgear11").rotateZ(-THREE.Math.degToRad(5))
            jet.getObjectByName("main").getObjectByName("tailgear21").rotateZ(-THREE.Math.degToRad(5))
            jet.getObjectByName("main").getObjectByName("frontgear1").translateY(.5)
            jet.getObjectByName("main").getObjectByName("tailgear11").translateY(.5)
            jet.getObjectByName("main").getObjectByName("tailgear21").translateY(.5)
            jet.getObjectByName("main").getObjectByName("frontgear1").translateX(.5)
            jet.getObjectByName("main").getObjectByName("tailgear11").translateX(-.5)
            jet.getObjectByName("main").getObjectByName("tailgear21").translateX(-.5)
    
            jet.getObjectByName("outline").getObjectByName("frontgear3").rotateZ(THREE.Math.degToRad(5))
            jet.getObjectByName("outline").getObjectByName("tailgear13").rotateZ(-THREE.Math.degToRad(5))
            jet.getObjectByName("outline").getObjectByName("tailgear23").rotateZ(-THREE.Math.degToRad(5))
            jet.getObjectByName("outline").getObjectByName("frontgear3").translateY(.5)
            jet.getObjectByName("outline").getObjectByName("tailgear13").translateY(.5)
            jet.getObjectByName("outline").getObjectByName("tailgear23").translateY(.5)
            jet.getObjectByName("outline").getObjectByName("frontgear3").translateX(.5)
            jet.getObjectByName("outline").getObjectByName("tailgear13").translateX(-.5)
            jet.getObjectByName("outline").getObjectByName("tailgear23").translateX(-.5)
            gearRotation += 5 

        }
        time_step += 1

    }, 10)


}


//DONT USE deprecated
function play_jet_takeoff_animation(jet){

    let points_on_curve = []
    let time_step = 0;
    createBezierCurve(jet_takeoff_cp_list, 100, points_on_curve)

    //draw curve
    let curve_geometry = createBezierCurve(jet_takeoff_cp_list, 100, points_on_curve)
    let curve_material = new THREE.LineBasicMaterial({color: "red"});
    let curve = new THREE.Line(curve_geometry, curve_material);
    //scene.add(curve);

    let animation_speed = 100
    let max_animation_speed = 20
    let animation_speed_decrement = 4
    function anim(){
        if (points_on_curve.length > 0 && time_step < (points_on_curve.length/2)-1){
            let point = points_on_curve[time_step]
            let next_point = points_on_curve[time_step + 1]
            jet.position.set(point.x, point.y, point.z)
            jet.lookAt(next_point.x, next_point.y, next_point.z)
            //rotate jet to account for look at being off
            jet.rotateY(-THREE.Math.degToRad(90));

            time_step += 1
            
            animation_speed -= animation_speed_decrement
            if (animation_speed < max_animation_speed){
                animation_speed = max_animation_speed
            }
            clearInterval(animation_interval)
            animation_interval = setInterval(anim, animation_speed)
            console.log(animation_speed)
        }
        else{
            clearInterval(animation_interval)
        }

        render();


    }

    let animation_interval = setInterval(anim, animation_speed)

    



}