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
//# sourceMappingURL=World.js.map