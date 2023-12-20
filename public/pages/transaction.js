const cancelwithdrawal = document.querySelector('.cancelwithdrawal')
const time = document.querySelector('.time')
const button = document.querySelector('.button')
const wName = document.querySelector('.wName')
const wAName = document.querySelector('.wAName')
const wANo = document.querySelector('.wANo')
const wBName = document.querySelector('.wBName')
const withdrawal = document.querySelector('#withdrawal')
const withdrawaldiv1 = document.querySelector('#withdrawaldiv1')
const withdrawContainer = document.querySelector('.withdrawContainer')
const letconfirmwithdrawal = document.querySelector('#letconfirmwithdrawal')


window.addEventListener('DOMContentLoaded', () => {
    getWithdrawalSection()
    getDepositeSection()
})

cancelwithdrawal.onclick = () => {
    withdrawal.style.display = 'none'
}
letconfirmwithdrawal.onclick = () => {
    withdrawal.style.display = 'block'
}

const getWithdrawalSection = async () => {
    try {
        const response = await fetch('/Tchibo/v1/details/withdrawalLog')
        const withdrawreqs = response.json()

        const allwithdrawreq = withdrawreqs
        .map((withdrawreq) => {
            const {time, wAName, wANo, wBName, wName} = withdrawreq
            return `
            <div>
                <div class="T-confirm">
                    <p class="time">${time}</p>
                    <button class="button">
                        confirm
                    </button>
                </div>
                <div class="withdrawalbody">
                    <p class="wName">${wName}</p>
                    <p class="wAName">${wAName}</p>
                    <p class="wANo">${wANo}</p>
                    <p class="wBName">${wBName}</p>
                </div>

                <div class="underlinethrough"></div>
                </div>
            `
        }).join('')
        allwithdrawreq.innerHTML = withdrawContainer
        console.log(allwithdrawreq.innerHTML);
    } catch (error) {
        prompt('There is an error with getting the withdrawal route', error)
    }
}



const canceldeposite = document.querySelector('.canceldeposite')
const deposite = document.querySelector('#deposite')
const depositediv1 = document.querySelector('#depositediv1')
const depositeContainer = document.querySelector('.depositeContainer')
const letconfirmdeposite = document.querySelector('#letconfirmdeposite')


canceldeposite.onclick = () => {
    deposite.style.display = 'none'
}
letconfirmdeposite.onclick = () => [
    deposite.style.display = 'block'
]

const getDepositeSection = async () => {
    try {
        const response = await fetch('/Tchibo/v1/details/depositLog')
        const deposites = response.json()

        const alldeposites = deposites
        .map((deposite) => {
            const {time, wAName, wANo, wBName, wName} = deposite
            return `
            <div>
                <div class="T-confirm">
                    <p class="time">${time}</p>
                    <button class="button">
                        confirm
                    </button>
                </div>
                <div class="withdrawalbody">
                    <p class="wName">${wName}</p>
                    <p class="wAName">${wAName}</p>
                    <p class="wANo">${wANo}</p>
                    <p class="wBName">${wBName}</p>
                </div>

                <div class="underlinethrough"></div>
                </div>
            `
        }).join('')
        alldeposites.innerHTML = depositeContainerawContainer
        console.log(alldeposites.innerHTML);
    } catch (error) {
        prompt('There is an error with getting the deposite route', error)
    }
}