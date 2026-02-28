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
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    var name = nameInput.value.trim();
    var id = idInput.value.trim();
    var email = emailInput.value.trim();
    var contact = contactInput.value.trim();

    // 🔹 Check duplicate ID
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === id && i !== editIndex) {
            showError("Student ID already exists!");
            return;
        }
    }

    // 🔹 Check duplicate Email
    for (var i = 0; i < students.length; i++) {
        if (students[i].email === email && i !== editIndex) {
            showError("Email already exists!");
            return;
        }
    }

    // 🔹 Check duplicate Contact
    for (var i = 0; i < students.length; i++) {
        if (students[i].contact === contact && i !== editIndex) {
            showError("Contact number already exists!");
            return;
        }
    }

    var student = {
        name: name,
        id: id,
        email: email,
        contact: contact
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    saveStudents();
    showStudents();
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
// ================= ERROR MODAL VARIABLES =================
var errorModal = document.getElementById("errorModal");
var errorMessage = document.getElementById("errorMessage");
var closeErrorBtn = document.getElementById("closeError");
var deleteIndex = -1; // store which record to delete

// ================= SHOW CUSTOM POPUP =================
function deleteStudent(index) {
    deleteIndex = index;
    deleteModal.style.display = "flex"; // show modal centered
}

// ================= CONFIRM DELETE =================
confirmDeleteBtn.addEventListener("click", function () {

    students.splice(deleteIndex, 1);

    // Clear form if we were editing
    form.reset();
    editIndex = -1;

    saveStudents();
    showStudents();

    deleteModal.style.display = "none";
});

// ================= CANCEL DELETE =================
cancelDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
});

// ================= SHOW ERROR FUNCTION =================
function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = "flex";
}
closeErrorBtn.addEventListener("click", function () {
    errorModal.style.display = "none";
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
