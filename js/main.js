 const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");
    const overlay = document.getElementById("overlay");
    const addBtn = document.getElementById("addBtn");
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");

    // Open modal
    openBtn.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });

    // Close if clicking outside modal
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
      }
    });

    // Add new task
    addBtn.addEventListener("click", () => {
      const task = todoInput.value.trim();
      if (task !== "") {
        const li = document.createElement("li");
        li.textContent = task;
        todoList.appendChild(li);
        todoInput.value = "";
      }
    });