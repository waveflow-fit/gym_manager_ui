import { Add } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import { uniqueId } from 'lodash';
import { useState } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import VStack from '@/components/StyledComponents/VStack';
import Exercise, {
  TWorkoutExercise,
} from '@/components/TemplateCreator/Workout/Exercise';
export const getExerciseId = () => uniqueId('exercises-').toString();
const getBaseExercise = () => ({
  id: getExerciseId(),
  exerciseName: '',
  exerciseLogType: EExerciseLoggingType.WEIGHT_REP_COUNT,
});

const ExerciseList = ({
  defaultExercises,
}: {
  defaultExercises: TWorkoutExercise[];
}) => {
  const [exercises, setExercises] = useState<TWorkoutExercise[]>(
    defaultExercises.length > 0 ? defaultExercises : [getBaseExercise()]
  );
  const addMoreExercise = () => {
    setExercises((prev) => {
      return [...prev, getBaseExercise()];
    });
  };
  const handleDeleteExercise = (exerciseId: string) => {
    setExercises((prev) => {
      return prev.filter((p) => p.id !== exerciseId);
    });
  };

  return (
    <>
      <VStack gap={0.5}>
        {exercises.map((e, i) => {
          return (
            <Card key={e.id} sx={{ py: 1.25, px: 0.5, height: 'fit-content' }}>
              <Exercise
                exerciseProps={e}
                handleDeleteExercise={
                  i !== 0 ? handleDeleteExercise : undefined
                }
              />
            </Card>
          );
        })}
      </VStack>
      <Button variant='text' onClick={addMoreExercise} startIcon={<Add />}>
        Add new exercise
      </Button>
    </>
  );
};

export default ExerciseList;
