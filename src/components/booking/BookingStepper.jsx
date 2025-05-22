import React from 'react';
import { Stepper, Step, StepLabel, Box, Typography } from '@mui/material';

const steps = ['Reservation Details', 'Choose your Food', 'Confirm Booking'];

const BookingStepper = ({ activeStep }) => {
  return (
    <Box sx={{ width: '100%', mt: 2, mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default BookingStepper;
