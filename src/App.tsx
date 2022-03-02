import React from 'react';
import Container from '@mui/material/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewCustomer from './pages/NewCustomer';
import { GlobalStyles } from './styles/GlobalStyles';
import Customers from './pages/Customers';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<Customers />} />
          <Route path="/new-customer" element={<NewCustomer />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
