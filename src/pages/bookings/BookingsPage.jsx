import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Tabs, 
  Tab, 
  Divider,
  Paper,
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
  const diningBookings = bookings.filter(booking => booking.type === 'dining');
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
    // In a real app, this would show detailed information or navigate to a details page
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
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            My Bookings
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Manage all your reservations in one place. View details or make changes to your bookings.
          </Typography>
        </Box>

        {/* Booking Tabs */}
        <Box sx={{ mb: 4 }}>
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
            <Tab label="Dining" />
            <Tab label="KTV/Rooms" />
            <Tab label="Events" />
            <Tab label="Parking" />
          </Tabs>
        </Box>

        {/* Booking Cards Grid */}
        <Grid container spacing={4} mb={6}>
          {selectedTab === 0 && allBookings.length > 0 ? (
            allBookings.map(booking => (
              <Grid item key={booking.id} xs={12} sm={6} lg={4}>
                <BookingCard 
                  booking={booking} 
                  onCancel={handleCancelRequest} 
                  onViewDetails={handleViewDetails} 
                />
              </Grid>
            ))
          ) : selectedTab === 0 && (
            <Grid item xs={12}>
              <Alert severity="info">You don't have any bookings yet.</Alert>
            </Grid>
          )}

          {selectedTab === 1 && diningBookings.length > 0 ? (
            diningBookings.map(booking => (
              <Grid item key={booking.id} xs={12} sm={6} lg={4}>
                <BookingCard 
                  booking={booking} 
                  onCancel={handleCancelRequest} 
                  onViewDetails={handleViewDetails} 
                />
              </Grid>
            ))
          ) : selectedTab === 1 && (
            <Grid item xs={12}>
              <Alert severity="info">You don't have any dining reservations yet.</Alert>
            </Grid>
          )}

          {selectedTab === 2 && roomBookings.length > 0 ? (
            roomBookings.map(booking => (
              <Grid item key={booking.id} xs={12} sm={6} lg={4}>
                <BookingCard 
                  booking={booking} 
                  onCancel={handleCancelRequest} 
                  onViewDetails={handleViewDetails} 
                />
              </Grid>
            ))
          ) : selectedTab === 2 && (
            <Grid item xs={12}>
              <Alert severity="info">You don't have any room bookings yet.</Alert>
            </Grid>
          )}

          {selectedTab === 3 && eventBookings.length > 0 ? (
            eventBookings.map(booking => (
              <Grid item key={booking.id} xs={12} sm={6} lg={4}>
                <BookingCard 
                  booking={booking} 
                  onCancel={handleCancelRequest} 
                  onViewDetails={handleViewDetails} 
                />
              </Grid>
            ))
          ) : selectedTab === 3 && (
            <Grid item xs={12}>
              <Alert severity="info">You don't have any event tickets yet.</Alert>
            </Grid>
          )}

          {selectedTab === 4 && parkingBookings.length > 0 ? (
            parkingBookings.map(booking => (
              <Grid item key={booking.id} xs={12} sm={6} lg={4}>
                <BookingCard 
                  booking={booking} 
                  onCancel={handleCancelRequest} 
                  onViewDetails={handleViewDetails} 
                />
              </Grid>
            ))
          ) : selectedTab === 4 && (
            <Grid item xs={12}>
              <Alert severity="info">You don't have any parking reservations yet.</Alert>
            </Grid>
          )}
        </Grid>

        {/* No Bookings Section */}
        {allBookings.length === 0 && (
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              You don't have any bookings yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Make a reservation for dining, book a room, or purchase event tickets to see them here.
            </Typography>
            <Box sx={{ mt: 2 }}>              <Button variant="contained" color="primary" href="/dining" sx={{ mx: 1, mb: 1 }}>
                Book a Table
              </Button>
              <Button variant="outlined" color="primary" href="/rooms" sx={{ mx: 1, mb: 1 }}>
                Book KTV/Room
              </Button>
              <Button variant="outlined" color="primary" href="/events" sx={{ mx: 1, mb: 1 }}>
                View Events
              </Button>
              <Button variant="outlined" color="primary" href="/parking" sx={{ mx: 1, mb: 1 }}>
                Reserve Parking
              </Button>
            </Box>
          </Paper>
        )}

        {/* Cancellation Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="cancel-dialog-title"
          aria-describedby="cancel-dialog-description"
        >
          <DialogTitle id="cancel-dialog-title">
            {"Cancel your booking?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="cancel-dialog-description">
              Are you sure you want to cancel {selectedBooking?.type === 'event' ? selectedBooking?.eventName : selectedBooking?.location} 
              on {selectedBooking ? new Date(selectedBooking.date).toLocaleDateString() : ''}? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Keep Booking
            </Button>
            <Button onClick={handleConfirmCancel} color="error" variant="contained" autoFocus>
              Cancel Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BookingsPage;
