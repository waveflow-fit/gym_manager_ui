import { Avatar, Box, Paper, Skeleton, styled } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { MaxCharTypography } from '@/components/StyledComponents';

const StyledProfileDetailsHolder = styled(Paper)(({ theme }) => {
  return {
    height: 'fit-content',
    width: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    gap: '0.5rem',
  };
});
const FloatingTopBar = () => {
  const session = useSession();

  const { userImage, userName, isLoading } = useMemo(
    () => ({
      userImage: session.data?.user?.image || '',
      userName: session.data?.user?.name || 'Manager',
      isLoading: session.status === 'loading',
    }),
    [session.data?.user?.image, session.data?.user?.name, session.status]
  );

  return (
    <Box
      width='100%'
      height='100%'
      px='1.5rem'
      display='flex'
      justifyContent='flex-end'
      alignItems='center'
    >
      <StyledProfileDetailsHolder>
        {isLoading ? (
          <>
            <Skeleton variant='circular' width={40} height={40} />
            <Skeleton variant='rectangular' width={120} height={30} />
          </>
        ) : (
          <>
            <Avatar
              alt={userName}
              src={userImage}
              sx={{ width: 40, height: 40 }}
            />
            <MaxCharTypography variant='body1' maxchars={10}>
              {userName}
            </MaxCharTypography>
          </>
        )}
      </StyledProfileDetailsHolder>
    </Box>
  );
};

export default FloatingTopBar;
