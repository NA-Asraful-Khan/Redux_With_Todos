import { useDeleteTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import { Button } from "../ui/button";
import UpdateTodoModel from "./UpdateTodoModel";
type TTodoCardProps = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};
const TodoCard = ({
  _id,
  title,
  description,
  isCompleted,
  priority,
}: TTodoCardProps) => {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: deleting }] = useDeleteTodoMutation();
  const toggleHandler = () => {
    const taskData = {
      title,
      description,
      priority,
      isCompleted: !isCompleted,
    };
    const options = {
      id: _id,
      data: taskData,
    };

    updateTodo(options);
  };

  if (isLoading || deleting) {
    return <div>Loading....</div>;
  }
  return (
    <div className="bg-white rounded-md flex justify-start items-center p-3 border">
      <p className="font-semibold flex-1 ">{title}</p>

      <div className="flex-1">
        {isCompleted ? (
          <p
            onClick={toggleHandler}
            className="text-white font-semibold cursor-pointer bg-green-500 inline p-1 px-2 rounded-full"
          >
            Complete
          </p>
        ) : (
          <p
            onClick={toggleHandler}
            className="text-white font-semibold cursor-pointer bg-red-500 inline p-1 px-2 rounded-full"
          >
            Pending
          </p>
        )}
      </div>

      <p className="flex-1">{description}</p>

      <div className="flex-1">
        {priority === "high" ? (
          <div className="flex justify-start items-center gap-1">
            <div className="size-3 rounded-full bg-red-500"></div>
            <p className="text-red-500 font-semibold">High</p>
          </div>
        ) : priority === "medium" ? (
          <div className="flex justify-start items-center gap-1">
            <div className="size-3 rounded-full bg-yellow-500"></div>
            <p className="text-yellow-500 font-semibold">Medium</p>
          </div>
        ) : (
          priority === "low" && (
            <div className="flex justify-start items-center gap-1">
              <div className="size-3 rounded-full bg-green-500"></div>
              <p className="text-green-500 font-semibold">Low</p>
            </div>
          )
        )}
      </div>
      <div className="space-x-5">
        <UpdateTodoModel id={_id} />
        <Button className="bg-[#5C53FE]" onClick={() => deleteTodo(_id)}>
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
