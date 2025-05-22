import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import BookingStepper from '../../components/booking/BookingStepper';
import BookingForm from '../../components/booking/BookingForm';
import { MenuSelection } from '../../components/booking';
import BookingConfirmation from '../../components/booking/BookingConfirmation';
import { menuItems as allMenuItems } from '../../data/menu';
import { diningOptions } from '../../data/dining'; // Added for BookingForm options

const DiningPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]);
  const [parkingInfo, setParkingInfo] = useState({ slot: null }); 
  const [submissionStatus, setSubmissionStatus] = useState({ message: '', severity: '' });

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSubmissionStatus({ message: '', severity: '' }); // Clear any previous messages
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSubmissionStatus({ message: '', severity: '' }); // Clear any previous messages
  };

  const handleReservationDetailsSubmit = (details) => {
    setReservationDetails(details);
    if (details.parkingSlot) {
        setParkingInfo({ slot: details.parkingSlot });
    } else {
        setParkingInfo({ slot: null }); // Ensure parkingInfo is reset if no slot is selected
    }
    handleNextStep();
  };
  
  const handleMenuSubmit = () => {
    // Menu items are already updated by onAddItem/onRemoveItem
    // This function is mainly to proceed to the next step
    handleNextStep();
  };

  const handleAddItem = (item) => {
    setOrderedItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (item) => {
    setOrderedItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prevItems.filter(i => i.id !== item.id);
    });
  };

  const handleConfirmBooking = () => {
    // In a real app, this is where you'd make an API call
    console.log('Final Booking Submission:', {
      reservationDetails,
      orderedItems,
      parkingInfo,
    });
    // Simulate submission
    setSubmissionStatus({ message: 'Booking request submitted successfully! It will be reviewed by an admin.', severity: 'success' });
    // setActiveStep(0); // Reset to first step
    // setReservationDetails(null);
    // setOrderedItems([]);
    // setParkingInfo({ slot: null });
  };

  // This function is now passed to BookingForm, which uses InteractiveParkingMap internally
  const handleParkingSlotSelect = (slotId) => {
    setParkingInfo({ slot: slotId });
    // Update reservationDetails if it exists, to keep parkingSlot in sync for BookingForm's initialData
    if (reservationDetails) {
        setReservationDetails(prev => ({...prev, parkingSlot: slotId}));
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BookingForm
            title="Reservation Details & Parking"
            type="dining"
            onSubmit={handleReservationDetailsSubmit}
            initialData={{...(reservationDetails || {}), parkingSlot: parkingInfo.slot }}
            options={diningOptions.map(opt => ({ id: opt.name, name: opt.name }))} 
            enableParkingSelection={true} 
            parkingSlot={parkingInfo.slot} // Pass current parking slot to BookingForm
            onParkingSelect={handleParkingSlotSelect} // Pass handler to BookingForm
            formId="dining-booking-form" // Added formId prop
          />
        );
      case 1:
        return (
          <MenuSelection
            menuItems={allMenuItems}
            orderedItems={orderedItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        );
      case 2:
        return (
          <BookingConfirmation
            reservationDetails={reservationDetails}
            parkingInfo={parkingInfo}
            orderedItems={orderedItems}
          />
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box py={4}>
      <Container>
        <Box textAlign="center" mb={4}> 
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            Dining Reservation
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Book your table at The Cabin Brewery. Follow the steps below to complete your reservation.
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
          <BookingStepper activeStep={activeStep} />
          <Box mt={3} mb={3}>
            {submissionStatus.message && (
              <Alert severity={submissionStatus.severity || 'info'} sx={{ mb: 3 }}>
                {submissionStatus.message}
              </Alert>
            )}
            {renderStepContent(activeStep)}
          </Box>
          
          {/* Stepper Navigation Buttons */}
          {!submissionStatus.message && ( 
             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 3 }}> {/* Added mt: 3 for spacing from content */}
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBackStep}
                    sx={{ mr: 1, visibility: activeStep === 0 ? 'hidden' : 'visible' }} // Keep visibility logic
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} /> {/* This Box will push the next button to the right */}

                {/* "Next: Choose Food" button for step 0, triggers BookingForm submission */}
                {activeStep === 0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit" // Submits the form
                        form="dining-booking-form" // Links to the BookingForm's id
                      >
                        Next: Choose Food
                      </Button>
                )}
                
                {/* The "Next" button for step 1 (MenuSelection) */}
                {activeStep === 1 && (
                    <Button
                        variant="contained"
                        onClick={handleMenuSubmit} 
                        color="primary" // Added color for consistency
                    >
                        Next: Confirm Booking
                    </Button>
                )}

                {/* The "Submit" button for step 2 (BookingConfirmation) */}
                {activeStep === 2 && (
                    <Button 
                        variant="contained" 
                        color="success" 
                        onClick={handleConfirmBooking}
                    >
                        Submit Booking Request
                    </Button>
                )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default DiningPage;
