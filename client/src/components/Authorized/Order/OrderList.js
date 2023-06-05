import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getAllOrders, resetMutationResult, selectAllOrders, selectOrderMutationResult } from '../../../redux/features/orderSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteForeeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import BoxShadowLoader from '../../../components/Skeletons/BoxShadowLoader';

const OrderList = () => {
    const dispatch = useDispatch();
    const { loading, orders } = useSelector(selectAllOrders);
    const { success } = useSelector(selectOrderMutationResult);

    const deleteHandler = (id) => {
        dispatch(deleteOrder({ id, toast }));
    }

    const columns = [
        { field: 'id', headerName: 'Order ID', headerClassName: 'gridHeader', flex: 1, maxWidth: 90 },
        { field: 'status', headerName: 'Status', headerClassName: 'gridHeader', flex: 1, minWidth: 100 },
        { field: 'itemsQty', headerName: 'Quantity', headerClassName: 'gridHeader', flex: 1, minWidth: 100, type: 'Number' },
        { field: 'amount', headerName: 'Amount', headerClassName: 'gridHeader', flex: 1, minWidth: 80, type: 'Number' },
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
                        <Link to={`/authorized/order/${params.getValue(params.id, 'id')}`}>
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
    orders && orders.forEach(order => {
        rows.push({
            id: order._id,
            status: order.orderStatus,
            itemsQty: order.orderItems.length,
            amount: order.totalPrice
        })
    });
    useEffect(() => {
        if (success) {
            dispatch(resetMutationResult());
        }
        dispatch(getAllOrders({ toast }))
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
                marginLeft: "105px",
                marginTop:"20px",
                marginBottom:"20px"
            }}
        >
            <Box style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '15px', textAlign: 'center' }}>
                <Typography component='h1' color="#1b5e20" variant='h5' sx={{ m: 4 }}>List of Orders</Typography>
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

export default OrderList