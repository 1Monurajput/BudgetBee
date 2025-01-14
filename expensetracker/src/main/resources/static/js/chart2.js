console.log("chart2.js");

const yearDrop2 = document.getElementById("yeardrop");
const monthdrop2 = document.getElementById("monthdrop");

const eleIncome = document.getElementById("income");
const eleBudget = document.getElementById("budget");
const eleGoal = document.getElementById("goal");
const eleReach = document.getElementById("reach");
const eleRecorded = document.getElementById("recorded");
const eleUnrecorded = document.getElementById("unrecorded");
const eleTotal = document.getElementById("total");
const eleLive = document.getElementById("live");
const eleMonth = document.getElementById("month");
const eleYear = document.getElementById("year");

var budget = 0;
var currentBudget = 0;
var goal = 0;
var budgetData= null;
var year = new Date().getFullYear();
var monthArray = [
  "jan",
  "feb",
  "March",
  "april",
  "june",
  "july",
  "aug",
  "sep",
  "oct",
  "nov",
  "december",
];
var month = monthArray[new Date().getMonth()];


var paidData = 0;
var unpaidData = 0;
var partialPaidData = 0;

var paidAmount = 0;
var unpaidAmount = 0;
var partialPaidAmount = 0;

var homeCat = 0;
var electronics = 0;
var fashion = 0;
var books = 0;
var sports = 0;
var trip = 0;
var other = 0;

var homeCatAmounts = 0;
var electronicsAmounts = 0;
var fashionAmounts = 0;
var booksAmounts = 0;
var sportsAmounts = 0;
var tripAmounts = 0;
var otherAmounts = 0;
var dataArray = null;

monthlyData();
monthlyBillsData();

const eleFunctionalChart = document.querySelectorAll(".functional-chart");
const eleNonFunctionalChart = document.querySelectorAll(
  ".non-functional-chart"
);


yearDrop2.addEventListener("change", () => {
  year = yearDrop2.value;
  monthlyBillsData();
});

monthdrop2.addEventListener("change", () => {
  month = monthdrop2.value;
  if(month ==="Dec"){
    month = 'december';
  }
  monthlyBillsData();
  console.log(month);
});

function indianCurrency(num){

  var number = num.toLocaleString('en-IN');
  return number;
}

