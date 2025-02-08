'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemIcon,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_ENDPOINT } from '@/common/apiEndpoints';
import {
  endpointWithQueryParams,
  endpointWithUrlParams,
} from '@/common/app.utils';
import { API_KEYS, EInviteStatus } from '@/common/constants';
import { useApiRefresher } from '@/components/ApiRefresher';
import {
  MaxCharTypography,
  SectionContainer,
} from '@/components/StyledComponents';
import useToast, { EToastType } from '@/components/Toast/useToast';

const initialState = { isLoading: true, invitedTrainees: [], isError: false };

const ListInvites = () => {
  const [state, setState] = useReducer((prevState, action) => {
    return { ...prevState, ...action };
  }, initialState);
  // TODO: Add debounce to input trainee email
  const [inputTraineeEmail, setInputTraineeEmail] = useState('');
  const { showToast } = useToast();
  const {
    isApiRefreshed: isPendingInvitesApiRefreshed,
    refreshApi: refreshPendingTraineeInvites,
  } = useApiRefresher(API_KEYS.PENDING_TRAINEE_INVITES_DASHBOARD);

  useEffect(() => {
    (async () => {
      try {
        startTransition(() => {
          setState({ isLoading: true, isError: false, invitedTrainees: [] });
        });
        const response = await api.get(
          endpointWithQueryParams(
            MANAGEMENT_ENDPOINT.GET_ALL_PENDING_INVITES,
            {
              status: EInviteStatus.PENDING,
              ...(inputTraineeEmail ? { traineeEmail: inputTraineeEmail } : {}),
            },
            true
          )
        );
        setState({
          isLoading: false,
          isError: false,
          invitedTrainees: response.invites,
        });
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
        setState({ isLoading: false, isError: true });
      }
    })();
  }, [showToast, isPendingInvitesApiRefreshed, inputTraineeEmail]);

  const handleDelete = useCallback(
    async (inviteId) => {
      try {
        setState({ isLoading: true });
        await api.delete(
          endpointWithUrlParams(MANAGEMENT_ENDPOINT.DELETE_INVITE, { inviteId })
        );
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
      } finally {
        refreshPendingTraineeInvites();
      }
    },
    [refreshPendingTraineeInvites, showToast]
  );

  const list = useMemo(() => {
    if (state.isLoading) {
      return (
        <div className='flex items-center justify-center flex-col w-full h-full gap-4'>
          <CircularProgress />
        </div>
      );
    }
    if (state.invitedTrainees.length > 0) {
      return (
        <List sx={{ width: '100%' }}>
          {state.invitedTrainees.map(({ id, invite_to_email }) => {
            return (
              <div key={id}>
                <Box
                  width='100%'
                  display='flex'
                  justifyContent='space-between'
                  padding={0.5}
                >
                  <MaxCharTypography maxchars={40}>
                    {invite_to_email}
                  </MaxCharTypography>
                  <ListItemIcon
                    sx={{
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: 'fit-content',
                      cursor: 'pointer',
                      transition: '0.2s all ease-in',
                      '&:hover': {
                        color: 'primary.dark',
                      },
                    }}
                    onClick={() => handleDelete(id)}
                  >
                    <DeleteIcon />
                  </ListItemIcon>
                </Box>
                <Divider />
              </div>
            );
          })}
        </List>
      );
    }
    return (
      <div className='flex items-center justify-center flex-col w-full gap-4 h-full'>
        <Image alt='no results' src='/no_results.svg' width={80} height={80} />
        <Typography
          variant='h6'
          textAlign='center'
          width='100%'
          color='textSecondary'
          fontStyle='italic'
        >
          No pending invites!
        </Typography>
      </div>
    );
  }, [handleDelete, state.invitedTrainees, state.isLoading]);

  return (
    <SectionContainer sx={{ height: '500px' }}>
      <Box
        display='flex'
        flexDirection='column'
        gap={1}
        justifyContent='start'
        alignItems='start'
        height='100%'
        position='relative'
      >
        <Typography variant='h6'>Pending invites</Typography>
        <TextField
          value={inputTraineeEmail}
          onChange={(e) => setInputTraineeEmail(e.target.value)}
          placeholder='Trainee email'
          fullWidth
          sx={{ '& input': { height: '2rem', py: '0.5rem', px: '1rem' } }}
        />
        {list}
      </Box>
    </SectionContainer>
  );
};

export default ListInvites;
