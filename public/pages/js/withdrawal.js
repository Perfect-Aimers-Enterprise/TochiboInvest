const amountField = document.querySelector("#amount");
const ANumField = document.querySelector("#ANum");
const ANameField = document.querySelector("#ANam");
const BNameField = document.querySelector("#BNam");
const withdrawForm = document.querySelector(".withdrawal-form");
const wHistTable = document.querySelector(".wHistoryT");
const noWith = document.querySelector(".noWith");
const closeWithBtn = document.querySelector(".closeWithdrawalBox");
const withModal = document.querySelector(".loader .content");
const loader = document.querySelector(".loader");
const loaderImg = document.querySelector(".loader-img");
const url1 = "/Tchibo/v1/transactions/reqWithdrawal";
const url2 = "/Tchibo/v1/auth/login";
const contentHolder = document.querySelector(".invisibleHolder");
const token = localStorage.getItem("token");
const now = new Date();
const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: "short"
};



const submitWithdrawalForm = async(e)=>{

    e.preventDefault();

    loader.classList.remove("d-none");
    loaderImg.classList.remove("d-none");

    const amount = amountField.value;
    const accountNumber = ANumField.value;
    const accountName = ANameField.value;
    const bankName = BNameField.value;
    const date = now.toLocaleString('en-US', dateOptions);


    
    const body = {
        amount,
        accountNumber,
        accountName,
        bankName,
        date
    }
    

    try{
        const response = await fetch(url1, {
            method: "POST",
            headers:prepareHeaders(),
            body: JSON.stringify(body)
        });

        await getWithdrawalLog();
        loaderImg.classList.add("d-none");
        withModal.classList.remove("d-none");


    }
        catch(err){
            loader.classList.add("d-none");
            alert("An error occured");
        }


}


const getWithdrawalLog = async ()=>{
    try{
        let response = await fetch("/Tchibo/v1/details/withdrawalLog", {
                headers:prepareToken() 
        });
        if(response.status===401){
            window.location.href = "/login.html";
            return;
        }
        if (!response.ok) throw new Error("Internal Server Error");
        const details = await response.json();
        placeDetails(details);
        contentHolder.classList.remove("d-none");
        // console.log("hello")
    }
    catch(err){
        alert(err.message);
    }
}


const placeDetails = (details)=>{

    if(details.length===0){
        console.log(details.length)
        return noWith.classList.remove("d-none")
    }

    noWith.classList.add("d-none");

    const wHistory = details.map((withdrawal, index)=>{
        return (
        `<tr>
            <td>${index+1}</td>
            <td>${withdrawal.amount}</td>
            <td>${withdrawal.bankName}</td>
            <td>${withdrawal.accountName}</td>
            <td>${withdrawal.accountNumber}</td>
            <td>${withdrawal.status}</td>
            <td>${withdrawal.date}</td>
        </tr>`
        )
    }).join("");
    wHistTable.innerHTML = wHistory;
}

const prepareHeaders = ()=>{
    const headers = new Headers();
    console.log(token);
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    return( headers);
}
const prepareToken = ()=>{
    const headers = new Headers();
    console.log(token);
    headers.append("Authorization", `Bearer ${token}`);
    return( headers);
}

withdrawForm.addEventListener("submit", submitWithdrawalForm);
closeWithBtn.addEventListener("click", ()=>{
    loader.classList.add("d-none");
})



getWithdrawalLog().then(()=>{loader.classList.add("d-none")});
