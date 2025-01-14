console.log("budget.js");

// month and year autofill
const month = document.getElementById("month");
const year = document.getElementById("year");
const income = document.getElementById("income");
const budget = document.getElementById("budget");
const goal = document.getElementById("goal");

income.value="";
budget.value="";
goal.value="";


const date = new Date();
const monthMap = ['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
const monthName = monthMap[date.getMonth()]
const yearName = date.getFullYear();

month.value = monthName;
year.value = yearName;

function checkForm(){
    var income =Number(document.getElementById("income").value.trim());
    var budget =Number(document.getElementById("budget").value.trim());
    var goal =Number(document.getElementById("goal").value.trim());

    console.log("inside form submission checker");
    console.log(typeof income);

    if(income > 1 && budget > 1 && goal > 1){
        if(budget < income && budget > goal){
            console.log('success')
            return true;
        }
        document.getElementById("budgetFormAlert").style.display="none";
        document.getElementById("budgetFormAlert2").style.display="block";
        return false;
    }
    document.getElementById("budgetFormAlert").style.display="block";
    document.getElementById("budgetFormAlert2").style.display="none";
    return false;
}


// check monthly budget exists or not 
checkMonthlyBudgetStatus();
async function checkMonthlyBudgetStatus(){
  showLoader();
    console.log("going to check monthly budget status");

    try {

        const response = await fetch(`/api/monthly`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if(response.ok){
            const data = await response.json();
            if(data.msg == "found"){
                document.getElementById("box").style.display="block";
                document.getElementById("budgetBox").style.display="none";
            }
            else{
              document.getElementById("box").style.display="none";
              document.getElementById("budgetBox").style.display="block";
            }
        }

    } catch (error) {
        console.log("error : " + error);
    }
    hideLoader();
}


var dataList= null;
yearlyData();
var yearlyArr = [];
const eleYearDrop = document.getElementById('yeardrop');
var yearVariable=null;

var totalIncome;
var totalBudget;
var totalExpense;
var totalSaving;

var goalData;


function startOthers(){
    fillYearDrop();
}

eleYearDrop.addEventListener("change",()=>{
    var year = eleYearDrop.value;
    getDataFromDataList(year);
    checkPresentOrOtherYear();
})

function getDataFromDataList(year){
    var data;
    console.log("inside first");

    dataList.forEach(item => {
        console.log("Inside loop");
        if(item.year == year){
            data = item;
        }
    })
    
    console.log(data);
    totalIncome = data.totalIncome;
    totalExpense = data.totalExpense
    totalSaving = data.totalSaving;
    totalBudget = data.totalBudget;

    createBarChart();

    fetchGoalData(year);
}

async function fetchGoalData(year){
    try {
        const response = await fetch(`/api/goal_data?year=${year}`,{
            method:"GET",
            headers:{
                "content-type" : "application/json"
            }
        })

        if(response.ok){
            const data = await response.json();
            console.log("perfect");
            console.log(data);
            goalData = data;

            createGoalChart();
        }
    } catch (error) {
        console.log("Error :  " + error);
    }
}

var goalDataPie = null;
function createGoalChart() {
  const goalDataId = document.getElementById("goalData");

  if (!goalDataId || !goalData) {
    console.error("Element or data missing for creating the chart!");
    return;
  }

  const ctx = goalDataId.getContext("2d");

  // Destroy the existing chart if it exists
  if (goalDataPie) {
    goalDataPie.destroy();
  }

  // Extract months and data
  const months = Object.keys(goalData);
  const data = [];
  const colors = [];

  months.forEach((month) => {
    const [goal, liveBudget] = goalData[month];

    if (goal === null || liveBudget === null) {
      // No data for the month
      data.push(0);
      colors.push("rgba(128, 128, 128, 0.85)"); // Grey
    } else if (liveBudget > goal) {
      // Goal met
      data.push(liveBudget-goal);
      colors.push("rgba(45, 184, 76, 0.85)"); // Green
    } else {
      // Goal not met
      data.push(liveBudget-goal);
      colors.push("rgba(211, 47, 47, 0.85)"); // Red
    }
  });

  // Create the Chart
  goalDataPie = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months.map((month) => month), // Use uppercase for better readability
      datasets: [
        {
          label: "Your saving ",
          data: data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.85", "1")), // Use the same color with full opacity for borders
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, // No legend for a single dataset
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Months",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Amount (₹)",
          },
        },
      },
    },
  });
}



function fillYearDrop(){
   dataList.forEach((item,index) =>{
    yearlyArr[index]  = item.year;
    console.log(index + " " + item.year);
   });

   yearlyArr.sort((a,b) => b-a);
   for(let i = 0;i<yearlyArr.length;i++){
    const option = document.createElement("option");
    option.value=yearlyArr[i];
    option.innerHTML=yearlyArr[i];

    eleYearDrop.appendChild(option);
   }
  //  var option = document.createElement("option");
  //  option.value="All";
  //  option.innerHTML="All";
  //  eleYearDrop.appendChild(option);

   yearVariable = yearlyArr[0];

   console.log(yearVariable);

   checkPresentOrOtherYear();
}

function checkPresentOrOtherYear(){
  var value = eleYearDrop.value;
  console.log("value : " + value)

  var presentYear  = new Date().getFullYear();
  if(value == presentYear){
    console.log("yes")

    console.log(document.getElementById("yearDetail"));
    document.getElementById("yearDetail").style.display="none";
    document.getElementById("present").style.display="block";
  }
  else{
    console.log("none");
    document.getElementById("yearDetail").style.display="block";
    document.getElementById("present").style.display="none";
  } 
}
async function yearlyData(){
    console.log("yearlyData");
    try{
        const response = await fetch(`/api/allYealyData`,{
            method:"GET",
            headers:{
                "content-type" : "application/json"
            }
        })

        if(response.ok){
            const data = await response.json();

            console.log(data);
            dataList = data;
            console.log("dataList: " + dataList)
            startOthers();
        }
    }
    catch(error){
        console.log("error : " + error);
    }
}


var amountStatus = null;
function createBarChart() {
    const amountStatusId = document.getElementById("amountStatus");

    console.log("hello inside ffrom create chart bar");
  
    if (amountStatusId) {
      const ctx = amountStatusId.getContext("2d");

      if(amountStatus){
        amountStatus.destroy();
      }
      amountStatus = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Income", "Total Budget", "Total Expense","Total Saving"],
          datasets: [
            {
              label: "Total Amount",
              data: [totalIncome,totalBudget,totalExpense,totalBudget],
              backgroundColor: [
                "rgba(45, 184, 76, 0.85)",
                "rgba(211, 47, 47, 0.85)",
                "rgba(234, 88, 12, 0.85)",
                "rgba(191,0,254,0.85)"
              ],
              borderColor: [
                "rgba(45, 184, 76, 1)",
                "rgba(211, 47, 47, 1)",
                "rgba(234, 88, 12, 1)",
                "rgba(191,0,254,1)"
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
  
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true, // Use custom point styles
                pointStyle: "round",
                boxWidth: 15,
                boxHeight: 15,
                borderRadius: 10, // Set border radius for legend boxes
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Amount (₹)", // Y-axis title
              },
            },
          },
        },
      });
    }
  }