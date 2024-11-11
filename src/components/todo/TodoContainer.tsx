// import { useAppSelector } from "@/redux/hooks";

import { useGetTodosQuery } from "@/redux/api/api";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import { TodoFilter } from "./TodoFilter";
// import { getFilteredTodos } from "@/redux/features/todo.slice";
type Todo = {
  id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};
const TodoContainer = () => {
  //* From Locale Store
  // const todos = useAppSelector(getFilteredTodos);

  //* From Server Store
  const { data: todos, isLoading } = useGetTodosQuery(undefined);
  console.log(todos);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px] ">
        {todos?.length > 0 ? (
          <div className="bg-white p-5 w-full h-full space-y-3 rounded-lg">
            {todos?.map((item: Todo, i: number) => (
              <TodoCard key={i} {...item} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-5 text-2xl font-bold flex justify-center items-center rounded-md">
            <p>There is no task pending</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
