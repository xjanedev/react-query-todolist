import { useState } from "react";

const TodoForm = ({ onSubmit, initialValue }) => {
  const [todo, setTodo] = useState({
    title: initialValue.title || "",
    body: initialValue.body || "",
  });

  const handleChangeInput = e => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const renderField = label => (
    <div>
      <label>{label}</label>
      <input
        onChange={handleChangeInput}
        type='text'
        name={label.toLowerCase()}
        value={todo[label.toLowerCase()]}
      />
    </div>
  );

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(todo);
    setTodo({
      title: "",
      body: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderField("Title")}
      {renderField("Body")}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default TodoForm;
