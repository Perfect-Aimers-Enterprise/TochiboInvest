const namesField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const genders = document.getElementsByName("gender");
const referralCodeField = document.getElementById("referralCode");
const registerForm = document.querySelector(".formCus1");
const url = "/Tchibo/v1/auth/register/sendOTP";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const loader = document.querySelector(".loader.full");
const alreadyTaken = document.querySelector(".alreadyTaken");


referralCodeField.value = params.get("refCode");


registerForm.addEventListener("submit", sendOTP);


async function sendOTP(e){
    loader.classList.toggle("d-none");

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
        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body
        })

        const data = await response.json();

        if(response.status===409) {
            alreadyTaken.classList.remove("d-none"); 
            setTimeout(() => {
                alreadyTaken.classList.add("d-none");
            }, 3000);
        }

        else if(!response.ok){
            throw new Error("An error occured");
        }

        else if(response.ok && data.msg==="An email of a pending user"){
        const { id } = data;
        const response = await resendOTP(id);
        if(!response.ok) throw new Error("An error occured");
        loader.classList.remove("d-none");
        window.location.href = `/OTP.html?id=${id}`;

        }
 
        else if(response.ok){
        const { id } = data;
        loader.classList.toggle("d-none");
        window.location.href = `/OTP.html?id=${id}`;
        }

        else{
            throw new Error("An error occured");
        }
        // loader.classList.toggle("d-none");
        }

    catch(err){
        // console.log(err)
        loader.classList.toggle("d-none");
        alert("Internal Server Error");
    }
}


const resendOTP = async (id)=>{

    try{
        
        const response = await fetch(`/Tchibo/v1/auth/register/resendOTP/${id}`, {
            headers:{
                "Content-Type":"application/json"
            }
    });
    return response;
    }
    catch(err){
        console.log(err)
    }
}