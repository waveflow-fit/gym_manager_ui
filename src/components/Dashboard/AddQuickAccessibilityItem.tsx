import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Box } from '@mui/material';

import { SectionContainer } from '@/components/StyledComponents';

function AddQuickAccessibilityItem() {
  return (
    <SectionContainer
      sx={{
        border: '2px solid black',
        borderStyle: 'dotted',
        width: '100%',
        borderColor: 'action.active',
        color: 'action.active',
        transition: '0.2s all ease-in',
        ':hover': {
          borderColor: 'action.hover',
          color: 'action.hover',
        },
      }}
    >
      <Box
        minHeight={{ xs: '150px', sm: '180px', lg: '220px' }}
        fontSize={{ xs: '50px', sm: '60px', lg: '80px' }}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        sx={{ cursor: 'pointer' }}
      >
        <AddCircleRoundedIcon fontSize='inherit' color='inherit' />
      </Box>
    </SectionContainer>
  );
}
export default AddQuickAccessibilityItem;
