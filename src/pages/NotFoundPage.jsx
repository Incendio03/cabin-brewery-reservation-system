import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

const NotFoundPage = () => {
  return (
    <Box py={8}>
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: '#fff'
          }}
        >
          <SentimentVeryDissatisfied 
            sx={{ 
              fontSize: 100, 
              color: 'primary.main',
              mb: 2 
            }} 
          />
          <Typography variant="h3" gutterBottom fontWeight={600}>
            Page Not Found
          </Typography>
          <Typography variant="subtitle1" paragraph color="text.secondary">
            Sorry, we couldn't find the page you're looking for.
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
            The page might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 4 }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
