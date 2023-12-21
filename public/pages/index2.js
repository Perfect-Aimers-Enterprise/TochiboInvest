const container = document.querySelector('#box');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
let point = 0;

// Initializer setup
 let currentItem = 0;
let allProducts = []

window.addEventListener('DOMContentLoaded', () => {
    fetchProductData().then(slideProducts);

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

    
    // purchaseBtn.value = 'Confirm'


// Event listener for next button
// next.onclick = () => {
//     console.log("first");
//     // let initialContainer = container.innerHTML
//     // console.log(initialContainer);
//     // console.log(allProducts.length);
//     const firstElement = container.firstElementChild
//     console.log(firstElement);
//     if(firstElement) {
//         firstElement.remove()
    
//     }
//     currentItem++;
//     console.log(allProducts.length);
//     if (currentItem > allProducts.length - 1) {

//         currentItem = 0;
        
//         if(firstElement) {
//             console.log('hi');
//             firstElement.add()
//         }
//     }
//     console.log('hello');
//         if (allProducts.length > 0) { 
//             // console.log(allProducts);      
//             container.innerHTML = allProducts[currentItem]
//         } else {
//             console.log('no product available');
//         }
//         console.log('so');
// };

// if (currentItem < allProducts.length) {
//     firstElement.innerHTML = allProducts[currentItem] 
// } else{
//     console.log('Invalid index:', currentItem);
// } 