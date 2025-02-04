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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { api } from '@/common/api.utils';
import { USER_ENDPOINTS } from '@/common/apiEndpoints';
import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import useSession from '@/components/SessionProvider/useSession';
import useToast, { EToastType } from '@/components/Toast/useToast';

const initialValues = {
  blood_pressure: '',
  allergies: '',
  weight: '',
  height: '',
  age: '',
  average_sleeping_time: '',
  eating_preference: '',
  diabetes: false,
  additional_notes: '',
};

const UserOnBoarding = () => {
  const { session, fetchSession: refetchSession } = useSession();
  const [open, setOpen] = useState(!session?.role);
  const handleClose = () => setOpen(!open);
  const [userRole, setUserRole] = useState<EUserRole>(EUserRole.TRAINER);
  const [isSavingUserOnboardingDetails, setIsSavingUserOnBoardingDetails] =
    useState(false);
  const router = useRouter();

  const [formValues, setFormValues] = useState(initialValues);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevState) => {
      const updatedValues = {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      };

      return updatedValues;
    });
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setIsSavingUserOnBoardingDetails(true);
      await api.post(USER_ENDPOINTS.USER_SAVE_ONBOARDING_DETAILS, {
        healthInfo: {
          ...formValues,
          weight: Number(formValues.weight),
          height: Number(formValues.height),
          age: Number(formValues.age),
          average_sleeping_time: Number(formValues.average_sleeping_time),
        },
        userRole,
      });
      handleClose();
      refetchSession();
      router.push(ROUTE_URLS.dashboard);
      showToast({
        severity: EToastType.ERROR,
        message: 'Details saved successfully',
      });
    } catch (e: any) {
      showToast({ severity: EToastType.ERROR, message: e.message });
    } finally {
      setIsSavingUserOnBoardingDetails(false);
    }
  }

  return (
    <Dialog open={open}>
      <DialogTitle>
        {userRole === EUserRole.TRAINEE
          ? 'Basic information'
          : 'How you want to use this platform?'}
      </DialogTitle>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
        <RadioGroup
          row
          value={userRole}
          onChange={(e) => setUserRole(e.target.value as EUserRole)}
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

        {userRole === EUserRole.TRAINEE && (
          <>
            <Box className='grid grid-cols-2 gap-4'>
              <TextField
                name='blood_pressure'
                label='Blood Pressure (mmHG)'
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
            <TextField
              name='additional_notes'
              label='Additional Info'
              fullWidth
              value={formValues.additional_notes}
              onChange={handleChange}
              multiline
            />
          </>
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          loading={isSavingUserOnboardingDetails}
        >
          Submit
        </Button>
      </form>
    </Dialog>
  );
};

export default UserOnBoarding;
