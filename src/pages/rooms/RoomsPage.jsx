import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Tabs, Tab, Divider, Paper } from '@mui/material'; // Added Paper
import { RoomCard } from '../../components/common';
import BookingForm from '../../components/booking/BookingForm';
import { MenuSelection } from '../../components/booking'; // Added MenuSelection
import { rooms } from '../../data/rooms';
import { menuItems } from '../../data/menu'; // Added menuItems

// Placeholder for the InteractiveParkingMap component - Copied from DiningPage.jsx
const InteractiveParkingMap = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>Interactive Parking Map</Typography>
      <Box sx={{ height: 300, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        [Parking Map Placeholder - Functionality to be added]
      </Box>
      {/* Logic for selecting a parking spot will go here */}
    </Paper>
  );
};

const RoomsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1, // Default or based on room capacity
    specialRequests: '',
    parkingSlot: '',
    orderedItems: [],
  });

  // Filter rooms by type - Adjusted to use 'KTV Room' and 'VIP Lounge' as per updated rooms.js
  const ktvRooms = rooms.filter(room => room.type === 'KTV Room');
  const privateRooms = rooms.filter(room => room.type === 'VIP Lounge');


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedRoom(null);
    // Reset booking details when tab changes to avoid carrying over selections
    setBookingDetails({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
      specialRequests: '',
      parkingSlot: '',
      orderedItems: [],
    });
  };

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setBookingDetails(prev => ({ ...prev, guests: room.capacity > 0 ? 1 : 0 })); // Set initial guests
    window.scrollTo({
      top: document.getElementById('booking-form-section').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, date: newDate }));
  };

  const handleTimeChange = (newTime) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, time: newTime }));
  };
  
  const handleParkingSelect = (slot) => {
    setBookingDetails(prev => ({ ...prev, parkingSlot: slot }));
  };

  const handleAddItem = (item) => {
    setBookingDetails((prevDetails) => {
      const existingItem = prevDetails.orderedItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          ...prevDetails,
          orderedItems: prevDetails.orderedItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          ...prevDetails,
          orderedItems: [...prevDetails.orderedItems, { ...item, quantity: 1 }],
        };
      }
    });
  };

  const handleRemoveItem = (item) => {
    setBookingDetails((prevDetails) => {
      const existingItem = prevDetails.orderedItems.find((i) => i.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...prevDetails,
          orderedItems: prevDetails.orderedItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      } else {
        return {
          ...prevDetails,
          orderedItems: prevDetails.orderedItems.filter((i) => i.id !== item.id),
        };
      }
    });
  };
  
  const calculateTotalPrice = () => {
    return bookingDetails.orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitBooking = (formData) => { // formData from BookingForm
    const finalBookingDetails = {
      ...formData, // Basic details from BookingForm (name, email, phone, date, time, guests, specialRequests)
      room: selectedRoom,
      parkingSlot: bookingDetails.parkingSlot,
      orderedItems: bookingDetails.orderedItems,
      totalPrice: calculateTotalPrice(),
      roomPrice: selectedRoom.price,
    };
    console.log('Room booking submitted:', finalBookingDetails);
    // setShowConfirmation(true); // You'll need a confirmation dialog similar to DiningPage
    alert(`Booking for ${selectedRoom.name} confirmed! Order total: ₱${calculateTotalPrice().toFixed(2)}. Room cost (consumable): ₱${selectedRoom.price.toFixed(2)}`);
    setSelectedRoom(null); // Reset selected room
    setBookingDetails({ // Reset form fields
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 1,
        specialRequests: '',
        parkingSlot: '',
        orderedItems: [],
    });
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
            Payment for rooms is consumable with our menu items.
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
            <Tab label="VIP Lounges" /> {/* Changed from Private Rooms to VIP Lounges */}
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
          {selectedTab === 2 && privateRooms.map(room => ( // Should display VIP Lounges
            <Grid item key={room.id} xs={12} sm={6} md={4}>
              <RoomCard room={room} onBookNow={handleBookRoom} />
            </Grid>
          ))}
        </Grid>

        {/* Booking Form Section */}
        <Box id="booking-form-section" mb={6}> {/* Changed id for clarity */}
          <Divider sx={{ mb: 6 }} />
          
          {selectedRoom ? (
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom textAlign="center" mb={4} color="primary.main" fontWeight={600}>
                Book: {selectedRoom.name}
              </Typography>
              <BookingForm 
                title={`Reservation for ${selectedRoom.name}`}
                type="room" // This will be used by BookingForm to show/hide fields
                onSubmit={handleSubmitBooking}
                initialData={{ // Pass only the data BookingForm is responsible for
                    guests: bookingDetails.guests, // Pass current guests count
                    // name, email, phone, date, time, specialRequests will be handled by BookingForm's own state
                }}
                maxGuests={selectedRoom.capacity} // Pass room capacity to BookingForm
              />
              
              {/* Menu Selection Section */}
              <Box mt={4}>
                <Typography variant="h5" gutterBottom fontWeight={600} color="primary.dark">
                  Consumable Menu (Min. ₱{selectedRoom.price.toFixed(2)})
                </Typography>
                <MenuSelection
                  menuItems={menuItems}
                  orderedItems={bookingDetails.orderedItems}
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                />
                {bookingDetails.orderedItems.length > 0 && (
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Current Order Total: ₱{calculateTotalPrice().toFixed(2)}
                  </Typography>
                )}
              </Box>

              {/* Parking Selection Section */}
              <Box mt={4}>
                 <Typography variant="h5" gutterBottom fontWeight={600} color="primary.dark">
                    Reserve Parking
                </Typography>
                <InteractiveParkingMap onParkingSelect={handleParkingSelect} />
                {bookingDetails.parkingSlot && 
                  <Typography variant="subtitle1" sx={{mt:1}}>Selected Slot: {bookingDetails.parkingSlot}</Typography>
                }
              </Box>
              
              {/* Submit button is now part of BookingForm, or could be a final submit here */}
              {/* For simplicity, we assume BookingForm's submit triggers handleSubmitBooking */}
              {/* If BookingForm has its own submit, that button would call handleSubmitBooking */}

            </Paper>
          ) : (
            <Typography variant="h5" textAlign="center" color="text.secondary" sx={{py: 5}}>
              Please select a room above to start your booking process.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default RoomsPage;
