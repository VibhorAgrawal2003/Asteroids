document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){
    SetParameters();
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = innerWidth * frameOffset;
    canvas.height = innerHeight * frameOffset;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ship = new Ship();

    for(let i=0; i<5; i++){
        asteroids.push(new Asteroid());
    }  

    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
        if(e.keyCode == 32){
            bullets.push(new Bullet(ship.angle));
        }
    });

    Start();
}

function Start(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = `${heading_font_size}px 'Aadhunik', Arial`;
    ctx.fillText('ASTEROIDS ', canvas.width * lo1, canvas.height / 2 - newline_gap*2);

    ctx.font = `${paragraph_font_size}px 'Aadhunik', Arial`;
    ctx.fillText("Controls: WASD or Cursor Keys to Move Ship. ", canvas.width * lo2, canvas.height / 2 - newline_gap*1);
    ctx.fillText("Press Spacebar to Shoot Bullets at Asteroids. ", canvas.width * lo2, canvas.height / 2);
    ctx.fillText("Press R to Restart the Game Window. ", canvas.width * lo2, canvas.height / 2 + newline_gap*1);
    ctx.fillText("~ ~ ~ Hit the ENTER key to Start. ~ ~ ~", canvas.width * lo3, canvas.height / 2 + newline_gap*2);


    if(asteroids.length != 0){
        for(let j=0; j<asteroids.length; j++){
            asteroids[j].Update();
            asteroids[j].Rotate(asteroids[j].spin);
            asteroids[j].Draw(j);
        }
    }

    if(keys[13]){ // 'ENTER' key
        press_sound.play();
        Render();
    }
    else{
        requestAnimationFrame(Start); 
    }
   
}

function Render(){

    // Keyboard Controls
    ship.movingForward = (keys[87] || keys[38]); // 'W' and 'Up'
    ship.movingBackward = (keys[83] || keys[40]); // 'S' and 'Down'

    if(keys[68] || keys[39]){ // 'D' and 'Right'
        ship.Rotate(1);
    }

    if(keys[65] || keys[37]){ // 'A' and 'Left'
        ship.Rotate(-1);
    }

    if(keys[82]){
        location.reload();
    }

    // Canvas Reset
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    if(!gameover && lives > 0){
        ctx.fillText('SCORE: ' + score.toString(), 20, 35);
        ctx.fillText('LIVES: ', canvas.width-200, 35);
    }
    if(lives <= 0){
        ship.visible = false;
        ctx.fillStyle = 'white';
        ctx.font = `${heading_font_size}px 'Aadhunik', Arial`;
        ctx.fillText('GAME OVER ', canvas.width * lo1, canvas.height / 2 - newline_gap);
        ctx.fillText('SCORE: ' + score.toString(), canvas.width * lo1, canvas.height / 2); 

        ctx.font = `${paragraph_font_size}px 'Aadhunik', Arial`;
        ctx.fillText("~ ~ ~ Hit the R key to Restart. ~ ~ ~", canvas.width * lo3, canvas.height / 2 + newline_gap);
     
        gameover = true;  
        music_toggle = false;
    }

    DrawLives();

    // Collision between ship and asteroids
    if(asteroids.length !== 0){
        for(let k=0; k<asteroids.length; k++){
            if(!gameover && CircleCollision(ship.x, ship.y, ship.radius - 4,
            asteroids[k].x, asteroids[k].y, asteroids[k].collisionRadius)){
                
                damage_sound.currentTime = 0;
                damage_sound.play();

                ship.x = canvas.width / 2;
                ship.y = canvas.height / 2;
                ship.velX = 0;
                ship.velY = 0;
                if(lives > 0){
                    lives -= 1;
                }
            }
        }
    }

    // Collision between bullets and asteroids
    if(asteroids.length !== 0 && bullets.length !== 0){

    loop1:
        for(let l=0; l<asteroids.length; l++){
            for(let m=0; m<bullets.length; m++){
                if(!gameover && CircleCollision(bullets[m].x, bullets[m].y, 3,
                asteroids[l].x, asteroids[l].y, asteroids[l].collisionRadius)){

                    bullets[m].visible = false;

                    if(asteroids[l].level === 1){
                        asteroids.push(new Asteroid(
                            asteroids[l].x - 5,
                            asteroids[l].y - 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            2,
                            Math.floor(asteroids[l].radius * 0.6) - 4)
                        );


                        asteroids.push(new Asteroid(
                            asteroids[l].x + 5,
                            asteroids[l].y + 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            2,
                            Math.floor(asteroids[l].radius * 0.6) - 4)
                        );                        
                    }

                    else if(asteroids[l].level === 2){
                        asteroids.push(new Asteroid(
                            asteroids[l].x - 5,
                            asteroids[l].y - 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            3,
                            Math.floor(asteroids[l].radius * 0.6) - 2)
                        );


                        asteroids.push(new Asteroid(
                            asteroids[l].x + 5,
                            asteroids[l].y + 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            3,
                            Math.floor(asteroids[l].radius * 0.6) - 2)
                        );                          
                    }
                    
                    asteroids.splice(l,1);
                    bullets.splice(m,1);
                    if(!gameover){
                        score += 20;
                    }
                    break loop1;
                }
            }
        }
    }

    if(ship.visible){
        ship.Update();
        ship.Draw();
    }


    if(bullets.length !== 0){
        for(let i=0; i<bullets.length; i++){
            bullets[i].Update();
            bullets[i].Draw();
        }
    }

    if(asteroids.length !== 0){

        let count = 0;
        for(let s=0; s<asteroids.length; s++){
            if((asteroids[s].level == 1) || (asteroids[s].level == 2)){
                count = count + 1;
            }
        }

        if(count < Math.floor(3 + score / 1000)){
            asteroids.push(new Asteroid());
        }

        for(let j=0; j<asteroids.length; j++){
            asteroids[j].Update();
            asteroids[j].Rotate(asteroids[j].spin);
            asteroids[j].Draw(j);
        }
    }

    if(!music_toggle && !gameover){
        background_music.play();
        background_music.loop = true;
        music_toggle = true;
    }

    requestAnimationFrame(Render);
}

