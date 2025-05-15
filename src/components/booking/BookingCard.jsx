import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  Stack, 
  Divider,
  IconButton
} from '@mui/material';
import { 
  Event, 
  AccessTime, 
  LocationOn, 
  Person, 
  Confirmation, 
  DeleteOutline,
  RestaurantMenu,
  MeetingRoom,
  LocalActivity,
  LocalParking
} from '@mui/icons-material';

const BookingCard = ({ booking, onCancel, onViewDetails }) => {
  const { id, type, date, time, location, eventName, guests, status, bookingReference } = booking;
  
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Get appropriate icon for booking type
  const getBookingTypeIcon = () => {
    switch(type) {
      case 'dining':
        return <RestaurantMenu fontSize="small" />;
      case 'room':
        return <MeetingRoom fontSize="small" />;
      case 'event':
        return <LocalActivity fontSize="small" />;
      case 'parking':
        return <LocalParking fontSize="small" />;
      default:
        return <Event fontSize="small" />;
    }
  };

  // Get appropriate color for status
  const getStatusColor = () => {
    switch(status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // Capitalize first letter of booking type
  const bookingType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderLeft: `4px solid ${status === 'confirmed' ? '#4caf50' : status === 'pending' ? '#ff9800' : '#f44336'}`
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip 
              icon={getBookingTypeIcon()} 
              label={bookingType} 
              size="small" 
              color="primary" 
            />
            <Chip 
              label={status.charAt(0).toUpperCase() + status.slice(1)} 
              size="small" 
              color={getStatusColor()} 
            />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Ref: {bookingReference}
          </Typography>
        </Stack>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 1 }}>
          {type === 'event' ? eventName : location}
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Event fontSize="small" color="primary" />
            <Typography variant="body2">{formattedDate}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTime fontSize="small" color="primary" />
            <Typography variant="body2">{time}</Typography>
          </Stack>

          {guests && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Person fontSize="small" color="primary" />
              <Typography variant="body2">Guests: {guests}</Typography>
            </Stack>
          )}

          {type !== 'event' && location && (
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn fontSize="small" color="primary" />
              <Typography variant="body2">{location}</Typography>
            </Stack>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Button 
            variant="outlined" 
            color="primary" 
            size="small"
            onClick={() => onViewDetails(booking)}
          >
            View Details
          </Button>
          
          {status !== 'cancelled' && (
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              startIcon={<DeleteOutline />}
              onClick={() => onCancel(booking)}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookingCard;