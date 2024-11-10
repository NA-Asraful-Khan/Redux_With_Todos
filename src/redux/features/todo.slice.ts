import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TTodo = {
  id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};

type TInitialState = {
  todos: TTodo[];
  filterCriteria: { type: string; value: string } | null;
};

const initialState: TInitialState = {
  todos: [],
  filterCriteria: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    setFilter: (
      state,
      action: PayloadAction<{ type: string; value: string } | null>
    ) => {
      state.filterCriteria = action.payload;
    },
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((item) => item.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },
  },
});

// Selector to get all todos or filtered todos based on criteria
export const getFilteredTodos = (state: RootState) => {
  const { todos, filterCriteria } = state.todos;

  if (!filterCriteria) return todos;

  return todos.filter((todo) => {
    if (filterCriteria.type === "status") {
      return filterCriteria.value === "completed"
        ? todo.isCompleted
        : !todo.isCompleted;
    } else if (filterCriteria.type === "priority") {
      return todo.priority === filterCriteria.value;
    }
    return true; // In case no filter is applied
  });
};

export const { addTodo, setFilter, removeTodo, toggleCompleted, updateTodo } =
  todoSlice.actions;
export const todoSliceReducer = todoSlice.reducer;
