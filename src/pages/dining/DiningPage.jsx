import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button, Alert } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

// Placeholder for the InteractiveParkingMap component
const InteractiveParkingMap = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>Interactive Parking Map</Typography>
      <Box sx={{ height: 300, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        [Parking Map Placeholder - Functionality to be added]
      </Box>
      {/* Logic for selecting a parking spot will go here */}
    </Paper>
  );
};

const DiningPage = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [bookingDetails, setBookingDetails] = useState({
    numHeads: 1,
    numTables: 1,
    numChairs: 1,
    date: tomorrow,
    time: new Date(tomorrow.setHours(18, 0, 0)),
    parkingSlot: null, // To store selected parking slot
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setBookingDetails(prev => ({ ...prev, date: newDate }));
  };

  const handleTimeChange = (newTime) => {
    setBookingDetails(prev => ({ ...prev, time: newTime }));
  };
  
  // Placeholder for parking slot selection
  const handleParkingSelect = (slot) => {
    setBookingDetails(prev => ({ ...prev, parkingSlot: slot }));
    console.log("Parking slot selected:", slot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      setError("Please fill out all required personal information fields.");
      return;
    }
    if (bookingDetails.numChairs > bookingDetails.numTables * 6) {
        setError("Each table can have a maximum of 6 chairs. Please adjust the number of chairs or tables.");
        return;
    }
    console.log('Dining booking submitted:', bookingDetails);
    setError(null);
    setSubmitted(true);
    // In a real app, this would submit to a server
  };

  if (submitted) {
    return (
      <Container sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Your dining reservation has been received successfully!
          </Alert>
          <Typography variant="h6" gutterBottom>
            Reservation Details
          </Typography>
          <Typography>Name: {bookingDetails.name}</Typography>
          <Typography>Email: {bookingDetails.email}</Typography>
          <Typography>Phone: {bookingDetails.phone}</Typography>
          <Typography>Date: {bookingDetails.date.toLocaleDateString()}</Typography>
          <Typography>Time: {bookingDetails.time.toLocaleTimeString()}</Typography>
          <Typography>Guests: {bookingDetails.numHeads}</Typography>
          <Typography>Tables: {bookingDetails.numTables}</Typography>
          <Typography>Chairs: {bookingDetails.numChairs}</Typography>
          {bookingDetails.parkingSlot && <Typography>Parking Slot: {bookingDetails.parkingSlot}</Typography>}
          {bookingDetails.specialRequests && <Typography>Special Requests: {bookingDetails.specialRequests}</Typography>}
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 3 }}
            onClick={() => {
              setSubmitted(false);
              setBookingDetails({
                numHeads: 1,
                numTables: 1,
                numChairs: 1,
                date: tomorrow,
                time: new Date(tomorrow.setHours(18, 0, 0)),
                parkingSlot: null,
                name: '',
                email: '',
                phone: '',
                specialRequests: ''
              });
            }}
          >
            Make Another Reservation
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box py={4}>
      <Container>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            Dining Reservations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Book your table at The Cabin Brewery. Please note: each table has a maximum of 6 chairs. Additional chairs will incur extra charges.
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom color="primary.main" fontWeight={600}>
            Your Reservation Details
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="numHeads"
                  label="Number of Heads"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={bookingDetails.numHeads}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="numTables"
                  label="Number of Tables"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={bookingDetails.numTables}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="numChairs"
                  label="Number of Chairs"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={bookingDetails.numChairs}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                 <Alert severity="info" sx={{height: '100%', display: 'flex', alignItems: 'center'}}>Max 6 chairs per table.</Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of Reservation"
                    value={bookingDetails.date}
                    onChange={handleDateChange}
                    minDate={today}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Time of Reservation"
                    value={bookingDetails.time}
                    onChange={handleTimeChange}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Personal Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Full Name"
                  value={bookingDetails.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={bookingDetails.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  value={bookingDetails.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="specialRequests"
                  label="Special Requests (Optional)"
                  value={bookingDetails.specialRequests}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <InteractiveParkingMap onParkingSelect={handleParkingSelect} />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ minWidth: '150px' }}
                >
                  Confirm Reservation
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        {/* Additional Information Section - Can be kept or removed as per preference */}
        <Paper elevation={2} sx={{ p: 4, mt: 6, borderRadius: 2 }}>
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
                • For parties larger than specified by table limits, please contact us directly.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Dining Experience
              </Typography>
              <Typography variant="body2" paragraph>
                • Our full menu is available.
              </Typography>
              <Typography variant="body2" paragraph>
                • Special dietary requirements can be accommodated with advance notice.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DiningPage;
