import "core-js/index";
import Render from "./Render.js"
class Slider{
    constructor(){
        this.render = new Render();
        this.listeners();
    }

    async listeners(){
        this.render.arrowLeft.addEventListener("click", this.render.prevSlide.bind(this.render));
        this.render.arrowRight.addEventListener("click", this.render.nextSlide.bind(this.render));
        window.addEventListener("keydown", (e)=>{
            switch(e.key){
                case "ArrowLeft":
                    this.render.prevSlide();
                    break;
                case "ArrowRight":
                    this.render.nextSlide();
                    break;
            }
        });
        await this.render.renderPhoto()    
    }
}

const slider = new Slider();