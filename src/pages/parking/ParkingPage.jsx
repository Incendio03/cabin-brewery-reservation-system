import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import { LocalParking, AccessTime, CalendarToday } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { images } from '../../assets/images';

// Parking areas
const parkingOptions = [
  {
    id: 1,
    name: 'Main Lot',
    description: 'Our primary parking area located adjacent to the brewery entrance.',
    totalSpaces: 80,
    availableSpaces: 25,
  },
  {
    id: 2,
    name: 'North Lot',
    description: 'Additional parking on the north side of the property, a 2-minute walk to the entrance.',
    totalSpaces: 50,
    availableSpaces: 13,
  },
  {
    id: 3,
    name: 'VIP Parking',
    description: 'Reserved premium parking spots closest to the entrance, free for VIP members.',
    totalSpaces: 15,
    availableSpaces: 5,
  }
];

const ParkingPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [startTime, setStartTime] = useState(new Date(today.setHours(today.getHours() + 1, 0, 0)));
  const [endTime, setEndTime] = useState(new Date(today.setHours(today.getHours() + 3, 0, 0)));
  const [parkingArea, setParkingArea] = useState(1);
  const [vehicleType, setVehicleType] = useState('Standard');
  const [licensePlate, setLicensePlate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would submit the parking reservation to a server
    console.log('Parking reservation submitted:', {
      date: selectedDate,
      startTime,
      endTime,
      parkingArea,
      vehicleType,
      licensePlate
    });
    
    setSubmitted(true);
  };

  // Reset form after submission
  const handleNewReservation = () => {
    setSubmitted(false);
    setSelectedDate(today);
    setStartTime(new Date(today.setHours(today.getHours() + 1, 0, 0)));
    setEndTime(new Date(today.setHours(today.getHours() + 3, 0, 0)));
    setParkingArea(1);
    setVehicleType('Standard');
    setLicensePlate('');
  };

  // Parking Area Card Component
  const ParkingAreaCard = ({ option }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={images.getPlaceholderImage(600, 400, `${option.name} Parking`)}
        alt={option.name}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
          {option.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip 
            icon={<LocalParking fontSize="small" />} 
            label={`${option.availableSpaces}/${option.totalSpaces} Available`}
            color={option.availableSpaces > 10 ? "success" : option.availableSpaces > 5 ? "warning" : "error"}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {option.description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box py={4}>
      <Container>
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            Parking Reservation
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Secure your parking space in advance to ensure hassle-free access to The Cabin Brewery.
            Select your preferred parking area and reservation time below.
          </Typography>
        </Box>

        {/* Parking Areas */}
        <Typography variant="h5" gutterBottom fontWeight={600} mb={3}>
          Available Parking Areas
        </Typography>
        <Grid container spacing={4} mb={6}>
          {parkingOptions.map(option => (
            <Grid item key={option.id} xs={12} sm={6} md={4}>
              <ParkingAreaCard option={option} />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 6 }} />

        {/* Reservation Form or Success Message */}
        {submitted ? (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Your parking reservation has been confirmed!
            </Alert>
            <Typography variant="h6" gutterBottom>
              Reservation Details
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <CalendarToday fontSize="small" color="primary" />
                    <Typography variant="body1">
                      Date: {selectedDate.toLocaleDateString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <AccessTime fontSize="small" color="primary" />
                    <Typography variant="body1">
                      Time: {startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <LocalParking fontSize="small" color="primary" />
                    <Typography variant="body1">
                      Location: {parkingOptions.find(option => option.id === parkingArea)?.name}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" mb={1}>
                    Vehicle Type: {vehicleType}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    License Plate: {licensePlate}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    Confirmation Code: PKG-{Math.floor(Math.random() * 90000) + 10000}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="body2" color="text.secondary" mt={2}>
                Please save this confirmation for your records. You'll also receive an email with your parking details.
              </Typography>

              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 3 }}
                onClick={handleNewReservation}
              >
                Make Another Reservation
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Reserve Your Parking
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                {/* Date and Time Selection */}
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date"
                      value={selectedDate}
                      onChange={(newDate) => setSelectedDate(newDate)}
                      minDate={today}
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newTime) => setStartTime(newTime)}
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newTime) => setEndTime(newTime)}
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* Parking Options */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Parking Area</InputLabel>
                    <Select
                      value={parkingArea}
                      label="Parking Area"
                      onChange={(e) => setParkingArea(e.target.value)}
                    >
                      {parkingOptions.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name} ({option.availableSpaces} spaces available)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Vehicle Type</InputLabel>
                    <Select
                      value={vehicleType}
                      label="Vehicle Type"
                      onChange={(e) => setVehicleType(e.target.value)}
                    >
                      <MenuItem value="Compact">Compact</MenuItem>
                      <MenuItem value="Standard">Standard</MenuItem>
                      <MenuItem value="SUV">SUV</MenuItem>
                      <MenuItem value="Van">Van</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Vehicle Information */}
                <Grid item xs={12}>
                  <TextField
                    label="License Plate Number"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    fullWidth
                    required
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
                    Reserve Parking
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        )}

        {/* Parking Information */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Parking Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Parking Policies
              </Typography>
              <Typography variant="body2" paragraph>
                • Parking reservations can be made up to 30 days in advance.
              </Typography>
              <Typography variant="body2" paragraph>
                • Reservations must be made at least 2 hours before arrival.
              </Typography>
              <Typography variant="body2" paragraph>
                • You can cancel reservations up to 24 hours before without any charge.
              </Typography>
              <Typography variant="body2" paragraph>
                • Reserved spots are held for up to 30 minutes after your reserved start time.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body2" paragraph>
                • Electric vehicle charging stations are available in the Main Lot.
              </Typography>
              <Typography variant="body2" paragraph>
                • Handicap accessible spaces are available in all parking areas.
              </Typography>
              <Typography variant="body2" paragraph>
                • VIP members receive complimentary valet parking.
              </Typography>
              <Typography variant="body2" paragraph>
                • For any parking issues or assistance, contact our parking team at (555) 987-6543.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ParkingPage;
