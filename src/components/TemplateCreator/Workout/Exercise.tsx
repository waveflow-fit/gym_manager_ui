import { Delete } from '@mui/icons-material';
import {
  Checkbox,
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
}: {
  exerciseProps: TExercise;
  handleDeleteExercise?: (id: string) => void;
}) => {
  const [loggingType, setLoggingType] = useState(exerciseProps.loggingType);
  return (
    <VStack gap={0.5} height='fit-content !important'>
      <HStack gap={0.5}>
        <TextField
          placeholder='ex: Leg press'
          name={`${exerciseProps.id}.exerciseName`}
          required
          sx={{ width: '8rem' }}
          defaultValue={exerciseProps.name}
        />
        <FormControl>
          <InputLabel id='exercise-logging-type-selector'>
            Logging type
          </InputLabel>
          <Select
            sx={{ width: '10.5rem', minWidth: '8.5rem' }}
            label='Exercise type'
            name={`${exerciseProps.id}.exerciseLogType`}
            defaultValue={exerciseProps.loggingType}
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
          name={`${exerciseProps.id}.isOptional`}
          control={<Checkbox />}
          label='Optional'
        />
        {handleDeleteExercise && (
          <IconButton onClick={() => handleDeleteExercise?.(exerciseProps.id)}>
            <Delete />
          </IconButton>
        )}
      </HStack>
      <SuggestedIntensity
        loggingType={loggingType}
        exerciseId={exerciseProps.id}
      />
    </VStack>
  );
};

export default Exercise;
