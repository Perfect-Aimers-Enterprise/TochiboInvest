{
    
/** Sign out Modals */  
    
const modalDismissers = document.querySelectorAll('[data-om-dismiss="modal"]');
const modalDismissersN = modalDismissers.length;

for(let n=0; n<modalDismissersN; n++){
    modalDismissers[n].addEventListener("click", ()=>{
        let dismisser = modalDismissers[n];
        let parent = dismisser.parentElement;

        while(!parent.classList.contains("cLogOutModalWarn")){
            parent = parent.parentElement;
            console.log(parent);
        }
           parent.style.display = "none";
           document.getElementsByClassName("modal-backdrop")[0].remove();
    
    }

    )
}

}

/** For the navbar */

{
    const navBarHider = document.querySelector(".hideNavbar");
    const navConatiner = document.querySelector(".navContainer");
    const bodyOverlay = document.querySelector(".bodyOverlay");
    navBarHider.addEventListener("click", ()=>{
        navConatiner.classList.toggle("moveLeft");
        bodyOverlay.classList.toggle("bodyOverlayAction");
        bodyOverlay.classList.toggle("d-none");

    })

    const showMenuIcon = document.querySelector(".showMenu");
    showMenuIcon.addEventListener("click", ()=>{
        navConatiner.classList.toggle("moveLeft");
        bodyOverlay.classList.toggle("bodyOverlayAction");
        bodyOverlay.classList.toggle("d-none");
    })

}

