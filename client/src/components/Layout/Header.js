// import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import DrawerMenu from './DrawerMenu';
// import AuthMenu from './AuthMenu';
// import HomeIcon from '@mui/icons-material/Home';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import { Tooltip } from '@mui/material';
// import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import { useSelector } from 'react-redux';
// import { selectCartItems } from '../../redux/features/cartSlice';
// import '../Layout/Header.css';
// import logo from '../../images/LOGO.png'
// import logoo from '../../images/logoo.png'

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     right: 6,
//     top: 5,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: '0 4px',
//   },
// }));

// const Header = () => {

//   const { products } = useSelector(selectCartItems);

  
  

//   return (

//     <div class="container-fluid main">
    
//       <nav className="navbar scrolled navbar-expand navbar-dark navbar navbar navbar-default fixed-top navbar-transparent" style={{ position: 'fixed', marginTop: '-150px' }}>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <Link to="/" className="navbar-brand">
//           <img src={logoo} alt="Logo" className="logo" style={{ height: '300px', width: '300px', marginLeft: '150px', marginTop: '20px' }} />
//         </Link>
//         <div className="collapse navbar-collapse text-center justify-content-center" id="navbarNav" >
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <NavLink to="/" className="nav-link " activeClassName="active" style={{ color: 'Black' }}>
//                 <HomeIcon /> Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/product" className="nav-link" activeClassName="active" style={{ color: 'Black' }}>
//                 Product
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/cart" className="nav-link" activeClassName="active" style={{ color: 'Black' }}>
//                 <StyledBadge badgeContent={products.length} >
//                   <ShoppingCartIcon />
//                 </StyledBadge>
//                 Cart
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//         <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '20px' }}>
//           <div className="auth-area text-left">
//             <AuthMenu />
//           </div>
//         </div>
//       </nav>
      
//       <div id="myCarousel" class="carousel carousel-fade slide" data-ride="carousel" data-interval="3000">
// <div class="carousel-inner" role="listbox">
// <div class="item active background a"></div>
// </div>
// </div>

// <div class="covertext">
// <div class="col-lg-10" style={{ float: "none", margin: "0 auto" ,marginTop:'10rem',fontFamily:' NunitoSans,Verdana', color:'#7eaf6c',border: '2px '}}>
// <h1 class="title">BIO-DEGRADABLE PLATES FOR A CLEANER PLANET</h1>
// <h1 class="title">CLEANER PLANET</h1>
// </div>
// <div class="col-xs-12 explore">
// <Link to='/product'><button type="button" class="btn btn-lg explorebtn">EXPLORE</button></Link>
// </div>


// </div>

//     </div>



    
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import AuthMenu from './AuthMenu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { Tooltip } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/features/cartSlice';
import '../Layout/Header.css';
import logo from '../../images/LOGO.png';
import logoo from '../../images/logoo.png';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 6,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { products } = useSelector(selectCartItems);

  return (
    <div className={`container-fluid main ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar navbar-expand navbar-dark navbar navbar navbar-default fixed-top ${scrolled ? 'navbar-transparent' : ''}`} style={{ position: 'fixed', marginTop: '-100px', backgroundColor: scrolled ? '#899D60' : '' }}>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link to="/" className="navbar-brand">
          <img src={logoo} alt="Logo" className="logo" style={{  width: '150px', marginLeft: '150px',marginTop:'40px',marginBottom:'-40px' }} />
        </Link >
        <div className="collapse navbar-collapse text-center justify-content-center" id="navbarNav"style={{marginTop:'40px',marginBottom:'-40px'}}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link " activeClassName="active" style={{ color: '#654E30' }}>
                <HomeIcon /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className="nav-link" activeClassName="active" style={{ color: '#654E30' }}>
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" activeClassName="active" style={{ color: '#654E30' }}>
                <StyledBadge badgeContent={products.length}>
                  <ShoppingCartIcon />
                </StyledBadge>
                Cart
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '80px',color:'#bdf890' }}>
          <div className="auth-area text-left">
            <AuthMenu />
          </div>
        </div>
      </nav>

      <div id="myCarousel" className="carousel carousel-fade slide" data-ride="carousel" data-interval="3000">
        <div className="carousel-inner" role="listbox">
          <div className="item active background a"></div>
        </div>
      </div>

      <div className="covertext">
        <div className="col-lg-10" style={{ float: "none", margin: "0 auto", marginTop: '10rem', fontFamily: 'NunitoSans,Verdana', color: '#7eaf6c', border: '2px ' }}>
          <h1 className="title">BIO-DEGRADABLE PLATES FOR A </h1>
          <h1 className="title">CLEANER PLANET</h1>
        </div>
        <div className="col-xs-12 explore">
          <Link to='/product'><button type="button" className="btn btn-lg explorebtn">EXPLORE</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

