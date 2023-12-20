class Ship {
    constructor(){
        this.visible = true;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.movingForward = false;
        this.movingBackward = false;
        this.gear = 1;
        this.speed = 0.1*scale;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 25 * scale;
        this.angle = -90;
        this.strokeColor = '#39ff0d';
        this.fillColor = '#39ff0d';
        this.tipX = canvas.width / 2 + 15*scale;
        this.tipY = canvas.height / 2;
    }

    getShipX(){
        return this.x;
    }

    getShipY(){
        return this.y;
    }

    getVelX(){
        return this.velX;
    }

    getVelY(){
        return this.velY;
    }

    getShipSpeed(){
        return this.speed;
    }

    Rotate(dir){
        this.angle += this.rotateSpeed * dir;
    }


    Update(){
        let radians = this.angle/Math.PI * 180;

        if(this.movingForward || this.movingBackward){
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }

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

        this.velX *= 0.99;
        this.velY *= 0.99;



        if(ship.movingBackward){
            if(this.gear != 0){
                this.gear = 0;
                this.velX = 0;
                this.velY = 0;

            }
            this.x += this.velX;
            this.y += this.velY;
        }

        else if(ship.movingForward){
            if(this.gear != 1){
                this.gear = 1;
                this.velX = 0;
                this.velY = 0;

            }    
            this.x -= this.velX;
            this.y -= this.velY;
        }

        else{
            if(this.gear == 1){
                this.x -= this.velX;
                this.y -= this.velY;  
            }
            else{
                this.x += this.velX;
                this.y += this.velY;
            }       
        }
    }

    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = this.fillColor;


        let vertAngle = (Math.PI * 2) / 3;
        let radians = this.angle / Math.PI * 180;
        this.tipX = this.x - this.radius * Math.cos(radians);
        this.tipY = this.y - this.radius * Math.sin(radians);

        ctx.beginPath();
        // Main Triangle
        for (let i = 0; i < 3; i++) {
            ctx.lineTo(
                this.x - this.radius * Math.cos(vertAngle * i + radians),
                this.y - this.radius * Math.sin(vertAngle * i + radians)
            );
        }

        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();

        ctx.lineTo(
            this.x - this.radius * Math.cos(radians),
            this.y - this.radius * Math.sin(radians)
        );

        // Mini Triangle
        for (let j = 1; j <= 2; j++) {
            ctx.lineTo(
                this.x - this.radius * 0.5 * Math.cos(vertAngle * j + radians + Math.PI),
                this.y - this.radius * 0.5 * Math.sin(vertAngle * j + radians + Math.PI)
            );
        }


        ctx.closePath();
        ctx.stroke();
        // ctx.fill();
    }
}