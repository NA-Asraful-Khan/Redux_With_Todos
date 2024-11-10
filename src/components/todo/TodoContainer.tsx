import { useAppSelector } from "@/redux/hooks";

import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import { TodoFilter } from "./TodoFilter";
import { getFilteredTodos } from "@/redux/features/todo.slice";

const TodoContainer = () => {
  const todos = useAppSelector(getFilteredTodos);

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px] ">
        {todos?.length > 0 ? (
          <div className="bg-white p-5 w-full h-full space-y-3 rounded-lg">
            {todos?.map((item, i) => (
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
