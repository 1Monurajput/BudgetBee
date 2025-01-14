console.log("hello this is bill 2");
let dataArray = [];
refreshDate();

function refreshDate(){
  var eleRefreshDate = document.querySelectorAll(".refreshDate");
  eleRefreshDate.forEach((ele) =>{
    
    var monthArray=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    var date = new Date().getDate();
    var month = monthArray[new Date().getMonth()];
    ele.innerHTML= date + " " +  month;
  })
}

fetchData();
// filter button activation styling
const filterBtn = document.querySelectorAll(".filter-btn");
filterBtn.forEach((buttons) => {
  buttons.addEventListener("click", () => {
    filterBtn.forEach((btn) => {
      btn.classList.remove("active-btn");
    });

    buttons.classList.add("active-btn");
  });
});

// page sorting and filter all,paid,unpaid,partially paid

const allBill = document.getElementById("all-bill");
const billPaid = document.getElementById("bill-paid");
const billUnpaid = document.getElementById("bill-unpaid");
const billPartial = document.getElementById("bill-partial");
const billSearch = document.getElementById("bill-search");

const allBtn = document.getElementById("all-btn");
const paidBtn = document.getElementById("paid-btn");
const unpaidBtn = document.getElementById("unpaid-btn");
const partiallyBtn = document.getElementById("partially-btn");

allBtn.addEventListener("click", () => {
  billPaid.style.display = "none";
  billUnpaid.style.display = "none";
  billPartial.style.display = "none";
  billSearch.style.display = "none";
  allBill.style.display = "table";
});


//paid
paidBtn.addEventListener("click", () => {
  billUnpaid.style.display = "none";
  billPartial.style.display = "none";
  allBill.style.display = "none";
  billSearch.style.display = "none";
  billPaid.style.display = "table";

  var filteredArray = dataArray.filter((item) => item.status == "paid");

  var tableBody = document.getElementById("bill-table-body");
  tableBody.innerHTML = "";

  filteredArray.forEach((bill) => {
    var row = document.createElement("tr");
    row.className =
      "bill odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

    row.innerHTML = `
      <th scope="row" class="title px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${bill.title}</th>
    <td class="rate px-6 py-4">${bill.rate}</td>
      <td class="hidden description">${bill.description}</td>
      <td class="hidden currency">${bill.currency}</td>
      <td class="hidden categories">${bill.categories}</td>
      <td class="hidden biller">${bill.biller}</td>
      <td class="hidden billerPhone">${bill.billerPhone}</td>
      <td class="hidden time">${bill.time}</td>
      <td class="hidden billId">${bill.billId}</td>
      <td class="hidden method">${bill.method}</td>
      <td class="hidden attachement">${bill.billAttachement}</td>

      <td class="status px-6 py-4 text-emtext">Paid</td>
      <td class="duedate px-6 py-4 text-danger">${bill.dueDate}</td>
      <td class="date px-6 py-4">${bill.date}</td>
      <td class="px-6 py-4">
        <div class="flex gap-3 items-center">
          <i class="fa-solid fa-paperclip text-lightextra cursor-pointer"></i>
          <button onclick="billModalBtn(event)">
            <i id="billModalBtn" class="fa-solid fa-eye text-emtext cursor-pointer"></i>
          </button>
          <button onclick="deleteBill('${bill.billId}', event)">
            <i class="fa-solid fa-trash text-danger cursor-pointer"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });
});

unpaidBtn.addEventListener("click", () => {
  billPaid.style.display = "none";
  billPartial.style.display = "none";
  allBill.style.display = "none";
  billSearch.style.display = "none";
  billUnpaid.style.display = "table";

  var filteredArray = dataArray.filter((item) => item.status == "unpaid");

  var tableBody = document.getElementById("bill-table-body-unpaid");
  tableBody.innerHTML = "";

  filteredArray.forEach((bill) => {
    var row = document.createElement("tr");
    row.className =
      "bill odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

    row.innerHTML = `
      <th scope="row" class="title px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${bill.title}</th>
    <td class="rate px-6 py-4">${bill.rate}</td>
      <td class="hidden description">${bill.description}</td>
      <td class="hidden currency">${bill.currency}</td>
      <td class="hidden categories">${bill.categories}</td>
      <td class="hidden biller">${bill.biller}</td>
      <td class="hidden billerPhone">${bill.billerPhone}</td>
      <td class="hidden time">${bill.time}</td>
      <td class="hidden billId">${bill.billId}</td>
      <td class="hidden method">${bill.method}</td>
      <td class="hidden attachement">${bill.billAttachement}</td>
      <td class="status px-6 py-4 text-danger">Unpaid</td>
      <td class="duedate px-6 py-4 text-danger">${bill.dueDate}</td>
      <td class="date px-6 py-4">${bill.date}</td>
      <td class="px-6 py-4">
        <div class="flex gap-3 items-center">
          <i class="fa-solid fa-paperclip text-lightextra cursor-pointer"></i>
          <button onclick="billModalBtn(event)">
            <i id="billModalBtn" class="fa-solid fa-eye text-emtext cursor-pointer"></i>
          </button>
          <button onclick="deleteBill('${bill.billId}', event)">
            <i class="fa-solid fa-trash text-danger cursor-pointer"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });
});

