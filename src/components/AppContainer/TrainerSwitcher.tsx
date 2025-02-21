import {
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
      width: 250,
    },
  },
};

const TrainerSwitcher = () => {
  const handleChange = console.log;
  const { isAssociationsLoading, associations } = useContext(
    TraineeRelationshipCtx
  );
  if (isAssociationsLoading) return null;
  return (
    <SectionContainer sx={{ p: 2, width: 'fit-content' }}>
      <FormControl>
        <InputLabel id='trainer-selector-label'>Name</InputLabel>
        <Select
          labelId='trainer-selector-label'
          id='trainer-selector'
          value='traineeInvites'
          onChange={handleChange}
          input={<OutlinedInput label='Name' />}
          MenuProps={MenuProps}
        >
          {associations.map((id) => {
            // const { i } = associationsById[inviteId];
            return (
              <MenuItem key={id} value={id}>
                Aniket
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </SectionContainer>
  );
};

export default TrainerSwitcher;
