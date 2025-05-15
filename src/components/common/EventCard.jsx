import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Stack } from '@mui/material';
import { AccessTime, CalendarToday, PeopleAlt, LocalOffer } from '@mui/icons-material';

const EventCard = ({ event, onBookNow }) => {
  const { title, date, time, description, image, ticketPrice, available } = event;
  
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image || "https://placehold.co/600x400/e9e0d0/2C1810?text=The+Cabin+Brewery"}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
              {title}
            </Typography>
            {available ? (
              <Chip 
                size="small" 
                color="success" 
                label="Available" 
                sx={{ fontWeight: 'medium' }}
              />
            ) : (
              <Chip 
                size="small" 
                color="error" 
                label="Sold Out" 
                sx={{ fontWeight: 'medium' }}
              />
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
        </Box>
        
        <Stack spacing={1} mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarToday fontSize="small" color="primary" />
            <Typography variant="body2">{formattedDate}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTime fontSize="small" color="primary" />
            <Typography variant="body2">{time}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocalOffer fontSize="small" color="primary" />
            <Typography variant="body2">${ticketPrice.toFixed(2)} per person</Typography>
          </Stack>
        </Stack>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={() => onBookNow(event)}
          disabled={!available}
        >
          Book Tickets
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
