import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFilteredTodos } from "@/redux/features/todo.slice";
import { useAppSelector } from "@/redux/hooks";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormEvent, useState } from "react";

type TTodoCardProps = {
  id: string;
};

const UpdateTodoModel = ({ id }: TTodoCardProps) => {
  const todos = useAppSelector(getFilteredTodos);
  const todo = todos.find((t) => t.id === id);

  const [task, setTask] = useState("todo!.title");
  const [description, setDescription] = useState("todo!.description");
  const [priority, setPriority] = useState("todo!.priority");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const taskDetails = {
      id: id,
      title: task,
      description: description,
      priority: priority,
    };
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500">
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>Update your daily task</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                id="task"
                className="col-span-3"
                placeholder="Add your task"
                onChange={(e) => setTask(e.target.value)}
                value={task}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Add task description"
                className="col-span-3"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Set Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="text-red-500" value="high">
                    High
                  </SelectItem>
                  <SelectItem className="text-yellow-500" value="medium">
                    Medium
                  </SelectItem>
                  <SelectItem className="text-green-500" value="low">
                    Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoModel;
