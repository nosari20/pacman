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
//# sourceMappingURL=Pacman.js.map