import React from 'react';
import { Typography, Paper, Divider, List, ListItem, ListItemText, Grid } from '@mui/material';

const BookingConfirmation = ({ reservationDetails, parkingInfo, orderedItems }) => {
  const calculateTotal = () => {
    if (!orderedItems || orderedItems.length === 0) {
      return 0;
    }
    return orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalAmount = calculateTotal();

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
      <Typography variant="h5" gutterBottom align="center" color="primary.main" fontWeight={600}>
        Confirm Your Booking
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Reservation Details:</Typography>
          {reservationDetails ? (
            <List dense>
              <ListItem>
                <ListItemText primary="Name:" secondary={reservationDetails.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email:" secondary={reservationDetails.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone:" secondary={reservationDetails.phone} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date:" secondary={new Date(reservationDetails.date).toLocaleDateString()} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Time:" secondary={new Date(reservationDetails.time).toLocaleTimeString()} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Guests:" secondary={reservationDetails.guests} />
              </ListItem>
              {reservationDetails.option && (
                <ListItem>
                  <ListItemText primary="Dining Option:" secondary={reservationDetails.option} />
                </ListItem>
              )}
              {reservationDetails.specialRequests && (
                <ListItem>
                  <ListItemText primary="Special Requests:" secondary={reservationDetails.specialRequests} />
                </ListItem>
              )}
            </List>
          ) : (
            <Typography>No reservation details provided.</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Parking Information:</Typography>
          {parkingInfo && parkingInfo.slot ? (
            <List dense>
              <ListItem>
                <ListItemText primary="Parking Slot:" secondary={parkingInfo.slot} />
              </ListItem>
              {/* Add more parking details if available */}
            </List>
          ) : (
            <Typography>No parking slot selected.</Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>Ordered Items:</Typography>
          {orderedItems && orderedItems.length > 0 ? (
            <>
              <List dense>
                {orderedItems.map(item => (
                  <ListItem key={item.id}>
                    <ListItemText 
                      primary={`${item.name} (x${item.quantity})`} 
                      secondary={`₱${(item.price * item.quantity).toFixed(2)}`} 
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6" align="right" sx={{ mt: 1 }}>
                Total: ₱{totalAmount.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography>No items selected.</Typography>
          )}
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{mb:1}}>
        Please review all details carefully before submitting.
      </Typography>
      <Typography variant="caption" display="block" color="error.main" align="center">
        Note: This booking will be reviewed by an admin for availability. You will be notified once it's confirmed.
      </Typography>
    </Paper>
  );
};

export default BookingConfirmation;
