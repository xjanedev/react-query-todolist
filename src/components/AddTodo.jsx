import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";
import PostForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";

const AddTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("success");
    },
  });

  const handleAddTodo = todo => {
    createTodoMutation.mutate({
      id: uuidv4(),
      ...todo,
    });
  };

  return (
    <div>
      <h2>Todos</h2>
      <PostForm onSubmit={handleAddTodo} initialValue={{}} />
    </div>
  );
};

export default AddTodo;
