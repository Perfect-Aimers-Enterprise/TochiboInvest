const seconds = document.querySelector(".seconds");
const hideText = document.querySelector(".hideText");
const otpHolders = document.getElementsByClassName("otp");
const wrongOTP = document.querySelector(".wrongOTP");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const resendbtn = document.querySelector(".resendbtn");
const submitbtn = document.querySelector(".submitbtn");


const intervalId =setInterval(()=>{
    seconds.innerHTML--
    if(seconds.innerHTML==0){
        clearInterval(intervalId);
        hideText.style.display = "none";
    }
}, 1000);


const resendOTP = async ()=>{

    try{
        console.log(params.get("id"));
        
        const response = await fetch(`/Tchibo/v1/auth/register/resendOTP/${params.get("id")}`, {
            headers:{
                "Content-Type":"application/json"
            }
    });
    }
    catch(err){
        console.log(err)
    }
}

const submitOTP = async()=>{
    try{
        let otpText;

        for(let i=0; i<otpHolders.length; i++){
            if(i===0){
                otpText = otpHolders[i].value;
                continue;
            }
            otpText += otpHolders[i].value;
        }

        alert(otpText);

        let body = {
            id:params.get("id"),
            enteredOTP:otpText
        }

        body = JSON.stringify(body);

        const response = await fetch(`/Tchibo/v1/auth/register`, {
        method:"POST",
        body,
        headers:{
            "Content-Type":"application/json"
        }
        });

        if(response.ok){
        const { token } = await response.json();
        console.log(token);
        localStorage.setItem("token", token);
        window.location.href = "/";
        }
    }
   
    catch(err){
        console.log(err);
    }
}

resendbtn.addEventListener("click", resendOTP);
submitbtn.addEventListener("click", submitOTP);