import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../utility/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Box, Stack, Rating } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

import { addItemsToCart, selectCartItems, removeItem } from '../../redux/features/cartSlice';
import { Opacity } from '@mui/icons-material';


const ProductCard = React.forwardRef(({ product }, ref) => {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false);
  const [color, setColor] = useState('info');
  const [icon, setIcon] = useState(<AddShoppingCartIcon />);
  const [text, setText] = useState('Add to cart');

  const { products } = useSelector(selectCartItems);

  const remove = () => {
    setExist(true);
    setColor('error');
    setIcon(<DeleteIcon />);
    setText('Remove from cart');
  }

  const add = () => {
    setExist(false);
    setColor('info');
    setIcon(<AddShoppingCartIcon />);
    setText('Add to cart');
  }

  const cartHandler = () => {
    const _id = product._id;
    const quantity = 1;

    if (exist) {
      dispatch(removeItem(_id));
      toast.error('Item remove from cart');
      add();
      return;
    }
    if (!exist) {
      dispatch(addItemsToCart({ _id, quantity, toast }))
      toast.success('Item added to cart');
      remove();
      return;
    }

  }

  const getExist = () => {
    if (products) {
      const e = products.some(p => p._id === product._id);
      if (e === true) {
        remove();
      }
    }
  }
  useEffect(() => {
    getExist();
  }, [])
  const navigate = useNavigate();
  const linkToDetails = () => { navigate(`/product/${product._id}`); }

  return (
    // <Box className='productCard'>

    //   <CardActionArea>
    //   <Card className='box-shadow' 
    //         onClick={linkToDetails}
    //         sx={{position:'relative',overflow:'hidden', minHeight:'365px'}}>

    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image={
    //         product && product.images && product.images.length > 0
    //           ? product.images[0].url || 'placeholder.jpg'
    //           : ''
    //       }
    //       alt={product && product.title}
    //       style={{padding:'5px'}}
    //     />
    //     {product.discount>0?
    //     <Typography variant='button' display='block' className='sale'>Sale</Typography>
    //     :
    //     ''}
    //     <CardContent>
    //         <Typography gutterBottom
    //                     variant='button'
    //                     component='h1'>{product?.title && product.title.length>15?product.title.slice(0,14):product.title}
    //         </Typography>
    //         <Stack spacing={1} sx={{display:'block'}}>
    //             <Rating name="half-rating-read" value={product.ratings} precision={0.1} readOnly />
    //         </Stack>
    //         <Typography gutterBottom
    //                     sx={{display:'block'}}
    //                     variant='caption'
    //                     component='span'>Reviews : ({product.numOfReviews})
    //         </Typography>
    //         {product.discount>0 ?
    //             <Box>
    //                 <Typography sx={{display:'block', textDecoration:'line-through',color:'red'}}
    //                             variant='caption'>Price : ({formatCurrency(product.price)})
    //                 </Typography>
    //                 <Typography sx={{display:'block'}}
    //                             variant='caption'>Price : ({formatCurrency(product.price-product.discount)})
    //                 </Typography>                   
    //             </Box>
    //         :
    //             <Typography sx={{display:'block'}}
    //                 variant='caption'>Price : {formatCurrency(product.price)}
    //             </Typography>       
    //         }
    //         {
    //             product.localShipmentPolicy==='free' ?
    //             <Box sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
    //                 <LocalShippingIcon sx={{mr:1, color:'#458a6f'}} />
    //                 <Typography variant='caption'>Free Shipping</Typography>                
    //             </Box>
    //             :
    //             ''
    //         }
    //           <Typography sx={{display:'block'}}
    //                       variant='button'>View details &#38; buy.
    //           </Typography>

    //     </CardContent>
    //     </Card>
    //   </CardActionArea>
    //   <Box sx={{mt:2}} >
    //         {ref? 
    //             <Button variant='outlined'
    //                     ref={ref}
    //                     fullWidth
    //                     color="primary"
    //                     startIcon={icon}
    //                     onClick={cartHandler}
    //                     style={{backgroundColor:"rgb(225,225,222)"}}>{text}</Button>
    //         :
    //           <Button variant='outlined'
    //                     fullWidth
    //                     color="primary"
    //                     startIcon={icon}
    //                     onClick={cartHandler} style={{backgroundColor:"rgb(225,225,222)"}}>{text}</Button>
    //         }
    //   </Box>
    // </Box>

    <Box className='' sx={{backgroundColor:"white"}}>
      <CardActionArea>
        <Card onClick={linkToDetails} className='box-shadow' sx={{ position: 'relative', overflow: 'hidden', minHeight: '250px',borderRadius: '10px' }}>
          <CardMedia
            component="img"
            height="140"
            image={product && product.images && product.images.length > 0 ? product.images[0].url || 'placeholder.jpg' : ''}
            alt={product && product.title}
            style={{ padding: '5px', Opacity: '0.5' }}
          />
          {product.discount > 0 ?
            <Typography variant='button' display='block' className='sale'>Sale</Typography>
            :
            ''
          }
          <CardContent>
            <Typography gutterBottom variant='button' component='h3'>
              {product?.title && product.title.length > 15 ? product.title.slice(0, 14) : product.title}
            </Typography>
            {product.discount > 0 ?
              <Typography sx={{ display: 'block', textDecoration: 'line-through', color: 'red' }} variant='caption'>
                Price: {formatCurrency(product.price)}
              </Typography>
              :
              <Typography sx={{ display: 'block' }} variant='caption'>
                Price: {formatCurrency(product.price)}
              </Typography>
            }
          </CardContent>
        </Card>
      </CardActionArea>
      <Box sx={{ mt: 2 }} >
              {ref ?
                <Button variant='outlined'
                  ref={ref}
                  fullWidth
                  // color="primary"
                  startIcon={icon}
                  onClick={cartHandler}
                  sx={{ color:"#D2FBA4",backgroundColor: '#1A2902',borderRadius:'15px' }}
                >{text}</Button>
                :
                <Button variant='outlined'
                  fullWidth
                  // color="#D2FBA4"
                  startIcon={icon}
                  onClick={cartHandler}
                  sx={{   color:"#D2FBA4",backgroundColor: '#1A2902', borderRadius:'15px' }}
                >{text}</Button>
              }
            </Box>
    </Box>
    
  )
})

export default ProductCard