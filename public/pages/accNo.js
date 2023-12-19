// Variable Declaration 

    const accNoInput = document.querySelector('.accNo')
    const accNameInput =  document.querySelector('.accName')
    const bankNameInput = document.querySelector('.bankName')
    // const accountOHH = document.querySelector('.accountOH')
    const formDiv = document.querySelector('.formDiv')
    const accountForm = document.querySelector('#accountForm')
    const accContainer = document.querySelector('.accContainer')
    const createAcct = document.querySelector('#createAcct')
    const deleteAcct = document.querySelector('#deleteAcct')
    const myHider = document.querySelector('.myHider')
    const accCuston = document.querySelector('#accCuston')
    const cancleAcc = document.querySelector('.cancleAcc')

    console.log(accountForm);

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    // acctDetailsDiv()
    console.log('accountForm:', accountForm);
    myCreation()

    console.log('ginger');

    createAcct.onclick = () => {
        acctDetailsDiv()
    }
    deleteAcct.onclick = () =>{
        acctDetailsDiv()
    }
    
})

accCuston.onclick = () => {
        myHider.style.display = 'block'
    }
cancleAcc.onclick = () => {
    myHider.style.display = 'none'
}

const acctDetailsDiv = async () => {
    try {
        const response = await fetch('/api/v1/admin')
        console.log(response);
        const acctDetails = await response.json()
        console.log(acctDetails);

        const allacctDetails = acctDetails
        .map((acctDetail) => {
            const {accName, accNo, bankName, _id:acctID} = acctDetail
            return `
            <div class="flex gap-5 impoo">
            <div>
                <h1 class="accName">${accName}</h1>
                <p class="accNo">${accNo}</p>
                <p class="bankName">${bankName}</p>
            </div>

            <a href="accEdit.html?id=${acctID}"><i class="fa-solid fa-pen-to-square"></i></a>

            <a href="accCreate.html?id=${acctID}"><i id="createAcct" class="fa-solid fa-plus"></i></a>
                                                
            <a data-id="${acctID}" class="cursor-pointer"><i id="deleteAcct" class="fa-solid fa-trash"></i></a>
            </div>                        
            `
        }).join('')
        const accountOHH = document.createElement('div')
        accountOHH.className = "gap-5 mb-[60px] accountOH"
        accountOHH.innerHTML = allacctDetails
        accContainer.append(accountOHH)
    } catch (error) {
        console.error('Error fetching account data:', error);
        throw error;
    }
}
    
acctDetailsDiv()

accContainer.addEventListener('click', async (e) => {
    const el = e.target
    console.log(el);
    if (el.classList.contains('fa-trash')) {
        id = el.parentElement.dataset.id
        console.log(id);
        try {
            await fetch(`/api/v1/admin/${id}`, {
                method: 'DELETE'
            })
            window.location.reload();
            acctDetailsDiv()
        } catch (error) {
            console.log('there is an error deleting product', error);
        }
        
    }
})

function myCreation() {
    console.log("myCreation function is executing");
    if (accountForm) {
        accountForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            console.log("Form submitted")
        
            try {
                console.log("Form values:", accNameInput.value, accNoInput.value, bankNameInput.value);
                await fetch('/api/v1/admin', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        accName: accNameInput.value,
                        accNo: accNoInput.value,
                        bankName: bankNameInput.value
                    })
                })
                accNameInput.value = "", 
                accNoInput.value = "", 
                bankNameInput.value = ""
                console.log("Data sent successfully");
                acctDetailsDiv()
            } catch (error) {
                console.log('there is an error creating product', error);
            }
        })
    } else {
        console.log('NO account found in the DOM');
    }
}