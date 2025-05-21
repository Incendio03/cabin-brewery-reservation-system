import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Stack, Chip } from '@mui/material';
import { MeetingRoom, Person, Paid, LocalBar } from '@mui/icons-material';

const RoomCard = ({ room, onBookNow }) => {
  const { name, type, capacity, price, description, amenities, image } = room;
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const MAX_DESCRIPTION_LENGTH = 80; // Adjusted for typical room descriptions

  return (
    <Card sx={{ height: 580, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image || "https://placehold.co/600x400/e9e0d0/2C1810?text=The+Cabin+Brewery"}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box> {/* Wrapper for content that should not be pushed down by space-between */}
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Typography gutterBottom variant="h5" component="h2" fontWeight="bold" sx={{ flexGrow: 1 }}>
                {name}
              </Typography>
              <Chip 
                icon={type === 'KTV' ? <LocalBar fontSize="small" /> : <MeetingRoom fontSize="small" />} 
                label={type} 
                size="small" 
                color={type === 'KTV' ? "secondary" : "primary"} 
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: '60px' /* Approximate height for 3 lines */ }}>
              {expanded || description.length <= MAX_DESCRIPTION_LENGTH 
                ? description 
                : `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`}
            </Typography>
            {description.length > MAX_DESCRIPTION_LENGTH && (
              <Button size="small" onClick={toggleExpanded} sx={{ textTransform: 'none', p: 0, justifyContent: 'flex-start' }}>
                {expanded ? 'See less' : 'See more'}
              </Button>
            )}
          </Box>
          
          <Stack spacing={1} mb={2}> {/* Reduced spacing from 1.5 to 1 */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Person fontSize="small" color="primary" />
              <Typography variant="body2">Capacity: {capacity} people</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Paid fontSize="small" color="primary" />
              <Typography variant="body2">₱{price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per night</Typography>
            </Stack>
          </Stack>
          
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}> {/* Changed to caption and display block */}
            Amenities:
          </Typography>
          
          <Stack direction="row" spacing={0.5} flexWrap="wrap" mb={2}> {/* Reduced spacing */}
            {amenities.slice(0, 3).map((amenity, index) => ( // Show only first 3 amenities initially or adjust as needed
              <Chip
                key={index}
                label={amenity}
                size="small"
                variant="outlined"
                sx={{ mb: 0.5 }}
              />
            ))}
            {amenities.length > 3 && <Chip label="..." size="small" variant="outlined" sx={{ mb: 0.5 }} />}
          </Stack>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={() => onBookNow(room)}
          sx={{ mt: 'auto' }} // Ensure button is at the bottom
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
