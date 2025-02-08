'use client';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Popper,
} from '@mui/material';
import { useRef, useState } from 'react';

import { SectionContainer } from '@/components/StyledComponents';

type TAddNewWidgetProps = {
  availableWidgetsOptions: { label: string; value: string }[];
};

function AddNewWidget({ availableWidgetsOptions }: TAddNewWidgetProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsMenuOpen((prevOpen) => !prevOpen);
  const handleClose = () => setIsMenuOpen(false);
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsMenuOpen(false);
    } else if (event.key === 'Escape') {
      setIsMenuOpen(false);
    }
  }

  return (
    <>
      <SectionContainer
        ref={anchorRef}
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
          onClick={handleToggle}
        >
          <AddCircleRoundedIcon fontSize='inherit' color='inherit' />
        </Box>
      </SectionContainer>
      <Popper
        open={isMenuOpen}
        anchorEl={anchorRef.current}
        placement='auto'
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <SectionContainer sx={{ padding: 0 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={isMenuOpen}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  {availableWidgetsOptions.map((widget) => {
                    return (
                      <MenuItem
                        onClick={handleClose}
                        value={widget.value}
                        key={widget.value}
                      >
                        {widget.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </SectionContainer>
          </Grow>
        )}
      </Popper>
    </>
  );
}
export default AddNewWidget;