async function monthlyData() {
  showLoader();
  console.log("monthly data");

  try {
    const response = await fetch(
      `/api/monthly_yearly_data?month=${month}&year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      budgetData = data;

      if (data.income != null && data.income > 100) {
        
        showFunctionalChart();

        budget = data.budget;
      currentBudget = data.liveBudget;
      goal = data.goal;
      
      eleMonth.innerHTML=data.month;
      eleYear.innerHTML=data.year;
      eleIncome.innerHTML=indianCurrency(data.income) + "₹";
      eleBudget.innerHTML=indianCurrency(data.budget)+ "₹";
      eleGoal.innerHTML=indianCurrency(data.goal) + "₹";
      if(data.goal == true){
        eleReach.innerHTML = "Yes";
      }
      else{
        eleReach.innerHTML = "No";
      }
      eleUnrecorded.innerHTML=indianCurrency(data.unrecodedExpense) + "₹";
      eleRecorded.innerHTML=indianCurrency(data.expense)+ "₹";
      eleTotal.innerHTML = indianCurrency(data.totalExpense) + "₹";

      createBudgetToCurrentBudget();
      createBudgetToGoal();

      } else {
        hideFunctionalChart();
      }
    } else {
      hideFunctionalChart();
    }
  } catch (error) {
    console.log("error : " + error);
  }
  hideLoader();
}

async function monthlyBillsData(){
  showLoader();
  console.log("monthly Bills data...................");
  console.log(monthdrop2);
  try {
    const response = await fetch(`/api/monthly_bill?month=${month}&year=${year}`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.ok){
      const data = await response.json();
      console.log(data);

      dataArray = data;

      // Reset data counts
      paidData = 0;
      unpaidData = 0;
      partialPaidData = 0;

      // Loop through the data and count each status
      dataArray.forEach((bill) => {
        if (bill.status == "paid") {
          paidData++;
          paidAmount += bill.rate;
        } else if (bill.status == "unpaid") {
          unpaidData++;
          unpaidAmount += bill.rate;
        } else {
          partialPaidData++;
          partialPaidAmount += bill.rate;
        }

        switch (bill.categories) {
          case "home":
            homeCat++;
            homeCatAmounts += bill.rate;
            break;

          case "electronics":
            electronics++;
            electronicsAmounts += bill.rate;
            break;

          case "fashion":
            fashion++;
            fashionAmounts += bill.rate;
            break;

          case "books":
            books++;
            booksAmounts += bill.rate;
            break;

          case "sports":
            sports++;
            sportsAmounts += bill.rate;
            break;

          case "trip":
            trip++;
            tripAmounts += bill.rate;
            break;

          default:
            other++;
            otherAmounts +=bill.rate;
            break;
        }

        createChart();
        createCatChart();
        createBarChart()
        createCatAmountChart()

      });


    }

  } catch (error) {
    console.log("error : " + error);
  }


  console.log("year : " + year);
  console.log("Month : " + month);

  var eleLive = document.getElementById("live");
  var liveYear = new Date().getFullYear();
  var liveMonth = monthArray[new Date().getMonth()];
  console.log("live year : " + liveYear);
  console.log("live Month : " + liveMonth);

  if(liveYear == year && (month == liveMonth || month == "this")){
    eleLive.style.display="block";
  }
  else{
    eleLive.style.display="none"
  }
  hideLoader();
}

// this chart is for budget to currentBudget;
function createBudgetToCurrentBudget() {
  const budgetTocurrentBudget = document.getElementById(
    "budgetToCurrentBudget"
  );
  if (budgetTocurrentBudget) {
    const ctx = budgetTocurrentBudget.getContext("2d");
    var usedBudget = budget - currentBudget;
    const eleTotalBill = document.getElementById("totalBudget");
    if (eleTotalBill) {
      eleTotalBill.innerHTML = budget + "₹";
    }

    const budgetToCurrentBudgetPie = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Used budget", "Remaining budget"],
        datasets: [
          {
            label: "Budget to remaining budget",
            data: [usedBudget, currentBudget],
            backgroundColor: [
              "rgba(211, 47, 47, 0.85)",
              "rgba(45, 184, 76, 0.85)",
            ],
            hoverOffset: 4,
            borderColor: ["rgba(211, 47, 47, 1)", "rgba(45, 184, 76, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "round",
              boxWidth: 15,
              boxHeight: 15,
              padding: 15,
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}

function createBudgetToGoal() {
  
  const budgetToGoal = document.getElementById("budgetToGoal");

  if (budgetToGoal) {
    
    const ctx = budgetToGoal.getContext("2d");

    const usedBudget = budget - currentBudget; // Budget already used
    const remainingBudget = budget - usedBudget; // Remaining budget
    const goalDifference = remainingBudget - goal; // Budget left after achieving the goal

    let labels, data, backgroundColor;

    if (goalDifference >= 0) {
      // Goal can be achieved
      labels = ["Goal", "After Goal", "Used Budget"];
      data = [goal, goalDifference, usedBudget];
      backgroundColor = [
        "rgba(45, 184, 76, 0.85)", // Green for goal
        "rgba(191, 0, 254, 0.85)", // Blue for remaining budget
        "rgba(211, 47, 47, 0.85)", // Red for used budget
      ];
    } else {
      // Goal cannot be achieved
      labels = ["Used Budget", "Insufficient Budget to Reach Goal"];
      data = [usedBudget, Math.abs(goalDifference)];
      backgroundColor = [
        "rgba(211, 47, 47, 0.85)", // Red for used budget
        "rgba(255, 193, 7, 0.85)", // Yellow for insufficient budget
      ];
    }

    // Create the chart
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Budget to Goal",
            data: data,
            backgroundColor: backgroundColor,
            hoverOffset: 4,
            borderColor: backgroundColor.map((color) =>
              color.replace("0.85", "1")
            ), // Matching borders
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "round",
              boxWidth: 15,
              boxHeight: 15,
              padding: 12,
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}

let billStatusChartInstance = null;
function createChart() {
  const statusChart = document.getElementById("billStatusChart");
  if (statusChart) {
    const ctx = statusChart.getContext("2d");

    if (billStatusChartInstance) {
      billStatusChartInstance.destroy();
    }

     billStatusChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Paid", "Unpaid", "Partially-paid"],
        datasets: [
          {
            label: "Bill Status",
            data: [paidData, unpaidData, partialPaidData],
            backgroundColor: [
              "rgba(45, 184, 76, 0.85)",
              "rgba(211, 47, 47, 0.85)",
              "rgba(234, 88, 12, 0.85)",
            ],
            hoverOffset: 4,
            borderColor: [
              "rgba(45, 184, 76, 1)",
              "rgba(211, 47, 47, 1)",
              "rgba(234, 88, 12, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "round",
              boxWidth: 15,
              boxHeight: 15,
              padding: 20,
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}

let catChartPie = null;
function createCatChart() {
  const catChart = document.getElementById("catChart");
  if (catChart) {
    const ctx = catChart.getContext("2d");
    if(catChartPie){
      catChartPie.destroy();
    }

    catChartPie = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "Home",
          "Electronics",
          "Fashion",
          "Books",
          "Sports",
          "Trip",
          "Other/Untracked",
        ],
        datasets: [
          {
            label: "Bill Category",
            data: [homeCat, electronics, fashion, books, sports, trip, other],
            backgroundColor: [
              "rgba(74, 144, 226, 0.85)",
              "rgba(234, 88, 12, 0.85)",
              "rgba(191, 0, 254, 0.85)",
              "rgba(34, 151, 153, 0.85)",
              "rgba(208, 2, 27, 0.85)",
              "rgba(45, 184, 76, 0.85)",
              "rgba(100, 116, 139,0.8)",
            ],
            hoverOffset: 4,
            borderColor: [
              "rgba(74, 144, 226, 1)",
              "rgba(234, 88, 12, 1)",
              "rgba(191, 0, 254, 1)",
              "rgba(34, 151, 153, 1)",
              "rgba(208, 2, 27, 1)",
              "rgba(45, 184, 76, 1)",
              "rgba(100, 116, 139,1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "round",
              boxWidth: 15,
              boxHeight: 15,
              padding: 10,
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}

var amountStatus = null;
function createBarChart() {
  const amountStatusId = document.getElementById("amountStatus");

  if (amountStatusId) {
    const ctx = amountStatusId.getContext("2d");

    if(amountStatus){
      amountStatus.destroy();
    }

     amountStatus = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Paid", "Unpaid", "Partially-paid"],
        datasets: [
          {
            label: "Total Amount",
            data: [paidAmount, unpaidAmount, partialPaidAmount],
            backgroundColor: [
              "rgba(45, 184, 76, 0.85)",
              "rgba(211, 47, 47, 0.85)",
              "rgba(234, 88, 12, 0.85)",
            ],
            borderColor: [
              "rgba(45, 184, 76, 1)",
              "rgba(211, 47, 47, 1)",
              "rgba(234, 88, 12, 1)",
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

let catAmountChart = null;
function createCatAmountChart() {
  const catAmount = document.getElementById("catAmount");
  if (catAmount) {
    const ctx = catAmount.getContext("2d");

    if(catAmountChart){
      catAmountChart.destroy();
    }
    catAmountChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Home",
          "Electronics",
          "Fashion",
          "Books",
          "Sports",
          "Trip",
          "Other/Untracked",
        ],
        datasets: [
          {
            label: "Total Amount",
            data: [
              homeCatAmounts,
              electronicsAmounts,
              fashionAmounts,
              booksAmounts,
              sportsAmounts,
              tripAmounts,
              otherAmounts,
            ],
            backgroundColor: [
              "rgba(74, 144, 226, 0.85)",
              "rgba(234, 88, 12, 0.85)",
              "rgba(191, 0, 254, 0.85)",
              "rgba(34, 151, 153, 0.85)",
              "rgba(208, 2, 27, 0.85)",
              "rgba(45, 184, 76, 0.85)",
              "rgba(100, 116, 139,0.8)",
            ],
            borderColor: [
              "rgba(74, 144, 226, 1)",
              "rgba(234, 88, 12, 1)",
              "rgba(191, 0, 254, 1)",
              "rgba(34, 151, 153, 1)",
              "rgba(208, 2, 27, 1)",
              "rgba(45, 184, 76, 1)",
              "rgba(100, 116, 139,1)",
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
              text: "Bill Categoriesd Amount", // X-axis title
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

nonFunctionChart();
function nonFunctionChart() {
  const nonFunctional = document.querySelectorAll(".non-functional");
  if (nonFunctional.length > 0) {
    nonFunctional.forEach((element) => {
      const ctx = element.getContext("2d");

      const nonFunctionalPie = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["No Data Found"],
          datasets: [
            {
              label: "Data",
              data: [100],
              backgroundColor: ["rgba(100, 116, 139,0.4)"],
              hoverOffset: 4,
              borderColor: ["rgba(100, 116, 139,0.6)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                pointStyle: "round",
                boxWidth: 15,
                boxHeight: 15,
                padding: 10,
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    });
  }
}

// to show all functional chart
function showFunctionalChart() {
  eleNonFunctionalChart.forEach((item) => {
    item.style.display = "none";
  });

  eleFunctionalChart.forEach((item) => {
    item.style.display = "block";
  });
}

function hideFunctionalChart() {
  eleFunctionalChart.forEach((item) => {
    item.style.display = "none";
  });

  eleNonFunctionalChart.forEach((item) => {
    item.style.display = "block";
  });
}
