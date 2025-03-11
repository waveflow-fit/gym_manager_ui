'use client';
import Add from '@mui/icons-material/Add';
import { Button, Drawer, TextField } from '@mui/material';
import { useState } from 'react';

import { createNestedObject } from '@/common/app.utils';
import { EExerciseLoggingType } from '@/common/constants';
import DrawerActionButtons from '@/components/StyledComponents/Drawer/DrawerActionButtons';
import DrawerContent from '@/components/StyledComponents/Drawer/DrawerContent';
import DrawerHeader from '@/components/StyledComponents/Drawer/DrawerHeader';
import VStack from '@/components/StyledComponents/VStack';
import { TWorkoutExercise } from '@/components/TemplateCreator/Workout/Exercise';
import ExerciseList, {
  getExerciseId,
} from '@/components/TemplateCreator/Workout/ExerciseList';

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
        id: getExerciseId(),
        exerciseName: 'Leg press',
        exerciseLogType: EExerciseLoggingType.BOOLEAN,
        isOptional: true,
      },
      {
        id: getExerciseId(),
        exerciseName: 'Leg curl',
        exerciseLogType: EExerciseLoggingType.WEIGHT_REP_COUNT,
        suggestedIntensity: {
          reps: 3,
          weight: 20,
          countPerRep: 12,
        },
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
          const workoutPlan = createNestedObject(
            values,
            'exercises'
          ) as TWorkoutPlan;
          workoutPlan.exercises = workoutPlan.exercises.map((e) => {
            if ((e.isOptional as unknown as string) === 'on') {
              e.isOptional = true;
            } else {
              e.isOptional = false;
            }
            return e;
          });
          setWorkoutPlan(workoutPlan);
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
