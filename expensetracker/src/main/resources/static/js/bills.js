console.log("Bill.js");

const form = document.getElementById("viewBill");


// inside modal variables
const title = document.getElementById("billTitle");
const rate = document.getElementById("billRate");
const currency = document.getElementById("billCurrency");
const method = document.getElementById("billPaymentMethod");
const Billstatus = document.getElementById("billStatus");
const description = document.getElementById("billDescription");
const cat = document.getElementById("billCategories");
const dueDate = document.getElementById("billDueDate");
const biller = document.getElementById("billBiller");
const billerPhone = document.getElementById("billBillerPhone");
const attachement = document.getElementById("billAttachement");
const img = document.getElementById("billImg");
const billDate = document.getElementById("billDate");

const billId = document.getElementById("openBillId");



// get All bills or fetch bills api


const $target = document.getElementById('bill-modal');

// options with default values
const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        editBill.style.display="block";
document.getElementById("submitBill").style.display="none";
    },
};

// instance options object
const instanceOptions = {
    id: 'bill-modal',
    override: true
};

const billModal = new Modal($target, options, instanceOptions);


// fields of edit and preview bill



//Bill view 
function billModalBtn(event) {
    

    document.getElementById("modalTitle").innerHTML = "View Bill";
    document.getElementById("imageBlock").style.display = "none";
    document.getElementById("billBox").style.display = "flex";


    const row = event.target.closest("tr");

    title.value = row.querySelector(".title").textContent;
    rate.value = row.querySelector(".rate").textContent;
    console.log("this is here : "+title.value + rate.value);
    Billstatus.value = row.querySelector(".status").textContent.toLowerCase();
    dueDate.value = row.querySelector(".duedate").textContent;
    currency.value = row.querySelector(".currency").textContent.toLowerCase();
    description.value = row.querySelector(".description").textContent;
    cat.value = row.querySelector(".categories").textContent.toLowerCase();
    biller.value = row.querySelector(".biller").textContent;
    billerPhone.value = row.querySelector(".billerPhone").textContent;
    method.value = row.querySelector(".method").textContent.toLowerCase();
    billDate.value = row.querySelector(".date").textContent;

    var imgUrl = row.querySelector(".attachement").innerHTML;
    img.src = `${imgUrl}?t=${new Date().getTime()}`; 

    billId.value = row.querySelector(".billId").textContent;

    



    document.getElementById("time").innerHTML = "Bill saved at :- " + row.querySelector(".time").textContent;

    const inputs = form.querySelectorAll("input,select");
    inputs.forEach(input => {
        input.setAttribute("disabled", true);
    })

    billModal.show();
}

document.getElementById("closebtn").addEventListener("click", () => {
   
    billModal.hide();
})

// Delete Bill

async function deleteBill(billId, event) {
    showLoader();
    var newBillId = "";
    console.log(billId);
    for (let i = 0; i < billId.length; i++) {
        if (billId[i] != '"') {
            newBillId += billId[i];
        }
    }
    try {

        const del = await fetch(`/api/bill/delete?billId=${newBillId}`, {
            method: "DELETE"
        });
        if (del) {
            const clickedBtn = event.target;
            const bill = clickedBtn.closest(".bill");
            bill.style.display = "none";

        }
        else {
            console.log("there is something wrong");
        }

    } catch (error) {
        console.log("error  : " + error);
    }

    hideLoader();
}

// edit bill


var imgVariable = null;
attachement.addEventListener("input", (event) => {
    imgVariable = event.target.files[0];
})

const editBill = document.getElementById("editBill");
editBill.addEventListener("click", async () => {
    

    const inputs = form.querySelectorAll("input,select");
    inputs.forEach(input => {
        input.removeAttribute("disabled");
    })

    document.getElementById("modalTitle").innerHTML = "Edit Bill";
    document.getElementById("imageBlock").style.display = "block";
    document.getElementById("billBox").style.display = "none";

    editBill.style.display="none";
    document.getElementById("submitBill").style.display="block";

})



// viewBill form submission
// update bill

form.addEventListener("submit",async(event)=>{
    showLoader();

    event.preventDefault();

    const formData = new FormData();

    formData.append("name", title.value);
    formData.append("rate", rate.value);
    formData.append("method", method.value);
    formData.append("currency", currency.value);
    formData.append("status", Billstatus.value);
    formData.append("description", description.value);
    formData.append("categories", cat.value);
    formData.append("dueDate", dueDate.value);
    formData.append("biller", biller.value);
    formData.append("billerPhone", billerPhone.value);
    formData.append("id",billId.value);
    formData.append("date",billDate.value);

    if (imgVariable) {
        formData.append("image", imgVariable);
    }

    try {

        const response = await fetch(`/api/bill/update`,{
            method:"PUT",
            body:formData,
        });
        
        if(response.ok){
            

            location.reload();
        }
        else{
            console.log("got issue there");
        }

    } catch (error) {
        console.log("Error : " + error);
    }

    hideLoader();
})


window.billModalBtn = billModalBtn;
window.deleteBill = deleteBill;