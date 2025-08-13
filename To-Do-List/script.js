document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("Text");
  const button = document.getElementById("Add");
  const list = document.getElementById("Task");

  let array = JSON.parse(localStorage.getItem("tasks")) || [];

  array.forEach((task) => renderTask(task));

  button.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    const newtask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    array.push(newtask);
    saveTasks();
    renderTask(newtask);
    input.value = ""; // clear input
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `<span>${task.text}</span> <button>Delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggle from firing
      array = array.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    list.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(array));
  }
});
