

import { useFormik } from "formik";
import InputBase from '@mui/material/InputBase';
import { updateToDoTextFromFirebaseDB } from "../../redux/features/thunk";
import { eventEditOnClick } from "../../redux/features/thunk";
import { useAppDispatch } from "../../redux/hooks";

export default function ToDoEdit({ id }: { id: string }) {
    const dispatch = useAppDispatch();

    const handleMouseLeave = (event:any) => {
        let name = event.target.value as string;
        if(name){
            dispatch(updateToDoTextFromFirebaseDB({id, name}));
            dispatch(eventEditOnClick(''))
        }
    }

    return (
        <InputBase
            onMouseLeave={handleMouseLeave}
            sx={{
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: 2,
                height: '6vmin',
                padding: 1,
            }}
        />
    );
}