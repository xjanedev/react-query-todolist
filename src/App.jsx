import { Route, Routes } from "react-router-dom";
import TodoLists from "./pages/TodoLists";
import Todos from "./pages/Todos";
import TodoEditor from "./pages/TodoEditor";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <h1>Todos</h1>
      <Routes>
        <Route path='/' element={<TodoLists />} />
        <Route path='/todo/:id' element={<Todos />} />
        <Route path='/todo/:id/edit' element={<TodoEditor />} />
      </Routes>
    </div>
  );
}

export default App;
