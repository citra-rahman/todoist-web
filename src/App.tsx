
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import ToDoList from "./components/ToDo/List";
import ToDoEdit from "./components/ToDo/Edit";
import Header from "./components/Header";
import { amber } from "@mui/material/colors";
import { getTodoFromFirebaseDB } from "./redux/features/thunk";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from "./components/ToDo/Input";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Stack";
import { Toaster } from "react-hot-toast";
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: amber
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    secondary: amber
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `linear-gradient(90deg, #ee95b2 0%, #f0e0bb 100%)`,
        },
      },
    },
  }
});


export default function Home() {
  const isDarkTheme = useAppSelector((state) => state.todo.isDarkTheme);
  const user: any = useAppSelector((state) => state.todo.user);
  const data = useAppSelector((state) => state.todo.todos);
  const tasks = data.filter(x => !x.isImportant);
  const importantTasks = data.filter(x => x.isImportant);
  const editOnClick: string | null = useAppSelector((state) => state.todo.editOnClick);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getTodoFromFirebaseDB());
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <main className="app">
        <Toaster />
        <Header />
        <Box sx={{ padding: '10vh 20vw' }}>
          <Box display={'flex'} sx={{ maxWidth: '100%', height: '35vh' }} spacing={1}>
            <Typography
              sx={{ typography: { xs: 'h6', md: 'h5' } }}
              gutterBottom
            >Important</Typography>
            {
              importantTasks.length > 0 ?
                importantTasks.map(item => {
                  return item.id === editOnClick ? (
                    <ToDoEdit
                      key={item.id}
                      id={item.id}
                    />
                  ) : (
                    <ToDoList
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      isImportant={item.isImportant}
                      isCompleted={item.isCompleted}
                    />
                  )
                }) :
                <Typography textAlign={'center'}>There is no important task.</Typography>
            }
            <br />
            <Typography
              sx={{ typography: { xs: 'h6', md: 'h5' } }}
              gutterBottom
            >Tasks</Typography>
            {
              tasks.length > 0 ?
                tasks.map(item => {
                  return item.id === editOnClick ? (
                    <ToDoEdit
                      key={item.id}
                      id={item.id}
                    />
                  ) : (
                    <ToDoList
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      isImportant={item.isImportant}
                      isCompleted={item.isCompleted}
                    />
                  )
                }) :
                <Typography textAlign={'center'}>
                  There is no task.
                  {!user && <span> Please login to create one.</span>}
                </Typography>
            }
          </Box>
          <Box
            sx={{ paddingTop: '30vh' }}
          >
            <Input />
          </Box>
          <br />
          <Typography
            sx={{ textAlign: 'right' }}
          >Design by {' '}
            <a
              href="https://dribbble.com/shots/20502706-Todo-App"
              target="_blank"
              rel="noreferrer"
            >
              Clement
            </a>
          </Typography>
        </Box>
      </main>
    </ThemeProvider>
  );
}