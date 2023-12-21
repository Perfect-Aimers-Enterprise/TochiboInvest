const initials = document.querySelector(".nLetters");
const fuName = document.querySelector(".name-detail");
const emailHolder = document.querySelector(".email-detail");
const referralCodeHolder = document.querySelector(".referral-code");
const fsTotal = document.querySelector(".fs-total");
const fsInvest = document.querySelector(".fs-invest");
const fsAvail = document.querySelector(".fs-avail");
const pCount = document.querySelector(".fs-pCount");
const referralsInfo = document.querySelector(".referralsInfo");
const loader = document.querySelector(".loader");
const noRef = document.querySelector(".noRef");
const fiName = document.querySelector(".fiName");
const bodyContent = document.querySelector(".invisibleHolder");
const headers = new Headers();


/** Insert Ui helper here */

const getDetails = async ()=>{
    try{
        prepareToken();
        const response = await fetch("/Tchibo/v1/details/dashboard", {
            headers
        });

        if(response.status===401){
            window.location.href = "/login.html";
            return;
        }


        const details = await response.json();
        const result = prepareDetails(details);
        console.log("continue")
        toggleIndicatorDisplay(loader);
        bodyContent.classList.remove("d-none");
    }
    catch(err){
        console.log("ere")
        toggleIndicatorDisplay(loader);

        console.log(err);
        alert("An an error occured");
    }

}

const prepareToken = ()=>{
    const token = localStorage.getItem("token");
    headers.append("Authorization", `Bearer ${token}`);
}

const prepareDetails = (details)=>{
    const { fs, user, recentReferrals } = details;

    {
        /** For the names initials */
        let names = user.name.split(" ");
        names = names.map((name, index)=>{
            if(index===0){
                fiName.innerHTML = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            }
            return name[0]
        });
        names = names.join("");
        initials.innerHTML = names;

    }
    
    {
        /** For the Account Credentials */
        const { name, email, referralCode } = user;
        console.log(name);
        fuName.innerHTML = name;
        emailHolder.innerHTML = email;
        referralCodeHolder.innerHTML = referralCode;
    }

    {
        /** For the financial Summary */
        const { PurchaseCount, availableFunds, totalInvested } = fs;
        fsTotal.innerHTML = availableFunds + totalInvested;
        fsAvail.innerHTML = availableFunds;
        fsInvest.innerHTML = totalInvested;
        pCount.innerHTML = PurchaseCount;
    }

    {
        /** For referrals tables */
        if(recentReferrals){  /** If there referrals */
            
            let referrals = recentReferrals.filter((referral)=>{return referral!==null}).map((referral, index)=>{ console.log(referral);
                return (
                    ` <tr>
                        <td>${index+1}</td>
                        <td>${referral.email}</td>
                        <td>${referral.Team}</td>
                        <td>${referral.date}</td>
                        <td>${referral.totalInvested}</td>
                    </tr>`
                )
                }).join("");
            referralsInfo.innerHTML = referrals;
            return;
        }

        /** If no referrals */
        toggleIndicatorDisplay(noRef);

    }
    
}

function toggleIndicatorDisplay(element){
    element.classList.toggle("d-none");
}

getDetails();   