// ===========================
// 1. GET ELEMENTS
// ===========================
var form = document.getElementById("studentForm");
var tableBody = document.getElementById("studentTable");
var nameInput = document.getElementById("name");
var idInput = document.getElementById("studentId");
var emailInput = document.getElementById("email");
var contactInput = document.getElementById("contact");
var tableContainer = document.getElementsByClassName("table-container")[0];

// ===========================
// 2. DATA VARIABLES
// ===========================
var students = [];   // to store all records
var editIndex = -1;  // -1 = add mode, any other = edit mode

// ===========================
// 3. LOAD FROM LOCAL STORAGE
// ===========================
var savedStudents = localStorage.getItem("students");
if (savedStudents != null) {
    students = JSON.parse(savedStudents);
}
showStudents(); // show existing records

// ===========================
// 4. ADD / UPDATE STUDENT
// ===========================
form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page reload

    // 🔹 Use semantic HTML5 validation
    if (!form.checkValidity()) {
        // This shows error messages next to the invalid input
        form.reportValidity();
        return; // stop if form is invalid
    }

    // If we reach here, all fields are:
    // - not empty (required)
    // - match pattern rules
    // - valid email

    // Get values
    var name = nameInput.value.trim();
    var id = idInput.value.trim();
    var email = emailInput.value.trim();
    var contact = contactInput.value.trim();

    // Create student object
    var student = {
        name: name,
        id: id,
        email: email,
        contact: contact
    };

    // Add or update
    if (editIndex === -1) {
        // add new record
        students.push(student);
    } else {
        // update existing record
        students[editIndex] = student;
        editIndex = -1;
    }

    // Save and refresh
    saveStudents();
    showStudents();

    // Clear form
    form.reset();
});

// ===========================
// 5. SAVE TO LOCAL STORAGE
// ===========================
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// ===========================
// 6. SHOW STUDENTS IN TABLE
// ===========================
function showStudents() {
    tableBody.innerHTML = ""; // clear table

    for (var i = 0; i < students.length; i++) {
        var row = "<tr>" +
            "<td>" + students[i].name + "</td>" +
            "<td>" + students[i].id + "</td>" +
            "<td>" + students[i].email + "</td>" +
            "<td>" + students[i].contact + "</td>" +
            "<td>" +
            "<button onclick='editStudent(" + i + ")'>Edit</button> " +
            "<button onclick='deleteStudent(" + i + ")'>Delete</button>" +
            "</td>" +
            "</tr>";

        tableBody.innerHTML += row;
    }

    updateScrollbar();
}

// ===========================
// 7. EDIT STUDENT
// ===========================
function editStudent(index) {
    var student = students[index];

    nameInput.value = student.name;
    idInput.value = student.id;
    emailInput.value = student.email;
    contactInput.value = student.contact;

    editIndex = index; // remember which row is being edited
}

// ===========================
// 8. DELETE STUDENT
// ===========================
// ================= Modal Variables =================
var deleteModal = document.getElementById("deleteModal");
var confirmDeleteBtn = document.getElementById("confirmDelete");
var cancelDeleteBtn = document.getElementById("cancelDelete");

var deleteIndex = -1; // store which record to delete

// ================= SHOW CUSTOM POPUP =================
function deleteStudent(index) {
    deleteIndex = index;
    deleteModal.style.display = "flex"; // show modal centered
}

// ================= CONFIRM DELETE =================
confirmDeleteBtn.addEventListener("click", function () {
    students.splice(deleteIndex, 1);
    saveStudents();
    showStudents();
    deleteModal.style.display = "none";
});

// ================= CANCEL DELETE =================
cancelDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
});


// ===========================
// 9. DYNAMIC VERTICAL SCROLLBAR
// ===========================
function updateScrollbar() {
    if (students.length > 5) {
        tableContainer.style.maxHeight = "300px";
        tableContainer.style.overflowY = "auto";   // vertical scroll
    } else {
        tableContainer.style.maxHeight = "none";
        tableContainer.style.overflowY = "visible";
    }
}