partiallyBtn.addEventListener("click", () => {
  billPaid.style.display = "none";
  billUnpaid.style.display = "none";
  allBill.style.display = "none";
  billSearch.style.display = "none";
  billPartial.style.display = "table";

  var filteredArray = dataArray.filter(
    (item) => item.status == "partially"
  );

  var tableBody = document.getElementById("bill-table-body-partial");
  tableBody.innerHTML = "";

  filteredArray.forEach((bill) => {
    var row = document.createElement("tr");
    row.className =
      "bill odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

    row.innerHTML = `
      <th scope="row" class="title px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${bill.title}</th>
    <td class="rate px-6 py-4">${bill.rate}</td>
      <td class="hidden description">${bill.description}</td>
      <td class="hidden currency">${bill.currency}</td>
      <td class="hidden categories">${bill.categories}</td>
      <td class="hidden biller">${bill.biller}</td>
      <td class="hidden billerPhone">${bill.billerPhone}</td>
      <td class="hidden time">${bill.time}</td>
      <td class="hidden billId">${bill.billId}</td>
      <td class="hidden method">${bill.method}</td>
      <td class="hidden attachement">${bill.billAttachement}</td>
      <td class="status hidden px-6 py-4 text-danger">partially</td>
      <td class="px-6 py-4 text-danger">Partially-paid</td>
      <td class="duedate px-6 py-4 text-danger">${bill.dueDate}</td>
      <td class="date px-6 py-4">${bill.date}</td>
      <td class="px-6 py-4">
        <div class="flex gap-3 items-center">
          <i class="fa-solid fa-paperclip text-lightextra cursor-pointer"></i>
          <button onclick="billModalBtn(event)">
            <i id="billModalBtn" class="fa-solid fa-eye text-emtext cursor-pointer"></i>
          </button>
          <button onclick="deleteBill('${bill.billId}', event)">
            <i class="fa-solid fa-trash text-danger cursor-pointer"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });
});


// search bill
var flag = false;
function searchBill() {
  var input = document.getElementById("searchBar").value.trim().toLowerCase();
  console.log("inside search")

  if(input.length < 2 && flag == false){
    console.log("if")
    return;
  }
  else if(input.length >= 2) {
    console.log("else if");

    flag = true;
    console.log("inside input")
    billPaid.style.display = "none";
    billUnpaid.style.display = "none";
    allBill.style.display = "none";
    billPartial.style.display = "none";
    billSearch.style.display = "table";

    filterBtn.forEach(buttons =>{
      buttons.classList.remove("active-btn");
      buttons.disabled = true;
    })


    //search logic 

    var filteredArray = dataArray.filter(item => {
      var billTitle = item.title.toLowerCase().includes(input);
      var billDate = item.date.includes(input);
      var due = item.dueDate.includes(input);
      return billTitle || billDate || due;
    })

    console.log(dataArray)
    console.log(filteredArray)

    var tableBody = document.getElementById("bill-table-body-search");
  tableBody.innerHTML = "";

  filteredArray.forEach((bill) => {
    showLoader();
    var newBillStatus = null;
    var textColor = null;
    if(bill.status == 'paid'){
      newBillStatus = "Paid";
      textColor = 'text-emtext';
    }
    else if(bill.status == "unpaid"){
      newBillStatus = "Unpaid";
      textColor = 'text-danger';
    }
    else{
      newBillStatus = "Partially-paid";
      textColor = 'text-danger';
    }

    var row = document.createElement("tr");
    row.className =
      "bill odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

    row.innerHTML = `
      <th scope="row" class="title px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${bill.title}</th>
    <td class="rate px-6 py-4">${bill.rate}</td>
      <td class="hidden description">${bill.description}</td>
      <td class="hidden currency">${bill.currency}</td>
      <td class="hidden categories">${bill.categories}</td>
      <td class="hidden biller">${bill.biller}</td>
      <td class="hidden billerPhone">${bill.billerPhone}</td>
      <td class="hidden time">${bill.time}</td>
      <td class="hidden billId">${bill.billId}</td>
      <td class="hidden method">${bill.method}</td>
      <td class="hidden attachement">${bill.billAttachement}</td>
      <td class="status hidden px-6 py-4 text-danger">${bill.status}</td>
      <td class="px-6 py-4 ${textColor}">${newBillStatus}</td>
      <td class="duedate px-6 py-4 text-danger">${bill.dueDate}</td>
      <td class="date px-6 py-4">${bill.date}</td>
      <td class="px-6 py-4">
        <div class="flex gap-3 items-center">
          <i class="fa-solid fa-paperclip text-lightextra cursor-pointer"></i>
          <button onclick="billModalBtn(event)">
            <i id="billModalBtn" class="fa-solid fa-eye text-emtext cursor-pointer"></i>
          </button>
          <button onclick="deleteBill('${bill.billId}', event)">
            <i class="fa-solid fa-trash text-danger cursor-pointer"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
    hideLoader();
  });

  }
  else{
    console.log("else")
    flag = false;
    filterBtn.forEach(buttons =>{
      buttons.disabled = false;
    })
    allBtn.classList.add("active-btn");

    billPaid.style.display = "none";
    billUnpaid.style.display = "none";
    billPartial.style.display = "none";
    billSearch.style.display = "none";
    allBill.style.display = "table";

  }


}



// to fetch data from database
async function fetchData() {
  showLoader();

  var year = new Date().getFullYear();
  var monthArray =["jan","feb","march","april","may","june","july","aug","sep","oct","nov","december"];
  var month = monthArray[new Date().getMonth()];
  console.log(month);
  try {
    const response = await fetch(`/api/monthly_bill?month=${month}&year=${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("its working fine");
      const data = await response.json();
      dataArray = data;
    }
  } catch (error) {
    console.log("Error: " + error);
  }

  hideLoader();
}
