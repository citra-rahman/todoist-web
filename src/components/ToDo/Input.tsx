import { useState } from "react";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import { addTodoToFirebaseDB } from "../../redux/features/thunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { v4 as uuidv4 } from 'uuid';

export default function Input() {
    const [text, setText] = useState('');
    const user: any = useAppSelector((state) => state.todo.user);
    const dispatch = useAppDispatch();

    const handleAddToDo = async () => {
        if (user) {
            const input = {
                id: uuidv4().toString(),
                name: text,
                date: new Date(),
                isImportant: false,
                isCompleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: user
            }
            dispatch(addTodoToFirebaseDB(input));
            setText('');
        }
    };

    const handleChange = (event: any) => {
        setText(event.target.value);
    }

    return (
        <Paper
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.4)'
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="What do you need to do?"
                inputProps={{ 'aria-label': 'What do you need to do' }}
                onChange={handleChange}
            />
            <Button
                variant='contained'
                color='inherit'
                onClick={handleAddToDo}
                sx={{
                    width: '5vw',
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '0 4px 4px 0'
                }}
            >
                <AddIcon /> Add
            </Button>
        </Paper>
    )
}