import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Stack,
  Divider,
  Alert
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

const BookingForm = ({ title, type, onSubmit, options = [] }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Default booking state
  const [booking, setBooking] = useState({
    date: tomorrow,
    time: new Date(tomorrow.setHours(18, 0, 0)),
    guests: 2,
    option: options.length > 0 ? options[0].id : '',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value
    });
  };

  const handleDateChange = (newDate) => {
    setBooking({
      ...booking,
      date: newDate
    });
  };

  const handleTimeChange = (newTime) => {
    setBooking({
      ...booking,
      time: newTime
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!booking.name || !booking.email || !booking.phone) {
      setError("Please fill out all required fields");
      return;
    }
    
    // Submit booking
    onSubmit(booking);
    setSubmitted(true);
    setError(null);
  };

  if (submitted) {
    return (
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Your booking has been received successfully!
        </Alert>
        <Typography variant="h6" gutterBottom>
          Booking Details
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Thank you, {booking.name}! We have received your {type} booking request.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            You will receive a confirmation email at {booking.email} shortly.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 3 }}
            onClick={() => {
              setSubmitted(false);
              setBooking({
                date: tomorrow,
                time: new Date(tomorrow.setHours(18, 0, 0)),
                guests: 2,
                option: options.length > 0 ? options[0].id : '',
                name: '',
                email: '',
                phone: '',
                specialRequests: ''
              });
            }}
          >
            Make Another Booking
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom color="primary.main" fontWeight={600}>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Booking Details Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom fontWeight={500}>
              Booking Details
            </Typography>
          </Grid>
          
          {/* Option Selection (if options are provided) */}
          {options.length > 0 && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Select {type === 'dining' ? 'Area' : type === 'room' ? 'Room' : 'Option'}</InputLabel>
                <Select
                  name="option"
                  value={booking.option}
                  label={`Select ${type === 'dining' ? 'Area' : type === 'room' ? 'Room' : 'Option'}`}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
            {/* Date Selection */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={booking.date}
                onChange={handleDateChange}
                minDate={today}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>
          </Grid>
          
          {/* Time Selection */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={booking.time}
                onChange={handleTimeChange}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>
          </Grid>
          
          {/* Number of Guests */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="guests"
              label="Number of Guests"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 20 } }}
              value={booking.guests}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          
          {/* Personal Information Section */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight={500}>
              Personal Information
            </Typography>
          </Grid>
          
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Full Name"
              value={booking.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          
          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={booking.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          
          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Phone Number"
              value={booking.phone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          
          {/* Special Requests */}
          <Grid item xs={12}>
            <TextField
              name="specialRequests"
              label="Special Requests"
              value={booking.specialRequests}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ minWidth: '150px' }}
            >
              Confirm Booking
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookingForm;
