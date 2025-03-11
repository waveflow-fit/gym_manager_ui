import { InputAdornment, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import HStack from '@/components/StyledComponents/HStack';
import VStack from '@/components/StyledComponents/VStack';

const SuggestedIntensity = ({
  loggingType,
  exerciseId,
}: {
  exerciseId: string;
  loggingType: EExerciseLoggingType;
}) => {
  const loggingFields = useMemo(
    () => ({
      [EExerciseLoggingType.WEIGHT_REP_COUNT]: [
        { name: `${exerciseId}.suggestedIntensity.reps`, label: 'Reps' },
        { name: `${exerciseId}.suggestedIntensity.weight`, label: 'kg' },
        {
          name: `${exerciseId}.suggestedIntensity.countPerRep`,
          label: 'Count',
        },
      ],
      [EExerciseLoggingType.TIME_WEIGHT]: [
        { name: `${exerciseId}.suggestedIntensity.weight`, label: 'kg' },
        { name: `${exerciseId}.suggestedIntensity.time`, label: 'mins' },
      ],
      [EExerciseLoggingType.TIME]: [
        { name: `${exerciseId}.suggestedIntensity.time`, label: 'mins' },
      ],
    }),
    [exerciseId]
  );
  if (loggingType in loggingFields) {
    return (
      <VStack gap={0.5} height='fit-content'>
        <Typography variant='subtitle2'>Suggested intensity</Typography>
        <HStack key={loggingType} gap={0.5} height='fit-content'>
          {loggingFields[loggingType].map(({ name, label }) => (
            <TextField
              key={name}
              type='number'
              required
              name={name}
              sx={{ width: '16ch' }}
              slotProps={{
                input: {
                  inputProps: { min: 1 },
                  endAdornment: (
                    <InputAdornment position='end'>{label}</InputAdornment>
                  ),
                },
              }}
            />
          ))}
        </HStack>
      </VStack>
    );
  }
  return null;
};

export default SuggestedIntensity;
