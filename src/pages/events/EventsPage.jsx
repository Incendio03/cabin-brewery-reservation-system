import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Divider, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  Alert
} from '@mui/material';
import { EventCard } from '../../components/common';
import { events } from '../../data/events';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Handle booking an event
  const handleBookEvent = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (purchaseSuccess) {
      setPurchaseSuccess(false);
    }
  };

  // Handle confirm ticket purchase
  const handleConfirmPurchase = () => {
    console.log('Event tickets purchased:', { event: selectedEvent, tickets: ticketCount });
    // In a real app, this would process the purchase
    setPurchaseSuccess(true);
  };

  // Handle ticket count change
  const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
  };

  return (
    <Box py={4}>
      <Container>
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            Upcoming Events
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Join us for exciting events at The Cabin Brewery. From live music to beer tastings,
            there's always something happening here!
          </Typography>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={4} mb={6}>
          {events.map(event => (
            <Grid item key={event.id} xs={12} sm={6} md={4}>
              <EventCard event={event} onBookNow={handleBookEvent} />
            </Grid>
          ))}
        </Grid>

        {/* Additional Information */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Event Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Event Policies
              </Typography>
              <Typography variant="body2" paragraph>
                • Tickets are non-refundable but may be transferred to another person.
              </Typography>
              <Typography variant="body2" paragraph>
                • Please arrive at least 15 minutes before the event starts.
              </Typography>
              <Typography variant="body2" paragraph>
                • For special events, we may require ID verification at entry.
              </Typography>
              <Typography variant="body2" paragraph>
                • Event schedule is subject to change. Check our website or social media for updates.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Host Your Own Event
              </Typography>
              <Typography variant="body2" paragraph>
                Looking to host a private event at The Cabin Brewery? We offer customized packages for:
              </Typography>
              <Typography variant="body2" paragraph>
                • Corporate gatherings
              </Typography>
              <Typography variant="body2" paragraph>
                • Birthday celebrations
              </Typography>
              <Typography variant="body2" paragraph>
                • Wedding receptions
              </Typography>
              <Typography variant="body2" paragraph>
                Contact us at events@cabinbrewery.com for more information.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Ticket Purchase Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="ticket-dialog-title"
          aria-describedby="ticket-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="ticket-dialog-title">
            {purchaseSuccess ? "Tickets Purchased Successfully!" : `Purchase Tickets - ${selectedEvent?.title}`}
          </DialogTitle>
          <DialogContent>
            {purchaseSuccess ? (
              <Box>
                <Alert severity="success" sx={{ mb: 3 }}>
                  Your ticket purchase has been confirmed!
                </Alert>
                <DialogContentText>
                  Thank you for purchasing tickets to {selectedEvent?.title}. A confirmation email has been sent with your ticket details.
                </DialogContentText>
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchase Summary:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      Event: {selectedEvent?.title}
                    </Typography>
                    <Typography variant="body2">
                      Date: {new Date(selectedEvent?.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="body2">
                      Time: {selectedEvent?.time}
                    </Typography>
                    <Typography variant="body2">
                      Tickets: {ticketCount}
                    </Typography>
                    <Typography variant="body2">
                      Price: ₱{(selectedEvent?.ticketPrice * ticketCount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            ) : (
              <>
                <DialogContentText id="ticket-dialog-description" paragraph>
                  Please select the number of tickets you would like to purchase for {selectedEvent?.title} on {selectedEvent ? new Date(selectedEvent.date).toLocaleDateString() : ''}.
                </DialogContentText>
                <Box mt={3}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="ticket-count-label">Number of Tickets</InputLabel>
                    <Select
                      labelId="ticket-count-label"
                      value={ticketCount}
                      label="Number of Tickets"
                      onChange={handleTicketCountChange}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num} {num === 1 ? 'ticket' : 'tickets'} (₱{(selectedEvent?.ticketPrice * num).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Event Details:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedEvent?.description}
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Price Summary:
                  </Typography>
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">
                        Tickets ({ticketCount} x ₱{selectedEvent?.ticketPrice.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                      </Typography>
                      <Typography variant="body2">
                        ₱{(selectedEvent?.ticketPrice * ticketCount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">
                        Service Fee
                      </Typography>
                      <Typography variant="body2">
                        ₱0.00
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle2" fontWeight={600}>
                        Total
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        ₱{(selectedEvent?.ticketPrice * ticketCount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {purchaseSuccess ? (
              <Button onClick={handleCloseDialog} color="primary" variant="contained">
                Done
              </Button>
            ) : (
              <>
                <Button onClick={handleCloseDialog} color="inherit">
                  Cancel
                </Button>
                <Button onClick={handleConfirmPurchase} color="primary" variant="contained">
                  Purchase Tickets
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default EventsPage;
