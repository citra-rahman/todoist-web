import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToDoProps } from "../../lib/type";
import { UserProps } from "../../lib/type";

interface TodoState {
  todos: ToDoProps[];
  isDarkTheme: boolean|null;
  editOnClick: string|null;
  todoError: string | null;
  error: string | null;
  user: UserProps | null;
}

const initialState: TodoState = {
  todos: [],
  isDarkTheme: false,
  editOnClick: null,
  error: null,
  todoError: null,
  user: null,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      getTodoError:(state, action: PayloadAction<string>) => {
        state.todoError = action.payload;
      },
      addTodo: (state, action: PayloadAction<ToDoProps>) => {
        state.todos.unshift(action.payload);
      },
      addTodoFail(state, action: PayloadAction<string>) {
        state.error = action.payload;
      },
      updateTodo: (state, action: PayloadAction<ToDoProps[]>) => {
        state.todos = action.payload;
      },
      deleteTodo: (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter(
          (todo) => todo.id === action.payload
        );
      },
      darkTheme: (state) => {
        state.isDarkTheme = true;
        localStorage.setItem(process.env.NEXT_IS_DARK_THEME!, 'true');
      },
      lightTheme: (state) => {
        state.isDarkTheme = false;
        localStorage.removeItem(process.env.NEXT_IS_DARK_THEME!);
      },
      editOnClick: (state,action: PayloadAction<string>) => {
        state.editOnClick = action.payload
      }
    },
  });
  
  export const {
    setUser,
    darkTheme,
    lightTheme,
    getTodoError,
    addTodo,
    addTodoFail,
    updateTodo,
    deleteTodo,
    editOnClick
  } = todoSlice.actions

  export default todoSlice.reducer;