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
//# sourceMappingURL=main.js.map