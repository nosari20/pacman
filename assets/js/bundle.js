(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * Created by ACH02 on 15/09/2016.
 */
/// <reference path="../typings/threejs/three.d.ts" />
exports.CONFIG = {
    container: document.getElementById('container')
};
exports.Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
    yellow: 0xFFCC00,
    black: 0x000000
};

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Created by ACH02 on 18/09/2016.
 */
var Element = (function () {
    function Element() {
    }
    Element.prototype.getMesh = function () {
        return this.mesh;
    };
    return Element;
}());
exports.Element = Element;

},{}],3:[function(require,module,exports){
"use strict";
var CONST_1 = require("./CONST");
/**
 * Created by ACH02 on 18/09/2016.
 */
var Renderer = (function () {
    function Renderer() {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        // Create the scene
        this.scene = new THREE.Scene();
        // Add a fog effect to the scene; same color as the
        // background color used in the style sheet
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
        // Create the camera
        this.aspectRatio = this.WIDTH / this.HEIGHT;
        this.fieldOfView = 60;
        this.nearPlane = 1;
        this.farPlane = 10000;
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearPlane, this.farPlane);
        // Set the position of the camera
        this.camera.position.x = 0;
        this.camera.position.z = 200;
        this.camera.position.y = 100;
        // Create the renderer
        this.renderer = new THREE.WebGLRenderer({
            // Allow transparency to show the gradient background
            // we defined in the CSS
            alpha: true,
            // Activate the anti-aliasing; this is less performant,
            // but, as our project is low-poly based, it should be fine :)
            antialias: true
        });
        // Define the size of the renderer; in this case,
        // it will fill the entire screen
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        // Enable shadow rendering
        this.renderer.shadowMap.enabled = true;
        // Add the DOM element of the renderer to the
        // container we created in the HTML
        this.container = CONST_1.CONFIG.container;
        this.container.appendChild(this.renderer.domElement);
        // Listen to the screen: if the user resizes it
        // we have to update the camera and the renderer size
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);
    }
    Renderer.prototype.handleWindowResize = function () {
        // update height and width of the renderer and the camera
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
    };
    Renderer.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    Renderer.prototype.addToScene = function (object) {
        this.scene.add(object);
    };
    return Renderer;
}());
exports.Renderer = Renderer;

},{"./CONST":1}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by ACH02 on 15/09/2016.
 */
