'use client';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import { EUserRole } from '@/common/constants';
import useSession from '@/components/SessionProvider/useSession';

const initialValues = {
  blood_pressure: '',
  allergies: '',
  weight: '',
  height: '',
  age: '',
  average_sleeping_time: '',
  eating_preference: '',
  diabetes: false,
};

const UserOnBoarding = () => {
  const { session, fetchSession } = useSession();
  const [open, setOpen] = useState(!session?.role);
  const handleClose = () => setOpen(!open);
  const [role, setRole] = useState<EUserRole>(EUserRole.TRAINER);
  const { pending } = useFormStatus();

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log('Updated State:', formValues);
    // Here, you can proceed with the form submission
    handleClose();
    fetchSession();
  }

  return (
    <Dialog open={open}>
      <DialogTitle>
        {role === EUserRole.TRAINEE
          ? 'Basic information'
          : 'How you want to use this platform?'}
      </DialogTitle>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
        <RadioGroup
          row
          value={role}
          onChange={(e) => setRole(e.target.value as EUserRole)}
        >
          <FormControlLabel
            value={EUserRole.TRAINER}
            control={<Radio />}
            label='As Trainer'
          />
          <FormControlLabel
            value={EUserRole.TRAINEE}
            control={<Radio />}
            label='As Trainee'
          />
        </RadioGroup>

        {role === EUserRole.TRAINEE && (
          <Box className='grid grid-cols-2 gap-4'>
            <TextField
              name='blood_pressure'
              label='Blood Pressure'
              fullWidth
              value={formValues.blood_pressure}
              onChange={handleChange}
            />
            <TextField
              name='allergies'
              label='Allergies'
              fullWidth
              value={formValues.allergies}
              onChange={handleChange}
            />
            <TextField
              name='weight'
              label='Weight (kg)'
              type='number'
              fullWidth
              value={formValues.weight}
              onChange={handleChange}
            />
            <TextField
              name='height'
              label='Height (cm)'
              type='number'
              fullWidth
              value={formValues.height}
              onChange={handleChange}
            />
            <TextField
              name='age'
              label='Age'
              type='number'
              fullWidth
              value={formValues.age}
              onChange={handleChange}
            />
            <TextField
              name='average_sleeping_time'
              label='Avg Sleeping Time (hrs)'
              type='number'
              fullWidth
              value={formValues.average_sleeping_time}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Eating Preference</InputLabel>
              <Select
                name='eating_preference'
                value={formValues.eating_preference}
                onChange={
                  handleChange as (e: SelectChangeEvent<string>) => void
                }
              >
                <MenuItem value='veg'>Veg</MenuItem>
                <MenuItem value='non-veg'>Non-Veg</MenuItem>
                <MenuItem value='vegan'>Vegan</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name='diabetes'
                  checked={formValues.diabetes}
                  onChange={handleChange}
                />
              }
              label='Diabetic'
            />
          </Box>
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Dialog>
  );
};

export default UserOnBoarding;
