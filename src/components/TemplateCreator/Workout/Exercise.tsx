import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import HStack from '@/components/StyledComponents/HStack';
import VStack from '@/components/StyledComponents/VStack';
import { getExerciseId } from '@/components/TemplateCreator/Workout/ExerciseList';
import SuggestedIntensity from '@/components/TemplateCreator/Workout/SuggestedIntensity';

export type TSuggestedIntensity =
  | { reps: number; weight: number; countPerRep: number }
  | { weight: number; time: number }
  | { time: number };
export type TWorkoutExercise = {
  id: string;
  exerciseName: string;
  exerciseLogType: EExerciseLoggingType;
  suggestedIntensity?: TSuggestedIntensity;
  isOptional?: boolean;
  alternateExercise?: Record<string, TWorkoutExercise>;
};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const ExerciseLoggingType = [
  {
    label: 'Yes / No based',
    value: EExerciseLoggingType.BOOLEAN,
  },
  {
    label: 'Rep based',
    value: EExerciseLoggingType.WEIGHT_REP_COUNT,
  },
  {
    label: 'Time and weight based',
    value: EExerciseLoggingType.TIME_WEIGHT,
  },
  {
    label: 'Time based',
    value: EExerciseLoggingType.TIME,
  },
];

const Exercise = ({
  exerciseProps,
  handleDeleteExercise,
  isParentExercise = true,
  prefix = '',
}: {
  exerciseProps: TWorkoutExercise;
  handleDeleteExercise?: (id: string) => void;
  isParentExercise?: boolean;
  prefix?: string;
}) => {
  const [loggingType, setLoggingType] = useState(exerciseProps.exerciseLogType);
  const [altExercise, setAltExercise] = useState<string[]>(
    exerciseProps.alternateExercise
      ? Object.keys(exerciseProps.alternateExercise)
      : []
  );
  return (
    <VStack gap={0.5} height='fit-content !important'>
      <HStack gap={0.5}>
        <TextField
          placeholder='ex: Leg press'
          name={`${prefix}${exerciseProps.id}.exerciseName`}
          required
          sx={{ width: '8rem' }}
          defaultValue={exerciseProps.exerciseName}
        />
        <FormControl>
          <InputLabel id='exercise-logging-type-selector'>
            Logging type
          </InputLabel>
          <Select
            sx={{ width: '8.5rem' }}
            label='Exercise type'
            name={`${prefix}${exerciseProps.id}.exerciseLogType`}
            defaultValue={exerciseProps.exerciseLogType}
            input={
              <OutlinedInput label='Training with' sx={{ height: '45px' }} />
            }
            MenuProps={MenuProps}
            size='small'
            onChange={(e) =>
              setLoggingType(e.target.value as EExerciseLoggingType)
            }
          >
            {ExerciseLoggingType.map((e) => {
              return (
                <MenuItem key={e.value} value={e.value}>
                  {e.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          name={`${prefix}${exerciseProps.id}.isOptional`}
          control={<Checkbox defaultChecked={exerciseProps.isOptional} />}
          label='Optional'
        />
        {handleDeleteExercise && (
          <IconButton onClick={() => handleDeleteExercise?.(exerciseProps?.id)}>
            <Delete />
          </IconButton>
        )}
      </HStack>
      <SuggestedIntensity
        loggingType={loggingType}
        exerciseId={exerciseProps.id}
        defaultValue={exerciseProps.suggestedIntensity}
        prefix={prefix}
      />
      {altExercise.map((e) => {
        return (
          <Box key={e} component='span'>
            <Divider sx={{ my: 1 }}>Or</Divider>
            <VStack gap={0.5}>
              <Exercise
                key={e}
                exerciseProps={
                  exerciseProps.alternateExercise?.[e] || {
                    id: e,
                    exerciseName: '',
                    exerciseLogType: EExerciseLoggingType.BOOLEAN,
                  }
                }
                isParentExercise={false}
                handleDeleteExercise={(deleteId: string) => {
                  setAltExercise((p) => p.filter((id) => id !== deleteId));
                }}
                prefix={`${exerciseProps.id}.alternateExercise.`}
              />
            </VStack>
          </Box>
        );
      })}
      <TextField
        name={`${prefix}${exerciseProps.id}.id`}
        defaultValue={exerciseProps.id}
        sx={{ display: 'none' }}
      />
      {isParentExercise && (
        <Button
          variant='text'
          startIcon={<Add />}
          sx={{ mt: 0.5 }}
          onClick={() => setAltExercise((p) => [...p, getExerciseId()])}
        >
          Add alternate
        </Button>
      )}
    </VStack>
  );
};

export default Exercise;
