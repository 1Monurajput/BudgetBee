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


// add rest api
const addBillForm = document.getElementById("addBill");

addBillForm.addEventListener("submit",async(event)=>{

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
        console.log("inside response js");

        document.getElementById("submitDoneAlert").style.display="block";
        addBillForm.style.display="none";

    }
    else{
        console.log("Not saved");
    }
    
   } catch (error) {
    console.log("error : " + error) ;
   }

   setTimeout(closeAddBillModal,1000);

})

function closeAddBillModal(){
    location.reload();
}




// globally accessible

window.openAddBillModal = openAddBillModal;