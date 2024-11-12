// import { useAppSelector } from "@/redux/hooks";

import { useGetTodosQuery } from "@/redux/api/api";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import { TodoFilter } from "./TodoFilter";
import { useState } from "react";
// import { getFilteredTodos } from "@/redux/features/todo.slice";
type Todo = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};
const TodoContainer = () => {
  const [priority, setPriority] = useState("");
  //* From Locale Store
  // const todos = useAppSelector(getFilteredTodos);

  //* From Server Store
  const { data: todos, isLoading } = useGetTodosQuery(priority);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px] ">
        {todos?.data?.length > 0 ? (
          <div className="bg-white p-5 w-full h-full space-y-3 rounded-lg">
            {todos?.data?.map((item: Todo, i: number) => (
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
