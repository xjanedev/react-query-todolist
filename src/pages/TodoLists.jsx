import { useState, useMemo } from "react";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import { useNavigate } from "react-router-dom";
import "../index.css";
import TodoItem from "../components/TodoItem";

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

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    if (!todos) return { totalCount: 0, doneCount: 0, notDoneCount: 0 };

    const totalCount = todos.length;
    const doneCount = todos.filter(todo => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

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
        className='w-full bg-purple-600 text-white px-4 py-2 rounded-full'
        onClick={() => navigate("/todo/:id/new")}
      >
        Add New Todo
      </button>
      <h4>Todos</h4>
      <div>
        <div>전체 Todo : {totalCount}</div>
        <div>완료 Todo : {doneCount}</div>
        <div>미완 Todo : {notDoneCount}</div>
      </div>
      <input
        className='w-full mt-16 border-b border-gray-200 py-3 focus:outline-none focus:border-purple-600'
        value={search}
        onChange={onChangeSearch}
        placeholder='검색어를 입력하세요'
      />
      <div className='mt-8'>
        {filterTodos().map(todo => (
          <TodoItem key={todo.id} todo={todo} data={todos} />
        ))}
      </div>
    </div>
  );
};

export default memo(TodoLists);
