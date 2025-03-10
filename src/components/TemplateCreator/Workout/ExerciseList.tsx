import { Button } from '@mui/material';
import { uniqueId } from 'lodash';
import { useCallback, useState } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import VStack from '@/components/StyledComponents/VStack';
import Exercise, {
  TExercise,
} from '@/components/TemplateCreator/Workout/Exercise';
const getBaseExercise = () => ({
  id: uniqueId().toString(),
  name: '',
  loggingType: EExerciseLoggingType.WEIGHT_REP_COUNT,
  suggestedIntensity: null,
});
const ExerciseList = () => {
  const [exercises, setExercises] = useState<TExercise[]>([getBaseExercise()]);
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
  const handleExerciseChange = useCallback((exercise: TExercise) => {
    setExercises((prev) => {
      return prev.map((p) => {
        if (p.id === exercise.id) {
          return exercise;
        }
        return p;
      });
    });
  }, []);

  return (
    <VStack gap={2}>
      <VStack gap={2}>
        {exercises.map((e, i) => {
          return (
            <Exercise
              exerciseProps={e}
              key={e.id}
              handleDeleteExercise={i !== 0 ? handleDeleteExercise : undefined}
              handleExerciseChange={handleExerciseChange}
            />
          );
        })}
      </VStack>
      <Button variant='text' onClick={addMoreExercise}>
        Add new exercise
      </Button>
    </VStack>
  );
};

export default ExerciseList;
