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
const letconfirmwithdrawal = document.querySelector('#letconfirmwithdrawal');
const loader = document.querySelector("div.loader");
const loaderImg = document.querySelector(".loader .loader-img");
const sucIndicate = document.querySelector(".loader .content");


window.addEventListener('DOMContentLoaded', async () => {
    try{

        await getWithdrawalSection();
        await getDepositeSection();
        sucIndicate.classList.remove("d-none");
    }
    catch(err){
        alert("An error occured");
    }
})

cancelwithdrawal.onclick = () => {
    withdrawal.style.display = 'none'
}
letconfirmwithdrawal.onclick = () => {
    withdrawal.style.display = 'block'
}

const getWithdrawalSection = async () => {
    try {
        const response = await fetch("/Tchibo/v1/admin/details/allPendingwithdrawalLogs")
        const withdrawreqs = await response.json()

        const allwithdrawreq = withdrawreqs
        .map((element)=>{
    const { date, email, accountName, accountNumber, bankName, amount, _id, userID } = element;
    console.log(_id);
    console.log(userID);
    console.log(element);
    return(
        `
            <div>
                <div class="T-confirm">
                    <p class="time">${date}</p>
                    <button class="button" data-requestID="${_id}" data-userID="${userID}">
                        confirm
                    </button>
                </div>
                <div class="withdrawalbody" >
                    <p class="wName">${email}</p>
                    <p class="wAName">${accountName}</p>
                    <p class="wName">${amount}</p>
                    <p class="wANo">${accountNumber}</p>
                    <p class="wBName">${bankName}</p>
                </div>

                <div class="underlinethrough"></div>
            </div>
        `
    )
    }).join('')
        withdrawContainer.innerHTML = allwithdrawreq;
        assignEventListeners();

    } catch (error) {
        console.log('There is an error with getting the withdrawal route', error);
    }
}

function assignEventListeners(){
    loader.classList.remove("d-none");
    loader.classList.remove("d-none");
    const confirmBtns = document.querySelectorAll(".withdrawContainer .button")
    for(let i=0; i<confirmBtns.length; i++){
        confirmBtns[i].addEventListener("click", confirmWithReq);
    }
}

async function confirmWithReq(e){

    console.log(e.target)
    const requestID = e.target.getAttribute("data-requestid");
    const userID = e.target.getAttribute("data-userid");
    console.log(requestID, userID);
    const body = JSON.stringify(
        {
            requestID,
            userID
        })
    console.log(body);

    const response = await fetch("/Tchibo/v1/admin/transactions/confirmWithdrawal", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body
    })

    return response;
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
        console.log('There is an error with getting the deposite route', error);
    }
}



/*
async function viewWithdrawals(){
    try{
        const response = await fetch("/Tchibo/v1/admin/details/allPendingwithdrawalLogs");
        const data = await response.json();
        console.log(data);
        placeDetails(data);
    }
    catch(err){
        alert("An error occured")
        console.log(err)
    }
}

function placeDetails(data){


    const withReqs = data.map((element)=>{
    const { date, email, accountName, accountNumber, bankName, amount } = element;

    return(
        `
            <div>
                <div class="T-confirm">
                    <p class="time">${date}</p>
                    <button class="button">
                        confirm
                    </button>
                </div>
                <div class="withdrawalbody">
                    <p class="wName">${email}</p>
                    <p class="wAName">${accountName}</p>
                    <p class="wName">${amount}</p>
                    <p class="wANo">${accountNumber}</p>
                    <p class="wBName">${bankName}</p>
                </div>

                <div class="underlinethrough"></div>
            </div>
        `
    )
    }).join("");

   withContainer.innerHTML = withReqs; 

}

*/