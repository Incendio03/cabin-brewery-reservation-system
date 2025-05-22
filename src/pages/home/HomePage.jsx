import React from 'react';
import { Box, Container, Typography, Button, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { EventCard } from '../../components/common';
import { events } from '../../data/events';

// Hero background
const HeroBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/cabinPic.jpg') no-repeat center/cover`,
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
}));

const HomePage = () => {
  // Just display upcoming events (next 4 events)
  const upcomingEvents = events.slice(0, 4);
  
  const handleBookEvent = (event) => {
    // Handle booking event (in a real app this would navigate to a booking page)
    console.log('Booking event:', event);
  };

  return (
    <Box>
      {/* Hero Section */}
      <HeroBox>
        <Container>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Welcome to The Cabin Brewery
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Experience the finest craft beers in a rustic, cozy atmosphere with great food and entertainment.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={Link}
              to="/dining"
              sx={{ px: 4, py: 1.5 }}
            >
              Book a Table
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large"
              component={Link}
              to="/events"
              sx={{ 
                px: 4, 
                py: 1.5, 
                borderColor: 'white', 
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              View Events
            </Button>
          </Stack>
        </Container>
      </HeroBox>
      
      {/* Upcoming Events Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
            Upcoming Events
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
            Don't miss out on our exciting events happening at The Cabin Brewery. Book your tickets today!
          </Typography>
          
          <Grid container spacing={4}>
            {upcomingEvents.map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={3}>
                <EventCard event={event} onBookNow={handleBookEvent} />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              component={Link} 
              to="/events" 
              variant="outlined" 
              color="primary" 
              size="large"
            >
              View All Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 8, 
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center' 
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Ready to Experience The Cabin Brewery?
          </Typography>
          <Typography variant="subtitle1" paragraph sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Join us for great beer, delicious food, and an unforgettable experience. Make your reservation now!
          </Typography>          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              component={Link}
              to="/dining"
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ px: 4 }}
            >
              Reserve Dining
            </Button>
            <Button 
              component={Link}
              to="/rooms"
              variant="outlined" 
              color="secondary"
              size="large"
              sx={{ 
                px: 4,
                borderColor: 'white', 
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Book KTV/Room
            </Button>
            <Button 
              component={Link}
              to="/parking"
              variant="outlined" 
              color="secondary"
              size="large"
              sx={{ 
                px: 4,
                borderColor: 'white', 
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Reserve Parking
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
