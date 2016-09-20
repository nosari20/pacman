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
//# sourceMappingURL=Sea.js.map