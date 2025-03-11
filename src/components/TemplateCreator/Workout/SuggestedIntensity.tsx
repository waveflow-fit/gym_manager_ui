import { InputAdornment, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import HStack from '@/components/StyledComponents/HStack';
import VStack from '@/components/StyledComponents/VStack';
import { TSuggestedIntensity } from '@/components/TemplateCreator/Workout/Exercise';

const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  e.target.value = /^\d*[smh]?$/.test(val) ? val : val.slice(0, -1);
};
const timeInput = {
  name: 'time',
  placeholder: 'ex: 30s 10m 1h',
  onChange: handleTimeInput,
};
const SuggestedIntensity = ({
  loggingType,
  exerciseId,
  defaultValue,
}: {
  exerciseId: string;
  loggingType: EExerciseLoggingType;
  defaultValue?: TSuggestedIntensity;
}) => {
  const loggingFields = useMemo(
    () => ({
      [EExerciseLoggingType.WEIGHT_REP_COUNT]: [
        { name: 'reps', label: 'Reps' },
        { name: 'weight', label: 'kg' },
        { name: 'countPerRep', label: 'Count' },
      ],
      [EExerciseLoggingType.TIME_WEIGHT]: [
        { name: 'weight', label: 'kg' },
        { ...timeInput },
      ],
      [EExerciseLoggingType.TIME]: [{ ...timeInput }],
    }),
    []
  );

  return loggingType in loggingFields ? (
    <VStack gap={0.5}>
      <Typography variant='subtitle2'>Suggested intensity</Typography>
      <HStack gap={0.5}>
        {loggingFields[loggingType].map(({ name, label, ...rest }) => (
          <TextField
            key={name}
            name={`${exerciseId}.suggestedIntensity.${name}`}
            defaultValue={defaultValue?.[name] || ''}
            sx={{ width: '16ch' }}
            {...rest}
            type={rest.placeholder ? 'string' : 'number'}
            slotProps={{
              input: {
                inputProps: { min: 1 },
                endAdornment: label && (
                  <InputAdornment position='end'>{label}</InputAdornment>
                ),
              },
            }}
          />
        ))}
      </HStack>
    </VStack>
  ) : null;
};

export default SuggestedIntensity;
