import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ToDoProps } from "../../lib/type";
import { UserProps } from "../../lib/type";
import { setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { addTodo, editOnClick, getTodoError } from "./slice";
import { addTodoFail } from "./slice";
import { updateTodo } from "./slice";
import { deleteTodo } from "./slice";
import { darkTheme, lightTheme } from "./slice";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";

export const notifySuccess = (message: string) => toast.success(message);
export const notifyError = (message: string) => toast.error(message);

export const toogleDarkTheme = createAsyncThunk(
  "app/darktheme",
  async (_, { dispatch }) => {
    dispatch(darkTheme());
  }
);

export const toogleLightTheme = createAsyncThunk(
  "app/lighttheme",
  async (_, { dispatch }) => {
    dispatch(lightTheme());
  }
);

export const eventEditOnClick = createAsyncThunk(
  "app/eventEditOnClick",
  async (id:string, { dispatch }) => {
    dispatch(editOnClick(id));
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  await signInWithPopup(auth, googleAuthProvider);
});

export const addTodoToFirebaseDB = createAsyncThunk(
  "todo/addTodo",
  async (todo: ToDoProps, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.todo.user;
    const { id, name, date, isImportant, isCompleted, createdAt, updatedAt } =
      todo;
    try {
      const todoItemRef = doc(db, `${user?.uid as string}`, id);
      const docSnap = await getDoc(todoItemRef);

      if (docSnap.exists()) {
        const existItem = docSnap.data();
        dispatch(addTodo(existItem as ToDoProps));
      } else {
        notifySuccess(`adding ${name} to todos`);
        await setDoc(doc(db, `${user?.uid as string}`, id), {
          id,
          name,
          date,
          isImportant,
          isCompleted,
          createdAt,
          updatedAt,
        });
        notifySuccess(`${name} has been successfully added`);
        dispatch(addTodo(todo));
      }
    } catch (error: any) {
      notifyError(`failed to add  ${name}  ${error}`);
      dispatch(
        addTodoFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : "Failed to add " + name + ": " + error.message
        )
      );
    }
  }
);

export const getTodoFromFirebaseDB = createAsyncThunk(
  "todo/getTodoFirebaseDB",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const user = state.todo.user;

    try {
      let allTodos = await getTodoItems(db, user);
      dispatch(updateTodo(allTodos));
    } catch (error: any) {
      dispatch(
        getTodoError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  }
);

export const deleteTodoFromFirebaseDB = createAsyncThunk(
  "todo/deleteTodoFromFirebaseDB",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.todo.user;
    const todoId = id.toString();
    try {
      dispatch(deleteTodo(id));
      await deleteDoc(doc(db, `${user?.uid as string}`, todoId));
      notifySuccess(`Task Id: ${id} was successfully deleted`);
    } catch (error: any) {
      notifyError(`failed to remove  ${id}`);
      dispatch({
        type: "ADD_TODO_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

export const updateAsImportantFromFirebaseDB = createAsyncThunk(
  "todo/updateAsImportantFromFirebaseDB",
  async (todoId: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.todo.user;
    try {
      const todoItemRef = doc(db, `${user?.uid as string}`, todoId);
      const docSnap = await getDoc(todoItemRef);

      if (docSnap.exists()) {
        let existItem = docSnap.data();
        existItem.isImportant = !existItem.isImportant;
        await updateDoc(todoItemRef, existItem);
        let allTodos = await getTodoItems(db, user);
        dispatch(updateTodo(allTodos));
        notifySuccess(`Task Id: ${todoId} was successfully updated`);
      }
    } catch (error: any) {
      dispatch(
        getTodoError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  }
);

export const updateAsCompletedFromFirebaseDB = createAsyncThunk(
  "todo/updateAsCompletedFromFirebaseDB",
  async (todoId: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.todo.user;
    try {
      const todoItemRef = doc(db, `${user?.uid as string}`, todoId);
      const docSnap = await getDoc(todoItemRef);

      if (docSnap.exists()) {
        let existItem = docSnap.data();
        existItem.isCompleted = !existItem.isCompleted;
        await updateDoc(todoItemRef, existItem);
        let allTodos = await getTodoItems(db, user);
        dispatch(updateTodo(allTodos));
        notifySuccess(`Task Id: ${todoId} was successfully updated`);
      }
    } catch (error: any) {
      dispatch(
        getTodoError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  }
);

export const updateToDoTextFromFirebaseDB = createAsyncThunk(
  "todo/updateToDoTextFromFirebaseDB",
  async ({id, name}: {id:string, name:string}, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.todo.user;

    try {
      const todoItemRef = doc(db, `${user?.uid as string}`, id);
      const docSnap = await getDoc(todoItemRef);

      if (docSnap.exists()) {
        await updateDoc(todoItemRef, {
          name: name
        });
        let allTodos = await getTodoItems(db, user);
        dispatch(updateTodo(allTodos));
        notifySuccess(`Task Id: ${id} was successfully updated`);
      }
    } catch (error: any) {
      dispatch(
        getTodoError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  }
);

const getTodoItems = async (db: any, user: UserProps | null) => {
  const todoCol = collection(db, `${user?.uid as string}`);
  const todoSnapshot = await getDocs(todoCol);
  const todoList = todoSnapshot.docs.map((doc) => doc.data() as ToDoProps);
  return todoList;
};
