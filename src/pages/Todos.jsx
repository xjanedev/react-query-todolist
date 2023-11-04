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

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div className='pt-8'>
      <button
        onClick={() => navigate("/")}
        className='bg-[#646cff] text-white py-2 px-4 rounded-3xl mb-4'
      >
        Back to Lists
      </button>
      <div className='p-4 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold'>{todo.title}</h1>
        <p className='text-gray-700 mt-2'>{todo.description}</p>
      </div>
    </div>
  );
};

export default Todos;
