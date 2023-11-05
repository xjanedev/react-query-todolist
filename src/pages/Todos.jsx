import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTodo } from "../api/todos";
import Button from "../components/Button";

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

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div className='gap-8'>
      <Button />
      <div
        key={todo.id}
        className='w-full h-[480px] p-4 mb-4 bg-purple-100 rounded-lg'
      >
        <h3 className='text-xl text-gray-900'>{todo.title}</h3>
        <p className='text-gray-600 mt-4'>{todo.description}</p>
      </div>
    </div>
  );
};

export default Todos;
