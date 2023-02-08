const leaveData = [
    {
      employeeName: 'John Doe',
      leaveType: 'Vacation',
      fromDate: '2020-01-01',
      toDate: '2020-01-05',
      numberOfDays: 5,
      status: 'Approved'
    },
    {
      employeeName: 'Jane Doe',
      leaveType: 'Sick',
      fromDate: '2020-02-01',
      toDate: '2020-02-03',
      numberOfDays: 3,
      status: 'Pending'
    }
  ];
  
//   const leaveTable = document.querySelector('#leave-table');
  
const leaveTable = document.getElementById("leave-table");
const addLeaveForm = document.getElementById("add-leave-form");

  leaveData.forEach(leave => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${leave.employeeName}</td>
      <td>${leave.leaveType}</td>
      <td>${leave.fromDate}</td>
      <td>${leave.toDate}</td>
      <td>${leave.numberOfDays}</td>
      <td>${leave.status}</td>
    `;
    leaveTable.appendChild(row);
  });


//   const leaveTable = document.getElementById("leave-table");
// const addLeaveForm = document.getElementById("add-leave-form");

// Hard-coded leave requests
const leaveRequests = [
  {
    employeeName: "John Doe",
    leaveType: "Vacation",
    fromDate: new Date("2023-01-01"),
    toDate: new Date("2023-01-05"),
    status: "Approved"
  },
  {
    employeeName: "Jane Doe",
    leaveType: "Sick",
    fromDate: new Date("2023-01-07"),
    toDate: new Date("2023-01-07"),
    status: "Pending"
  }
];

// Render the leave requests in the table
function renderLeaveTable() {
  leaveTable.innerHTML = `
    <tr>
      <th>Employee Name</th>
      <th>Leave Type</th>
      <th>From Date</th>
      <th>To Date</th>
      <th>Number of Days</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  `;

  for (const leaveRequest of leaveRequests) {
    const numberOfDays = getNumberOfDays(
      leaveRequest.fromDate,
      leaveRequest.toDate
    );
    const status = leaveRequest.status;
    const action =
      status === "Pending"
        ? `<button data-index=${leaveRequests.indexOf(
            leaveRequest
          )} class="approve-button">Approve</button>`
        : "";

    leaveTable.innerHTML += `
      <tr>
        <td>${leaveRequest.employeeName}</td>
        <td>${leaveRequest.leaveType}</td>
        <td>${leaveRequest.fromDate.toDateString()}</td>
        <td>${leaveRequest.toDate.toDateString()}</td>
        <td>${numberOfDays}</td>
        <td>${status}</td>
        <td>${action}</td>
      </tr>
    `;
  }
}

// Calculate the number of days between two dates
function getNumberOfDays(fromDate, toDate) {
  const timeDiff = toDate.getTime() - fromDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Add a new leave request
addLeaveForm.addEventListener("submit", event => {
    event.preventDefault();
    const employeeName = document.getElementById("employee-name").value;
    const leaveType = document.getElementById("leave-type").value;
    const fromDate = new Date(document.getElementById("from-date").value);
    const toDate = new Date(document.getElementById("to-date").value);
  
    leaveRequests.push({
      employeeName,
      leaveType,
      fromDate,
      toDate,
      status: "Pending"
    });
  
    renderLeaveTable();
  });
  
  // Approve a leave request
  leaveTable.addEventListener("click", event => {
    if (event.target.classList.contains("approve-button")) {
      const index = event.target.dataset.index;
      leaveRequests[index].status = "Approved";
      renderLeaveTable();
    }
  });
  
  renderLeaveTable();
  