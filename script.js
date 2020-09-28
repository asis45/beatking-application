// JavaScript source code


class DrumKit {
    constructor() {
        this.play_btn = document.querySelector(".play");  
        this.pads = document.querySelectorAll(".pads");
        this.kickAudio = document.getElementById("kick-sound");
        this.snareAudio = document.querySelector("#snare-sound");
        this.hihatAudio = document.querySelector("#hihat-sound");

        this.selects = document.querySelectorAll("select");
        this.index = 1;
        this.bpm = 500;  //beats per minute
        this.isPlaying = null;
    }

    active() {
        this.classList.toggle("active");
    }

    changeSound(e) {
        const selectionName = e.target.name;
        const selectValue = e.target.value;
        switch(selectionName){

            case "kick-select":
                this.kickAudio.src = selectValue;
                break;

            case "snare-select":
                this.snareAudio.src = selectValue;
                break;

            case "hihat-select":
                this.hihatAudio.src = selectValue;
                break;

        }
        
    }

    repeat() {
        let step = (this.index-1) % 8;
       // console.log(step);

       // console.log(this.pads);

       const curBars = document.querySelectorAll(`.a${step + 1}`);
       //console.log(activeBars);
       curBars.forEach((bar) => {
           bar.style.animation = 'my-animation 0.2s alternate ease 2'; 
           
           if (bar.classList.contains("active")) {
              

               if (bar.classList.contains("kick-pad")  && arr[0]===0) {  //play if kick mute off
                   this.kickAudio.currentTime = 0;
                   this.kickAudio.play();

               }

               if (bar.classList.contains("snare-pad")  && arr[1]===0) {  //play if snare mute off
                   this.snareAudio.currentTime = 0;
                   this.snareAudio.play();

               }

               if (bar.classList.contains("hihat-pad") && arr[2]===0 ) { //play if hihat mute off
                   this.hihatAudio.currentTime = 0;
                   this.hihatAudio.play();

               }

           }

      });

        this.index++;
    }

    start() {

        if (!this.isPlaying) {
            let interval = (60 * 1000) / this.bpm;  //time lag betwwen every beat
            this.isPlaying=setInterval(() => {    //using arrow function as using general fn will change context to window
                this.repeat();
            }, 1000);  //function exec then takes interval of x sec then again fn exe.
        }
        else {

            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }


    updateBtn() {

        if (this.isPlaying) {  
            this.play_btn.innerHTML = "Play";
        }
        else {
            this.play_btn.innerHTML = "Stop";
        }
    }
}
const drumkit = new DrumKit();



drumkit.play_btn.addEventListener("click", function () {

    //drumkit.kickAudio.play();
    console.log(this); //this is play button in normal func here checked //this is window in arrow fn
    drumkit.updateBtn();
    drumkit.start();
});


drumkit.pads.forEach((pad) => {
    pad.addEventListener("click", drumkit.active);  //adding event listener to all the pads to create sound when actiavted
    pad.addEventListener("animationend", function () {
      this.style.animation = "";
    });
});





const mute = document.querySelectorAll(".mute");
console.log(mute);

let arr = [0, 0, 0];  //representing three mute buttons for kcik , snare and hihat in off mode initially

mute.forEach(function(btn){

    btn.addEventListener("click", ( ) => {

        let i;
        switch (btn.id) {
        
            case "m-kick":
                i = 0;
                break;

            case "m-snare":
                i = 1;
                break;

            case "m-hihat":
                i = 2;
    }
        arr[i] = 1 - arr[i];

        if (arr[i] === 1) { //mute on
            btn.style.opacity = 0.5;
        }
        else {
            btn.style.opacity = "";
        }

    });
});




drumkit.selects.forEach((select) => {

    select.addEventListener("change", function (e) {
        drumkit.changeSound(e);

    });
});