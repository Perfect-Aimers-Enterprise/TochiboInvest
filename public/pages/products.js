document.addEventListener('load', () => {
    const purchaseBtn = document.querySelector('.purchaseBtn');
    const purchaseDiv = document.querySelector('.purchaseDiv');
   
    // console.log('button oo');
    // purchaseBtn.addEventListener('click', () => {
    //     purchaseBtn.textContent = 'Confirmed';
    // });

    purchaseDiv.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('purchaseBtn')) {
            
            target.textContent = 'Confirmed';
        }
    });
    
});
const emoji = document.querySelector('.emoji');
const emo = '💸';
emoji.innerText = emo;