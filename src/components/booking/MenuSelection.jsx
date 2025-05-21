import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Chip,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MenuItemCard = ({ item, onAddItem, onRemoveItem, quantity }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover', m: 1, borderRadius: 1 }}
        image={item.image || "https://placehold.co/100x100/e9e0d0/2C1810?text=Food"}
        alt={item.name}
      />
      <CardContent sx={{ flex: '1 0 auto', p: '8px !important' }}>
        <Typography component="div" variant="h6" sx={{ fontSize: '1rem' }}>
          {item.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 1 }}>
          {item.description}
        </Typography>
        <Typography variant="body2" color="primary.main" fontWeight="bold">
          ₱{item.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <IconButton onClick={() => onRemoveItem(item)} size="small" disabled={quantity === 0}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography sx={{ mx: 1 }}>{quantity}</Typography>
        <IconButton onClick={() => onAddItem(item)} size="small">
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

const MenuSelection = ({ menuItems, selectedItems, onAddItem, onRemoveItem }) => {
  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom fontWeight={600} color="primary.main">
        Add to Your Order
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {categories.map(category => (
        <Accordion key={category} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {menuItems.filter(item => item.category === category).map(item => (
                <Grid item xs={12} md={6} key={item.id}>
                  <MenuItemCard 
                    item={item} 
                    onAddItem={onAddItem} 
                    onRemoveItem={onRemoveItem} 
                    quantity={selectedItems.find(si => si.id === item.id)?.quantity || 0}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MenuSelection;
