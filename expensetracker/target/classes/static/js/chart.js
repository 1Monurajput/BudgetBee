console.log("Dashboard2.js");

// This page is handling all the related logic and function of chart

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

const eleFunctionalChart = document.querySelectorAll(".functional-chart");
const eleNonFunctionalChart = document.querySelectorAll(
  ".non-functional-chart"
);

var budget = 0;
var currentBudget = 0;
var goal = 0;

// Call chartData function to initiate the process
chartData();
monthlyChartData();

//call of nonFunctionChart
// document.addEventListener("DOMContentLoaded", () => {
//   nonFunctionChart();
// });
nonFunctionChart();



// Fetching data for chart and filtering data bill
async function chartData() {

  showLoader();
  try {
    var year = new Date().getFullYear();
    var monthArray = ["jan","feb","march","april","may","june","july","aug","sep","oct","nov","december"]
    var month = monthArray[new Date().getMonth()];
    const response = await fetch(`/api/monthly_bill?month=${month}&year=${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dataArray = data;

      localStorage.setItem("dataArray",JSON.stringify(dataArray));

      if (dataArray.length > 0) {
        showFunctionalChart();

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
        });
        

        // Now that the data is processed, create the chart
        createChart();

        createBarChart();

        createCatChart();

        createCatAmountChart();
      } else {
        console.log("dataArray is empty");
        hideFunctionalChart();
      }
    } else {
      console.log("Not data found");
      hideFunctionalChart();
    }
  } catch (error) {
    console.log("Error: " + error);
  }

  hideLoader();
}

// chart for non-functional-chart or demo chart
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

//fetching data for chart month budget

async function monthlyChartData() {
  console.log(" monthlyChartData() is calling");
  try {
    const response = await fetch(`/api/monthlybudget`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("working fine");
      const data = await response.json();
      console.log(data);

      budget = data.budget;
      currentBudget = data.liveBudget;
      goal = data.goal;
      createBudgetToCurrentBudget();
      createBudgetToGoal();
    }
  } catch (error) {
    console.log("Error : " + error);
  }
}

function indianCurrency(num){

  var number = num.toLocaleString('en-IN');
  return number;
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
    const eleCurBudget = document.getElementById("currentBudget");
    if(eleTotalBill){
      eleTotalBill.innerHTML = indianCurrency(budget) + "₹";
    }
    if(eleCurBudget){
      eleCurBudget.innerHTML = indianCurrency(currentBudget) + "₹";
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
  console.log("budgetToGoal");
  const budgetToGoal = document.getElementById("budgetToGoal");

  if (budgetToGoal) {
    console.log("inside budgetToGoal");
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
            borderColor: backgroundColor.map((color) => color.replace("0.85", "1")), // Matching borders
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




// Function to create the chart after data is available
function createChart() {
  const statusChart = document.getElementById("billStatusChart");
  if (statusChart) {
    const ctx = statusChart.getContext("2d");

    const billStatusChart = new Chart(ctx, {
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

// bar amount chart for paid,unpaid,partial
function createBarChart() {
  const amountStatusId = document.getElementById("amountStatus");

  if (amountStatusId) {
    const ctx = amountStatusId.getContext("2d");

    const amountStatus = new Chart(ctx, {
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

// categories chart
function createCatChart() {
  const catChart = document.getElementById("catChart");
  if (catChart) {
    const ctx = catChart.getContext("2d");

    const catChartPie = new Chart(ctx, {
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

function createCatAmountChart() {
  const catAmount = document.getElementById("catAmount");
  if (catAmount) {
    const ctx = catAmount.getContext("2d");

    const catAmountChart = new Chart(ctx, {
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
