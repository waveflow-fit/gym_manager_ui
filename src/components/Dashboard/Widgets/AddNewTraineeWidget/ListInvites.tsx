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
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_ENDPOINTS } from '@/common/apiEndpoints';
import { endpointWithUrlParams } from '@/common/app.utils';
import { EInviteStatus, PAGINATION } from '@/common/constants';
import { AddNewTraineeWidgetCtx } from '@/components/Dashboard/Widgets/AddNewTraineeWidget';
import {
  MaxCharTypography,
  SectionContainer,
} from '@/components/StyledComponents';
import useToast, { EToastType } from '@/components/Toast/useToast';

const ListInvites = () => {
  const {
    invites: invitedTrainees,
    setInvites,
    deleteTraineeInvite,
  } = useContext(AddNewTraineeWidgetCtx);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputTraineeEmail, setInputTraineeEmail] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.post(
          MANAGEMENT_ENDPOINTS.GET_ALL_PENDING_INVITES,
          {
            filters: {
              invite_status: EInviteStatus.PENDING,
            },
            limit: PAGINATION.LARGE_LIMIT,
          }
        );
        setInvites(response.data);
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setInvites, showToast]);

  const handleDelete = useCallback(
    async ({ inviteId }) => {
      try {
        setIsDeleting(true);
        await api.delete(
          endpointWithUrlParams(MANAGEMENT_ENDPOINTS.DELETE_INVITE, {
            inviteId,
          })
        );
        deleteTraineeInvite(inviteId);
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
      } finally {
        setIsDeleting(false);
      }
    },
    [deleteTraineeInvite, showToast]
  );
  const filteredInvites = useMemo(() => {
    return invitedTrainees.filter(({ invite_to_email }) =>
      invite_to_email.toLowerCase().includes(inputTraineeEmail)
    );
  }, [inputTraineeEmail, invitedTrainees]);

  const list = useMemo(() => {
    if (isLoading) {
      return (
        <div className='flex items-center justify-center flex-col w-full h-full gap-4'>
          <CircularProgress />
        </div>
      );
    }
    if (filteredInvites.length > 0) {
      return (
        <List sx={{ width: '100%' }}>
          {filteredInvites.map(({ id, invite_to_email }) => {
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
                    onClick={() =>
                      handleDelete({
                        inviteId: id,
                      })
                    }
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
          No invites found!
        </Typography>
      </div>
    );
  }, [handleDelete, filteredInvites, isLoading]);

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
        <Box
          sx={{
            opacity: isDeleting ? 0.7 : 1,
            pointerEvents: isDeleting ? 'none' : 'initial',
          }}
          width='100%'
          height='100%'
        >
          {list}
        </Box>
      </Box>
    </SectionContainer>
  );
};

export default ListInvites;
