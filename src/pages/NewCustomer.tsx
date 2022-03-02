import {
  TextField, Box, Button, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';

export default function NewCustomer() {
  const [customer, setCustomer] = useState({
    company: '',
    contact: '',
    number: '',
    email: '',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', my: 2 }}>
          Novo Cliente
        </Typography>
        <Link to="/">
          <KeyboardReturnIcon sx={{ '&:hover': { cursor: 'pointer' } }} />
        </Link>
      </Box>

      <TextField id="outlined-basic" label="Empresa" variant="outlined" sx={{ my: 1 }} value={customer.company} onChange={(e) => setCustomer({ ...customer, company: e.target.value })} />
      <TextField id="outlined-basic" label="Contato" variant="outlined" sx={{ my: 1 }} value={customer.contact} onChange={(e) => setCustomer({ ...customer, contact: e.target.value })} />
      <TextField id="outlined-basic" label="Telefone" variant="outlined" sx={{ my: 1 }} value={customer.number} onChange={(e) => setCustomer({ ...customer, number: e.target.value })} />
      <TextField id="outlined-basic" label="E-mail" variant="outlined" sx={{ my: 1 }} value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
      <Button variant="contained" sx={{ mt: 3 }}>Adicionar</Button>
    </Box>
  );
}
