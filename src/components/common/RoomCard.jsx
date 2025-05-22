import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Stack, Chip } from '@mui/material';
import { MeetingRoom, Person, Paid, LocalBar } from '@mui/icons-material';

const RoomCard = ({ room, onBookNow }) => {
  const { name, type, capacity, price, description, amenities, image } = room;
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image || "https://placehold.co/600x400/e9e0d0/2C1810?text=The+Cabin+Brewery"}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
              {name}
            </Typography>
            <Chip 
              icon={type === 'KTV' ? <LocalBar fontSize="small" /> : <MeetingRoom fontSize="small" />} 
              label={type} 
              size="small" 
              color={type === 'KTV' ? "secondary" : "primary"} 
              sx={{ mb: 1.5 }}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
        </Box>
        
        <Stack spacing={1.5} mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Person fontSize="small" color="primary" />
            <Typography variant="body2">Capacity: {capacity} people</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Paid fontSize="small" color="primary" />
            <Typography variant="body2">₱{price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per hour</Typography>
          </Stack>
        </Stack>
        
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Amenities:
        </Typography>
        
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
          {amenities.map((amenity, index) => (
            <Chip
              key={index}
              label={amenity}
              size="small"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={() => onBookNow(room)}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
