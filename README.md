# Student Registration System

A responsive web-based Student Registration System built using HTML, CSS, and JavaScript.  
This system allows users to add, edit, delete, and manage student records with data persistence using LocalStorage.

---

## Project Overview

This project was developed as part of an academic assignment to demonstrate:

- Form validation
- CRUD operations (Create, Read, Update, Delete)
- LocalStorage usage
- Responsive web design
- Dynamic UI behavior

---

## Features

- Add new student records  
- Edit existing student details  
- Delete student records with confirmation modal  
- Prevent duplicate Student ID, Email, and Contact Number  
- Custom popup modal for validation errors  
- Dynamic vertical scrollbar  
- Fully responsive (Mobile, Tablet, Desktop)  
- Data persistence using LocalStorage  



##  Input Validation

- Student Name => Accepts only alphabetic characters  
- Student ID => Accepts only numbers  
- Email => Valid email format required  
- Contact Number => Minimum 10 digits (numbers only)  


##  Responsive Design

The system is fully responsive across:

-  Mobile (≤ 640px)
-  Tablet (641px – 1024px)
-  Desktop (≥ 1025px)

Implemented using CSS media queries.

---

##  Data Persistence

Student data is stored using the browser's **LocalStorage**.

- Data remains available even after refreshing the page.
- Uses `localStorage.setItem()` and `localStorage.getItem()`.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES5)
- LocalStorage API

---

## Project Structure
 
student-registration-system/
│
├── index.html
├── style.css
├── index.js
└── README.md



---

##  How to Run the Project

1. Clone the repository:   git clone https://github.com/Abhi123-avi/student-registration-system.git

2. Open `index.html` in any modern web browser.


## Author

Abhinav Kumar
