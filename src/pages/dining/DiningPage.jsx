import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { MenuSelection } from '../../components/booking';
import { menuItems } from '../../data/menu'; // Correctly import menuItems

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
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    heads: 1,
    tables: 1,
    chairs: 1,
    specialRequests: '',
    parkingSlot: '',
    orderedItems: [], // Added for menu selection
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate total price for menu items
  const calculateTotalPrice = () => {
    return bookingDetails.orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, date: newDate }));
  };

  const handleTimeChange = (newTime) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, time: newTime }));
  };
  
  // Placeholder for parking slot selection
  const handleParkingSelect = (slot) => {
    setBookingDetails(prev => ({ ...prev, parkingSlot: slot }));
    console.log("Parking slot selected:", slot);
  };

  const handleAddItem = (item) => {
    setBookingDetails((prevDetails) => {
      const existingItem = prevDetails.orderedItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          ...prevDetails,
          orderedItems: prevDetails.orderedItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          ...prevDetails,
          orderedItems: [...prevDetails.orderedItems, { ...item, quantity: 1 }],
        };
      }
    });
  };

  const handleRemoveItem = (item) => {
    setBookingDetails((prevDetails) => {
      const existingItem = prevDetails.orderedItems.find((i) => i.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...prevDetails,
          orderedItems: prevDetails.orderedItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      } else {
        return {
          ...prevDetails,
          orderedItems: prevDetails.orderedItems.filter((i) => i.id !== item.id),
        };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bookingDetails.name) newErrors.name = "Name is required";
    if (!bookingDetails.email) newErrors.email = "Email is required";
    if (!bookingDetails.phone) newErrors.phone = "Phone number is required";
    if (bookingDetails.chairs > bookingDetails.tables * 6) newErrors.chairs = "Each table can have a maximum of 6 chairs";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Submit logic here
    console.log('Dining booking submitted:', bookingDetails);
    setShowConfirmation(true);
  };

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
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="guests"
                  label="Number of Guests"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={bookingDetails.guests}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="tables"
                  label="Number of Tables"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={bookingDetails.tables}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="chairs"
                  label="Number of Chairs"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={bookingDetails.chairs}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="specialRequests"
                  label="Special Requests (Optional)"
                  value={bookingDetails.specialRequests}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <InteractiveParkingMap onParkingSelect={handleParkingSelect} />
              </Grid>

              {/* Menu Selection Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Menu Selection</Typography>
                <MenuSelection
                  menuItems={menuItems} // Pass menuItems
                  orderedItems={bookingDetails.orderedItems} // Changed from selectedItems to orderedItems
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                />
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

        <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
          <DialogTitle>Booking Confirmation</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Thank you for your reservation, {bookingDetails.name}!</Typography>
            <Typography>An email confirmation will be sent to {bookingDetails.email}.</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom><strong>Booking Summary:</strong></Typography>
            <Typography><strong>Date:</strong> {bookingDetails.date}</Typography>
            <Typography><strong>Time:</strong> {bookingDetails.time}</Typography>
            <Typography><strong>Guests:</strong> {bookingDetails.guests}</Typography>
            <Typography><strong>Tables:</strong> {bookingDetails.tables}</Typography>
            <Typography><strong>Chairs:</strong> {bookingDetails.chairs}</Typography>
            {bookingDetails.parkingSlot && <Typography><strong>Parking Slot:</strong> {bookingDetails.parkingSlot}</Typography>}
            {bookingDetails.specialRequests && <Typography><strong>Special Requests:</strong> {bookingDetails.specialRequests}</Typography>}
            
            {bookingDetails.orderedItems.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom><strong>Order Summary:</strong></Typography>
                {bookingDetails.orderedItems.map(item => (
                  <Typography key={item.id}>
                    {item.name} (x{item.quantity}): ₱{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                ))}
                <Typography variant="h6" sx={{ mt: 1 }}>
                  <strong>Order Total: ₱{calculateTotalPrice().toFixed(2)}</strong>
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmation(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default DiningPage;
