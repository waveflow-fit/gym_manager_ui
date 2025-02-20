import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import { SectionContainer } from '@/components/StyledComponents';

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
  return (
    <SectionContainer sx={{ p: 2, width: 'fit-content' }}>
      <FormControl>
        <InputLabel id='trainer-selector-label'>Name</InputLabel>
        <Select
          labelId='trainer-selector-label'
          id='trainer-selector'
          value='aniketaniketaniketaniketaniket'
          onChange={handleChange}
          input={<OutlinedInput label='Name' />}
          MenuProps={MenuProps}
        >
          {['aniketaniketaniketaniketaniket', 'jatin'].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SectionContainer>
  );
};

export default TrainerSwitcher;
