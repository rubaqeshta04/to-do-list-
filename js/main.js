// Load todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all"; // Track the current filter

// Add Todo Form
const AddTodoForm = document.getElementById("add-todo-form");
AddTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const description = formData.get("Content");
  const todoDate = formData.get("date");
  const newTodo = {
    title,
    description,
    todoDate,
    isChecked: false,
    id: Date.now(),
  };
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  e.target.reset();
  filterTodos(currentFilter); // Re-render with current filter
  const addToDoModal = document.getElementById("add-todo");
  addToDoModal.style.display = "none";
});

// Toggle todo checkbox
const checkTodo = (id) => {
  todos = todos.map((todo) =>
    String(todo.id) === String(id)
      ? { ...todo, isChecked: !todo.isChecked }
      : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
  filterTodos(currentFilter); // Re-render with current filter
};

// Delete single todo
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  filterTodos(currentFilter);
};

// SweetAlert delete confirmation
const swalDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTodo(id);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};

let currentTodoToEdit = null;
// Render todos
const renderTodos = (allTodos) => {
  const todosArray = Array.from(allTodos);
  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  if (todosArray.length === 0) {
    const errorMsg = document.createElement("p");
    cards.appendChild(errorMsg);
    errorMsg.style.color = "red";
    errorMsg.textContent = "no todos";
    errorMsg.style.margin = "20px 40%";
    errorMsg.style.fontSize = "30px";
    errorMsg.style.fontWeight = "bold";
  } else {
    todosArray.forEach((todo) => {
      const card = document.createElement("div");
      cards.appendChild(card);
      card.classList.add("card");

      const cardHeader = document.createElement("div");
      card.appendChild(cardHeader);
      cardHeader.classList.add("card-header");

      const checkbox = document.createElement("div");
      checkbox.classList.add("checkbox");
      cardHeader.appendChild(checkbox);

      const checkInput = document.createElement("input");
      checkInput.type = "checkbox";
      checkInput.checked = todo.isChecked;
      checkbox.appendChild(checkInput);

      checkInput.onchange = () => checkTodo(todo.id);

      const cardTitle = document.createElement("div");
      cardTitle.classList.add("cardTitle");
      cardHeader.appendChild(cardTitle);

      const cardH2Title = document.createElement("h2");
      cardTitle.appendChild(cardH2Title);
      cardH2Title.textContent = todo.title;

      const cardBtns = document.createElement("div");
      cardBtns.classList.add("card-btns");
      cardHeader.appendChild(cardBtns);

      const editBtn = document.createElement("button");
      const editTodoModal = document.getElementById("edit-todo");
      cardBtns.appendChild(editBtn);
      editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editTodoModal.style.display = "flex";
        const titleValue = document.getElementById("title-value");
        const descValue = document.getElementById("desc-value");
        const dateValue = document.getElementById("date-value");
        titleValue.value = todo.title;
        descValue.value = todo.description;
        dateValue.value = todo.todoDate;
        currentTodoToEdit = todo.id;
        console.log("rrr", currentTodoToEdit);
      });
      const closeEditTodoModal = document.getElementById("closeEditTodoModal");
      closeEditTodoModal.addEventListener("click", () => {
        editTodoModal.style.display = "none";
      });
      editTodoModal.style.cursor = "pointer";

      const editImg = document.createElement("img");
      editImg.src = "assets/edit-cover.svg";
      editImg.alt = "edit-cover";
      editBtn.appendChild(editImg);

      const deleteBtn = document.createElement("button");
      cardBtns.appendChild(deleteBtn);
      deleteBtn.id = "delete-card-btn";
      deleteBtn.onclick = () => swalDelete(todo.id);

      const deleteImg = document.createElement("img");
      deleteImg.src = "assets/delete-icon.svg";
      deleteImg.alt = "delete-icon";
      deleteBtn.appendChild(deleteImg);

      const cardContent = document.createElement("div");
      cardContent.classList.add("Content");
      card.appendChild(cardContent);

      const cardContentP = document.createElement("p");
      cardContent.appendChild(cardContentP);
      cardContentP.textContent = todo.description;
      cardContentP.classList = "descP";

      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");
      card.appendChild(cardFooter);

      const cardFooterP = document.createElement("p");
      cardFooter.appendChild(cardFooterP);
      cardFooterP.textContent = todo.todoDate;

      const cardFooterBtn = document.createElement("button");
      const todoTitle = document.getElementById("todo-title");
      const todoDescription = document.getElementById("todo-description");
      cardFooterBtn.id = "openModal";
      cardFooter.appendChild(cardFooterBtn);
      cardFooterBtn.textContent = "show";
      cardFooterBtn?.addEventListener("click", () => {
        overlay.style.display = "flex";
        todoTitle.textContent = todo.title;
        todoDescription.textContent = todo.description;
      });
    });
  }
};

// Initial render
renderTodos(todos);

// Add todo modal
const addTodoBtn = document.getElementById("add-to-do-btn");
const addToDoModal = document.getElementById("add-todo");
const closeAddTodoModal = document.getElementById("closeAddTodoModal");
addTodoBtn.addEventListener("click", () => {
  addToDoModal.style.display = "flex";
});
closeAddTodoModal.addEventListener("click", () => {
  addToDoModal.style.display = "none";
});

// Show modal
const closeBtn = document.getElementById("closeModal");
const overlay = document.getElementById("overlay");

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

// Delete all todos
const deleteAllTodos = () => {
  localStorage.removeItem("todos");
  todos = [];
  renderTodos(todos);
};

const deleteAll = document.getElementById("delete-all");
deleteAll.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete all!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAllTodos();
      Swal.fire({
        title: "Deleted!",
        text: "Your ToDos has been deleted.",
        icon: "success",
      });
    }
  });
});

// Todo count
const todoCount = document.getElementById("todo-count");
todoCount.textContent = todos.length;

// Filter todos
const filterTodos = (filterType) => {
  currentFilter = filterType;
  if (filterType === "todo") {
    renderTodos(todos.filter((todo) => !todo.isChecked));
  } else if (filterType === "done") {
    renderTodos(todos.filter((todo) => todo.isChecked));
  } else {
    renderTodos(todos);
  }
};

const editTodoForm = document.getElementById("edit-todo-form");
const editTodo = document.getElementById("edit-todo");
editTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleValue = document.getElementById("title-value").value;
  const descValue = document.getElementById("desc-value").value;
  const dateValue = document.getElementById("date-value").value;
  const todosArray = Array.from(todos);
  todosArray.map((todo) => {
    if (todo.id === currentTodoToEdit) {
      todo.title = titleValue;
      todo.description = descValue;
      todo.dateValue = dateValue;
      console.log(todo);
    } else {
      todo;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  editTodo.style.display = "none";
  renderTodos(todos);
});
