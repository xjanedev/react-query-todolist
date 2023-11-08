export async function fetchTodos() {
  const response = await fetch("https://rose-radical-address.glitch.me/todos");
  return response.json();
}

export async function fetchTodo(id) {
  const response = await fetch(
    `https://rose-radical-address.glitch.me/todos/${id}`
  );
  return response.json();
}

export async function createTodo(newTodo) {
  const response = await fetch(`https://rose-radical-address.glitch.me/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return response.json();
}

export async function updateTodo(updatedTodo) {
  const response = await fetch(
    `https://rose-radical-address.glitch.me/todos/${updatedTodo.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }
  );
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(
    `https://rose-radical-address.glitch.me/todos/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
}
