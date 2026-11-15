document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. ACADEMIC PLANNER FUNCTIONALITY
    // ==========================================
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const courseSelect = document.getElementById("courseSelect");
    const taskList = document.getElementById("taskList");
    const totalTasksEl = document.getElementById("totalTasks");
    const completedTasksEl = document.getElementById("completedTasks");

    if (taskForm) {
        // Load saved tasks or initialize with sample academic tasks
        let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [
            { id: 1, text: "Complete COS 106 Web Portfolio Project", course: "COS 106", completed: false },
            { id: 2, text: "Revise Chapter 3 Algorithms", course: "COS 102", completed: true }
        ];

        function saveAndRenderTasks() {
            localStorage.setItem("academicTasks", JSON.stringify(tasks));
            renderTasks();
        }

        function renderTasks() {
            taskList.innerHTML = "";

            tasks.forEach((task) => {
                const li = document.createElement("li");
                li.className = `task-item ${task.completed ? "completed" : ""}`;

                li.innerHTML = `
                    <div>
                        <span class="task-course">${task.course}</span>
                        <span class="task-text">${task.text}</span>
                    </div>
                    <div class="task-actions">
                        <button class="btn-complete" onclick="toggleTask(${task.id})">
                            ${task.completed ? "Undo" : "Done"}
                        </button>
                        <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });

            // Update counters
            const completedCount = tasks.filter((t) => t.completed).length;
            totalTasksEl.textContent = `Total Tasks: ${tasks.length}`;
            completedTasksEl.textContent = `Completed: ${completedCount}`;
        }

        // Add new task
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = taskInput.value.trim();
            const course = courseSelect.value;

            if (text === "") return;

            const newTask = {
                id: Date.now(),
                text: text,
                course: course,
                completed: false
            };

            tasks.push(newTask);
            taskInput.value = "";
            saveAndRenderTasks();
        });

        // Expose functions globally for inline button handlers
        window.toggleTask = (id) => {
            tasks = tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            saveAndRenderTasks();
        };

        window.deleteTask = (id) => {
            tasks = tasks.filter((task) => task.id !== id);
            saveAndRenderTasks();
        };

        // Initial render
        renderTasks();
    }

    // ==========================================
    // 2. CONTACT FORM JAVASCRIPT VALIDATION
    // ==========================================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Input values
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            // Error display elements
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const phoneError = document.getElementById("phoneError");
            const messageError = document.getElementById("messageError");
            const formSuccess = document.getElementById("formSuccess");

            // Reset previous messages
            nameError.textContent = "";
            emailError.textContent = "";
            phoneError.textContent = "";
            messageError.textContent = "";
            formSuccess.textContent = "";

            let isValid = true;

            // 1. Validate Name (not empty)
            if (fullName === "") {
                nameError.textContent = "Full name is required.";
                isValid = false;
            }

            // 2. Validate Email (not empty & valid format)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === "") {
                emailError.textContent = "Email address is required.";
                isValid = false;
            } else if (!emailPattern.test(email)) {
                emailError.textContent = "Please enter a valid email address.";
                isValid = false;
            }

            // 3. Validate Phone Number (not empty & digits only)
            const digitsOnlyPattern = /^\d+$/;
            if (phone === "") {
                phoneError.textContent = "Phone number is required.";
                isValid = false;
            } else if (!digitsOnlyPattern.test(phone)) {
                phoneError.textContent = "Phone number must contain only digits.";
                isValid = false;
            }

            // 4. Validate Message (not empty)
            if (message === "") {
                messageError.textContent = "Message field cannot be empty.";
                isValid = false;
            }

            // If all validations pass
            if (isValid) {
                formSuccess.textContent = "Thank you! Your message has been validated and sent successfully.";
                contactForm.reset();
            }
        });
    }
});
