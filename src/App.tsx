
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import ToDoList from "./components/ToDo/List";
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
  const data = useAppSelector((state) => state.todo.todos);
  const user: any = useAppSelector((state) => state.todo.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getTodoFromFirebaseDB());
      console.log("how many time it hits")
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
            <Typography variant="h5" gutterBottom>Important</Typography>
            {
              data.filter(x => x.isImportant).map(item =>
                <ToDoList
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  date={item.date}
                  isImportant={item.isImportant}
                  isCompleted={item.isCompleted}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                />
              )
            }
            <br />
            <Typography variant="h5" gutterBottom>Tasks</Typography>
            {
              data.filter(x => !x.isImportant).map(item =>
                <ToDoList
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  date={item.date}
                  isImportant={item.isImportant}
                  isCompleted={item.isCompleted}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                />
              )
            }
          </Box>
          <Box
            sx={{ paddingTop: '30vh' }}
          >
            <Input />
          </Box>
        </Box>
      </main>
    </ThemeProvider>
  );
}