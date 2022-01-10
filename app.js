const menu = document.querySelector('#mobile-menu');
const menuLink = document.querySelector('.navbar_menu');
const navLogo = document.querySelector('#navbar_logo');

// Dispiley Mobil Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLink.classList.toggle('active');
    
};

menu.addEventListener('click', mobileMenu);

// sow active menu when scrolling down
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const servicsMenu = document.querySelector('#services-page');
    let scrollPos = window.scrollY;
    console.log(scrollPos);

    // adds 'highlight'  class to my menu items
   if(window.innerWidth > 960 && scrollPos < 700){
         homeMenu.classList.add('highlight');
         aboutMenu.classList.remove('highlight');
         return;
   }else if(window.innerWidth > 960 && scrollPos < 1300){
       aboutMenu.classList.add('highlight');
       homeMenu.classList.remove('highlight');
       servicsMenu.classList.remove('highlight');
       return;
   }else if(window.innerWidth > 960 && scrollPos < 2345){
    servicsMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
   }


   if((elem && window.innerWidth < 960 && scrollPos < 600)|| elem){
       elem.classList.remove('highlight');
   }


}

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);
 
// Close mobile Menu when clicked

const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if(window.innerWidth <= 768 && menuBars){
        menu.classList.toggle('is-active');
        menuLink.classList.remove('active');

    }
}

menuLink.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);







//   random 

(function() {
  
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
    particles = [],
    properties = {
        bgColor        : 'rgba(0,0,0,1)',
        particleColor  : 'rgba(255, 255, 255, 1)',
        particleRadius : 3,
        particleCount  :  65,
        particleMaxVelocity : 0.7,
        lineLength : 150,
        particleLife : 6  
    };

    document.querySelector('.hero').appendChild(canvas);

    window.onresize = function() {
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;
    }

    class   Particle {
        constructor() {
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.life = Math.random()*properties.particleLife*60;
        }

        position() {
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityX*=-1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reCalculateLife(){
            if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.random()*properties.particleLife*60;
            }
            this.life--;
        }

        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
    }


    function reDrawBackround() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);

    }

    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for(let i in particles){
            for(let j in particles){
               x1 = particles[i].x;
               y1 = particles[i].y;
               x2 = particles[j].x;
               y2 = particles[j].y;

               length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
               if(length < properties.lineLength){
                   opacity = 1-length/properties.lineLength;
                   ctx.lineWidth = '0,5';
                   ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')'; 
                   ctx.beginPath();
                   ctx.moveTo(x1, y1);
                   ctx.lineTo(x2, y2);
                   ctx.closePath();
                   ctx.stroke();

               }

            } 
        }
    }

    function reDrawParticles() {
        for (let i in particles){
            particles[i].reCalculateLife(); 
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop() {
        reDrawBackround();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init() {

        for(let i=0; i<properties.particleCount; i++){
            particles.push(new Particle);
        }

        loop();
    }

    init();

}());