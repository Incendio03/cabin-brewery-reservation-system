import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Divider,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import BookingCard from '../../components/booking/BookingCard';
import { userBookings } from '../../data/bookings';

const BookingsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [bookings, setBookings] = useState(userBookings);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter bookings by type
  const allBookings = bookings;
  const roomBookings = bookings.filter(booking => booking.type === 'room');
  const eventBookings = bookings.filter(booking => booking.type === 'event');
  const parkingBookings = bookings.filter(booking => booking.type === 'parking');

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Handle view booking details
  const handleViewDetails = (booking) => {
    console.log('View booking details:', booking);
  };

  // Handle cancel booking confirmation dialog
  const handleCancelRequest = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  // Handle confirm cancel booking
  const handleConfirmCancel = () => {
    if (selectedBooking) {
      const updatedBookings = bookings.map(booking =>
        booking.id === selectedBooking.id ? { ...booking, status: 'cancelled' } : booking
      );
      setBookings(updatedBookings);
      setOpenDialog(false);
      setSelectedBooking(null);
    }
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  return (
    <Box py={4}>
      <Container>
        {/* Hero Section - Now always visible */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            My Bookings
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Manage all your reservations in one place. View details or make changes to your bookings.
          </Typography>
        </Box>

        {/* Booking Tabs - Placed above the content */}
        <Box sx={{ mb: 4 }}> {/* Simplified margin */}
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: 100,
              },
            }}
          >
            <Tab label="All Bookings" />
            <Tab label="Room Stays" />
            <Tab label="Events" />
            <Tab label="Parking" />
          </Tabs>
        </Box>

        {/* Content for selected tab */}
        <>
          <Grid container spacing={3} sx={{mt: 2}}>
            {selectedTab === 0 && allBookings.map(booking => (
              <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <BookingCard booking={booking} onViewDetails={handleViewDetails} onCancelRequest={handleCancelRequest} />
              </Grid>
            ))}
            {selectedTab === 1 && roomBookings.map(booking => (
               <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <BookingCard booking={booking} onViewDetails={handleViewDetails} onCancelRequest={handleCancelRequest} />
              </Grid>
            ))}
            {selectedTab === 2 && eventBookings.map(booking => (
               <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <BookingCard booking={booking} onViewDetails={handleViewDetails} onCancelRequest={handleCancelRequest} />
              </Grid>
            ))}
            {selectedTab === 3 && parkingBookings.map(booking => (
              <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <BookingCard booking={booking} onViewDetails={handleViewDetails} onCancelRequest={handleCancelRequest} />
              </Grid>
            ))}
          </Grid>
          {selectedTab === 0 && allBookings.length === 0 && <Alert severity="info" sx={{mt:2}}>You have no bookings yet.</Alert>}
          {selectedTab === 1 && roomBookings.length === 0 && <Alert severity="info" sx={{mt:2}}>You have no room bookings.</Alert>}
          {selectedTab === 2 && eventBookings.length === 0 && <Alert severity="info" sx={{mt:2}}>You have no event bookings.</Alert>}
          {selectedTab === 3 && parkingBookings.length === 0 && <Alert severity="info" sx={{mt:2}}>You have no parking bookings.</Alert>}
        </>
        
        {/* Cancel Confirmation Dialog for existing bookings */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Cancellation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Keep Booking</Button>
            <Button onClick={handleConfirmCancel} color="error">
              Yes, Cancel Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BookingsPage;
