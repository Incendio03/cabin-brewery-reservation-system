import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Stack, Chip } from '@mui/material';
import { AccessTime, Restaurant, People, Info } from '@mui/icons-material';

const DiningCard = ({ diningOption, onBookNow }) => {
  const { name, capacity, description, image, openingHours, cuisineType } = diningOption;
  
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
          <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
            {name}
          </Typography>
          <Chip 
            icon={<Restaurant fontSize="small" />} 
            label={cuisineType} 
            size="small" 
            color="secondary" 
            sx={{ mb: 1.5 }}
          />
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
        </Box>
        
        <Stack spacing={1.5} mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTime fontSize="small" color="primary" />
            <Typography variant="body2">{openingHours}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <People fontSize="small" color="primary" />
            <Typography variant="body2">Capacity: {capacity} people</Typography>
          </Stack>
        </Stack>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={() => onBookNow(diningOption)}
        >
          Reserve Table
        </Button>
      </CardContent>
    </Card>
  );
};

export default DiningCard;
