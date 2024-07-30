import * as yup from 'yup';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { addTodoToFirebaseDB } from "../../redux/features/thunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { v4 as uuidv4 } from 'uuid';

export default function Input() {
    const user: any = useAppSelector((state) => state.todo.user);
    const dispatch = useAppDispatch();

    const validationSchema = yup.object({
        text: yup.string().trim().required('Required'),
    });
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            if (user) {
                const input = {
                    id: uuidv4().toString(),
                    name: values.text,
                    date: new Date(),
                    isImportant: false,
                    isCompleted: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    user: user
                }
                dispatch(addTodoToFirebaseDB(input));
            }
            actions.resetForm({ values: {text: ''} });
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.4)'
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                id='text'
                name='text'
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.text && Boolean(formik.errors.text)}
                placeholder="What do you need to do?"
            />
            <Button
                variant='contained'
                color='inherit'
                type='submit'
                sx={{
                    width: '5vw',
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '0 4px 4px 0'
                }}
            >
                <AddIcon /> Add
            </Button>
        </form>
    )
}