console.log("all report.js");

getMonthAndYears();
var userData = null;

async function getMonthAndYears(){
    showLoader();
    try {
        const response = await fetch(`/api/reportMonthAndYear`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        })


        if(response.ok){
            const data = await response.json();
            userData = data;
            
            feedData();
        }
    } catch (error) {
        console.log("Error : " + error);
    }
    hideLoader();
}

const yearDrop = document.getElementById("yeardrop");
const monthDrop = document.getElementById("monthdrop");

function feedData(){
    

    var years = [];
    Object.keys(userData).forEach((year) =>{
        years.push(year);
    })

    years.sort((a,b) => b - a);
    for(let i = 0;i<years.length;i++){
        const options = document.createElement("option");
        options.value=years[i];
        options.text = years[i];
        yearDrop.appendChild(options);
    }

    var options2 = document.createElement("option");
    options2.value="this";
    options2.text="This";
    options2.style.color="green";
    monthDrop.appendChild(options2);

    userData[years[0]].forEach((item)=>{
        const options = document.createElement("option");
        options.value=item.toLowerCase();
        options.text=item;
        monthDrop.appendChild(options);
    })
}

yearDrop.addEventListener("change",()=>{
    var input = yearDrop.value;
    monthDrop.innerHTML="";
    userData[input].forEach((item) =>{
        const options = document.createElement("option");
        options.value=item.toLowerCase();
        options.text=item;
        monthDrop.appendChild(options);
    })

    monthDrop.selectedIndex=0;
})