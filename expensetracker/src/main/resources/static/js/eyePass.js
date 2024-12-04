console.log("hello this is eyepass")

function showPassword(){
    const input = document.getElementById("cpass");
    const eye = document.getElementById("eye");
    if(input.type ==="text"){
        input.type = "password";
        eye.style.color="rgb(107 114 128)";

    }
    else if(input.type === "password"){
        input.type = "text";
        eye.style.color="#2db84c"
    }
}
