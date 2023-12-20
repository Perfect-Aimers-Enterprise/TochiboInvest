const canceldeposite = document.querySelector('.canceldeposite')
const time = document.querySelector('.time')
const button = document.querySelector('.button')
const wName = document.querySelector('.wName')
const wAName = document.querySelector('.wAName')
const wANo = document.querySelector('.wANo')
const wBName = document.querySelector('.wBName')
const deposite = document.querySelector('#deposite')
const depositediv1 = document.querySelector('#depositediv1')
const depositeContainer = document.querySelector('.depositeContainer')
const letconfirmdeposite = document.querySelector('#letconfirmdeposite')

// /Tchibo/v1/details/depositLog

canceldeposite.onclick = () => {
    deposite.style.display = 'none'
}