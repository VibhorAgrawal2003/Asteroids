class Bullet{
    constructor(angle){
        this.visible = true;
        this.x = ship.tipX;
        this.y = ship.tipY;
        this.angle = angle;
        this.height = 4*scale;
        this.width = 4*scale;
        this.speed = 4 + Math.sqrt(ship.getVelX() * ship.getVelX() + ship.getVelY() * ship.getVelY());
        this.velX = 0;
        this.velY = 0;
    }

    Update(){
        var radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }

    Draw(){
        ctx.fillStyle = 'yellow';
        if(!gameover){
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}