import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, resetMutationResult, selectUserList, selectMutationResult, deleteUser } from '../../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { IMAGE_BASEURL } from '../../../constants/baseURL';

import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteForeeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';

const UserList = () => {
    const dispatch = useDispatch();
    const { loading, users } = useSelector(selectUserList);
    const { success } = useSelector(selectMutationResult);

    const deleteHandler = (id) => {
        dispatch(deleteUser({ id, toast }));
    }

    const columns = [
        {
            field: 'image', headerName: 'Avatar', headerClassName: 'gridHeader', flex: .4, minWidth: 60,
            renderCell: (params) => {
                return (
                    params.value === '' ? '' :
                        <img src={params.value} height='100%' />
                )
            }
        },
        { field: 'name', headerName: 'Name', headerClassName: 'gridHeader', flex: 1, minWidth: 170 },
        { field: 'email', headerName: 'Email', headerClassName: 'gridHeader', flex: 1.5, minWidth: 250 },
        { field: 'role', headerName: 'Role', headerClassName: 'gridHeader', flex: 1.5, minWidth: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            headerClassName: 'gridHeader',
            flex: .5,
            minWidth: 80,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/authorized/user/${params.getValue(params.id, 'id')}`}>
                            <Tooltip title='Edit' placement='top'>
                                <EditIcon sx={{ width: '30px', height: '30px', color: '#1b5e20' }} />
                            </Tooltip>
                        </Link>

                        <Tooltip title='Delete' placement='top'>
                            <IconButton color='error'
                                component='span'
                                onClick={() => deleteHandler(params.getValue(params.id, 'id'))}>
                                <DeleteForeeverIcon sx={{ width: '30px', height: '30px' }} />
                            </IconButton>
                        </Tooltip>

                    </>
                )
            }
        }
    ]
    const rows = [];
    users && users.forEach(user => {
        rows.push({
            id: user._id,
            name: user.name,
            image: IMAGE_BASEURL + user.avatar.url,
            email: user.email,
            role: user.roles
        })
    });
    useEffect(() => {
        if (success) {
            dispatch(resetMutationResult());
        }
        dispatch(getAllUsers({ toast }))
    }, [dispatch, success])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '85%',
                textAlign: 'center',
                boxShadow: '0 2px 4px #285430',
                borderRadius: '4px',
                backgroundColor: '#fff',
                padding: '55px',
                justifyContent: "center",
                marginLeft: "105px"
            }}
        >
            <Box style={{ displya: 'flex', flexDirection: 'column', width: '100%', marginTop: '15px', textAlign: 'center' }}>
                <Typography component='h1' variant='h5' sx={{ m: 4 }} color='#1b5e20' >Full list of users</Typography>
                {loading ? <BoxShadowLoader /> :
                    <DataGrid rows={rows}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        autoHeight
                    />
                }
            </Box>
        </Box>

    )
}

export default UserList