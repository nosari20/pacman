import {Renderer} from "./app/Renderer";
import {World} from "./app/world/World";
/**
 * Created by ACH02 on 15/09/2016.
 */

let renderer: Renderer = new Renderer();

let world: World = new World();

renderer.addToScene(world.getMesh());
renderer.render();
function loop(){
    world.loop();
    renderer.render();
    requestAnimationFrame(loop);
}
loop();
