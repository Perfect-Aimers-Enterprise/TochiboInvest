const referralCountHolder = document.querySelector(".referral_count");
const referralLink = document.querySelector(".ref-link");
const tA = document.querySelector(".tAt");
const tB = document.querySelector(".tBt");
const tC = document.querySelector(".tCt");
const noRefA = document.querySelector(".noRefA");
const noRefB = document.querySelector(".noRefB");
const noRefC = document.querySelector(".noRefC");

const getReferrals = async()=>{
    try{

        let response = await fetch("/Tchibo/v1/details/referrals", {
            headers:prepareToken()});
            if(!response.ok) throw new Error("An error occured");
        let details = await response.json();
        arrangeReferralData(details);

    }
    catch(err){
        console.log(err);
    }

}

const prepareToken = ()=>{
    const headers = new Headers();
    const token = localStorage.getItem("token");
    headers.append("Authorization", `Bearer ${token}`);
    return( headers);
}

getReferrals();

const arrangeReferralData = (details)=>{
    {
        /**For the referrals Count */
        referralCountHolder.innerHTML =  details.referralsCount;
    }

    {
        /**For the referral Link */
        referralLink.value = `iTochibo.com/login.html?refCode=${details.referralCode}`
    }

    {
        /** For referral Teams */
        const referrals = details.referrals;

        {
            /** For team A */
            const teamA = referrals.filter((referral)=>{
                return referral.Team==="A";
            });
            if(teamA.length===0){
                toggleIndicatorDisplay(noRefA);
            }
            else{
                const tBody = teamA.map((referral)=>{
                    return(
                        `<tr>
                             <td>${referral.email}</td>
                             <td>${referral.date}</td>
                             <td>$${referral.totalInvested}</td>
                         </tr>  `
                    )
                }).join("");
                tA.innerHTML = tBody;
            }

            
        }
        {
            /** For team B */
            const teamB = referrals.filter((referral)=>{
                return referral.Team==="B";
            });
            if(teamB.length===0){
                toggleIndicatorDisplay(noRefB);
            }
            else{
            const tBody = teamB.map((referral)=>{
                    return(
                        `<tr>
                             <td>${referral.email}</td>
                             <td>${referral.date}</td>
                             <td>$${referral.totalInvested}</td>
                         </tr>  `
                    )
            }).join("");
            tB.innerHTML = tBody;
        }

        }
        {
            /** For team C */
            const teamC = referrals.filter((referral)=>{
                return referral.Team==="C";
            });
            if(teamC.length===0){
                toggleIndicatorDisplay(noRefC);
            }
            else{
            const tBody = teamC.map((referral)=>{
                    return(
                        `<tr>
                             <td>${referral.email}</td>
                             <td>${referral.date}</td>
                             <td>$${referral.totalInvested}</td>
                         </tr>  `
                    )
            }).join("");
            tC.innerHTML = tBody;
        }
        }
    }

}

function toggleIndicatorDisplay(element){
    element.classList.toggle("d-none");
}