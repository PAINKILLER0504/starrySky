const canvas = document.querySelector('canvas');
const context=canvas.getContext("2d");

function init(){
    canvas.width=window.innerWidth *devicePixelRatio;
    canvas.height=window.innerHeight *devicePixelRatio;
    
}
init();

function getRandome(min,max){
    return Math.floor(Math.random() *(max+1-min)+min);
} 
class Point{
    constructor(){
        this.r =2;
        this.x =getRandome(0,canvas.width - this.r/2);
        this.y =getRandome(0,canvas.height - this.r/2);
        this.xSpeed=getRandome(-50,50);
        this.ySpeed=getRandome(-50,50);
        this.lastDrawTime =null;
    }
    drow(){
        if (this.lastDrawTime) {
            const duration = (Date.now() - this.lastDrawTime)/1000;
            const xDistans =this.xSpeed*duration;
            const yDistans =this.ySpeed*duration;
            let x =this.x +xDistans;


            let y =this.y +yDistans;
            if(x>canvas.width -10){
                x=canvas.width -10;
                this.xSpeed= -this.xSpeed;
            }else if (x<10) {
                x=10;
                this.xSpeed= -this.xSpeed;                
            }
            if(y>canvas.height-10){
                y=canvas.height-10;
                this.ySpeed= -this.ySpeed;
            }else if (y<10) {
                y=10;
                this.ySpeed= -this.ySpeed;                
            }

            this.x =x;
            this.y =y;

        }
            context.beginPath();
            context.arc(this.x,this.y,this.r,0,2*Math.PI,false);
            context.fillStyle='#fff';
            context.fill();
            this.lastDrawTime =Date.now();
    }
}
class Graph{
    constructor(pointNumber =50 ,maxDis =0.2*(canvas.width+canvas.height)/2){
        this.points= new Array(pointNumber).fill(0).map(()=> new Point());
        this.maxDis=maxDis;
    }
    drow(){

        requestAnimationFrame(() =>{
            this.drow();
        })
        context.clearRect(0,0,canvas.width,canvas.height);
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i];
            p1.drow();
            for (let j = i+1; j < this.points.length; j++) {
                const p2 = this.points[j];
                const distans= Math.sqrt((p1.x-p2.x)**2 +(p1.y-p2.y)**2);
                if (distans>this.maxDis) {
                    continue;
                }
                context.beginPath();
                context.moveTo(p1.x,p1.y);
                context.lineTo(p2.x,p2.y);
                context.lineWidth=1;
                context.closePath();                
                context.strokeStyle=`rgba(200,200,200,${1-distans/this.maxDis})`;
                context.stroke();
            }
        }
}
}

const graph =new Graph();
graph.drow();
