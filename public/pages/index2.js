const container = document.querySelector('#box');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
let point = 0;

// Initializer setup
 let currentItem = 0;
let allProducts = []

window.addEventListener('DOMContentLoaded', () => {
    fetchProductData().then(() => {
        slideProducts();
        attachEventListeners()
    })
    

});

const fetchProductData = async () => {
    try{
        const response = await fetch('/api/v1/products')
        const products = await response.json();


        allProducts = products
        .map((product) => {
            const {name, imgs, price, dailyIncome, days, totalIcome} = product
            return ` <div class="flex mx-auto mb-3 here font-bold border-blue-900 rounded-[12px] border-2 sm:w-[70%] p-3 active:bg-blue-900">
            <div class="flex justify-between middlediv">
                <img class="image h-[90px]" src="${imgs}" alt="">
                    <div class="flex text-center bg-blue-900 purchaseDiv">
                        <button class="purchaseBtn">Purchase</button>
                    </div>
                </div>
            <div class="border-blue-900 ">
        
                <h1 class="name">${name}</h1>
        
                <p>Price: <span><i class="fa-solid fa-naira-sign"></i></span><span class="price">${price}</span></p>
        
                <p>Daily Income: <i class="fa-solid fa-naira-sign"></i><span class="dIncome">${dailyIncome}</span></p>
        
                <p>Days: <span class="days">${days}</span></p>
        
                <p>Total Income: <i class="fa-solid fa-naira-sign"></i><span class="tIcome">${totalIcome}</span></p>
            </div>
        </div>
            `
        });
        // console.log(allProducts);

        // container.innerHTML = allProducts

    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
};

slideProducts = ()=>{
    console.log("here");
    let tempArray = [];

    for(let i=0; i<3; i++){
        let position = point + i
        if(position>allProducts.length-1){
            position = 0
            point = 0
        }
        console.log(position);
        tempArray.push(allProducts[position]);
    }
    point++;

    let content = tempArray.join("");
    container.innerHTML = content;

}
next.onclick = slideProducts;

const attachEventListeners = () => {
    const container = document.querySelector('#box');

    if (container) {
        container.addEventListener('click', (e) => {
            const target = e.target;

            // Check if the clicked element has the class 'purchaseBtn'
            if (target.classList.contains('purchaseBtn')) {
                // target.textContent = 'Confirmed';
                if (target.textContent === 'Purchase') {
                    target.textContent = 'Confirm'
                }else{
                    window.location.href = 'psuccessful.html'
                }
            }
        });
    } else {
        console.error('#box element not found');
    }
};


    