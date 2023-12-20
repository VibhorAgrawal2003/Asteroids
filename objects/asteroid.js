class Asteroid{
    constructor(x, y, radius, level, collisionRadius){
        this.visible = true;
        this.level = level || 1;
        this.shipX = ship.getShipX();
        this.shipY = ship.getShipY();
        this.fieldRadius = 300*scale;

        this.x = x || ((Math.random() < 0.5)? Math.floor(Math.random() * (this.shipX - this.fieldRadius)) : Math.floor(Math.random() * (canvas.width - this.shipX - this.fieldRadius)));
        this.y = y || ((Math.random() < 0.5)? Math.floor(Math.random() * (this.shipY - this.fieldRadius)) : Math.floor(Math.random() * (canvas.height - this.shipY - this.fieldRadius)));

        this.speed = (1 + 0.5 * Math.floor(Math.random() * 3))*scale;
        this.rotateSpeed = 0.0001;
        this.angle = Math.floor(Math.random() * 359);        
        this.spin = Math.floor(Math.random() * 3) - 1;
        this.offset = Math.floor(Math.random() * 30) * scale;
        this.radius = radius || (50 + this.offset);
        this.collisionRadius = collisionRadius || (this.radius - 4*scale);
        this.strokeColor = 'white';



    }

    Rotate(dir){
        this.angle += this.rotateSpeed * dir;
    }

    Update(){
        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;

        if(this.x < this.radius){
            this.x = canvas.width;
        }

        if(this.x > canvas.width){
            this.x = this.radius;
        }

        if(this.y < this.radius){
            this.y = canvas.height;
        }

        if(this.y > canvas.height){
            this.y = this.radius;
        }
    }

    Draw(){

        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for(let i=0; i<6; i++){
            ctx.lineTo(
                this.x - this.radius * Math.cos(vertAngle * i + radians),
                this.y - this.radius * Math.sin(vertAngle * i + radians)
            );
        }
        ctx.closePath();
        ctx.stroke();
    }
}