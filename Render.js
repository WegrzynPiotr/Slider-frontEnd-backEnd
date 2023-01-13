export default class Render{
    slider = document.createElement("div");
    img = document.createElement("img");
    arrowLeft = document.createElement("span");
    arrowRight = document.createElement("span");
    currentPhoto = 0;
    serverPath = "http://127.0.0.1:3000"
    photosCount = 0;
    constructor(){
    this._start();
    }
    async _start(){
        this._draw();  
    }

   async prevSlide(){
       this.currentPhoto--;
        if(this.currentPhoto<0) this.currentPhoto = this.photosCount-1
        await this.renderPhoto();
         }
   async nextSlide(){
       this.currentPhoto++;
       if(this.currentPhoto>=this.photosCount) this.currentPhoto =0;
        await this.renderPhoto();
    }

     async _getPhotos (){
        const response = await fetch(this.serverPath);
        if(!response.ok){
            throw new Error("Fetching error, status: " + response.status)
        }
        const getJson = await response.json();
        return getJson
    }

    async _draw(){
        this.slider.id = "slider"
        this.arrowLeft.id = "prevBtn";
        this.arrowRight.id = "nextBtn";
        this.arrowLeft.className ="fas fa-chevron-left";
        this.arrowRight.className ="fas fa-chevron-right";
        this.slider.appendChild(this.img)
        document.body.append(this.arrowLeft,this.slider,this.arrowRight);
        const data = await this._getPhotos();
        this.photosCount = data.length;
        await this.renderPhoto();
    }

    async renderPhoto(){
        const data = await this._getPhotos();
        this.img.src = `${this.serverPath}/images/${data[this.currentPhoto].src}`;
        this.img.alt = `${data[this.currentPhoto].alt}`;
    }

}