import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import { useNavigate } from "react-router-dom";
import "../index.css";
import TodoItem from "../components/TodoItem";
import CheckList from "../components/CheckList";

const TodoLists = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const filterTodos = () => {
    if (!todos) return [];

    if (search === "") {
      return todos;
    }

    return todos.filter(todo => {
      if (todo.title && todo.description) {
        return todo.title.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
  };

  return (
    <div className='flex-1'>
      <button
        className='w-full bg-purple-600 text-white text-sm px-4 py-2 rounded-full'
        onClick={() => navigate("/todo/:id/new")}
      >
        Add New Note
      </button>
      <CheckList todos={todos} />
      <input
        className='w-full pt-14 border-b border-gray-200 py-3 focus:outline-none focus:border-purple-600 text-sm'
        value={search}
        onChange={onChangeSearch}
        placeholder='검색어를 입력하세요'
      />
      <div className='pt-14'>
        {filterTodos().map(todo => (
          <TodoItem key={todo.id} todo={todo} data={todos} />
        ))}
      </div>
    </div>
  );
};

export default TodoLists;
