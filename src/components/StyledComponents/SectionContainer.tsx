import { Paper, styled } from '@mui/material';

const SectionContainer = styled(Paper)(({ theme }) => {
  return {
    height: '100%',
    width: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    gap: '0.5rem',
  };
});

export default SectionContainer;
