console.log("Dashboard2.js");

var paidData = 0;
var unpaidData = 0;
var partialPaidData = 0;

var paidAmount = 0;
var unpaidAmount = 0;
var partialPaidAmount = 0;
var dataArray = null;

// Call chartData function to initiate the process
chartData();

// Fetching data for chart and filtering data
async function chartData() {
    try {
        const response = await fetch(`/api/bills/data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            dataArray = data;

            // Reset data counts
            paidData = 0;
            unpaidData = 0;
            partialPaidData = 0;

            // Loop through the data and count each status
            dataArray.forEach(bill => {
                if (bill.status == "paid") {
                    paidData++;
                    paidAmount += bill.rate;
                } else if (bill.status == "unpaid") {
                    unpaidData++;
                    unpaidAmount +=bill.rate;
                } else {
                    partialPaidData++;
                    partialPaidAmount +=bill.rate;
                }
            });

            console.log(paidData, unpaidData, partialPaidData);
            console.log(paidAmount, unpaidAmount, partialPaidAmount);

            // Now that the data is processed, create the chart
            createChart();

            createBarChart();
            
        } else {
            console.log("Not runned");
        }
    } catch (error) {
        console.log("Error: " + error);
    }
}

// Function to create the chart after data is available
function createChart() {
    const ctx = document.getElementById('billStatusChart').getContext('2d');

    const billStatusChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Paid', 'Unpaid', 'Partially-paid'],
            datasets: [{
                label: 'Bill Status',
                data: [paidData, unpaidData, partialPaidData],
                backgroundColor: [
                    'rgba(45, 184, 76, 0.85)',
                    'rgba(211, 47, 47, 0.85)',
                    'rgba(234, 88, 12, 0.85)'
                ],
                hoverOffset: 4,
                borderColor: [
                    'rgba(45, 184, 76, 1)',
                    'rgba(211, 47, 47, 1)',
                    'rgba(234, 88, 12, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'round', 
                        boxWidth: 15,
                        boxHeight: 15,
                        padding: 20
                    }
                    
                },
                tooltip: {
                    enabled: true
                }
            },
            
        }

    });
}

function createBarChart() {
    const ctx = document.getElementById('amountStatus').getContext('2d');

    const amountStatus = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Paid', 'Unpaid', 'Partially-paid'], 
            datasets: [{
                label: 'Total Amount', 
                data: [paidAmount, unpaidAmount, partialPaidAmount], 
                backgroundColor: [
                    'rgba(45, 184, 76, 0.85)', 
                    'rgba(211, 47, 47, 0.85)', 
                    'rgba(234, 88, 12, 0.85)'  
                ],
                borderColor: [
                    'rgba(45, 184, 76, 1)',  
                    'rgba(211, 47, 47, 1)',  
                    'rgba(234, 88, 12, 1)'   
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true, // Use custom point styles
                        pointStyle: 'round', 
                        boxWidth: 15,
                        boxHeight: 15,
                        borderRadius: 10, // Set border radius for legend boxes
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Bill Amounts' // X-axis title
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₹)' // Y-axis title
                    }
                }
            }
        }
    });
}
