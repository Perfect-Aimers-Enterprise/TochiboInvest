const emoji = document.querySelector('.emoji');
const question = document.querySelector('.question')
const uglybtn = document.querySelector('.uglybtn')
const answer = document.querySelector('.answer')

const emo = '💸';
emoji.innerText = emo;

uglybtn.onclick = () => {
    window.location.href = 'products.html'
}


// fa-solid fa-down
// fa-solid fa-up