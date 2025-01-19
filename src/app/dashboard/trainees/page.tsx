import Box from '@mui/material/Box';
import Image from 'next/image';

const Trainees = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      width='100%'
      border='1px solid black'
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

export default Trainees;
