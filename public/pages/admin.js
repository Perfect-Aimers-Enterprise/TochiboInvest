const mainBar = document.querySelector('#mainBar')
const deleteProductBtn = document.querySelector('.deleteProductBtn')
const generalDiv = document.querySelector('#generalDiv')
const editSection = document.querySelector('.editSectionView')
const letUscook = document.querySelector('.deleting')
const theCreateProductSection = document.querySelector('#theCreateProductSection')
const createSectionDiv = document.querySelector('.createSectionDiv')
const backward = document.querySelector('#backward')
const editIcon = document.querySelector('.editIcon')
const x = document.querySelector('#x')
const editProductInitial = document.querySelector('.editProductInitial')



window.addEventListener('DOMContentLoaded', () => {

    const initProductSection = document.querySelector('#theInitialProductSection')
    const theEditProductSection = document.querySelector('#theEditProductSection')


    // theCreateProductSection.onclick = () => {
    //     console.log('clicked!! also');
    //     window.location.href = 'create.html';
        
    // }

    x.onclick = () => {
        editSection.style.display = 'none'
    }

    fetcheDeletingData()
})


deleteProductBtn.onclick = () => {
    
    
}
editProductInitial.onclick = () => {
    editSection.style.display = 'block'
    fetcheDeletingData()
}

theCreateProductSection.onclick = () => {
    editSection.style.display = 'block'
    fetcheDeletingData()
}

const ePContainer = document.querySelector('.deleting')

const fetcheDeletingData = async () => {
try {
    const response = await fetch('/api/v1/products')
    console.log(response);
    const products = await response.json()
    console.log(products);

    const allProducts = products
    .map((product) => {
        const {name, imgs, _id:taskID} = product
        console.log(product.taskID);
        return ` <div class="eachProduct flex items-center justify-around border-b-2 border-blue-900"> 
                    <div class="flex-shrink-0">
                        <img class="w-[50px]" src="${imgs}" alt="">
                    </div>
                    <div class="flex-shrink-0">
                        <h1 class="font-bold">name: ${name}</h1>
                    </div>

                    <a class="flex-shrink-0 createIcon createicon" href="create.html?id=${taskID}">create
                    </a>

                    <a class="flex-shrink-0 editIcon editicon" href="editSection.html?id=${taskID}">edit
                    </a>

                    <div class="flex-shrink-0 trashIcon text-red-800" data-id="${taskID}">
                    <a class='deleteicon'>delete</a>
                    </div>
                </div>`
    }).join('')
    const newProduct = document.createElement('div')
    newProduct.className = "deleting mx-auto justify-center mt-[80px] w-[500px] rounded-[12px]";
    newProduct.innerHTML = allProducts
    // console.log(allProducts);

    ePContainer.append(newProduct)
} catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
}
}


letUscook.addEventListener('click', async (e) => {
    // e.preventDefault()
    const el = e.target
    console.log(el);
//    const els= el.parentElement.classList
    if (el.parentElement.classList.contains('trashIcon')) {
        id = el.parentElement.dataset.id
        console.log(id);
        try {
            await fetch(`/api/v1/products/${id}`, {
                method: 'DELETE'
            })
            fetcheDeletingData()
        } catch (error) {
            console.log(error, 'there is an error detected');
        }
    }
})

createSectionDiv.addEventListener('submit', async (e) => {
    e.preventDefault()

    // const formData = new FormData(createSectionDiv)
    try {
            await fetch('/api/v1/products', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({name, price, dailyIncome, days, totalIcome, imgs})
            })
            console.log('Creating product with data:', {name, price, dailyIncome, days, totalIcome, imgs});

            fetcheDeletingData()
        } catch (error) {
            console.log(error, 'error creating Product');   
        }
})