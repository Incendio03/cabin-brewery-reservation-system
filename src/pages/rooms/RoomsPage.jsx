import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Tabs, Tab, Divider } from '@mui/material';
import { RoomCard } from '../../components/common';
import BookingForm from '../../components/booking/BookingForm';
import { rooms } from '../../data/rooms';

const RoomsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Filter rooms by type
  const ktvRooms = rooms.filter(room => room.type === 'KTV');
  const privateRooms = rooms.filter(room => room.type === 'Private Room');

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedRoom(null);
  };

  // Handle booking a room
  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    window.scrollTo({
      top: document.getElementById('booking-form').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Handle form submission
  const handleSubmitBooking = (bookingData) => {
    console.log('Room booking submitted:', { ...bookingData, room: selectedRoom });
    // In a real app, this would submit to a server
  };

  return (
    <Box py={4}>
      <Container>
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={600}>
            KTV & Private Rooms
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Book our premium KTV rooms for karaoke fun or our private rooms for meetings and gatherings.
            All rooms come with full service and amenities to ensure a memorable experience.
          </Typography>
        </Box>

        {/* Room Tabs */}
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
            <Tab label="All Rooms" />
            <Tab label="KTV Rooms" />
            <Tab label="Private Rooms" />
          </Tabs>
        </Box>

        {/* Room Grid */}
        <Grid container spacing={4} mb={6}>
          {selectedTab === 0 && rooms.map(room => (
            <Grid item key={room.id} xs={12} sm={6} md={4}>
              <RoomCard room={room} onBookNow={handleBookRoom} />
            </Grid>
          ))}
          {selectedTab === 1 && ktvRooms.map(room => (
            <Grid item key={room.id} xs={12} sm={6} md={4}>
              <RoomCard room={room} onBookNow={handleBookRoom} />
            </Grid>
          ))}
          {selectedTab === 2 && privateRooms.map(room => (
            <Grid item key={room.id} xs={12} sm={6} md={4}>
              <RoomCard room={room} onBookNow={handleBookRoom} />
            </Grid>
          ))}
        </Grid>

        {/* Booking Form Section */}
        <Box id="booking-form" mb={6}>
          <Divider sx={{ mb: 6 }} />
          
          {selectedRoom ? (
            <>
              <Typography variant="h4" gutterBottom textAlign="center" mb={4}>
                Book {selectedRoom.name}
              </Typography>
              <BookingForm 
                title={`Book ${selectedRoom.name} (${selectedRoom.type})`}
                type="room"
                onSubmit={handleSubmitBooking}
              />
            </>
          ) : (
            <Typography variant="h5" textAlign="center" color="text.secondary">
              Select a room above to make a booking
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default RoomsPage;
