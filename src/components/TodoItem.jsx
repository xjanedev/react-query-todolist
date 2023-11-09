import { memo } from "react";
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
    const optimisticUpdate = oldData => {
      const updatedData = oldData.map(item => {
        if (item.id === updatedTodo.id) {
          return updatedTodo;
        }
        return item;
      });
      return updatedData;
    };

    updateTodo(updatedTodo)
      .then(response => {})
      .catch(error => {});
    queryClient.setQueryData(["todos"], optimisticUpdate);
  };

  return (
    <div key={todo.id} className='p-4 mb-4 bg-purple-100 rounded-lg text-sm'>
      <div className='flex items-center mb-2'>
        <input
          type='checkbox'
          onChange={onChangeCheckbox}
          checked={todo.isDone || false}
          className='hidden'
        />
        <label
          className='inline-flex items-center justify-center h-5 w-5 mr-2 border-2 border-purple-500 rounded-md bg-purple-200 cursor-pointer'
          onClick={onChangeCheckbox}
        >
          {todo.isDone && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M5 13l4 4L19 7'
              />
            </svg>
          )}
        </label>
        <h4
          className='text-gray-900 cursor-pointer'
          onClick={() => navigate(`/todo/${todo.id}`)}
        >
          {todo.title}
        </h4>
      </div>
      <div className='text-gray-500 text-sm line-clamp-1'>
        {todo.description}
      </div>
      <div className='flex justify-end pt-4 gap-2'>
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

export default memo(TodoItem);
