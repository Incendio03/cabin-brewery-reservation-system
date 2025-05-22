import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Layout } from './components/layout';
import HomePage from './pages/home';
import DiningPage from './pages/dining';
import RoomsPage from './pages/rooms';
import BookingsPage from './pages/bookings';
import EventsPage from './pages/events';
import NotFoundPage from './pages/NotFoundPage';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
