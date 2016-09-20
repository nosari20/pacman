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
//# sourceMappingURL=Sky.js.map