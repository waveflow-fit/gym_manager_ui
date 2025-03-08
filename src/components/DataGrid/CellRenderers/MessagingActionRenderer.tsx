'use client';

import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { get } from 'lodash';
import { useState } from 'react';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

enum EMessagingPopover {
  WHATS_APP = 'WHATS_APP',
  EMAIL = 'EMAIL',
}
const PopOverNames = {
  [EMessagingPopover.WHATS_APP]: 'WhatsApp',
  [EMessagingPopover.EMAIL]: 'Email',
};
const MessagingActionRenderer = ({ colDef, row }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [popOverType, setPopOverType] = useState<EMessagingPopover | null>(
    null
  );
  const [textMessage, setTextMessage] = useState('');
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: EMessagingPopover
  ) => {
    setAnchorEl(event.currentTarget);
    setPopOverType(type);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSendMessage = () => {
    const anchor = document.createElement('a');
    if (popOverType === EMessagingPopover.EMAIL) {
      const email = get(row, colDef?.cellRenderParams?.emailField, '');
      if (email) {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Message from your trainer')}&body=${encodeURIComponent(textMessage)}`;
        anchor.href = gmailLink;
      }
    }
    anchor.target = '_blank';
    if (popOverType === EMessagingPopover.WHATS_APP) {
      const whatsapp = get(
        row,
        colDef?.cellRenderParams?.whatsAppField,
        '9588195330'
      );
      if (whatsapp) {
        anchor.href = `https://web.whatsapp.com/send?phone=${whatsapp}&text=${textMessage}`;
      }
    }
    anchor.click();
  };
  return (
    <>
      <CenterAlign gap={1} justifyContent='flex-start'>
        <IconButton
          onClick={(e) => handleClick(e, EMessagingPopover.WHATS_APP)}
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton onClick={(e) => handleClick(e, EMessagingPopover.EMAIL)}>
          <EmailIcon />
        </IconButton>
      </CenterAlign>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2} minWidth='24.5rem'>
          <CenterAlign flexDirection='column' alignItems='flex-start' gap={1}>
            <Typography variant='h6' fontSize='1.2rem'>
              {PopOverNames[popOverType as EMessagingPopover]}
            </Typography>
            <TextField
              placeholder='Type your message...'
              multiline
              rows={2}
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1.1rem',
                },
                '& .MuiInputBase-root': {
                  p: '0.75rem',
                  fontSize: '1.1rem',
                },
              }}
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
            />
            <Button
              onClick={handleSendMessage}
              variant='contained'
              disabled={!textMessage}
            >
              Send
            </Button>
          </CenterAlign>
        </Box>
      </Popover>
    </>
  );
};

export default MessagingActionRenderer;
