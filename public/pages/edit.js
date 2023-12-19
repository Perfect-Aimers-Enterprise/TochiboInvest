const taskDomAlert = document.querySelector('.taskDom')
const editSectionDiv = document.querySelector('.editSectionDiv')
const taskNameDom = document.querySelector('.taskNameDom')
const taskPriceDom = document.querySelector('.taskPriceDom')
const taskDailyIncomeDom = document.querySelector('.taskDailyIncomeDom')
const taskDaysDom = document.querySelector('.taskDaysDom')
const taskTotalIcomDom = document.querySelector('.taskTotalIcomDom')
const taskIds = document.querySelector('.taskIds')

let tempName
let tempPrice
let tempDIncome
let tempDays
let tempTIcome
let id;


window.addEventListener('DOMContentLoaded', () => {
    const params = window.location.search
    id = new URLSearchParams(params).get('id')

    if (id) {
        showTask(id)
    }else{
        console.log('product id is missing agian');
    }
})

const showTask = async () => {
    try {
        const params = window.location.search
        id = new URLSearchParams(params).get('id')
        console.log('Id from URL', id);
        if (id) {

            console.log('Updating product with ID:', id);
            console.log('Request body:', {
            name: taskName,
            price: taskPrice,
            dailyIncome: taskDaily,
            days: taskDays,
            totalIcome: taskTotal
        });

            const response = await fetch(`/api/v1/products/${id}`)
            const products = await response.json()
            const {name, price, dailyIncome, days, totalIcome, _id: taskID} = products

            taskNameDom.value = name
            taskPriceDom.value = price
            taskDailyIncomeDom.value = dailyIncome
            taskDaysDom.value =  days
            taskTotalIcomDom.value = totalIcome
            taskIds.textContent = taskID

            tempName = name
            tempPrice = price
            tempDIncome =dailyIncome
            tempDays = days
            tempTIcome = totalIcome
        }else {
            console.error('Product ID is missing.');
        }
    } catch (error) {
        console.log('error fetching form', error);
    }
}


editSectionDiv.addEventListener('submit', async (e) => {
    taskDom.textContent = 'Loading.......'
    e.preventDefault()

    try {

         console.log('ID from URL (submit):', id);

        if (!id) {
            console.error('Product ID is missing.');
            return;
        }

        taskName = taskNameDom.value
        taskPrice = taskPriceDom.value
        taskDaily = taskDailyIncomeDom.value
        taskDays = taskDaysDom.value
        taskTotal = taskTotalIcomDom.value

        const requestBody = {
            name: taskName,
            price: taskPrice,
            dailyIncome: taskDaily,
            days: taskDays,
            totalIcome: taskTotal
        }

        console.log(requestBody);
        const response = await fetch(`/api/v1/products/${id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(requestBody)
        })

        const products = await response.json()
        console.log('reading');
        console.log(products);

        const {name, price, dailyIncome, days, totalIcome, _id: taskID} = products

        taskNameDom.value = name
        taskPriceDom.value = price
        taskDailyIncomeDom.value = dailyIncome
        taskDaysDom.value = days
        taskTotalIcomDom.value = totalIcome
        taskIds.textContent = taskID

        taskDomAlert.textContent = 'POST SUCCESS'
        taskDomAlert.classList.add('success')
    } catch (error) {
        taskDomAlert.textContent = 'POST FAILURE'
        taskDomAlert.classList.add('failure')
        console.log('error subminting form', error)
    }
})