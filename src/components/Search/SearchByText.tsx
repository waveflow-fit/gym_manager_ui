import { SearchOutlined } from '@mui/icons-material';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

const SearchByText = ({
  placeholder = 'Search',
  sx,
  ...rest
}: TextFieldProps) => {
  return (
    <TextField
      placeholder={placeholder}
      sx={{
        width: '12.5rem',
        '& .MuiInputBase-input': {
          py: '0.5rem',
          fontSize: '1rem',
        },
        ...sx,
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlined sx={{ fontSize: '1.3rem' }} />
            </InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  );
};

export default SearchByText;
