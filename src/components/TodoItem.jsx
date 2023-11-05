import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateTodo, deleteTodo } from "../api/todos";

const TodoItem = ({ todo }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = id => {
    deleteTodoMutation.mutate(id);
  };

  const onChangeCheckbox = () => {
    const updatedTodo = { ...todo, isDone: !todo.isDone };

    updateTodo(updatedTodo).then(() => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    });
  };

  return (
    <div key={todo.id} className='p-4 mb-4 bg-purple-100 rounded-lg'>
      <input
        type='checkbox'
        onChange={onChangeCheckbox}
        checked={todo.isDone || false}
      />
      <h4
        className='text-gray-900 text-md cursor-pointer'
        onClick={() => navigate(`/todo/${todo.id}`)}
      >
        {todo.title}
      </h4>
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
  );
};

export default TodoItem;
