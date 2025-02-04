import Box from '@mui/material/Box';
import Image from 'next/image';

const Diet = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      width='100%'
    >
      <Image
        src='/coming_soon.svg'
        height='500'
        width='500'
        alt='coming soon'
      />
    </Box>
  );
};

export default Diet;
