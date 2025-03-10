'use client';
import Add from '@mui/icons-material/Add';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import VStack from '@/components/StyledComponents/VStack';
import ExerciseList from '@/components/TemplateCreator/Workout/ExerciseList';

const WorkoutCreator = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const handleClose = () => setIsDialogOpen(true);
  const handleOpen = () => setIsDialogOpen(true);

  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen}>
        Create new workout
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='md' fullWidth>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const values = Object.fromEntries(formData.entries());

            console.log(values);
          }}
        >
          <DialogTitle>Create workout</DialogTitle>
          <DialogContent>
            <VStack gap={3}>
              <TextField
                name='workoutName'
                placeholder='ex: Legs workout'
                sx={{ maxWidth: '16.5rem' }}
                required
              />
              <ExerciseList />
            </VStack>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={handleClose}>
              Close
            </Button>
            <Button type='submit'>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default WorkoutCreator;
