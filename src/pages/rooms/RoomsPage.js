import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const RoomsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Our Rooms
      </Typography>
      <Typography variant="body1" paragraph>
        Experience comfort and rustic charm in our cabin accommodations. Perfect for weekend getaways or extended stays while enjoying our brewery.
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Sample Room Cards */}
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/400x200?text=Cabin+Suite"
              alt="Cabin Suite"
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                Cabin Suite
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Our premium cabin suite offers a spacious bedroom, private bathroom, and a small kitchenette.
              </Typography>
              <Button variant="contained" color="primary">
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/400x200?text=Deluxe+Room"
              alt="Deluxe Room"
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                Deluxe Room
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Comfortable accommodation with a queen bed and mountain views.
              </Typography>
              <Button variant="contained" color="primary">
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/400x200?text=Family+Cabin"
              alt="Family Cabin"
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                Family Cabin
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Spacious cabin with two bedrooms, perfect for families or groups.
              </Typography>
              <Button variant="contained" color="primary">
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomsPage;
