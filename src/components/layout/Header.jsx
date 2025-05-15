import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Container,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Navigation links
  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Dining Reservation', path: '/dining' },
    { text: 'KTV/Rooms Booking', path: '/rooms' },
    { text: 'Parking', path: '/parking' },
    { text: 'My Bookings', path: '/bookings' },
  ];

  // Handle close drawer
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  // Mobile drawer component
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom={1} borderColor="divider">
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src="/images/CabinBreweryLogo.jpg"
            alt="The Cabin Brewery Logo"
            sx={{
              height: 30,
              mr: 1,
              borderRadius: 1,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              color: 'primary.main',
              fontSize: '1.2rem'
            }}
          >
            The Cabin Brewery
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={link.path}
              selected={location.pathname === link.path}
              onClick={handleDrawerToggle}
              sx={{
                bgcolor: location.pathname === link.path ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(139, 69, 19, 0.05)',
                },
              }}
            >
              <ListItemText 
                primary={link.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === link.path ? 600 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>          <Box
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src="/images/CabinBreweryLogo.jpg"
              alt="The Cabin Brewery Logo"
              sx={{
                height: 40,
                mr: 1,
                borderRadius: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.5rem'
              }}
            >
              The Cabin Brewery
            </Typography>
          </Box>

          {/* Mobile menu icon */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}          {/* Mobile title */}
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src="/images/CabinBreweryLogo.jpg"
              alt="The Cabin Brewery Logo"
              sx={{
                height: 36,
                mr: 1,
                borderRadius: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              The Cabin Brewery
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navLinks.map((link) => (
              <Button
                key={link.text}
                component={Link}
                to={link.path}
                sx={{ 
                  mx: 1, 
                  color: 'text.primary',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: location.pathname === link.path ? '100%' : '0%',
                    height: '3px',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease-in-out'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {link.text}
              </Button>
            ))}
          </Box>

          {/* Login button */}
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              display: { xs: 'none', md: 'block' }
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
