((window)=>{

    let timerClock = document.getElementById('timerClock');
    let setTimerMenu = document.getElementById('setTimerMenu');
    let playAndPause = document.getElementById('playAndPause');
    let lastTimeClock = document.getElementById('lastTimeClock');
    let lastTimeClockText = document.createTextNode('00:00');

    let playIcon = new Image();
    let pauseIcon = new Image();

    playIcon.src = 'play.png';
    pauseIcon.src = 'pause.png';

    let audio = new Audio();

    audio.loaded = false; // default
    audio.src = 'song.mp3';

    audio.onload = () => {
        audio.loaded = true;
    }

    lastTimeClock.appendChild(lastTimeClockText);

    let interval = setInterval(()=>{}, 1000);

    function playSong() {
        
        if (audio.loaded) {

            audio.currentTime = 2;
            audio.volume = 0.5;
            audio.play();

        } else {

            setInterval(function(){
    
                if (audio.loaded) {
                    playSong();
                    clearInterval(this);
                }
    
            }, 250);

        }

    }

    let timer = {
        clock: {
            minutes: 0,
            seconds: 0
        },
        pause: () => {
            clearInterval(interval);
            timer.isPause = true;
            playAndPause.removeChild(playAndPause.children[0]);
            playAndPause.appendChild(playIcon);
        },
        play: () => {

            if (timer.clock.minutes <= 0) {
                setTimerMenu.style.animation = 'fadeIN linear 0.2s';
                setTimerMenu.style.display = 'flex';
                return;
            }

            lastTimeClock.style.animation = 'fadeOUT linear 0.2s';
            
            setTimeout(()=>{
                lastTimeClock.style.display = 'none';
            }, 190);

            interval = setInterval(()=>{
                    
                if (timer.clock.seconds - 1 > 0) {
                    timer.clock.seconds--;
                } else if (timer.clock.minutes - 1 >= 0) {
                    timer.clock.minutes--;
                    timer.clock.seconds = 59;
                } else {

                    playSong();
    
                    clearInterval(interval);

                    timer.clock.seconds = 0;
                    timer.clock.minutes = 0;

                    playAndPause.removeChild(playAndPause.children[0]);
                    playAndPause.appendChild(pauseIcon);

                    let currentDate = new Date();
                    
                    lastTimeClockText.textContent = (currentDate.getHours() >= 10 ? currentDate.getHours() : '0' + currentDate.getHours()) + ':' + (currentDate.getMinutes() >= 10 ? currentDate.getMinutes() : '0' + currentDate.getMinutes());
                    
                    lastTimeClock.style.animation = 'fadeIN linear 0.3s';
                    lastTimeClock.style.display = 'flex';
                
                }

                timerClock.children[0].innerText = timer.clock.minutes >= 10 ? timer.clock.minutes : '0' + timer.clock.minutes;
                timerClock.children[1].innerText = timer.clock.seconds >= 10 ? timer.clock.seconds : '0' + timer.clock.seconds;
        
            }, 1000);

            timer.isPause = false;
            playAndPause.removeChild(playAndPause.children[0]);
            playAndPause.appendChild(pauseIcon);

        },
        isPause: true // default
    }

    function setTimerClock(time) {
        timer.pause();
        timer.clock.seconds = 0;
        timer.clock.minutes = time;
        timerClock.children[0].innerText = time;
        timerClock.children[1].innerText = '00';
    }

    for (let i=0; i<setTimerMenu.children[0].children.length; i++) {
        setTimerMenu.children[0].children[i].onclick = () => {
            setTimerClock(parseInt(setTimerMenu.children[0].children[i].innerText, 10));
            setTimerMenu.style.animation = 'fadeOUT linear 0.2s';
            setTimeout(()=>{
                setTimerMenu.style.display = 'none';
            }, 190);
        }
    }

    timerClock.onclick = () => {
        setTimerMenu.style.animation = 'fadeIN linear 0.2s';
        setTimerMenu.style.display = 'flex';
    }

    playAndPause.onclick = () => {

        if (timer.isPause) {
            timer.play();
        } else {
            timer.pause();
        }

    }

})(window);