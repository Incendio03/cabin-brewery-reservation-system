import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Collapse,
  Alert // Added Alert
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import InteractiveParkingMap from './InteractiveParkingMap'; // Assuming this is the correct path

const BookingForm = ({ 
  title, 
  type, 
  onSubmit, 
  options = [], 
  initialData = {}, 
  enableParkingSelection = false, 
  parkingSlot, 
  onParkingSelect, 
  formId // Added formId prop
}) => {
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t;
  }, []);

  const [booking, setBooking] = useState({
    date: tomorrow,
    time: new Date(new Date(tomorrow).setHours(18, 0, 0)),
    guests: 2,
    option: options.length > 0 ? options[0].id : '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    parkingSlot: null, // Added parkingSlot to booking state
    tables: 1, // Added tables to booking state
    chairs: 2, // Added chairs to booking state
  });
  const [showParkingMap, setShowParkingMap] = useState(false); // State to toggle map visibility
  const [error, setError] = useState(null); // Re-added error state

  // Effect to update form state when initialData changes (e.g., navigating back to form)
  useEffect(() => {
    if (initialData) {
      setBooking({
        date: initialData.date ? new Date(initialData.date) : tomorrow,
        time: initialData.time ? new Date(initialData.time) : new Date(new Date(tomorrow).setHours(18, 0, 0)),
        guests: initialData.guests || 2,
        option: initialData.option || (options.length > 0 ? options[0].id : ''),
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        specialRequests: initialData.specialRequests || '',
        parkingSlot: initialData.parkingSlot || null,
        tables: initialData.tables || 1,
        chairs: initialData.chairs || initialData.guests || 2
      });
      // If a parking slot was previously selected, ensure the map is shown
      if (initialData.parkingSlot) {
        setShowParkingMap(true);
      }
    }
  }, [initialData, options, tomorrow]);

  // Effect to update internal parkingSlot when prop changes
  useEffect(() => {
    if (enableParkingSelection && parkingSlot !== booking.parkingSlot) {
      setBooking(prev => ({ ...prev, parkingSlot: parkingSlot }));
    }
  }, [parkingSlot, enableParkingSelection, booking.parkingSlot]);

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

  const handleInternalParkingSelect = (slotId) => {
    setBooking(prev => ({ ...prev, parkingSlot: slotId }));
    if (onParkingSelect) {
      onParkingSelect(slotId); // Notify parent component
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!booking.name || !booking.email || !booking.phone) {
      setError('Please fill in all required fields: Name, Email, and Phone.');
      return;
    }
    if (booking.guests <= 0) {
      setError('Number of guests must be at least 1.');
      return;
    }
    if (booking.tables <= 0) {
      setError('Number of tables must be at least 1.');
      return;
    }
    if (booking.chairs <= 0) {
      setError('Number of chairs must be at least 1.');
      return;
    }
    if (booking.chairs < booking.guests) {
      setError('Number of chairs cannot be less than the number of guests.');
      return;
    }
    if (enableParkingSelection && showParkingMap && !booking.parkingSlot) {
        // setError('Please select a parking slot or skip parking.'); // Optional: make parking mandatory if map is shown
        // return;
    }
    
    // Pass the full booking state, including parkingSlot
    onSubmit(booking);
    setError(null);
  };

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}> 
      <Box component="form" onSubmit={handleSubmit} id={formId}> {/* Use formId prop */}
        <Grid container spacing={3}>
          {/* Booking Details Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom fontWeight={500}>
              Booking Details
            </Typography>
          </Grid>
          {/* Option Selection (if options are provided) */}
          {options.length > 0 && (
            <Grid item xs={12} sm={4}> {/* Changed sm from (type === 'dining' ? 12 : 6) to 4 */}
              <FormControl fullWidth required>
                <InputLabel>Select {type === 'dining' ? 'Dining Area' : type === 'room' ? 'Room' : 'Option'}</InputLabel>
                <Select
                  name="option"
                  value={booking.option}
                  label={`Select ${type === 'dining' ? 'Dining Area' : type === 'room' ? 'Room' : 'Option'}`}
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
          <Grid item xs={12} sm={4}> {/* Changed sm from 6 to 4 */}
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
          <Grid item xs={12} sm={4}> {/* Changed sm from 6 to 4 */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={booking.time}
                onChange={handleTimeChange}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}> {/* Changed sm from 6 to 4 for Number of Guests */}
            <TextField
              name="guests"
              label="Number of Guests"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 20 } }}
              InputLabelProps={{ 
                shrink: true,
                sx: { whiteSpace: 'normal' } // Allow label text to wrap if needed
              }}
              value={booking.guests}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}> {/* Ensure this is sm=4 */}
            <TextField
              name="tables"
              label="Number of Tables"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={booking.tables}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}> {/* Ensure this is sm=4 */}
            <TextField
              name="chairs"
              label="Number of Chairs"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={booking.chairs}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}> {/* Added Grid item for the note */}
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              Note: Max 6 chairs per table.
            </Typography>
          </Grid>

          {/* Personal Information Section */}
          <Grid item xs={12} sx={{ mt: 3 }}> {/* Encapsulating Grid item for the section */}
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ mb: 2 }}>
              Personal Information
            </Typography>
            <Grid container spacing={3}> {/* Inner Grid container for personal info fields */}
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
              <Grid item xs={12} sm={12}>
                <TextField
                  name="specialRequests"
                  label="Special Requests (Optional)"
                  multiline
                  rows={3}
                  value={booking.specialRequests}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Parking Selection Section (remains after Personal Information) */}
          {enableParkingSelection && (
            <Grid item xs={12} sx={{ mt: 3 }}> {/* Adjusted mt for consistency */}
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Parking Reservation (Optional)
                </Typography>
                <Button 
                    onClick={() => setShowParkingMap(!showParkingMap)}
                    variant={showParkingMap && booking.parkingSlot ? "outlined" : "contained"}
                    color={showParkingMap && booking.parkingSlot ? "success" : "info"}
                    size="small"
                >
                  {showParkingMap ? (booking.parkingSlot ? `Slot ${booking.parkingSlot} Selected` : 'Hide Parking Map') : 'Select Parking Slot'}
                </Button>
              </Box>
              <Collapse in={showParkingMap}>
                <InteractiveParkingMap 
                    selectedSlot={booking.parkingSlot} 
                    onSlotSelect={handleInternalParkingSelect} 
                />
              </Collapse>
              {showParkingMap && !booking.parkingSlot && (
                <Alert severity="info" sx={{mt:1}}>You can skip parking selection if not needed.</Alert>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookingForm;
