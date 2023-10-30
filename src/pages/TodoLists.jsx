import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTodo, fetchTodos } from "../api/todos";
import AddTodo from "../components/AddTodo";

const TodoLists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = id => {
    deleteTodoMutation.mutate(id);
  };

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <AddTodo />
      {todos.map(todo => (
        <div key={todo.id}>
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/todo/${todo.id}`)}
          >
            {todo.title}
          </h4>
          <button onClick={() => navigate(`/todo/${todo.id}/edit`)}>
            Edit
          </button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
