import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useContext } from 'react';

import { SectionContainer } from '@/components/StyledComponents';
import { TraineeRelationshipCtx } from '@/context/TraineeRelationship';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 280,
    },
  },
};

const TrainerSwitcher = () => {
  const handleChange = console.log;
  const { isAssociationsLoading, associations, associationsById } = useContext(
    TraineeRelationshipCtx
  );
  if (isAssociationsLoading) return <CircularProgress size='30px' />;
  return (
    <SectionContainer
      sx={{
        px: 2,
        py: 1,
        height: '60px',
        width: '180px',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id='trainer-selector-label'>Training with</InputLabel>
        <Select
          labelId='trainer-selector-label'
          id='trainer-selector'
          value='aniket'
          onChange={handleChange}
          input={<OutlinedInput label='Name' sx={{ height: '45px' }} />}
          MenuProps={MenuProps}
          size='small'
        >
          {associations.map((id) => {
            const association = associationsById[id];
            // console.log(association.trainee?.name);
            return (
              <MenuItem key={id} value={id}>
                {association.trainer?.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </SectionContainer>
  );
};

export default TrainerSwitcher;
