import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import StarIcon from '@mui/icons-material/Star';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ToDoProps } from "../../lib/type";

export default function ToDoList({
id,
name,
date,
isImportant,
isCompleted,
createdAt,
updatedAt

}: ToDoProps) {
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
                spacing={2}
            >
                {isCompleted ? (
                    <CheckCircleIcon width={32} height={32} />
                ) : (
                    <CheckCircleOutlineIcon width={32} height={32} />
                )}
                {name}
            </Stack>
            <Stack
                display={'flex'}
                flexDirection={'row'}
            >
                <IconButton size="small" color="secondary">
                    <StarIcon />
                </IconButton>
                <IconButton size="small">
                    <MoreHorizIcon />
                </IconButton>
            </Stack>
        </Stack>
    )
}