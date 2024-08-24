let charIndex = incorrect = 0;
let mistakeCounter = 0;
let maxTime = 2;
let count = 2;
let timer = 0;
let executeOnce = false;

//default light mode
const toggleDarkMode = () => {
    navBtn.classList.toggle('btn-nav-dark');
    htmlBody.classList.toggle('dark');
    navBar.classList.toggle('topnav-dark');
    topStatus.classList.toggle('top-dark');
    Btndark.classList.toggle('btn-dark-mode');
    btn.classList.toggle('btn-reload-dark');
    modalContent.classList.toggle('modal-content-dark');
    modalFooter.classList.toggle('modal-footer-dark');
    resultTop.classList.toggle('result-top-dark');
    resultBottom.classList.toggle('result-body-bottom-dark');
    resultWPMDiv.classList.toggle('result-body-wpm-dark');
    resultTryAgain.classList.toggle('btn-again-dark');
}

toggleDarkMode();
//dark mode
darkMode.addEventListener('click', () => {
    toggleDarkMode();
})

mistakes.innerText = '--';
wpmTag.innerText = `--`;
secs.innerHTML = `Time: <b class="span-c">60s</b>`;
const defaultView = () => {

    for (let i = 0; i < 80; i++) {
        let rand = Math.floor(Math.random() * wordList.length);
        let createDiv = document.createElement('div');
        createDiv.classList.add('word');
        words.appendChild(createDiv);
        wordList[rand].split('').forEach(elem => {
            let spanTag = `<span>${elem}</span>`;
            createDiv.innerHTML += spanTag;
            words.querySelectorAll('span')[0].classList.add('active');
        })
    }
}

defaultView();
const blur = () => {
    blurWindow.classList.remove('add-blur');
    blurWindowText.classList.add('hidden');
    btn.classList.remove('hidden');
    blurWindow.removeEventListener('click', blur);
}

const initTyping = () => {
    const characters = words.querySelectorAll('span');
    let userInput = inputText.value.split("")[charIndex];
    if (count > 0 && charIndex < characters.length - 1) {

        if (!executeOnce) {
            timer = setInterval(timerFunc, 1000);
            executeOnce = true;
        }
        if (userInput == null) {
            charIndex--;
            if (characters[charIndex].classList.contains('incorrect')) {
                incorrect--;
            }
            characters[charIndex].classList.remove('correct', 'incorrect');
        } else {

            if (characters[charIndex].innerText === userInput) {
                characters[charIndex].classList.add('correct');
            } else {
                incorrect++;
                mistakeCounter++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove('active'));
        characters[charIndex].classList.add('active');
        mistakes.innerText = incorrect;
        Rmistake.innerText = incorrect;
        RkeyStroke.innerText = charIndex;
        let calcCPM = charIndex - mistakeCounter;
        Rcpm.innerText = calcCPM;
        Rwrong.innerText = mistakeCounter;
        let calcWPM = Math.round(((charIndex - incorrect) / 5) / (maxTime - count) * 60);
        let calcAccuracy = Math.round(((charIndex - mistakeCounter) / charIndex) * 100);
        Raccuracy.innerText = `${calcAccuracy}%`;
        if (calcAccuracy < 25) {
            RaccuracyDiv.style.background = '#ff3d5d39';
            Raccuracy.innerHTML = `${calcAccuracy}% <span class="text-danger">(Accuracy is very low!)</span>`;
        }
        if (calcWPM < 0 || !calcWPM || calcWPM === Infinity) {
            wpmTag.innerText = 0;
        }
    } else {
        setTimeout(() => {
            mainWindow.classList.add('hidden');
            result.classList.remove('hidden');
        }, 2000);
        clearInterval(timer);
    }
}
const timerFunc = () => {
    if (count > 0) {
        count--;
        secs.innerHTML = `Time Left: <b class="span-c">${count}s</b>`;
        calcWPM = Math.round(((charIndex - incorrect) / 5) / (maxTime - count) * 60);
        wpmTag.innerText = calcWPM;
        Rwpm.innerText = calcWPM;
    } else {
        clearInterval(timer);
        secs.innerHTML = '<b class="span-c">Time\'s up!</b>';
    }
}
btn.addEventListener('click', () => {
    words.innerHTML = "";
    defaultView();
    inputText.value = "";
    wpmTag.innerText = `--`;
    mistakes.innerText = `--`;
    clearInterval(timer);
    charIndex = incorrect = 0;
    mistakeCounter = 0;
    maxTime = 60;
    count = 60;
    timer = 0;
    executeOnce = false;
    secs.innerHTML = count;
    secs.innerHTML = `Time Left: <b class="span-c">${count}s</b>`;
})
blurWindow.addEventListener('click', blur);
document.addEventListener('keydown', () => inputText.focus())
interface.addEventListener('click', () => inputText.focus())
inputText.addEventListener('input', initTyping);
tryAgain.addEventListener('click', () => location.reload());