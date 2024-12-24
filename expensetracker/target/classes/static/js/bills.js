console.log("Bill.js");

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
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    },
};

// instance options object
const instanceOptions = {
  id: 'bill-modal',
  override: true
};

const billModal = new Modal($target, options, instanceOptions);

function billModalBtn(attachement){
    console.log("hello : " + attachement);
    billModal.show();
}



// Delete Bill

async function deleteBill(billId){
    console.log(billId);
    var newBillId="";
    for(let i = 0;i<billId.length;i++){
        if(billId[i] != '"'){
            newBillId +=billId[i];
        }
    }
    try {
        
        const del = await fetch(`/api/bill/delete?billId=${newBillId}`,{
            method:"DELETE"
        });
        if(del){
            console.log("working fine");
        }
        else{
            console.log("there is something wrong");
        }

    } catch (error) {
        console.log("error  : " + error);
    }
}


window.billModalBtn = billModalBtn;
window.deleteBill = deleteBill;