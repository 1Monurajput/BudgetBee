console.log("loader.js")

function showLoader(){
    var container = document.createElement("div");

    container.style.height = "100%";
    container.style.width="100%";
    container.style.backgroundColor = "rgba(118,118,118,.24)";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";

    var img = document.createElement("img");

    img.src = "/images/bee.gif";
    img.style.width = "150px";
    img.style.zIndex = "10000";

    container.appendChild(img);

    document.getElementById("loader").style.display="block";
    document.getElementById("loader").appendChild(container);
}
function showLoaderAddBill(){
    var container = document.createElement("div");

    container.style.height = "100%";
    container.style.width="100%";
    container.style.backgroundColor = "rgba(118,118,118,.24)";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";

    var img = document.createElement("img");

    img.src = "/images/bee.gif";
    img.style.width = "150px";
    img.style.zIndex = "10000";

    container.appendChild(img);

    document.getElementById("loader_addBill").style.display="block";
    document.getElementById("loader_addBill").appendChild(container);
}

function hideLoaderAddBill(){
    // document.getElementById("loader").style.display="none";
        document.getElementById("loader_addBill").style.display="none";
        console.log("in hide")
}

function hideLoader(){
    // document.getElementById("loader").style.display="none";
    setTimeout(()=>{
        document.getElementById("loader").style.display="none";
        console.log("in hide")
    },700);
}

