import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { updateAsImportantFromFirebaseDB } from '../../redux/features/thunk';
import { updateAsCompletedFromFirebaseDB } from '../../redux/features/thunk';
import { deleteTodoFromFirebaseDB } from '../../redux/features/thunk';
import { eventEditOnClick } from '../../redux/features/thunk';
import { useAppDispatch } from '../../redux/hooks';
import { ToDoShortProps } from '../../lib/type';
import { Typography } from '@mui/material';
import { useState } from 'react';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
export default function ToDoList({
    id,
    name,
    isImportant,
    isCompleted
}: ToDoShortProps) {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const buttonMoreOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMoreButton = () => {
        setAnchorEl(null);
    };

    const handleUpdateImportant = () => {
        dispatch(updateAsImportantFromFirebaseDB(id));
    }

    const handleUpdateCompleted = () => {
        dispatch(updateAsCompletedFromFirebaseDB(id));
    }

    const deleteTask = () => {
        dispatch(deleteTodoFromFirebaseDB(id));
    }

    const handleEdit = () => {
        dispatch(eventEditOnClick(id));
    }

    return (
        <Stack
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            sx={{
                backgroundColor:
                    isCompleted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)',
                borderRadius: 2,
                height: '6vmin',
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
                <Typography
                    sx={{
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        typography: {
                            xs: 'body2',
                            md: 'body1'
                        }
                    }}>
                    {name}
                </Typography>
            </Stack>
            <Stack
                display={'flex'}
                flexDirection={'row'}
            >
                {
                    isImportant ?
                        <IconButton size='small' color='secondary' onClick={handleUpdateImportant}>
                            <StarIcon />
                        </IconButton> :
                        <IconButton size='small' onClick={handleUpdateImportant}>
                            <StarOutlineIcon />
                        </IconButton>
                }
                <IconButton
                    size='small'
                    onClick={buttonMoreOnClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <StyledMenu
                    id='demo-customized-menu'
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMoreButton}
                >
                    <MenuItem onClick={handleEdit} disableRipple>
                        <EditIcon />
                        Edit Task
                    </MenuItem>
                    <MenuItem onClick={handleUpdateCompleted} disableRipple>
                        <CheckCircleOutlineIcon />
                        Mark as Completed
                    </MenuItem>
                    <MenuItem onClick={handleUpdateImportant} disableRipple>
                        <StarOutlineIcon />
                        {
                            isImportant ? 'Mark As Not Important' : ' Mark as Important'
                        }
                    </MenuItem>
                    <MenuItem onClick={deleteTask} disableRipple>
                        <DeleteOutlineOutlinedIcon />
                        Delete
                    </MenuItem>
                </StyledMenu>
            </Stack>
        </Stack>
    )
}