import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Typography, Box, Grid, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserList, getAllUsers } from '../../../redux/features/authSlice';
import { selectAllProducts, getProductsByAuthorizeRoles } from '../../../redux/features/productSlice';
import { getAllOrders, selectAllOrders } from '../../../redux/features/orderSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import './Admin.css';
import { Link } from 'react-router-dom';

import Chart from 'chart.js/auto';
import { Doughnut, Line, Bar } from 'react-chartjs-2';


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectAllProducts);
  const { users } = useSelector(selectUserList);
  const { orders } = useSelector(selectAllOrders);

  let outOfStock = 0;
  products && products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });

  let totalAmount = 0;
  orders && orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  useEffect(() => {
    dispatch(getProductsByAuthorizeRoles({ toast }));
    dispatch(getAllOrders({ toast }));
    dispatch(getAllUsers({ toast }));
  }, []);
  const lineData = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'Total Amount',
        fill: true,
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['orange'],
        data: [0, totalAmount]
      }
    ]
  }

  const doughnutData = {
    labels: ['Out Of Stock', 'In Stock'],
    datasets: [
      {
        backgroundColor: ['red', '#285430'],
        hoverBackgroundColor: ['black', '#969B40'],
        data: [outOfStock, products.length - outOfStock]
      }
    ]
  }

  const barData = {
    labels: products && products.map((product) => product.name),
    datasets: [
      {
        label: 'Stock',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: products && products.map((product) => product.stock)
      }
    ]
  };

  return (
    <>
      <Box
        className='dash-box'
        sx={{
          backgroundColor: '#F6F7C1',
          padding: '40px',
          minHeight: '100vh',
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              className='Box'
              sx={{
                backgroundColor: '#E9EDC9',
                //  'rgba(255, 255, 255, 0.8)'
                backdropFilter: 'blur(10px)',
                borderRadius: "10px",
                color: 'black',
                padding: '30px',
                boxShadow: '0px 3px 5px 0px #415d43',
              }}
            >

              <Typography variant='h6' textAlign='center' fontFamily='poppins, sans-serif'>
                <ShoppingCartOutlinedIcon /> Products
              </Typography>
              <Divider />
              <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                {products && products.length}
              </Typography>
            </Box>
          </Grid>



          <Grid item xs={12} sm={6} md={3}>
            <Box
              className='Box'
              sx={{
                backgroundColor: '#E9EDC9',
                borderRadius: "10px",
                color: 'black',
                padding: '30px',
                boxShadow: '0px 3px 5px 0px #415d43',
              }}
            >

              <Typography variant='h6' textAlign='center' fontFamily='poppins, sans-serif'>
                <GroupOutlinedIcon /> Users
              </Typography>
              <Divider />
              <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                {users && users.length}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              className='Box'
              sx={{
                backgroundColor: '#E9EDC9',
                borderRadius: "10px",
                color: 'black',
                padding: '30px',
                boxShadow: '0px 3px 5px 0px #415d43',
              }}
            >

              <Typography variant='h6' textAlign='center' fontFamily='poppins, sans-serif'>
                <ListAltOutlinedIcon /> Orders
              </Typography>
              <Divider />
              <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                {orders && orders.length}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              className='Box'
              sx={{
                backgroundColor: '#E9EDC9',
                color: 'black',
                borderRadius: "10px",
                padding: '30px',
                boxShadow: '0px 3px 5px 0px #415d43',
              }}
            >

              <Typography variant='h6' textAlign='center' fontFamily='poppins, sans-serif'>
                <MonetizationOnOutlinedIcon /> Revenue
              </Typography>
              <Divider />
              <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                {orders && totalAmount}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* <Grid container sx={{ alignItems: 'center', mt: 1, textAlign: 'center' }} spacing={3}>
          <Grid item xs={12} md={5} lg={5} style={{  marginLeft: '120px', marginTop: '80px' }}>
            <Line data={lineData} />
          </Grid>

          <Grid item xs={12} md={4} lg={4} style={{ marginLeft: '140px',  marginTop: '80px' }}>
            <Doughnut data={doughnutData} />
          </Grid>
         
        </Grid> */}



        <Grid container sx={{ alignItems: 'center', mt: 1, padding: "30px", marginLeft: "230px", marginTop: "120px" }} spacing={3}>
          <div style={{ padding: "30px", width: '500px', height: "400px", borderRadius: "10px", boxShadow: '0px 3px 5px 0px #415d43', }}>

            <Grid item xs={12} md={10} lg={10} style={{ marginLeft: '60px', marginTop: '80px' }}>
              <Line data={lineData} />
            </Grid>
          </div>

          <div style={{ padding: "30px", width: '500px', height: "400px", borderRadius: "10px", boxShadow: '0px 3px 5px 0px #415d43', marginLeft: "50px" }}>
            <Grid item xs={12} md={10} lg={10} style={{ marginLeft: "40px", marginRight: "40px" }} >
              <Doughnut data={doughnutData} />
            </Grid>
          </div>

        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
