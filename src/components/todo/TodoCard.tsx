import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { removeTodo, toggleCompleted } from "@/redux/features/todo.slice";
import UpdateTodoModel from "./UpdateTodoModel";
type TTodoCardProps = {
  id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};
const TodoCard = ({
  id,
  title,
  description,
  isCompleted,
  priority,
}: TTodoCardProps) => {
  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(toggleCompleted(id));
  };
  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        onChange={toggleHandler}
        type="checkbox"
        name="complete"
        id="complete"
      />
      <p className="font-semibold">{title}</p>
      {isCompleted ? (
        <p className="text-green-500 font-semibold">Complete</p>
      ) : (
        <p className="text-red-500 font-semibold">Pending</p>
      )}

      <p>{description}</p>
      {priority === "high" ? (
        <p className="text-red-500 font-semibold">High</p>
      ) : priority === "medium" ? (
        <p className="text-yellow-500 font-semibold">Medium</p>
      ) : (
        priority === "low" && (
          <p className="text-green-500 font-semibold">Low</p>
        )
      )}
      <div className="space-x-5">
        <UpdateTodoModel id={id} />
        <Button
          className="bg-[#5C53FE]"
          onClick={() => dispatch(removeTodo(id))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
