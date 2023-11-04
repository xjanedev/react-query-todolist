import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTodo, fetchTodos } from "../api/todos";
import "../index.css";

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

  // const updateTodoMutation = useMutation({
  //   mutationFn: updateTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //     navigate("/");
  //   },
  // });

  // const handleUpdate = (id, isDone) => {
  //   updateTodoMutation.mutate({ id, isDone });

  //   // You can add additional logic here if needed
  // };

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
    <div className='flex-1'>
      <button
        className='w-full bg-purple-600 text-white px-4 py-2 rounded-full'
        onClick={() => navigate(`/todo/:id/new`)}
      >
        Add New Todo
      </button>
      <div className='mt-8'>
        {todos.map(todo => (
          <div key={todo.id} className='p-4 mb-4 bg-purple-100 rounded-lg'>
            <h4 className='text-gray-900 text-md'>{todo.title}</h4>
            <div className='pt-2 text-gray-500 text-sm'>{todo.description}</div>
            <div className='flex justify-end gap-2'>
              <button
                className='bg-purple-500 text-white w-auto px-4 py-2 rounded-full'
                onClick={() => navigate(`/todo/${todo.id}/edit`)}
              >
                Edit
              </button>
              <button
                className='bg-purple-600 text-white w-auto px-4 py-2 rounded-full'
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoLists;
