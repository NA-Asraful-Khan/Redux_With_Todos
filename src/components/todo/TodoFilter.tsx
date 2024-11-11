import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hooks";
import { setFilter } from "@/redux/features/todo.slice";

export function TodoFilter({ priority, setPriority }) {
  const dispatch = useAppDispatch();

  const handleFilterClick = (value: string) => {
    // dispatch(filterTodo(filter));
    setPriority(value);
    if (value === "all") {
      dispatch(setFilter({ type: "", value: "" }));
    } else if (value === "pending") {
      dispatch(setFilter({ type: "status", value: value }));
    } else if (value === "completed") {
      dispatch(setFilter({ type: "status", value: value }));
    } else if (value === "high") {
      dispatch(setFilter({ type: "priority", value: value }));
    } else if (value === "medium") {
      dispatch(setFilter({ type: "priority", value: value }));
    } else if (value === "low") {
      dispatch(setFilter({ type: "priority", value: value }));
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary-gradient text-xl font-semibold">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value) => handleFilterClick(value)}
        >
          <DropdownMenuRadioItem value="">All Task</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            Completed
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuLabel>Priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value) => handleFilterClick(value)}
        >
          <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
