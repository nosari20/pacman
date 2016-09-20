import {Element} from "../Element";
import {Light} from "./Light";
import {Sky} from "./Sky";
import {Sea} from "./Sea";
import {Plane} from "../character/Plane";
import {Character} from "../character/Character";
import {Loop} from "../Loop";
import {Pacman} from "../character/Pacman";
export class World extends Element implements Loop{

    private light: Light;
    private stage: Element[] = [];
    private characters: Character[] = [];

    private loopings: Element[] = [];


    constructor() {
        super();
        //light
        this.light = new Light();

        //stage elements
        this.stage.push(new Sea());
        this.stage.push(new Sky());

        //characters
        //this.characters.push(new Plane());
        this.characters.push(new Pacman());


        this.createMesh();
    }


    createMesh(): void{
        this.mesh = new THREE.Object3D();

        this.mesh.add(this.light.getHemisphereLight());
        this.mesh.add(this.light.getShadowLight());

        for (let element of this.stage) {
            this.mesh.add(element.getMesh());
            if('loop' in element){
                this.loopings.push(element);
            }
        }

        for (let character of this.characters) {
            this.mesh.add(character.getMesh());
            if('loop' in character){
                this.loopings.push(character);
            }
        }


    }

    getMesh(): void{
        return this.mesh;
    }

    loop():void {
        for (let looping  of this.loopings) {
            (<any> looping).loop();
        }

    }


}