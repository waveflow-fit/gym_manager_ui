import { Avatar, Box, Skeleton } from '@mui/material';
import { useMemo } from 'react';

import { EUserRole } from '@/common/constants';
import TrainerSwitcher from '@/components/AppContainer/TrainerSwitcher';
import RoleFlag from '@/components/RoleFlag';
import useSession from '@/components/SessionProvider/useSession';
import {
  MaxCharTypography,
  SectionContainer,
} from '@/components/StyledComponents';

const FloatingTopBar = () => {
  const { session, isLoading: isSessionLoading } = useSession();

  const { userImage, userName, isLoading } = useMemo(
    () => ({
      userImage: session?.image || '',
      userName: session?.name || 'Manager',
      isLoading: isSessionLoading,
    }),
    [isSessionLoading, session?.image, session?.name]
  );

  return (
    <Box
      width='100%'
      height='100%'
      px='1.5rem'
      display='flex'
      justifyContent='flex-end'
      alignItems='center'
      gap='1.2rem'
      py={1}
    >
      <RoleFlag allowedFor={EUserRole.TRAINEE}>
        <TrainerSwitcher />
      </RoleFlag>
      <SectionContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'fit-content',
        }}
      >
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
      </SectionContainer>
    </Box>
  );
};

export default FloatingTopBar;
