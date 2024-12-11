console.log("Password matchers");

const pass = document.getElementById("pass");
const cpass = document.getElementById("cpass");

const strong_weak = document.getElementById("strong_weak");
const strong_weak_hover = document.getElementById("strong_weak_hover");


// confirm password change trigger
cpass.addEventListener("input", () => {
    var passStr = pass.value;
    var cpassStr = cpass.value;

    var labelBtn = document.getElementById("i-button");
    var labelBtnHover = document.getElementById("i-buttonhover");
    if (passStr.length >= 1 && cpassStr.length >= 1) {

        strongWeakHover_shifting_left();

        if (passStr === cpassStr) {

            
            labelBtn.style.cssText =
                "display:flex; color:#2db84c;border:1px solid #2db84c;box-shadow: inset 0px 0px 20px 2px rgb(187 247 208);";
            labelBtnHover.style.cssText =
                "color:#2db84c; border:1px solid #2db84c; box-shadow: inset 0px 0px 20px 2px rgb(187 247 208); ";
            labelBtnHover.innerHTML = "Password matched";
        } else {
            
            labelBtn.style.cssText =
                "display:flex; color:#D32F2F;border:1px solid #D32F2F; box-shadow: inset 0px 0px 20px 2px rgb(254 202 202);";
            labelBtnHover.style.cssText =
                "color:#D32F2F; border:1px solid #D32F2F; box-shadow: inset 0px 0px 20px 2px rgb(254 202 202);";
            labelBtnHover.innerHTML = "Password is not matching!";
        }
    } else {

        strong_weak.style.right = "4%";
        strong_weak_hover.style.right = "10%";
        labelBtn.style.display = "none";
    }
});


//password change trigger
pass.addEventListener("input", () => {
    var passStr = pass.value;
    var cpassStr = cpass.value;

    var labelBtn = document.getElementById("i-button");
    var labelBtnHover = document.getElementById("i-buttonhover");

    if (passStr.length >= 1 && cpassStr.length >= 1) {

        strongWeakHover_shifting_left();

        if (passStr === cpassStr) {
            labelBtn.style.cssText =
                "display:flex; color:#2db84c;border:1px solid #2db84c;box-shadow: inset 0px 0px 20px 2px rgb(187 247 208);";
            labelBtnHover.style.cssText =
                "color:#2db84c; border:1px solid #2db84c; box-shadow: inset 0px 0px 20px 2px rgb(187 247 208); ";
            labelBtnHover.innerHTML = "Password matched";
        } else {
            labelBtn.style.cssText =
                "display:flex; color:#D32F2F;border:1px solid #D32F2F; box-shadow: inset 0px 0px 20px 2px rgb(254 202 202);";
            labelBtnHover.style.cssText =
                "color:#D32F2F; border:1px solid #D32F2F; box-shadow: inset 0px 0px 20px 2px rgb(254 202 202);";
            labelBtnHover.innerHTML = "Password is not matching!";
        }
    } else {

        strong_weak.style.right = "4%";
        strong_weak_hover.style.right = "10%";
        labelBtn.style.display = "none";
    }

    // strong weak password checker
    strongWeakPasswordChecker();
}
);

// strong weak password checker
function strongWeakPasswordChecker(){

     const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
     const mediumPassword = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{4,}$/;
 
     if(pass.value.length >=1){
         if (strongPassword.test(pass.value)) {
             strong_weak.style.borderColor = "#2db84c";
             strong_weak.src="/images/muscle.png"
             strong_weak.style.display="block";
 
             strong_weak_hover.innerHTML = "Strong Password";
             strong_weak_hover.style.color= "#2db84c";
             strong_weak_hover.style.border= " 1px solid #2db84c";
             strong_weak_hover.style.boxShadow= "inset 0px 0px 20px 2px rgb(187 247 208)";
         }
         else if (mediumPassword.test(pass.value)) {
             strong_weak.style.borderColor = "rgb(234 88 12)";
             strong_weak.src="/images/dumbbell.png"
             strong_weak.style.display="block";
 
             strong_weak_hover.innerHTML = "Medium Password";
             strong_weak_hover.style.color= "rgb(234 88 12)";
             strong_weak_hover.style.border= "1px solid rgb(234 88 12)";
             strong_weak_hover.style.boxShadow= "inset 0px 0px 10px 2px rgb(255 167 121)";
         }
         else {
             strong_weak.style.borderColor = "#D32F2F";
             strong_weak.src="/images/weakness.png"
             strong_weak.style.display="block";
 
             strong_weak_hover.innerHTML = "Weak Password";
             strong_weak_hover.style.color= "#D32F2F";
             strong_weak_hover.style.border= "1px solid #D32F2F";
             strong_weak_hover.style.boxShadow= "inset 0px 0px 20px 2px rgb(254 202 202)";
         }
     }
     else{
         strong_weak.style.display="none";
     }
}

function strongWeakHover_shifting_left(){
    strong_weak.style.right = "10%";
    strong_weak_hover.style.cssText += "right:16%";
}


//validate password before form submission
function validatePassword() {
    if (pass.value === cpass.value) {
        return true;
    }
    else {
        document.getElementById("passwordError").style.display = "flex";
    }
    return false;
}

function passwordError(){
    document.getElementById("passwordError").style.display="none";
}

// email error closer

function emailErrorClose(){
    document.getElementById("emailError").style.display="none";
}