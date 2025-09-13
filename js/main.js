let todos = JSON.parse(localStorage.getItem("todos")) || []; // اذا هي اصلا مش موجودة todos
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
  window.location.reload();
});

const checkTodo = (id) => {
  todos = todos.map((todo) =>
    String(todo.id) === String(id)
      ? { ...todo, isChecked: !todo.isChecked }
      : todo
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};
const renderTodos = () => {
  const todosArray = Array.from(todos);
  const cards = document.getElementById("cards");
  if (todosArray.length === 0) {
    const errorMsg = document.createElement("p");
    cards.appendChild(errorMsg);
    errorMsg.style.color = "red";
    errorMsg.textContent = "no todos";
    errorMsg.style.margin = " 20px 40%";
    errorMsg.style.fontSize = " 30px";
    errorMsg.style.fontWeight = " bold";
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
      checkbox.appendChild(checkInput);
      checkbox.isChecked = todo.isChecked;

      checkbox.onchange = () => checkTodo(todo.id);

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
      cardBtns.appendChild(editBtn);

      const editImg = document.createElement("img");
      editImg.src = "assets/edit-cover.svg";
      editImg.alt = "edit-cover";
      editBtn.appendChild(editImg);

      const deleteBtn = document.createElement("button");
      cardBtns.appendChild(deleteBtn);
      deleteBtn.id = "delete-card-btn";

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
      cardFooter.textContent = todo.todoDate;

      const cardFooterBtn = document.createElement("button");
      cardFooterBtn.setAttribute("id", "openModal");
      cardFooter.appendChild(cardFooterBtn);
      cardFooterBtn.textContent = "show";
    });
  }
};

renderTodos();

const addTodoBtn = document.getElementById("add-to-do-btn");
const addToDoModal = document.getElementById("add-todo");
const closeAddTodoModal = document.getElementById("closeAddTodoModal");
addTodoBtn.addEventListener("click", () => {
  addToDoModal.style.display = "flex";
});
closeAddTodoModal.addEventListener("click", () => {
  addToDoModal.style.display = "none";
});

const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const overlay = document.getElementById("overlay");

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

const deleteCardBtn = document.getElementById("delete-card-btn");
deleteCardBtn.addEventListener("click", () => {
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
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
});

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
      Swal.fire({
        title: "Deleted!",
        text: "Your ToDos has been deleted.",
        icon: "success",
      });
    }
  });
});
