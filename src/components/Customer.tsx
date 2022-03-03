/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import {
  Box,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Fade,
  InputBase,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { upsertCustomer } from '../services/pagaLeve';
import { customerContext } from '../contexts/customerContext';
import Alert from './Alert';

export default function Customer(props) {
  const [editSelect, setEditSelect] = useState<boolean>(false);
  const [editDisabled, setEditDisabled] = useState<boolean>(false);
  const [newData, setNewData] = useState<string>('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { reload, setReload } = useContext(customerContext);

  const { data, name, id } = props;

  useEffect(() => {
    if (editSelect) {
      inputRef.current.focus();
    }
  }, [newData, editSelect]);

  function confirmEdit(e) {
    if (e.code === 'Escape' && editSelect) {
      setEditSelect(false);
    }
    if (e.code === 'Enter' && editSelect) {
      setEditDisabled(true);
      setEditSelect(false);
      upsertCustomer({ id, name, [data.key]: newData })
        .then(() => {
          setReload(!reload);
          setEditDisabled(false);
          setEditSelect(false);
        })
        .catch((err) => {
          setEditDisabled(false);
            <Alert
              open={open}
              setOpen={setOpen}
              message={err.response.data.message}
            />;
        });
    }
  }

  return (
    <Fade timeout={1500} in={true}>
      <ListItemButton
        key={data.label}
        sx={{
          py: 0,
          minHeight: 32,
          color: '#271188cc',
          '&:hover, &:focus': {
            '& svg': {
              transition: '0.2s',
              transform: 'rotate(-20deg)',
            },
          },
        }}
      >
        <ListItemIcon sx={{ color: '#271188cc' }}>{data.icon}</ListItemIcon>
        {editSelect ? (
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <InputBase
              ref={inputRef}
              onKeyUp={(e) => confirmEdit(e)}
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              sx={{ width: '100%', color: 'gray', fontSize: '14px' }}
            />
          </Box>
        ) : (
          <ListItemText
            primary={data.label}
            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
          />
        )}
        <EditIcon
          onClick={() => {
            if (!editDisabled) {
              setNewData(data.label);
              setEditSelect(!editSelect);
            }
          }}
        />
      </ListItemButton>
    </Fade>
  );
}
