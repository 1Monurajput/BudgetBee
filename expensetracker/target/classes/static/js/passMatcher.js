console.log("Password matchers");

const pass = document.getElementById("pass");
const cpass = document.getElementById("cpass");


// confirm password
cpass.addEventListener("input", () => {
    var passStr = pass.value;
    var cpassStr = cpass.value;

    var labelBtn = document.getElementById("i-button");
    var labelBtnHover = document.getElementById("i-buttonhover");
    if (passStr === cpassStr) {
        if (passStr.length >= 1 && cpassStr.length >= 1) {
            labelBtn.style.cssText =
                "display:flex; color:#2db84c;border:1px solid #2db84c;box-shadow: inset 0px 0px 10px 2px rgb(187 247 208);";
            labelBtnHover.style.cssText =
                "color:#2db84c; border:1px solid #2db84c; box-shadow: inset 0px 0px 10px 2px rgb(187 247 208); ";
            labelBtnHover.innerHTML = "Password matched";
        } else {
            labelBtn.style.display = "none";
        }
    } else {
        if (passStr.length >= 1 && cpassStr.length >= 1) {
            labelBtn.style.cssText =
                "display:flex; color:#D32F2F;border:1px solid #D32F2F; box-shadow: inset 0px 0px 10px 2px rgb(254 202 202);";
            labelBtnHover.style.cssText =
                "color:#D32F2F; border:1px solid #D32F2F; box-shadow: inset 0px 0px 10px 2px rgb(254 202 202);";
            labelBtnHover.innerHTML = "Password is not matching!";
        } else {
            labelBtn.style.display = "none";
        }
    }
});


//password
pass.addEventListener("input", () => {
    var passStr = pass.value;
    var cpassStr = cpass.value;

    var labelBtn = document.getElementById("i-button");
    var labelBtnHover = document.getElementById("i-buttonhover");
    if (passStr === cpassStr) {
        if (passStr.length >= 1 && cpassStr.length >= 1) {
            labelBtn.style.cssText =
                "display:flex; color:#2db84c;border:1px solid #2db84c;box-shadow: inset 0px 0px 10px 2px rgb(187 247 208);";
            labelBtnHover.style.cssText =
                "color:#2db84c; border:1px solid #2db84c; box-shadow: inset 0px 0px 10px 2px rgb(187 247 208); ";
            labelBtnHover.innerHTML = "Password matched";
        } else {
            labelBtn.style.display = "none";
        }
    } else {
        if (passStr.length >= 1 && cpassStr.length >= 1) {
            labelBtn.style.cssText =
                "display:flex; color:#D32F2F;border:1px solid #D32F2F; box-shadow: inset 0px 0px 10px 2px rgb(254 202 202);";
            labelBtnHover.style.cssText =
                "color:#D32F2F; border:1px solid #D32F2F; box-shadow: inset 0px 0px 10px 2px rgb(254 202 202);";
            labelBtnHover.innerHTML = "Password is not matching!";
        } else {
            labelBtn.style.display = "none";
        }
    }
});


//validate password
function validatePassword(){
    if(pass.value === cpass.value){
        return true;
    }
    return false;
}