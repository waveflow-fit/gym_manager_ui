'use client';

import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton } from '@mui/material';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

const MessagingActionRenderer = () => {
  return (
    <CenterAlign gap={1} justifyContent='flex-start'>
      <IconButton>
        <WhatsAppIcon />
      </IconButton>
      <IconButton>
        <EmailIcon />
      </IconButton>
    </CenterAlign>
  );
};

export default MessagingActionRenderer;
