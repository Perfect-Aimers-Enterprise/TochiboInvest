{
    
/** Sign out Modals */  
    
const modalDismissers = document.querySelectorAll('[data-om-dismiss="modal"]');
const modalDismissersN = modalDismissers.length;
console.log(modalDismissersN);

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