import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Divider, Paper } from '@mui/material';
import { DiningCard } from '../../components/common';
import BookingForm from '../../components/booking/BookingForm';
import { diningOptions } from '../../data/dining';

const DiningPage = () => {
  const [selectedDining, setSelectedDining] = useState(null);

  // Handle booking a dining option
  const handleBookDining = (diningOption) => {
    setSelectedDining(diningOption);
    window.scrollTo({
      top: document.getElementById('booking-form').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Handle form submission
  const handleSubmitBooking = (bookingData) => {
    console.log('Dining booking submitted:', { ...bookingData, diningArea: selectedDining });
    // In a real app, this would submit to a server
  };

  return (
    <Box py={4}>
      <Container>
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            Dining Reservations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Experience exceptional cuisine paired with our craft beers in one of our unique dining areas.
            Each space offers a different atmosphere to suit your mood and occasion.
          </Typography>
        </Box>

        {/* Dining Options Grid */}
        <Grid container spacing={4} mb={6}>
          {diningOptions.map(diningOption => (
            <Grid item key={diningOption.id} xs={12} sm={6} md={3}>
              <DiningCard diningOption={diningOption} onBookNow={handleBookDining} />
            </Grid>
          ))}
        </Grid>

        {/* Booking Form Section */}
        <Box id="booking-form" mb={6}>
          <Divider sx={{ mb: 6 }} />
          
          {selectedDining ? (
            <>
              <Typography variant="h4" gutterBottom textAlign="center" mb={4}>
                Reserve a Table at {selectedDining.name}
              </Typography>
              <BookingForm 
                title={`Table Reservation - ${selectedDining.name}`}
                type="dining"
                onSubmit={handleSubmitBooking}
              />
            </>
          ) : (
            <Typography variant="h5" textAlign="center" color="text.secondary">
              Select a dining area above to make a reservation
            </Typography>
          )}
        </Box>

        {/* Additional Information */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Dining Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Reservations Policy
              </Typography>
              <Typography variant="body2" paragraph>
                • Reservations are recommended, especially for weekends and holidays.
              </Typography>
              <Typography variant="body2" paragraph>
                • We hold tables for 15 minutes after your reservation time.
              </Typography>
              <Typography variant="body2" paragraph>
                • For parties larger than 8, please contact us directly at (555) 123-4567.
              </Typography>
              <Typography variant="body2" paragraph>
                • A credit card is required to hold your reservation but is not charged unless you fail to show up.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Dining Experience
              </Typography>
              <Typography variant="body2" paragraph>
                • Our full menu is available in all dining areas.
              </Typography>
              <Typography variant="body2" paragraph>
                • Special dietary requirements can be accommodated with advance notice.
              </Typography>
              <Typography variant="body2" paragraph>
                • We offer beer pairing suggestions for all menu items.
              </Typography>
              <Typography variant="body2" paragraph>
                • Private dining is available for special events. Contact us for details.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DiningPage;
