
function CircleCollision(x1, y1, r1, x2, y2, r2){
    let rTotal;
    let xDiff;
    let yDiff;
    rTotal = r1 + r2;
    xDiff = x1 - x2;
    yDiff = y1 - y2;

    if(rTotal > Math.sqrt((xDiff*xDiff) + (yDiff * yDiff))){
        return true;
    }
    else {
        return false;
    }
}

function DrawLives(){
    let startX = Math.floor(canvas.width * (8/9));
    let startY = 25;
    let points = [[9,12], [-9,12]];
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    for(let i = 0; i < lives; i++){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for(let k=0; k<points.length; k++){
            ctx.lineTo(
                startX + points[k][0],
                startY + points[k][1]
            );
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        startX += 30;
    }
}