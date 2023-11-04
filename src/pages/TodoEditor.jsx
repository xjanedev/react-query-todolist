import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTodo, updateTodo } from "../api/todos";
import TodoForm from "../components/TodoForm";

const TodoEditor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: todo,
    error,
  } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodo(id),
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      navigate("/");
    },
  });

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  const handleSubmit = updatedTodo => {
    updateTodoMutation.mutate({ id, ...updatedTodo });
  };

  return (
    <div>
      <TodoForm onSubmit={handleSubmit} initialValue={todo} />
    </div>
  );
};

export default TodoEditor;
