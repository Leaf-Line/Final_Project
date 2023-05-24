import React from 'react';
import { formatCurrency } from '../../utility/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import { Button, Box, Typography, IconButton, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { addItemsToCart, selectCartItems, removeItem } from '../../redux/features/cartSlice';
import './Cart.css';
import CartItemCard from './CartItemCard';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(selectCartItems);

    const deleteCartItems = (_id) => {
        dispatch(removeItem(_id));
    }
    const decreaseQuantity=(_id,qty)=>{
        const quantity=qty-20;
        if(qty<=1) return;
        dispatch(addItemsToCart({_id,quantity}));
      }
      const increaseQuantity=(_id,qty,stock)=>{
        const quantity=qty+20;
        if(stock<=qty) return;
        dispatch(addItemsToCart({_id,quantity}));
      }
      const checkOutHandler=()=>{
        navigate('/auth',{state:{path:'/shipping'}});
      }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                textAlign: 'center',
                boxShadow: '0 2px 4px #285430',
                borderRadius: '4px',
                backgroundColor: '#fff',
                padding: '55px',
                justifyContent: "center",
                marginLeft: "170px",
                marginTop: "30px"
            }}
        >
            {/* products.length>0? */}
            <Box className='cart-items'>
                <Box className='cart-header'>
                    <Typography variant='button' display='block' color="#1b5e20">Product</Typography>
                    <Typography variant='button' display='block' color="#1b5e20" sx={{ textAlign: 'center' }}>Quantity</Typography>
                    <Typography variant='button' display='block' color="#1b5e20" sx={{ textAlign: 'right' }}>Subtotal</Typography>
                </Box>
                {products && products.map((item) =>
                    <Box className='cart-body' key={item._id}>
                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />

                        <Box sx={{ textAlign: 'center' }}>
                            <Box className='btn-quantity' sx={{ m: 0 }}>
                                <Tooltip title='Decrease quantity' placement='top'>
                                    <IconButton color='error' component='span' onClick={() => decreaseQuantity(item._id, item.quantity)}>
                                        <RemoveCircleIcon style={{ height: '40px', width: '40px' }} />
                                    </IconButton>
                                </Tooltip>
                                <label>{item.quantity}</label>
                                <Tooltip title='Increase quantity' placement='top'>
                                    <IconButton color='success' component='span' onClick={() => increaseQuantity(item._id, item.quantity, item.stock)}>
                                        <AddCircleIcon style={{ height: '40px', width: '40px' }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Typography variant='button' display='block' className='item-subtotal'>
                            {formatCurrency(item.quantity * item.price)}
                        </Typography>

                    </Box>
                )}

                <Box className='cart-total-price'>
                    <Typography variant='button' display='block' className='item-subtotal'>
                        Total :
                        {formatCurrency(products.reduce((acc, item) => acc + item.quantity * item.price, 0))}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Button variant='contained'
                        sx={{ backgroundImage: 'linear-gradient(to right, #143a0d, #c0dca5)' }}
                        startIcon={<ShoppingCartCheckoutIcon />}
                        onClick={checkOutHandler}> Checkout
                    </Button>
                </Box>

            </Box>
            :
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Typography variant='h4' component='div' gutterBottom>Cart is Empty</Typography>
                <AddShoppingCartIcon sx={{ width: '80px', height: '80px', color: 'red' }} />
                <Typography sx={{ mt: 4 }}><Link to='/'>Back to home</Link></Typography>
            </Box>

        </Box>
    )
}

export default Cart