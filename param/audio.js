let music_toggle = false;
let press_sound = document.createElement("audio");
let damage_sound = document.createElement("audio");
let background_music = document.createElement("audio");

press_sound.src = "src/ButtonClick.wav";
damage_sound.src = "src/ShipBreakdown.wav";
background_music.src = "src/Asteroidz.mp3";

background_music.volume = 0.8;
press_sound.volume = 0.8;
damage_sound.volume = 0.8;