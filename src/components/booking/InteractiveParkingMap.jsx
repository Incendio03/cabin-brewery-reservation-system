import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Tooltip } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock parking layout
const parkingLayout = {
  rows: [
    { id: 'A', spots: Array(10).fill({ status: 'available' }) }, // status: available, occupied, reserved
    { id: 'B', spots: Array(10).fill({ status: 'available' }) },
    { id: 'C', spots: Array(10).fill({ status: 'occupied' }) },
    { id: 'D', spots: Array(5).fill({ status: 'available' }) },
  ]
};

// Randomly make some spots occupied or reserved for demo
parkingLayout.rows[0].spots[2].status = 'occupied';
parkingLayout.rows[0].spots[5].status = 'reserved';
parkingLayout.rows[1].spots[0].status = 'occupied';
parkingLayout.rows[1].spots[8].status = 'reserved';
parkingLayout.rows[2].spots[1].status = 'available'; // Make one available in occupied row for testing
parkingLayout.rows[3].spots[3].status = 'occupied';

const InteractiveParkingMap = ({ selectedSlot, onSlotSelect, alreadyBookedSlots = [] }) => {
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const handleSlotClick = (rowIndex, spotIndex) => {
    const slotId = `${parkingLayout.rows[rowIndex].id}${spotIndex + 1}`;
    if (parkingLayout.rows[rowIndex].spots[spotIndex].status === 'available' && !alreadyBookedSlots.includes(slotId)) {
      onSlotSelect(slotId);
    }
  };

  const getSlotColor = (status, slotId) => {
    if (selectedSlot === slotId) return 'success.main';
    if (alreadyBookedSlots.includes(slotId)) return 'warning.light'; // Visually distinct for already booked by others
    switch (status) {
      case 'occupied':
        return 'error.light';
      case 'reserved':
        return 'warning.main';
      case 'available':
        return 'grey.300';
      default:
        return 'grey.500';
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom align="center">Select Your Parking Slot</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ display: 'inline-block', minWidth: '500px' }}>
          {parkingLayout.rows.map((row, rowIndex) => (
            <Grid container spacing={1} key={row.id} sx={{ mb: 1, alignItems: 'center' }}>
              <Grid item xs={1} sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2">Row {row.id}</Typography>
              </Grid>
              {row.spots.map((spot, spotIndex) => {
                const slotId = `${row.id}${spotIndex + 1}`;
                const isDisabled = spot.status !== 'available' || alreadyBookedSlots.includes(slotId);
                return (
                  <Grid item xs={1} key={spotIndex}>
                    <Tooltip 
                        title={isDisabled ? `Slot ${slotId} (${alreadyBookedSlots.includes(slotId) ? 'Booked' : spot.status})` : `Select Slot ${slotId}`}
                        placement="top"
                    >
                      <Box
                        onClick={() => handleSlotClick(rowIndex, spotIndex)}
                        onMouseEnter={() => setHoveredSlot(slotId)}
                        onMouseLeave={() => setHoveredSlot(null)}
                        sx={{
                          width: '100%',
                          height: 40,
                          bgcolor: getSlotColor(spot.status, slotId),
                          border: `1px solid grey.400`,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          opacity: isDisabled && selectedSlot !== slotId ? 0.6 : 1,
                          transition: 'background-color 0.2s, transform 0.2s',
                          '&:hover': {
                            bgcolor: !isDisabled && selectedSlot !== slotId ? 'primary.light' : undefined,
                            transform: !isDisabled ? 'scale(1.05)' : undefined,
                          }
                        }}
                      >
                        {selectedSlot === slotId && <CheckCircleIcon sx={{ color: 'white'}} fontSize="small"/>}
                        {spot.status === 'occupied' && selectedSlot !== slotId && <DirectionsCarIcon sx={{ color: 'action.disabled'}} fontSize="small"/>}
                        {spot.status === 'reserved' && selectedSlot !== slotId && <DirectionsCarIcon sx={{ color: 'warning.dark'}} fontSize="small"/>}
                        {/* <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>{slotId}</Typography> */}
                      </Box>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Box>
      </Box>
      {selectedSlot && 
        <Typography variant="subtitle1" align="center" sx={{mt: 2}} color="success.main">
            Selected Slot: <strong>{selectedSlot}</strong>
        </Typography>
      }
      <Box sx={{mt: 2, display: 'flex', justifyContent:'space-around', alignItems:'center', flexWrap: 'wrap'}}>
        <Box sx={{display: 'flex', alignItems: 'center', m:0.5}}><Box sx={{width:15, height:15, bgcolor:'success.main', mr:0.5, borderRadius: '50%'}}/> Selected</Box>
        <Box sx={{display: 'flex', alignItems: 'center', m:0.5}}><Box sx={{width:15, height:15, bgcolor:'grey.300', mr:0.5, borderRadius: '50%'}}/> Available</Box>
        <Box sx={{display: 'flex', alignItems: 'center', m:0.5}}><Box sx={{width:15, height:15, bgcolor:'error.light', mr:0.5, borderRadius: '50%'}}/> Occupied</Box>
        <Box sx={{display: 'flex', alignItems: 'center', m:0.5}}><Box sx={{width:15, height:15, bgcolor:'warning.main', mr:0.5, borderRadius: '50%'}}/> Reserved (Staff/Other)</Box>
        <Box sx={{display: 'flex', alignItems: 'center', m:0.5}}><Box sx={{width:15, height:15, bgcolor:'warning.light', mr:0.5, borderRadius: '50%'}}/> Booked (Event/Other)</Box>
      </Box>
    </Paper>
  );
};

export default InteractiveParkingMap;
