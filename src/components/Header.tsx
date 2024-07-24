import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { auth } from "../firebase.config";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { googleSignIn } from "../redux/features/thunk";
import { logout } from "../redux/features/thunk";
import { setUser } from "../redux/features/slice";
import { onAuthStateChanged } from "firebase/auth";
import ThemeSwitch from "./ThemeSwitch";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from "@mui/material/Typography";

export default function Header() {
    const dispatch = useAppDispatch();
    const user: any = useAppSelector((state) => state.todo.user);
    const [firebaseError, setFirebaseError] = useState<string>("");

    const handleGoogleSignIn = async () => {
        try {
            await dispatch(googleSignIn());
        } catch (error: any) {
            console.error(error);
            setFirebaseError(error.message);
        }
    }

    const handleLogout = async () => {
        try {
            await dispatch(logout());
        } catch (error: any) {
            setFirebaseError(error.message);
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            dispatch(setUser(currentUser));
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            paddingX={2}
            alignItems={'center'}>
            <ThemeSwitch />
            <Stack direction={'row'} alignItems={'center'}>
                <CheckCircleIcon />
                <Typography
                    fontWeight={700}
                    sx={{ 
                        typography: { xs: "h5", md: "h4" } 
                    }}
                >
                    Todo App
                </Typography>
            </Stack>

            {user ? (
                <Tooltip title={"signout"}>
                    <IconButton onClick={handleLogout}>
                        <Avatar
                            src={user?.photoURL ? user?.photoURL : ""}
                            alt={user?.email ? user?.email : ""}
                            sx={{ width: 42, height: 42 }}
                        />
                    </IconButton>
                </Tooltip>
            )
                :
                <Stack>
                    <Tooltip title={"sign in"}>
                        <Button
                            color="inherit"
                            onClick={handleGoogleSignIn}>
                            SIGN IN
                        </Button>
                    </Tooltip>
                </Stack>
            }
        </Stack>
    )
}