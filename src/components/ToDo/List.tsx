import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { updateImportantFromFirebaseDB } from "../../redux/features/thunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ToDoProps } from "../../lib/type";
import { Typography } from "@mui/material";

export default function ToDoList({
    id,
    name,
    date,
    isImportant,
    isCompleted,
    createdAt,
    updatedAt

}: ToDoProps) {
    const dispatch = useAppDispatch();

    const handleUpdateImportant = () => {
        dispatch(updateImportantFromFirebaseDB(id));
    }
    return (
        <Stack
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            sx={{
                backgroundColor:
                    isCompleted ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.4)",
                borderRadius: 2,
                height: '6vh',
                padding: 1,
            }}

        >
            <Stack
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'start'}
                alignItems={'center'}
            >
                {isCompleted ? (
                    <CheckCircleIcon />
                ) : (
                    <CheckCircleOutlineIcon />
                )}
                <Typography sx={{ typography: { xs: "body2", md: "body1" } }}>{name}</Typography>
            </Stack>
            <Stack
                display={'flex'}
                flexDirection={'row'}
            >
                {
                    isImportant ?
                        <IconButton size="small" color="secondary" onClick={handleUpdateImportant}>
                            <StarIcon />
                        </IconButton> :
                        <IconButton size="small" onClick={handleUpdateImportant}>
                            <StarOutlineIcon />
                        </IconButton>
                }
                <IconButton size="small">
                    <MoreHorizIcon />
                </IconButton>
            </Stack>
        </Stack>
    )
}