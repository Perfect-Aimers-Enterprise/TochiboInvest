const checkWithBtn = document.getElementById("letconfirmwithdrawal");
const withContainer = document.querySelector(".withdrawContainer");

checkWithBtn.addEventListener("click", viewWithdrawals);

alert("Hi");

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
    const { date, email, accountName, accountNumber, bankName, amount, _id } = element;

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
                    data-id=${_id}
                </div>

                <div class="underlinethrough"></div>
            </div>
        `
    )
    }).join("");

   withContainer.innerHTML = withReqs; 

}