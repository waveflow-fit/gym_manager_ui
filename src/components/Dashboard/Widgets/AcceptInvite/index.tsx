'use client';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_ENDPOINTS } from '@/common/apiEndpoints';
import { EInviteStatus } from '@/common/constants';
import {
  MaxCharTypography,
  SectionContainer,
} from '@/components/StyledComponents';
import useToast, { EToastType } from '@/components/Toast/useToast';
import { AssociationCtx } from '@/context/Association';

const ActionButton = ({
  status,
  inviteId,
}: {
  status: EInviteStatus;
  inviteId: string;
}) => {
  const [isActionPending, setIsActionPending] = useState(false);
  const { showToast } = useToast();
  const { updateTraineeInvite } = useContext(AssociationCtx);

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

      updateTraineeInvite(inviteId, { invite_status: updatedStatus });
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
  const { traineeInvites, traineeInvitesById, isTraineeInvitesLoading } =
    useContext(AssociationCtx);
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

        {isTraineeInvitesLoading ? (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width='100%'
            height='100%'
          >
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ width: '100%', overflowY: 'auto' }}>
            {traineeInvites.map((id) => {
              const { invite_status, invited_by } = traineeInvitesById[id];
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
                    />
                  </Box>
                  <Divider />
                </div>
              );
            })}
          </List>
        )}
      </Box>
    </SectionContainer>
  );
};

export default AcceptInviteWidget;
