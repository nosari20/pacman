import {CONFIG} from "./CONST";
/**
 * Created by ACH02 on 18/09/2016.
 */
export class Renderer{

    private scene: any;

    private camera: any;
    private fieldOfView: any;
    private aspectRatio: any;
    private nearPlane: any;
    private farPlane: any;
    private HEIGHT: any;
    private WIDTH: any;
    private renderer: any;
    private container: any;

    public constructor(){

        this.HEIGHT = window.innerHeight;
        this.WIDTH =  window.innerWidth;

        // Create the scene
        this.scene = new THREE.Scene();

        // Add a fog effect to the scene; same color as the
        // background color used in the style sheet
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

        // Create the camera
        this.aspectRatio = this.WIDTH / this.HEIGHT;
        this.fieldOfView = 60;
        this.nearPlane = 1;
        this.farPlane = 10000;
        this.camera = new THREE.PerspectiveCamera(
            this.fieldOfView,
            this.aspectRatio,
            this.nearPlane,
            this.farPlane
        );

        // Set the position of the camera
        this.camera.position.x = 0;
        this.camera.position.z = 200;
        this.camera.position.y = 100;

        // Create the renderer
        this.renderer = new THREE.WebGLRenderer({
            // Allow transparency to show the gradient background
            // we defined in the CSS
            alpha: true,

            // Activate the anti-aliasing; this is less performant,
            // but, as our project is low-poly based, it should be fine :)
            antialias: true
        });

        // Define the size of the renderer; in this case,
        // it will fill the entire screen
        this.renderer.setSize(this.WIDTH, this.HEIGHT);

        // Enable shadow rendering
        this.renderer.shadowMap.enabled = true;

        // Add the DOM element of the renderer to the
        // container we created in the HTML
        this.container = CONFIG.container;
        this.container.appendChild(this.renderer.domElement);

        // Listen to the screen: if the user resizes it
        // we have to update the camera and the renderer size
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);
    }

    handleWindowResize() {
    // update height and width of the renderer and the camera
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
    }


    render(){
        this.renderer.render(this.scene, this.camera);
    }

    addToScene(object:any):any{
        this.scene.add(object);
    }





}