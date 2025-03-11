'use client';
import Add from '@mui/icons-material/Add';
import { Button, Drawer, TextField } from '@mui/material';
import { useState } from 'react';

import { createNestedObject } from '@/common/app.utils';
import DrawerActionButtons from '@/components/StyledComponents/Drawer/DrawerActionButtons';
import DrawerContent from '@/components/StyledComponents/Drawer/DrawerContent';
import DrawerHeader from '@/components/StyledComponents/Drawer/DrawerHeader';
import VStack from '@/components/StyledComponents/VStack';
import ExerciseList from '@/components/TemplateCreator/Workout/ExerciseList';

const WorkoutCreator = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => setIsDialogOpen(false);
  const handleOpen = () => setIsDialogOpen(true);

  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen}>
        Create new workout
      </Button>
      <Drawer
        anchor='right'
        open={isDialogOpen}
        onClose={handleClose}
        component='form'
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = event.currentTarget as HTMLFormElement;

          const formData = new FormData(form);
          const values = Object.fromEntries(formData.entries());

          console.log(createNestedObject(values, 'exercise'));
        }}
      >
        <DrawerHeader handleClose={handleClose}>Create workout</DrawerHeader>
        <DrawerContent
          containerProps={{
            sx: { width: '32rem', overflowY: 'auto', m: '-1rem', p: '1rem' },
          }}
        >
          <VStack height='100%' gap={1}>
            <TextField
              name='workoutName'
              placeholder='ex: Legs workout'
              sx={{ maxWidth: '16.5rem' }}
              required
            />
            <ExerciseList />
          </VStack>
        </DrawerContent>
        <DrawerActionButtons>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit'>Save</Button>
        </DrawerActionButtons>
      </Drawer>
    </>
  );
};

export default WorkoutCreator;
