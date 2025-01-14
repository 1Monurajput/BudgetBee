console.log("hi Dashboard");

const $addModal = document.getElementById("addBillModal");


const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
       
    },
    onShow: () => {
        
    },
    onToggle: () => {
        
    },
};

const instanceOptions = {
    id: 'addBillModal',
    override: true
  };

const addBillModal = new Modal($addModal,options,instanceOptions);
function openAddBillModal(){
    addBillModal.show();
}

// due date handler
var dueDateShower = document.getElementById("status");
var dueDateDropDown = document.getElementById("dueDateBlock")
dueDateShower.addEventListener("change",()=>{
    if(dueDateShower.value == "paid"){
        dueDateDropDown.style.display="none";
        
    }
    else{
        dueDateDropDown.style.display="block";
        
    }
})

// preview bill
const imgBill = document.getElementById("addBillModalAttachement");
const previewBill = document.getElementById("previewBill");
var previewImage = null;

imgBill.addEventListener("change",(event)=>{
    var file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        previewImage = file;
        reader.onload=(e)=>{
            previewBill.src=e.target.result;
        }

        reader.readAsDataURL(file);
    }
})

//add bill
// add rest api
const addBillForm = document.getElementById("addBill");

addBillForm.addEventListener("submit",async(event)=>{

    showLoaderAddBill();

    event.preventDefault();
    
    let name = document.getElementById("addBillModalTitle").value;
    let rate = document.getElementById("addBillModalRate").value;
    let pMethod = document.getElementById("paymentMethod").value;
    let currency = document.getElementById("currency").value;
    let status = document.getElementById("status").value;
    let description= document.getElementById("addBillModaldescription").value;
    let categories= document.getElementById("categories").value;
    let dueDate= document.getElementById("addBillModalDueDate").value;
    let biller= document.getElementById("addBillModalbiller").value;
    let billerPhone = document.getElementById("addBillModalPhone").value;

    let date = document.getElementById("addBillModalDate").value;

    if(categories.length == 0){
        categories = 'other';
    }


    const formData = new FormData();

    formData.append("name",name);
    formData.append("rate",rate);
    formData.append("method",pMethod);
    formData.append("currency",currency);
    formData.append("status",status);
    formData.append("description",description);
    formData.append("categories",categories);
    formData.append("dueDate",dueDate);
    formData.append("biller",biller);
    formData.append("billerPhone",billerPhone);
    formData.append("date",date);

    if(previewImage){
        formData.append("image",previewImage);
    }

   try {
    const response = await fetch(`/api/addbill`,{
        method:"POST",
        body:formData,
    });

    if(response.ok){
        const responseData = await response.json();

        document.getElementById("submitDoneAlert").style.display="block";
        addBillForm.style.display="none";

    }
    
    
   } catch (error) {
    console.log("error : " + error) ;
   }
   finally{
    hideLoaderAddBill();
   }

   setTimeout(closeAddBillModal,1000);

})

function closeAddBillModal(){
    location.reload();
}




// globally accessible

window.openAddBillModal = openAddBillModal;


// pending bills js below: - 

var dataArray2;
document.addEventListener("DOMContentLoaded",() =>{

    var monthArray = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    var drop = document.getElementById("drop2");
    var option = document.createElement("option");
    option.value=monthArray[new Date().getMonth()];
    option.innerHTML=monthArray[new Date().getMonth()];
    drop.appendChild(option);
    getDataArray();
    createTable();
})

function createTable(){
    var filteredArray = dataArray2.filter((item) => item.status != "paid");

    filteredArray.sort((a, b) => {
        var aDate = new Date(a.dueDate);
        var bDate = new Date(b.dueDate);
    
        var today = new Date();
        today.setHours(0, 0, 0, 0);
    
        var daysA = (aDate - today) / (1000 * 60 * 60 * 24); 
        var daysB = (bDate - today) / (1000 * 60 * 60 * 24);
    
        if (daysA === 0 && daysB === 0) {
            return 0;
        }
        if (daysA === 0) {
            return -1;
        }
        if (daysB === 0) {
            return 1;
        }
    
        if (daysA < 0 && daysB > 0) {
            return 1; 
        } else if (daysA > 0 && daysB < 0) {
            return -1;
        } else {
            return daysA - daysB;
        }
    });
    

  var tableBody = document.getElementById("pending-bills-list");
  tableBody.innerHTML = "";


  filteredArray.forEach((bill) => {
    var billDate = new Date(bill.dueDate);
  var today = new Date();
  var diff = billDate - today;
  var days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if(days == 1){
    days += "day" ;
  }
  else if(days >1){
    days +=" days";
  }
  else if(days == 0){
    days = "Today";
  }
  else{
    days = "Due date passed"
  }
    var row = document.createElement("tr");
    row.className =
      "bill odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

    if(days !="Due date passed"){
        row.innerHTML = `
      <th scope="row" class="title px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${bill.title}</th>
    <td class="rate px-6 py-4">${bill.rate}</td>
      <td class="duedate px-6 py-4 text-danger">${bill.dueDate}</td>
      <td class="date px-6 py-4 text-danger">${days}</td>
      <td class="px-6 py-4">
        <div class="flex gap-2 items-center">
          <a href="/user/bills" class="px-4 py-1 rounded-lg bg-emtext text-white text-base ">Pay</a>
          <a href="/user/bills" class="px-2 py-1 rounded-lg bg-danger text-white text-base ">Cancel</a>
        </div>
      </td>
    `;
    }
    else{
        row.innerHTML = `
      <th scope="row" class="title px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${bill.title}</th>
    <td class="rate px-6 py-4">${bill.rate}</td>
      <td class="duedate px-6 py-4 text-danger">${bill.dueDate}</td>
      <td class="date px-6 py-4 text-lightptext">${days}</td>
      <td class="px-6 py-4">
        <div class="flex gap-2 items-center">
          <a href="/user/bills" class="px-4 py-1 rounded-lg bg-emtext text-white text-base ">Pay</a>
          <a href="/user/bills" class="px-2 py-1 rounded-lg bg-danger text-white text-base ">Cancel</a>
        </div>
      </td>
    `;
    }

    tableBody.appendChild(row);
  });
}


function getDataArray(){
    dataArray2 = JSON.parse(localStorage.getItem("dataArray"));

    localStorage.removeItem("dataArray");
    console.log(localStorage.getItem("dataArray"));
}