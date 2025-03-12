'use client';
import Add from '@mui/icons-material/Add';
import { Button, Drawer, TextField } from '@mui/material';
import { useState } from 'react';

import {
  createNestedObject,
  groupByPrefix,
  replaceKeyValue,
} from '@/common/app.utils';
import { EExerciseLoggingType } from '@/common/constants';
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => setIsDialogOpen(false);
  const handleOpen = () => setIsDialogOpen(true);
  const [workoutPlan, setWorkoutPlan] = useState<TWorkoutPlan>({
    workoutName: 'Legs workout',
    exercises: [
      {
        id: 'exercises-76e40117-9714-4c62-b410-837dd3031904',
        exerciseName: 'Leg press',
        exerciseLogType: EExerciseLoggingType.BOOLEAN,
        alternateExercise: {
          'exercises-2bf7d667-da4d-44db-90c0-747594581ebc': {
            exerciseName: 'jj',
            exerciseLogType: EExerciseLoggingType.WEIGHT_REP_COUNT,
            suggestedIntensity: {
              reps: 1,
              weight: 1,
              countPerRep: 1,
            },
            id: 'exercises-2bf7d667-da4d-44db-90c0-747594581ebc',
          },
          'exercises-d3639ca8-4ea8-4ab8-a6c5-8f2b76f15845': {
            exerciseName: 'kk',
            exerciseLogType: EExerciseLoggingType.BOOLEAN,
            isOptional: true,
            id: 'exercises-d3639ca8-4ea8-4ab8-a6c5-8f2b76f15845',
          },
        },
        isOptional: false,
      },
      {
        id: 'exercises-818da37b-f416-4c7b-b62c-ae11dc513205',
        exerciseName: 'Leg curl',
        exerciseLogType: EExerciseLoggingType.WEIGHT_REP_COUNT,
        suggestedIntensity: {
          reps: 3,
          weight: 20,
          countPerRep: 12,
        },
        isOptional: false,
      },
    ],
  });
  console.log(workoutPlan);
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
            sx: { width: '36rem', overflowY: 'auto', m: '-1rem', p: '1rem' },
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
