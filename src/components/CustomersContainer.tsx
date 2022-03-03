/* eslint-disable react/jsx-boolean-value */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Fade,
} from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import Customer from './Customer';
import { deleteCustomer } from '../services/pagaLeve';
import { customerContext } from '../contexts/customerContext';
import Alert from './Alert';

export default function CustomersContainer({
  id,
  name,
  info,
}: {
  id: number;
  name: string;
  info: any;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { reload, setReload } = useContext(customerContext);
  const [alert, setAlert] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);

  useEffect(() => {
    if (remove) {
      deleteCustomer(id).then(() => setReload(!reload));
    }
  }, [remove]);

  return (
    <>
      {alert && <Alert open={alert} setOpen={setAlert} setDelete={setRemove} />}
      <Box
        sx={{
          backgroundColor: 'rgba(71, 98, 130, 0.1)',
          my: 1,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            backgroundColor: 'rgba(71, 98, 130, 0.2)',
          }}
        >
          <ListItemText
            primary={name}
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: 'medium',
              lineHeight: '20px',
              mb: '2px',
              color: '#1d0d68cc',
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 1,
              transform: open ? 'rotate(-180deg)' : 'rotate(0)',
              transition: '0.2s',
            }}
          />
        </ListItemButton>

        {open
          && info.map(
            (data: {
              label: string;
              icon:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
            }) => <Customer id={id} name={name} data={data} />,
          )}
        {open && (
          <Fade in={true} timeout={1500}>
            <Box sx={{ backgroundColor: 'white' }}>
              <ListItemButton
                onClick={() => setAlert(!alert)}
                sx={{
                  backgroundColor: 'red',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  '&:hover': { backgroundColor: '#ce2f2fcc' },
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <DeleteIcon />
                </ListItemIcon>
              </ListItemButton>
            </Box>
          </Fade>
        )}
      </Box>
    </>
  );
}
