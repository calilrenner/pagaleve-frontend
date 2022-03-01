import { colors } from '@mui/material';

const themes = (theme: string): object => {
  const types = {
    colors: {
      black: '#000',
      white: '#fff',
      red: 'red',
    },
    textField: {
      color: colors.yellow,
      fontSize: '20px',
    },
  };

  return types[theme];
};

export default themes;
