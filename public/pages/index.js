const review = [
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product1.png",
        name: "TS013",
        price: 500,
        dailyIncome: 25,
        days: 30,
        totalIcome: 750,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product2.png",
        name: "TS02",
        price: 1500,
        dailyIncome: 75,
        days: 30,
        totalIcome: 2250,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product3.png",
        name: "TS03",
        price: 3000,
        dailyIncome: 150,
        days: 30,
        totalIcome: 4500,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product4.png",
        name: "Tc 4",
        price: 5000,
        dailyIncome: 400,
        days: 20,
        totalIcome: 8000,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product5.png",
        name: "Tc 5",
        price: 10000,
        dailyIncome: 800,
        days: 20,
        totalIcome: 16000,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product6.png",
        name: "Tc 6",
        price: 20000,
        dailyIncome: 1600,
        days: 20,
        totalIcome: 32000,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product7.png",
        name: "Tm1",
        price: 10000,
        dailyIncome: 500,
        days: 50,
        totalIcome: 25000,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product8.png",
        name: "Tm2",
        price: 20000,
        dailyIncome: 1000,
        days: 50,
        totalIcome: 50000,
    },
    {
        imgs: "http://127.0.0.1:5501/TCHIBO1/product9.png",
        name: "Tm3",
        price: 30000,
        dailyIncome: 1500,
        days: 50,
        totalIcome: 75000,
    }
]

// // defining varialbles 
// const Indexname = document.querySelector('.name')
// const Indeximgs = document.querySelector('.image')
// const Indexprice = document.querySelector('.price')
// const IndexdailyIncome = document.querySelector('.dIncome')
// const Indexdays = document.querySelector('.days')
// const IndextotalIncome = document.querySelector('.tIncome')

// function setup 
const container = document.querySelector('#box')
const next = document.querySelector('.next')
const previous = document.querySelector('.previous')

// Initializer setup 

let currentItem = 0

// windows setup 
window.addEventListener('DOMContentLoaded', () => {
    domsetup(container)
});

const domsetup = () => {
    const slide = review[currentItem]
    // Indexname.textContent = slide.name
    // Indeximgs.src = slide.imgs
    // Indexprice.textContent = slide.price
    // IndexdailyIncome.textContent = slide.dailyIncome
    // Indexdays.textContent = slide.days
    // IndextotalIncome.textContent = slide.totalIcome

    const newProduct = document.createElement('div');
    newProduct.className = "flex mx-auto mb-3 here font-bold border-blue-900 rounded-[12px] border-2 sm:w-[70%] p-3 active:bg-blue-900";
    newProduct.innerHTML = `
    <img class="image h-[90px]" src="${slide.imgs}" alt="">
    <div class="border-blue-900 ">

        <h1 class="name">${slide.name}</h1>

        <p>Price: <span><i class="fa-solid fa-naira-sign"></i></span><span class="price">${slide.price}</span></p>

        <p>Daily Income: <i class="fa-solid fa-naira-sign"></i><span class="dIncome">${slide.dailyIncome}</span></p>

        <p>Days: <span class="days">${slide.days}</span></p>

        <p>Total Income: <i class="fa-solid fa-naira-sign"></i><span class="tIcome">${slide.totalIcome}</span></p>
    </div>
    `
    container.appendChild(newProduct)
}


// setting up event listeners 
next.onclick = () => {
    container.firstElementChild.remove();
    currentItem++
    if (currentItem > review.length - 1) {
        currentItem = 0
    }
    domsetup()
}

// previous.onclick = () => {
//     const lastProduct = container.children[2];
//     container.removeChild(lastProduct);
//     currentItem--
//     if (currentItem < 0) {
//         currentItem = review.length - 1
//     }

//     domsetup()
// 