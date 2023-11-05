import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoForm = ({ onSubmit, initialValue }) => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: initialValue.title || "",
    description: initialValue.description || "",
    isDone: initialValue.isDone || false,
  });

  const handleChangeInput = e => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonClick = () => {
    onSubmit(todo);
    setTodo({
      title: "",
      description: "",
      isDone: false,
    });
    navigate("/");
  };

  return (
    <div className=' bg-purple-100 p-4 rounded-md'>
      <form className='gap-10'>
        <div className='mb-4'>
          <label htmlFor='title' className='text-md'>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={todo.title}
            onChange={handleChangeInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='text-md'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={todo.description}
            onChange={handleChangeInput}
            rows='4'
            style={{ resize: "none" }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
      </form>
      <div className='py-2'>
        <button
          type='button'
          onClick={handleButtonClick}
          className='bg-purple-600 text-white w-auto px-4 py-2 rounded-full flex ml-auto'
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
