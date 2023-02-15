console.log("Hello!");

var affirmationInterval = false;
var delayInSeconds = 10;
var countdownInSeconds = 10;
var sound;

function playSoundFile(url) {
    sound = new Audio(url);

    sound.addEventListener("canplaythrough", (event) => {
        console.log(`playing audio file: ${url}`);
        sound.play();
      });
    sound.play();
}

function affirmationUpdate() {
    var files = [
        'anticipation.mp3',
        'applause-01.mp3',
        'applause-02.mp3',
        'applause-03.mp3',
        'applause-04.mp3',
        'applause-05.mp3',
        // 'baseball-organ-01.mp3',
        // 'baseball-organ-02.mp3',
        // 'bronze-medal.mp3',
        'gold-medal.mp3',
        'high-score.mp3',
        'hole-in-one.mp3',
        // 'nice-approach.mp3',
        'nice-shot-01.mp3',
        // 'nice-shot-02.mp3',
        // 'nice-shot-03.mp3',
        'platinum-medal.mp3',
        'silver-medal.mp3'
    ];

    var progress = document.getElementById("progress");

    if (countdownInSeconds === 0) {
        // restart the counter
        delayInSeconds = Math.floor(Math.random() * (300 - 120) + 120);
        countdownInSeconds = delayInSeconds;
        progress.setAttribute('max', delayInSeconds);
        progress.setAttribute('value', delayInSeconds);

        var url = 'audio/' + files[files.length * Math.random() | 0];
        playSoundFile(url);
        
    }
    countdownInSeconds--;

    progress.setAttribute('value', countdownInSeconds);
    progress.innerHTML = `${countdownInSeconds} seconds`;
}


document.getElementById('on-off').onclick = function(e){
    var player = document.getElementById('player');
    var progress = document.getElementById("progress");
    if (player.dataset.status === 'disabled') {
        player.dataset.status = 'enabled';
        this.innerHTML = 'Stop';
        progress.innerHTML = 'Initializing...';
        playSoundFile("audio/opening.mp3");

        delayInSeconds = 10;
        countdownInSeconds = 10;
        progress.setAttribute('max', 10);
        progress.setAttribute('value', 10);
        affirmationInterval = window.setInterval(affirmationUpdate, 1000);

    } else {
        player.dataset.status = 'disabled';
        this.innerHTML = 'Start';
        if (affirmationInterval) {
            window.clearInterval(affirmationInterval);
            affirmationInterval = false;
            document.getElementById("progress").setAttribute('value', 0);
            delayInSeconds = 10;
            countdownInSeconds = 10;
        }
        progress.innerHTML = "None";
    }
  }
  