var Element_1 = require("../Element");
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        _super.apply(this, arguments);
    }
    return Character;
}(Element_1.Element));
exports.Character = Character;

},{"../Element":2}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/threejs/three.d.ts" />
var CONST_1 = require("../CONST");
var Character_1 = require("./Character");
var MOUTH_SPEED = .05;
//const MOUTH_SPEED: number = .005
var Pacman = (function (_super) {
    __extends(Pacman, _super);
    function Pacman() {
        _super.call(this);
        this.openSize = 1;
        this.mesh = new THREE.Object3D();
        var tranparent = new THREE.MeshNormalMaterial({ transparent: true, opacity: .7 });
        var matBody = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.yellow });
        var matEye = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.black });
        matBody.side = THREE.DoubleSide;
        var halfSphere = new THREE.SphereGeometry(15, 32, 32, 0, 3.15, 0, 3.14);
        var eyeSphere = new THREE.SphereGeometry(2, 32, 32);
        // Create top
        this.top = new THREE.Mesh(halfSphere, matBody);
        var eyeR = new THREE.Mesh(eyeSphere, matEye);
        eyeR.translateX(-5);
        eyeR.translateY(12);
        eyeR.translateZ(8);
        this.top.add(eyeR);
        var eyeL = new THREE.Mesh(eyeSphere, matEye);
        eyeL.translateX(-5);
        eyeL.translateY(-12);
        eyeL.translateZ(8);
        this.top.add(eyeL);
        this.top.rotation.x = -Math.PI / 2;
        this.top.rotation.y = 0;
        this.top.rotation.z = 0;
        this.mesh.add(this.top);
        // Create bottom
        this.bottom = new THREE.Mesh(halfSphere, matBody);
        this.bottom.rotation.x = Math.PI / 2;
        this.bottom.rotation.y = 0;
        this.bottom.rotation.z = 0;
        this.mesh.add(this.bottom);
        this.mesh.position.y = 100;
    }
    Pacman.prototype.loop = function () {
        this.animateMouth();
    };
    Pacman.prototype.animateMouth = function () {
        var open = this.top.rotation.y;
        if (this.opening) {
            if (open < this.openSize) {
                this.bottom.rotation.y += MOUTH_SPEED;
                this.top.rotation.y += MOUTH_SPEED;
            }
            else {
                this.opening = false;
            }
        }
        else {
            if (open > 0) {
                this.top.rotation.y += -MOUTH_SPEED;
                this.bottom.rotation.y += -MOUTH_SPEED;
            }
            else {
                this.opening = true;
            }
        }
        //this.mesh.rotation.x+=.01
        this.mesh.rotation.y += .01;
        //this.mesh.rotation.z+=.01
    };
    return Pacman;
}(Character_1.Character));
exports.Pacman = Pacman;

},{"../CONST":1,"./Character":4}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/threejs/three.d.ts" />
var CONST_1 = require("../CONST");
var Element_1 = require("../Element");
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        _super.call(this);
        // Create an empty container that will hold the different parts of the cloud
        this.mesh = new THREE.Object3D();
        // create a cube geometry;
        // this shape will be duplicated to create the cloud
        var geom = new THREE.BoxGeometry(20, 20, 20);
        // create a material; a simple white material will do the trick
        var mat = new THREE.MeshPhongMaterial({
            color: CONST_1.Colors.white
        });
        // duplicate the geometry a random number of times
        var nBlocs = 3 + Math.floor(Math.random() * 3);
        for (var i = 0; i < nBlocs; i++) {
            // create the mesh by cloning the geometry
            var m = new THREE.Mesh(geom, mat);
            // set the position and the rotation of each cube randomly
            m.position.x = i * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;
            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;
            // set the size of the cube randomly
            var s = .1 + Math.random() * .9;
            m.scale.set(s, s, s);
            // allow each cube to cast and to receive shadows
            m.castShadow = true;
            m.receiveShadow = true;
            this.mesh.add(m);
        }
    }
    return Cloud;
}(Element_1.Element));
exports.Cloud = Cloud;

},{"../CONST":1,"../Element":2}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/threejs/three.d.ts" />
var Element_1 = require("../Element");
var Light = (function (_super) {
    __extends(Light, _super);
    function Light() {
        _super.call(this);
        // A hemisphere light is a gradient colored light;
        // the first parameter is the sky color, the second parameter is the ground color,
        // the third parameter is the intensity of the light
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        // A directional light shines from a specific direction.
        // It acts like the sun, that means that all the rays produced are parallel.
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        // Set the direction of the light
        this.shadowLight.position.set(150, 350, 350);
        // Allow shadow casting
        this.shadowLight.castShadow = true;
        // define the visible area of the projected shadow
        this.shadowLight.shadow.camera.left = -400;
        this.shadowLight.shadow.camera.right = 400;
        this.shadowLight.shadow.camera.top = 400;
        this.shadowLight.shadow.camera.bottom = -400;
        this.shadowLight.shadow.camera.near = 1;
        this.shadowLight.shadow.camera.far = 1000;
        // define the resolution of the shadow; the higher the better,
        // but also the more expensive and less performant
        this.shadowLight.shadow.mapSize.width = 2048;
        this.shadowLight.shadow.mapSize.height = 2048;
    }
    Light.prototype.getHemisphereLight = function () {
        return this.hemisphereLight;
    };
    Light.prototype.getShadowLight = function () {
        return this.shadowLight;
    };
    return Light;
}(Element_1.Element));
exports.Light = Light;

},{"../Element":2}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/threejs/three.d.ts" />
var CONST_1 = require("../CONST");
var Element_1 = require("../Element");
var Sea = (function (_super) {
    __extends(Sea, _super);
    function Sea() {
        _super.call(this);
        // create the geometry (shape) of the cylinder;
        // the parameters are:
        // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
        var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
        // rotate the geometry on the x axis
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        // create the material
        var mat = new THREE.MeshPhongMaterial({
            color: CONST_1.Colors.blue,
            transparent: true,
            opacity: .6,
            shading: THREE.FlatShading
        });
        // To create an object in Three.js, we have to create a mesh
        // which is a combination of a geometry and some material
        this.mesh = new THREE.Mesh(geom, mat);
        // Allow the sea to receive shadows
        this.mesh.receiveShadow = true;
        this.mesh.position.y = -600;
    }
    Sea.prototype.loop = function () {
        this.mesh.rotation.z += .005;
    };
    return Sea;
}(Element_1.Element));
exports.Sea = Sea;

},{"../CONST":1,"../Element":2}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Element_1 = require("../Element");
var Cloud_1 = require("./Cloud");
var Sky = (function (_super) {
    __extends(Sky, _super);
    function Sky() {
        _super.call(this);
        this.mesh = new THREE.Object3D();
        // choose a number of clouds to be scattered in the sky
        this.nClouds = 20;
        // To distribute the clouds consistently,
        // we need to place them according to a uniform angle
        var stepAngle = Math.PI * 2 / this.nClouds;
        // create the clouds
        for (var i = 0; i < this.nClouds; i++) {
            var c = new Cloud_1.Cloud();
            // set the rotation and the position of each cloud;
            // for that we use a bit of trigonometry
            var a = stepAngle * i; // this is the final angle of the cloud
            var h = 750 + Math.random() * 200; // this is the distance between the center of the axis and the cloud itself
            // Trigonometry!!! I hope you remember what you've learned in Math :)
            // in case you don't:
            // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
            c.getMesh().position.y = Math.sin(a) * h;
            c.getMesh().position.x = Math.cos(a) * h;
            // rotate the cloud according to its position
            c.getMesh().rotation.z = a + Math.PI / 2;
            // for a better result, we position the clouds
            // at random depths inside of the scene
            c.getMesh().position.z = -400 - Math.random() * 400;
            // we also set a random scale for each cloud
            var s = 1 + Math.random() * 2;
            c.getMesh().scale.set(s, s, s);
            // do not forget to add the mesh of each cloud in the scene
            this.mesh.add(c.getMesh());
            this.mesh.position.y = -600;
        }
    }
    Sky.prototype.loop = function () {
        this.mesh.rotation.z += .01;
    };
    return Sky;
}(Element_1.Element));
exports.Sky = Sky;

},{"../Element":2,"./Cloud":6}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Element_1 = require("../Element");
var Light_1 = require("./Light");
var Sky_1 = require("./Sky");
var Sea_1 = require("./Sea");
var Pacman_1 = require("../character/Pacman");
var World = (function (_super) {
    __extends(World, _super);
    function World() {
        _super.call(this);
        this.stage = [];
        this.characters = [];
        this.loopings = [];
        //light
        this.light = new Light_1.Light();
        //stage elements
        this.stage.push(new Sea_1.Sea());
        this.stage.push(new Sky_1.Sky());
        //characters
        //this.characters.push(new Plane());
        this.characters.push(new Pacman_1.Pacman());
        this.createMesh();
    }
    World.prototype.createMesh = function () {
        this.mesh = new THREE.Object3D();
        this.mesh.add(this.light.getHemisphereLight());
        this.mesh.add(this.light.getShadowLight());
        for (var _i = 0, _a = this.stage; _i < _a.length; _i++) {
            var element = _a[_i];
            this.mesh.add(element.getMesh());
            if ('loop' in element) {
                this.loopings.push(element);
            }
        }
        for (var _b = 0, _c = this.characters; _b < _c.length; _b++) {
            var character = _c[_b];
            this.mesh.add(character.getMesh());
            if ('loop' in character) {
                this.loopings.push(character);
            }
        }
    };
    World.prototype.getMesh = function () {
        return this.mesh;
    };
    World.prototype.loop = function () {
        for (var _i = 0, _a = this.loopings; _i < _a.length; _i++) {
            var looping = _a[_i];
            looping.loop();
        }
    };
    return World;
}(Element_1.Element));
exports.World = World;

},{"../Element":2,"../character/Pacman":5,"./Light":7,"./Sea":8,"./Sky":9}],11:[function(require,module,exports){
"use strict";
var Renderer_1 = require("./app/Renderer");
var World_1 = require("./app/world/World");
/**
 * Created by ACH02 on 15/09/2016.
 */
var renderer = new Renderer_1.Renderer();
var world = new World_1.World();
renderer.addToScene(world.getMesh());
renderer.render();
function loop() {
    world.loop();
    renderer.render();
    requestAnimationFrame(loop);
}
loop();

},{"./app/Renderer":3,"./app/world/World":10}]},{},[11]);
