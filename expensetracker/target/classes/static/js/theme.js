console.log("On Theme js");
showTheme();

function changeTheme(){
    var cur = getTheme();
    console.log("Change theme button")
    var newTheme;
    if(cur == "dark"){
        document.querySelector("html").classList.remove(cur);
        newTheme = "light";
    }
    else{
        newTheme="dark";
    }
    console.log("current theme : " + cur);
    console.log("new Theme : " + newTheme);
    setTheme(newTheme);
    showTheme();
}

// set // get // show / change

function setTheme(theme){
    localStorage.setItem("theme",theme);
}

function getTheme(){
    var theme = localStorage.getItem("theme");
    return theme == null? 'light':theme;
}

function showTheme(){
    var theme = getTheme();
    if(theme == "dark"){
        document.querySelector("html").classList.add(theme);

        document.querySelectorAll(".theme_name").forEach((element) => {
            element.innerHTML="Dark";
        })
        document.querySelectorAll(".theme_moon").forEach((element) =>{
            element.style.display="inline";
        })
        document.querySelectorAll(".theme_sun").forEach((element) => {
            element.style.display="none";
        })
    }
    else{

        document.querySelectorAll(".theme_name").forEach((element,index) => {
            element.innerHTML="Light";
        })
        document.querySelectorAll(".theme_moon").forEach((element) =>{
            element.style.display="none";
        })
        document.querySelectorAll(".theme_sun").forEach((element) => {
            element.style.display="inline";
        })

    }
}