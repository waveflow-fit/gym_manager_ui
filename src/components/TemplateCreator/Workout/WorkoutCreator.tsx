'use client';
import Add from '@mui/icons-material/Add';
import { Button, Drawer, TextField } from '@mui/material';
import { useState } from 'react';

import DrawerActionButtons from '@/components/StyledComponents/Drawer/DrawerActionButtons';
import DrawerContent from '@/components/StyledComponents/Drawer/DrawerContent';
import DrawerHeader from '@/components/StyledComponents/Drawer/DrawerHeader';

const WorkoutCreator = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => setIsDialogOpen(false);
  const handleOpen = () => setIsDialogOpen(true);

  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen}>
        Create new workout
      </Button>
      <Drawer anchor='right' open={isDialogOpen} onClose={handleClose}>
        {/* <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const values = Object.fromEntries(formData.entries());

            console.log(values);
          }}
        > */}
        <DrawerHeader>Create workout</DrawerHeader>
        <DrawerContent>
          <TextField
            name='workoutName'
            placeholder='ex: Legs workout'
            sx={{ maxWidth: '16.5rem' }}
            required
          />
          <TextField
            name='workoutName'
            placeholder='ex: Legs workout'
            sx={{ maxWidth: '16.5rem' }}
            required
          />
          {/* <ExerciseList /> */}
        </DrawerContent>
        <DrawerActionButtons>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit'>Save</Button>
        </DrawerActionButtons>
        {/* </form> */}
      </Drawer>
    </>
  );
};

export default WorkoutCreator;
