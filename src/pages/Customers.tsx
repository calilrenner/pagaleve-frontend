/* eslint-disable react/jsx-boolean-value */
import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Typography,
  InputBase,
  Box,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';
// import Loading from '../components/Loading';
import { customerContext } from '../contexts/customerContext';
import { getCustomers } from '../services/pagaLeve';
import CustomersContainer from '../components/CustomersContainer';

export default function Customers() {
  const [search, setSearch] = useState<string>('');
  const [apiData, setApiData] = useState({});
  const { reload } = useContext(customerContext);
  // const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCustomers().then((res) => {
      setApiData(res.data);
    });
  }, [reload]);

  const normalizedString = (string: string): string =>
    string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase();

  const handleFilteredCustomers = (handleSearch) => {
    const filter = apiData[handleSearch[0]?.toUpperCase()]?.filter(
      ({ name }) => {
        if (normalizedString(name).includes(normalizedString(handleSearch))) {
          return true;
        }
        return false;
      }
    );
    if (filter?.length === 0) return null;
    return filter;
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          border: 1,
          borderRadius: '10px',
          my: 2,
        }}
      >
        {search && !handleFilteredCustomers(search) ? (
          <CircularProgress
            size={20}
            sx={{
              color: 'action.active',
              mx: 1,
              mb: 0.8,
            }}
          />
        ) : (
          <SearchIcon
            sx={{
              color: 'action.active',
              mx: 1,
              my: 0.5,
              '&:hover': { cursor: 'pointer' },
            }}
          />
        )}

        <InputBase
          fullWidth={true}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Link to="/new-customer">
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-end',
            width: '5rem',
            ':hover': { cursor: 'pointer', opacity: 0.7 },
            '& svg': {
              transition: '1s',
              transform: 'translateX(0) rotate(0)',
              zIndex: 2,
            },
            '& div': {
              transition: '1s',
              transform: 'translateX(0)',
            },
            '&:hover, &:focus': {
              '& svg': {
                transform: 'translateX(60px) rotate(360deg)',
              },
              '& div': {
                transform: 'translateX(60px)',
              },
            },
          }}
        >
          <AddCircleIcon sx={{ color: 'blue' }} />
          <Box
            sx={{
              height: '25px',
              width: '5rem',
              bgcolor: 'white',
              position: 'absolute',
              left: 5,
              zIndex: 1,
            }}
          />
          <Typography
            variant="subtitle2"
            component="h1"
            sx={{
              color: 'blue',
              position: 'absolute',
              left: 5,
              zIndex: 0,
            }}
          >
            Add new
          </Typography>
        </Box>
      </Link>
      {search && !handleFilteredCustomers(search) ? (
        <Typography sx={{ mt: 2 }}>Nenhum resultado encontrado.</Typography>
      ) : !handleFilteredCustomers(search) ? (
        Object.keys(apiData)
          .sort()
          .map((letter) => (
            <>
              <Box mt={3} mb={1}>
                <Typography>{letter}</Typography>
              </Box>
              <Divider />
              {apiData[letter].map((customer: any) => {
                const formattedData = {
                  id: customer.id,
                  name: customer.name,
                  info: [
                    {
                      icon: <EmailIcon />,
                      label: customer.email,
                      key: 'email',
                    },
                    {
                      icon: <PhoneIcon />,
                      label: customer.number,
                      key: 'number',
                    },
                    {
                      icon: <PermContactCalendarIcon />,
                      label: customer.contact,
                      key: 'contact',
                    },
                  ],
                };

                return <CustomersContainer {...formattedData} />;
              })}
            </>
          ))
      ) : (
        <>
          <Box mt={3} mb={1}>
            <Typography>{search[0]?.toUpperCase()}</Typography>
          </Box>
          <Divider />
          {handleFilteredCustomers(search).map(
            (customer: {
              id: number;
              name: string;
              email: string;
              number: string;
              contact: string;
            }) => {
              const formattedData = {
                id: customer.id,
                name: customer.name,
                info: [
                  { icon: <EmailIcon />, label: customer.email },
                  { icon: <PhoneIcon />, label: customer.number },
                  {
                    icon: <PermContactCalendarIcon />,
                    label: customer.contact,
                  },
                ],
              };

              return <CustomersContainer {...formattedData} />;
            }
          )}
        </>
      )}
    </>
  );
}
