console.log("Login page validator");

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");

const pass = document.getElementById("cpass");

form.addEventListener("submit",async(event)=>{
    event.preventDefault();
    
    var emailValue = email.value;
    var passValue = pass.value;

    const response = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, pass: passValue }),
    });

    var responseData =  await response.json();
    console.log(responseData);
    if(responseData.msg == "email"){
        emailError.style.display="block";
        document.getElementById("loginPasswordError").style.display="none";
        document.getElementById("Mob_loginEmailError").style.display="block";
    }
    else if(responseData.msg == "password"){
        document.getElementById("loginPasswordError").style.display="flex";
        emailError.style.display="none";
        document.getElementById("Mob_loginEmailError").style.display="none";
    }
    else if(responseData.msg == "done"){
        form.submit();
    }

})













// async function loginFormSubmission(event){
//     event.preventDefault();

//     

//     var emailValue = email.value;
//     console.log(emailValue);
//     const response = await fetch(`/api/checkEmail?email=${encodeURIComponent(emailValue)}`, {
//         method: 'POST'
//     });
//     console.log(response);
    

//     // const response = await fetch(`/api/check-email?email=${encodeURIComponent(emailInput.value)}`);

//     // if (response.ok) {
//     //     const isAvailable = await response.json();
//     //     if (!isAvailable) {
//     //         // Show error message if email is unavailable
//     //         emailError.style.display = "block";
//     //         return;
//     //     }
//     //     // Submit the form if email is available
//     //     this.submit();
//     // } else {
//     //     alert("Error checking email. Please try again later.");
//     // }



// }

