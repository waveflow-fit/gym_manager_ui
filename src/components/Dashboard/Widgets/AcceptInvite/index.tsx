'use client';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_ENDPOINTS } from '@/common/apiEndpoints';
import { EInviteStatus, PAGINATION } from '@/common/constants';
import {
  MaxCharTypography,
  SectionContainer,
} from '@/components/StyledComponents';
import useToast, { EToastType } from '@/components/Toast/useToast';

const ActionButton = ({
  status,
  inviteId,
  setTraineeInvites,
}: {
  status: EInviteStatus;
  inviteId: string;
  setTraineeInvites: Dispatch<SetStateAction<IInvite[]>>;
}) => {
  const [isActionPending, setIsActionPending] = useState(false);
  const { showToast } = useToast();

  const handleAction = async (action: 'accept' | 'reject') => {
    try {
      setIsActionPending(true);
      let updatedStatus;
      if (action === 'accept') {
        await api.patch(MANAGEMENT_ENDPOINTS.ACCEPT_INVITE(inviteId));
        updatedStatus = EInviteStatus.ACCEPTED;
      }
      if (action === 'reject') {
        await api.patch(MANAGEMENT_ENDPOINTS.REJECT_INVITE(inviteId));
        updatedStatus = EInviteStatus.REJECTED;
      }
      setTraineeInvites((prevState) => {
        return prevState.map((invite) => {
          if (invite.id === inviteId) {
            return { ...invite, invite_status: updatedStatus };
          }
          return invite;
        });
      });
    } catch (e: any) {
      showToast({ severity: EToastType.ERROR, message: e.message });
    } finally {
      setIsActionPending(false);
    }
  };
  if (status !== EInviteStatus.PENDING) return null;
  return (
    <Box display='flex' gap={1} alignItems='center' marginLeft='auto'>
      <IconButton
        onClick={() => handleAction('accept')}
        disabled={isActionPending}
        size='small'
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        size='small'
        onClick={() => handleAction('reject')}
        disabled={isActionPending}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
const AcceptInviteWidget = () => {
  const [traineeInvites, setTraineeInvites] = useState<IInvite[]>([]);

  useEffect(() => {
    (async () => {
      const invites = await api.post(
        MANAGEMENT_ENDPOINTS.GET_ALL_INVITES_OF_TRAINEE,
        {
          limit: PAGINATION.LARGE_LIMIT,
        }
      );
      setTraineeInvites(invites.data);
    })();
  }, []);
  console.log(traineeInvites);
  return (
    <SectionContainer
      sx={{
        height: '500px',
        width: { sm: '100%', md: '50%' },
        px: 0,
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap={1}
        justifyContent='start'
        alignItems='start'
        height='100%'
        position='relative'
      >
        <Typography variant='h6' px={2}>
          Invites
        </Typography>
        <List sx={{ width: '100%', overflowY: 'auto' }}>
          {traineeInvites.map(({ id, invite_status, invited_by }) => {
            return (
              <div key={id}>
                <Box
                  width='100%'
                  display='flex'
                  px={1}
                  py={invite_status === EInviteStatus.PENDING ? 0 : 1}
                  gap={1}
                  alignItems='center'
                >
                  <Chip label={invite_status} size='small' />
                  <MaxCharTypography maxchars={40} variant='body2'>
                    {invited_by?.name} ({invited_by?.email})
                  </MaxCharTypography>
                  <ActionButton
                    status={invite_status}
                    inviteId={id as string}
                    setTraineeInvites={setTraineeInvites}
                  />
                </Box>
                <Divider />
              </div>
            );
          })}
        </List>
      </Box>
    </SectionContainer>
  );
};

export default AcceptInviteWidget;
