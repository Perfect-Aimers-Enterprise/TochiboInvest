// function setup
// const review = null;
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
    try {
        console.log("first");
    
        const response = await fetch('/api/v1/products')
        console.log("here");
        // console.log(response);
        const products = await response.json();
        console.log(products);
        console.log(products);
        // return products


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
        console.log(container.innerHTML);

    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
};

// Event listener for next button
next.onclick = async () => {
    container.firstElementChild.remove();
    currentItem++;
    if (currentItem > allProducts.length - 1) {
        currentItem = 0;
    }

        const newProduct = document.createElement('div');
        newProduct.className = "flex mx-auto mb-3 here font-bold border-blue-900 rounded-[12px] border-2 sm:w-[70%] p-3 active:bg-blue-900";
        // newProduct.innerHTML = allProducts[currentItem]

        // container.appendChild(newProduct)
        if (allProducts > 0) {
            newProduct.innerHTML = allProducts[currentItem]
            container.append(newProduct)   
        } else {
            console.log('no product available');
        }

    // fetchProductData();
};

// fetchProductData();