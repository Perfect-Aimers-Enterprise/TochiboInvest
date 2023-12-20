const container = document.querySelector('#box');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

// Initializer setup
 let currentItem = 0;
let allProducts = []

window.addEventListener('DOMContentLoaded', () => {
    fetchProductData()
});

const fetchProductData = async () => {
    try{
        const response = await fetch('/api/v1/products')
        const products = await response.json();


        allProducts = products
        .map((product) => {
            const {name, imgs, price, dailyIncome, days, totalIcome} = product
            return ` <div class="flex mx-auto mb-3 here font-bold border-blue-900 rounded-[12px] border-2 sm:w-[70%] p-3 active:bg-blue-900">

            <img class="image h-[90px]" src="${imgs}" alt="">
            <div class="border-blue-900 ">
        
                <h1 class="name">${name}</h1>
        
                <p>Price: <span><i class="fa-solid fa-naira-sign"></i></span><span class="price">${price}</span></p>
        
                <p>Daily Income: <i class="fa-solid fa-naira-sign"></i><span class="dIncome">${dailyIncome}</span></p>
        
                <p>Days: <span class="days">${days}</span></p>
        
                <p>Total Income: <i class="fa-solid fa-naira-sign"></i><span class="tIcome">${totalIcome}</span></p>
            </div>
        </div>
            `
        }).join('')


        container.innerHTML = allProducts

    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
};

// Event listener for next button
next.onclick = async () => {
    const firstElement = container.firstElementChild
    if(firstElement) {
        firstElement.style.display = 'none'
    }
    currentItem++;

    if (currentItem > allProducts.length - 1) {
        currentItem = 0;
        if(firstElement) {
            firstElement.style.display = 'block'
        }
    }
        if (allProducts.length > 0) {       
            // container.innerHTML = allProducts[currentItem]
        } else {
            console.log('no product available');
        }
};

// if (currentItem < allProducts.length) {
//     firstElement.innerHTML = allProducts[currentItem] 
// } else{
//     console.log('Invalid index:', currentItem);
// } 