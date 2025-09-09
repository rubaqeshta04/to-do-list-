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

const addTodoBtn = document.getElementById("add-to-do-btn");
const addToDoModal = document.getElementById("add-todo");
const closeAddTodoModal = document.getElementById("closeAddTodoModal");
addTodoBtn.addEventListener("click", () => {
  addToDoModal.style.display = "flex";
});
closeAddTodoModal.addEventListener("click", () => {
  addToDoModal.style.display = "none";
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
