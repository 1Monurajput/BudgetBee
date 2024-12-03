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
        document.getElementById("theme_name").innerHTML="Dark";
        document.getElementById("theme_moon").style.display="inline";
        document.getElementById("theme_sun").style.display="none";
    }
    else{
        document.getElementById("theme_name").innerHTML="Light";
        document.getElementById("theme_moon").style.display="none";
        document.getElementById("theme_sun").style.display="inline";
    }
    console.log("show theme activated")
}