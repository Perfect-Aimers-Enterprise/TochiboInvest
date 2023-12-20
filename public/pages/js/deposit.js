const amountField = document.querySelector("#amount");
const accountField = document.querySelector("#ANum");
const depositBtn = document.querySelector(".depoBtn");
const wHistTable = document.querySelector(".dHistoryT");
const url1 = "/Tchibo/v1/transactions/deposit";
const url2 = "/Tchibo/v1/details/deposit";
const token = localStorage.getItem("token");


const submitWithdrawalForm = async()=>{
    const amount = amountField.value;
    const account = accountField.value;

    const date = Date.now();
    
    const body = {
        amount,
        accountNumber,
        accountName,
        bankName,
        date
    }
    
    console.log(body);

    try{
        console.log(body);
        const response = await fetch(url1, {
            method: "POST",
            headers:prepareHeaders(),
            body: JSON.stringify(body)
        });

        console.log(response);
    }
        catch(err){
            console.log(err);
        }

        await getDepositLog();

}


const getDepositLog = async ()=>{
    try{
        let response = await fetch("/Tchibo/v1/details/depositLog", {
                headers:prepareToken()
        });
        if (!response.ok) throw new Error("Internal Server Error");
        const details = await response.json();
        placeDetails(details);
    }
    catch(err){
        alert(err.message);
    }
}


const placeDetails = (details)=>{
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

withdrawBtn.addEventListener("click", submitWithdrawalForm);
getDepositLog();