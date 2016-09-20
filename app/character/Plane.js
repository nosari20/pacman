"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/threejs/three.d.ts" />
var CONST_1 = require("../CONST");
var Character_1 = require("./Character");
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        _super.call(this);
        this.mesh = new THREE.Object3D();
        // Create the cabin
        var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
        var matCockpit = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.red, shading: THREE.FlatShading });
        var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.mesh.add(cockpit);
        // Create the engine
        var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
        var matEngine = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.white, shading: THREE.FlatShading });
        var engine = new THREE.Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);
        // Create the tail
        var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
        var matTailPlane = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.red, shading: THREE.FlatShading });
        var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);
        // Create the wing
        var geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
        var matSideWing = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.red, shading: THREE.FlatShading });
        var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.mesh.add(sideWing);
        // propeller
        var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
        var matPropeller = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.brown, shading: THREE.FlatShading });
        this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;
        // blades
        var geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
        var matBlade = new THREE.MeshPhongMaterial({ color: CONST_1.Colors.brownDark, shading: THREE.FlatShading });
        var blade = new THREE.Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        this.propeller.add(blade);
        this.propeller.position.set(50, 0, 0);
        this.mesh.add(this.propeller);
        this.mesh.scale.set(.25, .25, .25);
        this.mesh.position.y = 100;
    }
    Plane.prototype.loop = function () {
        // Rotate the propeller, the sea and the sky
        this.propeller.rotation.x += 0.3;
    };
    return Plane;
}(Character_1.Character));
exports.Plane = Plane;
//# sourceMappingURL=Plane.js.map