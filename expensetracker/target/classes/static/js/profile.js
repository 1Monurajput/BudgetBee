console.log("Profile");

var selectedImage = null;
// Profile image preview and etc
const imgBtn = document.getElementById("editModalProfilePic");
const fileBtn = document.getElementById("filePic");
imgBtn.addEventListener("click",()=>{
    fileBtn.click();
})

fileBtn.addEventListener("change",(event)=>{
    const file = event.target.files[0];
    if(file){
        selectedImage = file;
        const reader = new FileReader();

        reader.onload = (e)=>{
            imgBtn.src=e.target.result;
        }

        reader.readAsDataURL(file);
    }
})

//edit modal
const $targetEl = document.getElementById('editModal');

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
    id: 'editModal',
    override: true
  };

const editModal = new Modal($targetEl,options,instanceOptions);



//fetch
async function openEditModal(){
    const email = document.getElementById("emailJS").value;

    try {
        const response = await fetch(`/api/getUserData`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email}),
        });
    
        if(response.ok){
            const data = await response.json();
            
            var name = document.getElementById("editModalName");
            var emailId = document.getElementById("editModalEmail");
            var phone = document.getElementById("editModalPhone");
            var profilePic = document.getElementById("editModalProfilePic");

            name.value=data.name;
            emailId.value=data.email;
            phone.value = data.phone;
            profilePic.src=data.profilePicture;

            editModal.show();

        }
        else{
            console.log("Failed to fetch data");
        }
    } catch (error) {
        console.log("Error : " + error);
    }





}

const updateForm = document.getElementById("updateForm");
updateForm.addEventListener("submit",async(event)=>{

    event.preventDefault();
    try {
        var name = document.getElementById("editModalName").value;
    var phone = document.getElementById("editModalPhone").value;
    var email = document.getElementById("editModalEmail").value;

    const formData = new FormData();
    formData.append("name" , name);
    formData.append("phone" , phone);
    formData.append("email",email);
    if(selectedImage){
        formData.append("file",selectedImage);
    }

    const response = await fetch(`/api/update`,{
        method:"PUT",
        body:formData,
    })

    if(response){
        location.reload();
    }
    } catch (error) {
        console.log("Error : " + error);
    }
})



// globally accessible

window.openEditModal = openEditModal;
