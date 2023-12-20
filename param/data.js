let canvas;
let ctx;
let scale = 0.5;
let keys = [];
let ship;
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;
let gameover = false;
let frameOffset;
let heading_font_size;
let paragraph_font_size;
let lo1;
let lo2;
let lo3;
let newline_gap;

function SetParameters(){

    if(innerWidth >= 1024){
        frameOffset = 0.8;
        heading_font_size = 50;
        paragraph_font_size = 20;
        newline_gap = 50;
        lo1 = 0.375;
        lo2 = 0.292;
        lo3 = 0.333;
    }
    else{
        frameOffset = 0.9;
        heading_font_size = 20;
        paragraph_font_size = 12;
        newline_gap = 20;
        lo1 = 0.375;
        lo2 = 0.292 * 0.5;
        lo3 = 0.333 * 0.7;
    }
}