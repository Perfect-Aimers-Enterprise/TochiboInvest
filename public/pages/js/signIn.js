const emailField = document.getElementById("email1");
const passwordField = document.getElementById("password");
const closebtn = document.querySelector(".close404");
const loginForm = document.getElementById("formL");
const loginUrl = "/Tchibo/v1/auth/login";
const loader = document.querySelector(".loader");
const modal404 = document.querySelector(".notFound");


loginForm.addEventListener("submit", async (e)=>{
    toggleIndicate404(loader);
    e.preventDefault();
    const email = emailField.value;
    const password = passwordField.value;
    const details = {
        email,
        password
    };
    await login(details);
    toggleIndicate404(loader);
});

const login = async (details)=>{
    try {
        let response = await fetch(loginUrl,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(details)
        });
        if(response.status===404) return(toggleIndicate404(modal404));
        if(!response.ok) throw new Error("An error occured");
        console.log(response);
        response = await response.json();
        console.log(response);
        const { token } = response;
        localStorage.setItem("token", token);
        console.log("Token saved");
        console.log(response);
        window.location.href = "/";

    } catch (error) {
        console.log(error);
        alert("An error occured");
    }
}


closebtn.addEventListener("click", ()=>{
    toggleIndicate404(modal404);
});

function toggleIndicate404(element){
    element.classList.toggle("d-none");
}