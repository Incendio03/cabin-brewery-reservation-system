import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#2C1810', 
        color: 'white',
        mt: 'auto',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom
              fontFamily="Playfair Display, serif"
              fontWeight={700}
            >
              The Cabin Brewery
            </Typography>
            <Typography variant="body2" mb={2}>
              A cozy spot for beer enthusiasts, offering exceptional brews and memorable experiences.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Twitter />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                <YouTube />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/" color="inherit" underline="hover">Home</Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/dining" color="inherit" underline="hover">Dining Reservation</Link>
              </Box>              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/rooms" color="inherit" underline="hover">KTV/Rooms Booking</Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/parking" color="inherit" underline="hover">Parking Reservation</Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/bookings" color="inherit" underline="hover">My Bookings</Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Box component="address" sx={{ fontStyle: 'normal' }}>
              <Typography variant="body2" mb={1}>123 Brewery Lane</Typography>
              <Typography variant="body2" mb={1}>Cabin Hills, CH 54321</Typography>
              <Typography variant="body2" mb={1}>
                Email: <Link href="mailto:info@cabinbrewery.com" color="inherit" underline="hover">info@cabinbrewery.com</Link>
              </Typography>
              <Typography variant="body2" mb={1}>
                Phone: <Link href="tel:+15551234567" color="inherit" underline="hover">(555) 123-4567</Link>
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Opening Hours</Typography>
            <Typography variant="body2" mb={1}>Monday - Thursday: 11am - 10pm</Typography>
            <Typography variant="body2" mb={1}>Friday - Saturday: 11am - 12am</Typography>
            <Typography variant="body2" mb={1}>Sunday: 12pm - 9pm</Typography>
          </Grid>
        </Grid>
        
        <Box mt={5} borderTop={1} borderColor="rgba(255,255,255,0.1)" pt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} The Cabin Brewery. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
