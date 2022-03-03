import { TextField, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link, useNavigate } from 'react-router-dom';
import { upsertCustomer } from '../services/pagaLeve';
import Alert from '../components/Alert';

export default function NewCustomer() {
  const [customer, setCustomer] = useState({
    name: '',
    contact: '',
    number: '',
    email: '',
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function postUser() {
    upsertCustomer(customer)
      .then(() => navigate('/', { replace: true }))
      .catch((err) => (
        <Alert
          setOpen={setOpen}
          open={open}
          message={err.response.data.message}
        />
      ));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', my: 2 }}
        >
          Novo Cliente
        </Typography>
        <Link to="/">
          <KeyboardReturnIcon sx={{ '&:hover': { cursor: 'pointer' } }} />
        </Link>
      </Box>

      <TextField
        id="outlined-basic"
        label="Empresa"
        variant="outlined"
        sx={{ my: 1 }}
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Contato"
        variant="outlined"
        sx={{ my: 1 }}
        value={customer.contact}
        onChange={(e) => setCustomer({ ...customer, contact: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Telefone"
        variant="outlined"
        sx={{ my: 1 }}
        value={customer.number}
        onChange={(e) => setCustomer({ ...customer, number: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        sx={{ my: 1 }}
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => postUser()}>
        Adicionar
      </Button>
    </Box>
  );
}
