import { InputAdornment, TextField } from '@mui/material';
import { useMemo } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import HStack from '@/components/StyledComponents/HStack';

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
      <HStack key={loggingType} gap={0.5}>
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
    );
  }
  return null;
};

export default SuggestedIntensity;
