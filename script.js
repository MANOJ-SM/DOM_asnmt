
document.addEventListener("DOMContentLoaded", () => {
    
    // loading from html 
    const studentForm = document.getElementById("studentForm");
    const studentsTableBody = document.querySelector("#studentsTable tbody");
    const addStudentButton = document.getElementById("addStudent");

    // load data from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // saving student data to localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem("students", JSON.stringify(students));
    };


    // creating dyanmic rows of  registered students
    const renderStudents = () => {
        studentsTableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentID}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            studentsTableBody.appendChild(row);
        });
    };


    // valdidating correct input from the user of the student form
    const validateInput = () => {
        const name = document.getElementById("name").value.trim();
        const studentID = document.getElementById("studentID").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();

        if (!name.match(/^[a-zA-Z\s]+$/)) return "Name must contain only letters.";
        if (!studentID.match(/^\d+$/)) return "Student ID must contain only numbers.";
        if (!email.match(/^\S+@\S+\.\S+$/)) return "Enter a valid email.";
        if (!contact.match(/^\d+$/)) return "Contact number must contain only numbers.";
        return "";
    };

   
    // handling form submission
    addStudentButton.addEventListener("click", () => {
        const error = validateInput();
        if (error) {
            alert(error);
            return;
        }

        // creating a new student object
        const student = {
            name: document.getElementById("name").value.trim(),
            studentID: document.getElementById("studentID").value.trim(),
            email: document.getElementById("email").value.trim(),
            contact: document.getElementById("contact").value.trim(),
        };

        // clearing the form fields after registration of student 
        const clearForm = () => {
            studentForm.reset();
        };

        students.push(student);
        saveToLocalStorage();
        renderStudents();
        clearForm();
    });


    // prefilling the form of the specific student when edit button is clicked or delete button is used to delete a student from localStorage permenntely 
    studentsTableBody.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("edit")) {
            const student = students[index];
            document.getElementById("name").value = student.name;
            document.getElementById("studentID").value = student.studentID;
            document.getElementById("email").value = student.email;
            document.getElementById("contact").value = student.contact;

            students.splice(index, 1);
        } else if (e.target.classList.contains("delete")) {
            students.splice(index, 1);
        }
        saveToLocalStorage();
        renderStudents();
    });

    renderStudents();
});



