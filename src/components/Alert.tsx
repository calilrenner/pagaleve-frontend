import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
  setDelete?: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
}

export default function Alert(props: Props) {
  const { open, setOpen, setDelete, message } = props;
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="body1" component="h2">
          {message || 'A exlcusão é permanente, deseja continuar?'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: `${message ? 'center' : 'space-around'}`,
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 2 }}
            onClick={() => {
              setDelete(true);
              setOpen(!open);
            }}
          >
            {message ? 'Confirmar' : 'Deletar'}
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ display: `${message ? 'none' : 'initial'}` }}
            onClick={() => setOpen(!open)}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
