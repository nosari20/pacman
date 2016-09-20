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
//# sourceMappingURL=Cloud.js.map