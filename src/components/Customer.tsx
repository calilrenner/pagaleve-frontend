/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useEffect } from 'react';
import {
  Box, ListItemText, ListItemButton, ListItemIcon, Fade, InputBase,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function Customer({ data }) {
  const [editSelect, setEditSelect] = useState<boolean>(false);
  const [editDisabled, setEditDisabled] = useState<boolean>(false);
  const [newData, setNewData] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

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
    //   putEdit()
    //     .then(() => {
    //       setEditDisabled(false);
    //       setEditSelect(false);
    //     })
    //     .catch(() => {
    //       setEditDisabled(false);
    //       alert('Não foi possível salvar as alterações!');
    //     });
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
        <ListItemIcon sx={{ color: '#271188cc' }}>
          {data.icon}
        </ListItemIcon>
        {editSelect ? <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}><InputBase ref={inputRef} onKeyUp={(e) => confirmEdit(e)} value={newData} onChange={(e) => setNewData(e.target.value)} sx={{ width: '100%', color: 'gray', fontSize: '14px' }} /></Box> : (
          <ListItemText
            primary={data.label}
            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
          />
        )}
        <EditIcon onClick={() => {
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