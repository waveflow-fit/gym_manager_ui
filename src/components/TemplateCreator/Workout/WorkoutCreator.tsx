'use client';
import Add from '@mui/icons-material/Add';
import { Button, Drawer, TextField } from '@mui/material';
import { useState } from 'react';

import {
  createNestedObject,
  groupByPrefix,
  replaceKeyValue,
} from '@/common/app.utils';
import DrawerActionButtons from '@/components/StyledComponents/Drawer/DrawerActionButtons';
import DrawerContent from '@/components/StyledComponents/Drawer/DrawerContent';
import DrawerHeader from '@/components/StyledComponents/Drawer/DrawerHeader';
import VStack from '@/components/StyledComponents/VStack';
import { TWorkoutExercise } from '@/components/TemplateCreator/Workout/Exercise';
import ExerciseList from '@/components/TemplateCreator/Workout/ExerciseList';

export type TWorkoutPlan = {
  workoutName: string;
  exercises: TWorkoutExercise[];
};

const WorkoutCreator = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleClose = () => setIsDrawerOpen(false);
  const handleOpen = () => setIsDrawerOpen(true);
  const [workoutPlan, setWorkoutPlan] = useState<TWorkoutPlan>({
    workoutName: '',
    exercises: [],
  });
  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen}>
        Create new workout
      </Button>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={handleClose}
        component='form'
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = event.currentTarget as HTMLFormElement;

          const formData = new FormData(form);
          const values = Object.fromEntries(formData.entries());
          const workoutPlan = replaceKeyValue(
            groupByPrefix(createNestedObject(values), 'exercises'),
            'isOptional',
            'on',
            true
          ) as TWorkoutPlan;
          setWorkoutPlan(workoutPlan);
        }}
      >
        <DrawerHeader handleClose={handleClose}>Create workout</DrawerHeader>
        <DrawerContent
          containerProps={{
            sx: {
              width: { xs: '100vw', sm: '36rem' },
              overflowY: 'auto',
              m: '-1rem',
              p: '1rem',
            },
          }}
        >
          <VStack height='100%' gap={1}>
            <TextField
              name='workoutName'
              placeholder='ex: Legs workout'
              sx={{ maxWidth: '16.5rem' }}
              required
              defaultValue={workoutPlan.workoutName}
            />
            <ExerciseList defaultExercises={workoutPlan.exercises} />
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
