import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";

const AddTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
      <Button />
      <TodoForm onSubmit={handleAddTodo} initialValue={{}} />
    </div>
  );
};

export default AddTodo;
