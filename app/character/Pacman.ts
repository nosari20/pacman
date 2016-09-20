/// <reference path="../../typings/threejs/three.d.ts" />
import {Colors} from "../CONST";
import {Character} from "./Character";
import {Loop} from "../Loop";

const MOUTH_SPEED: number = .05
//const MOUTH_SPEED: number = .005
export class Pacman extends Character implements Loop{

    private top: any;
    private bottom: any;

    private opening: boolean;
    private openSize: number = 1;
    private openState: number;

    constructor() {
        super();

        this.mesh = new THREE.Object3D();

        var tranparent = new THREE.MeshNormalMaterial( { transparent: true, opacity: .7 } )

        let matBody = new THREE.MeshPhongMaterial( {color: Colors.yellow} );
        let matEye = new THREE.MeshPhongMaterial( {color: Colors.black} );
        matBody.side = THREE.DoubleSide;

        let halfSphere = new THREE.SphereGeometry( 15, 32, 32, 0, 3.15, 0, 3.14 );
        let eyeSphere = new THREE.SphereGeometry( 2, 32, 32);

        // Create top
        this.top = new THREE.Mesh( halfSphere, matBody );


        let eyeR = new THREE.Mesh( eyeSphere, matEye);
        eyeR.translateX(-5);
        eyeR.translateY(12);
        eyeR.translateZ(8);
        this.top.add(eyeR);

        let eyeL = new THREE.Mesh( eyeSphere, matEye);
        eyeL.translateX(-5);
        eyeL.translateY(-12);
        eyeL.translateZ(8);
        this.top.add(eyeL);



        this.top.rotation.x = -Math.PI/2;
        this.top.rotation.y = 0;
        this.top.rotation.z = 0;
        this.mesh.add(this.top);


        // Create bottom
        this.bottom = new THREE.Mesh( halfSphere, matBody );
        this.bottom.rotation.x = Math.PI/2;
        this.bottom.rotation.y = 0;
        this.bottom.rotation.z = 0;

        this.mesh.add(this.bottom);








        this.mesh.position.y = 100;

    }

    loop(){
        this.animateMouth();
    }


    animateMouth(){
        let open = this.top.rotation.y;
        if(this.opening){
            if(open < this.openSize) {
                this.bottom.rotation.y += MOUTH_SPEED;
                this.top.rotation.y += MOUTH_SPEED;
            }else{
                this.opening=false;
            }

        }else{
            if(open > 0) {
                this.top.rotation.y += -MOUTH_SPEED;
                this.bottom.rotation.y += -MOUTH_SPEED;
            }else{
                this.opening=true;
            }
        }

        //this.mesh.rotation.x+=.01
        this.mesh.rotation.y+=.01
        //this.mesh.rotation.z+=.01
    }

}