import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import sl9 from '../../images/image1.jpeg';
import sl10 from '../../images/image02.jpeg';
import sl11 from '../../images/image03.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const useStyles = makeStyles((theme) => ({
  background: {
    background: '#f5f5f5'
    // Add your custom styles for the background container
  },
  container: {
    margin: '0 auto',
    marginTop: '10px',
    textAlign: 'left',
  },
  title: {
    fontFamily: 'Jack Rooney , sans-serif',
    marginTop: '0rem',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  imageCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '250px',
    width: '300px',
    margin: '18px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    padding: '8px',
    textAlign: 'center',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '3rem',
    textAlign: 'center',
    padding: '0 2rem 2rem',
  },
}));

const WhyChoosingUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const classes = useStyles();

  return (


    <Box className={classes.background}>
      <Box className={classes.container} textAlign="left" style={{ margin: '0 auto', marginTop: '10px' }} data-aos="fade-up">
        <Typography variant="h6" className={classes.title} sx={{fontFamily: 'Jack Rooney , sans-serif', paddingTop: '30px'}}>
          Why Choosing Us!
        </Typography>
        <Box mt={4} style={{ textAlign: 'center', fontFamily: 'Open Sans, sans-serifcursive' }} data-aos="fade-up" data-aos-delay="100">
          <Typography variant="h4">Few Reasons Why People Choose Us!</Typography>

          <Grid container className={classes.cardContainer} data-aos="fade-up" data-aos-delay="200">
            <div className={classes.imageCard}>
              <img src={sl9} style={{ height: '250px', width: '300px', margin: '18px' }} alt="Image" />
              <div className={classes.overlay}>
                <Typography variant="body1">Image 1</Typography>
              </div>
            </div>

            <div className={classes.imageCard}>
              <img src={sl10} style={{ height: '250px', width: '300px', margin: '18px' }} alt="Image" />
              <div className={classes.overlay}>
                <Typography variant="body1">Image 2</Typography>
              </div>
            </div>

            <div className={classes.imageCard}>
              <img src={sl11} style={{ height: '250px', width: '300px', margin: '20px' }} alt="Image" />
              <div className={classes.overlay}>
                <Typography variant="body1">Image 3</Typography>
              </div>
            </div>
          </Grid>

          <Grid>
            <Grid item className={classes.description} data-aos="fade-up" data-aos-delay="300">
              <Typography variant="body1" style={{ lineHeight: '1.6', width: '' }}>
                Banana leaf plates are an eco-friendly alternative to traditional disposable plates. They are made from
                the leaves of the banana plant, which are biodegradable and renewable. In our Leafline, it's very clean.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default WhyChoosingUs;