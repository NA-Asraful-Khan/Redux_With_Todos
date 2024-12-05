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

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <svg
            className="w-[50%] "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 150"
          >
            <path
              fill="none"
              stroke="#FF156D"
              stroke-width="8"
              stroke-linecap="round"
              stroke-dasharray="300 385"
              stroke-dashoffset="0"
              d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
            >
              <animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="2"
                values="685;-685"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animate>
            </path>
          </svg>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default TodoContainer;
