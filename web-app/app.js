document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = themeToggle?.querySelector(".theme-toggle__label");
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector("#todo-input");
  const todoList = document.querySelector(".todo-list");
  const todoCount = document.querySelector(".todo-count");
  const emptyState = document.querySelector(".todo-empty");
  const completeAllButton = document.querySelector('[data-action="complete-all"]');
  const clearCompletedButton = document.querySelector('[data-action="clear-completed"]');
  const storageKey = "todo-app-theme";
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = window.localStorage.getItem(storageKey);
  const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
  let nextTodoId = 3;
  let todos = [
    { id: 1, text: "Review project structure", completed: false },
    { id: 2, text: "Create semantic todo markup", completed: false },
  ];

  const applyTheme = (theme) => {
    const isDark = theme === "dark";

    body.dataset.theme = theme;

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light theme" : "Dark theme";
    }
  };

  applyTheme(initialTheme);

  const renderTodos = () => {
    if (!todoList || !todoCount || !emptyState) {
      return;
    }

    todoList.replaceChildren();

    todos.forEach((todo) => {
      const listItem = document.createElement("li");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      const text = document.createElement("span");
      const deleteButton = document.createElement("button");

      listItem.className = "todo-item";
      if (todo.completed) {
        listItem.classList.add("is-complete");
      }

      checkbox.type = "checkbox";
      checkbox.name = `todo-item-${todo.id}`;
      checkbox.checked = todo.completed;
      checkbox.dataset.todoId = String(todo.id);

      text.textContent = todo.text;

      deleteButton.type = "button";
      deleteButton.dataset.todoId = String(todo.id);
      deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);
      deleteButton.textContent = "Delete";

      label.append(checkbox, text);
      listItem.append(label, deleteButton);
      todoList.append(listItem);
    });

    const remainingCount = todos.filter((todo) => !todo.completed).length;
    const taskLabel = remainingCount === 1 ? "task" : "tasks";

    todoCount.textContent = `${remainingCount} ${taskLabel} remaining`;
    emptyState.hidden = todos.length > 0;
  };

  renderTodos();

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  });

  todoForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = todoInput?.value.trim();
    if (!value) {
      todoInput?.focus();
      return;
    }

    todos.push({ id: nextTodoId, text: value, completed: false });
    nextTodoId += 1;

    if (todoInput) {
      todoInput.value = "";
      todoInput.focus();
    }

    renderTodos();
  });

  todoList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    const todoId = Number(target.dataset.todoId);
    todos = todos.filter((todo) => todo.id !== todoId);
    renderTodos();
  });

  todoList?.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
      return;
    }

    const todoId = Number(target.dataset.todoId);
    todos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: target.checked } : todo
    );
    renderTodos();
  });

  completeAllButton?.addEventListener("click", () => {
    todos = todos.map((todo) => ({ ...todo, completed: true }));
    renderTodos();
  });

  clearCompletedButton?.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    renderTodos();
  });
});
