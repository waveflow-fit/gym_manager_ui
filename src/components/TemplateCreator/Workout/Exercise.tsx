import { Delete } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import HStack from '@/components/StyledComponents/HStack';
import SuggestedIntensity from '@/components/TemplateCreator/Workout/SuggestedIntensity';

export type TSuggestedValue = null | Record<string, number | string>;
export type TExercise = {
  id: string;
  name: string;
  loggingType: EExerciseLoggingType;
  suggestedIntensity: TSuggestedValue;
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
  handleExerciseChange,
}: {
  exerciseProps: TExercise;
  handleDeleteExercise?: (id: string) => void;
  handleExerciseChange: (exercise: TExercise) => void;
}) => {
  const [exerciseValue, setExerciseValue] = useState<TExercise>(exerciseProps);

  useEffect(() => {
    handleExerciseChange(exerciseValue);
  }, [exerciseValue, handleExerciseChange]);
  return (
    <HStack alignItems='center' gap={1} position='relative'>
      <IconButton
        disabled={!handleDeleteExercise}
        onClick={() => handleDeleteExercise?.(exerciseValue.id)}
      >
        <Delete />
      </IconButton>
      <TextField
        placeholder='ex: Leg press'
        name={`${exerciseProps.id}.exerciseName`}
        required
        onChange={(e) => {
          setExerciseValue({ ...exerciseValue, name: e.target.value });
        }}
      />
      <FormControl>
        <InputLabel id='exercise-logging-type-selector'>
          Logging type
        </InputLabel>
        <HStack alignItems='center' gap={1}>
          <Select
            sx={{ maxWidth: '13.5rem', minWidth: '8.5rem' }}
            label='Exercise type'
            value={exerciseValue.loggingType}
            name={`${exerciseProps.id}.exerciseLogType`}
            onChange={(e) => {
              setExerciseValue({
                ...exerciseValue,
                loggingType: e.target.value as EExerciseLoggingType,
              });
            }}
            defaultValue={EExerciseLoggingType.BOOLEAN}
            input={
              <OutlinedInput label='Training with' sx={{ height: '45px' }} />
            }
            MenuProps={MenuProps}
            size='small'
          >
            {ExerciseLoggingType.map((e) => {
              return (
                <MenuItem key={e.value} value={e.value}>
                  {e.label}
                </MenuItem>
              );
            })}
          </Select>
          <SuggestedIntensity
            loggingType={exerciseValue.loggingType}
            exerciseId={exerciseProps.id}
          />
        </HStack>
      </FormControl>
    </HStack>
  );
};

export default Exercise;
