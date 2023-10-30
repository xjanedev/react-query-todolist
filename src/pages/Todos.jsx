import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTodo } from "../api/todos";

const Todos = () => {
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

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <button onClick={() => navigate("/")}>back to lists</button>
      <h1>{todo.title}</h1>
      <p>{todo.body}</p>
    </div>
  );
};

export default Todos;
