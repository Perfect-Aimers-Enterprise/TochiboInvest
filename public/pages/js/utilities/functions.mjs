const initializeCloseBtns = ()=>{
    const closeBtns = document.querySelectorAll('[data-om-close]');
    for(let i = 0; i<closeBtns.length; i++){
        closeBtns[i].addEventListener("click", ()=>{
            closeBtns[i].parent.classList.add("d-none");
        })
    }
}

export { initializeCloseBtns };