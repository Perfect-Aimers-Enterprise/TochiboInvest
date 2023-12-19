const namesField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const genders = document.getElementsByName("gender");
const referralCodeField = document.getElementById("referralCode");
const registerForm = document.querySelector(".formCus1");
const url = "/Tchibo/v1/auth/register/sendOTP";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);


referralCodeField.value = params.get("refCode");


registerForm.addEventListener("submit", sendOTP);


async function sendOTP(e){
    e.preventDefault();
    const name = namesField.value;
    const email = emailField.value;
    const password = passwordField.value;
    const invitersRCode = referralCodeField.value;
    let gender;

    for(let i=0; i<genders.length; i++){
        if(genders[i].checked){
            gender = genders[i].value;
        }
    }

    let body = {
        name,
        email,
        password,
        gender,
        invitersRCode
    }

    body = JSON.stringify(body);

    try{
        const response = await fetch(url)
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body
        // })
        if (!response.ok) throw new Error("An error occured");
        const data = await response.json();
        const { id } = data;
        // window.location.href = `/OTP.html?id=${id}`;
    }
    catch(err){
        console.log(err);
    }



}