var song, analyzer;
var w;
var filter;

function preload(){
    song = loadSound('lifeisweak.mp3');
}

function setup(){
    createCanvas(0.75*windowWidth, 0.75*windowHeight,WEBGL);
    song.loop();
    fft = new p5.FFT(0.5,128);
    fft.setInput(song);
    analyzer = new p5.Amplitude();
    analyzer.setInput(song);
    w = width / 128;
}

function draw(){
    background(0);
    var spectrum = fft.analyze();
    var rms = analyzer.getLevel();
    translate(0,0,-1600);
    rotateX(-frameCount*0.001);
    scale(0.3,0.3,0.3);
    push();
        noFill();
        stroke(255);
        rotateY(-frameCount*0.01);
        sphere(3000+rms*800);
    pop();
    rotateY(frameCount*0.015);
    push();
        for(var i = 0; i < spectrum.length; i++){
            var amp = spectrum[i];
            var y = map(amp, 0, 255, 0, 11*height);
            fill(255);
            stroke(0);
            push();
                translate(2.6*i*w,0,0);
                box(w, y, 60);
            pop();
        }
    pop();
}

function pause(){
    if(song.isPlaying()){
        song.pause();
        document.getElementById("ppToggle").innerHTML = "&#9654;";
    }else{
        song.play();
        document.getElementById("ppToggle").innerHTML = "&#9724;";
    }
}

function windowResized() {
  resizeCanvas(0.75*windowWidth, 0.75*windowHeight);
}
