'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';

import { api } from '@/common/api.utils';
import { USER_ENDPOINTS } from '@/common/apiEndpoints';
import { convertFormDataToJson } from '@/common/app.utils';
import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import useSession from '@/components/SessionProvider/useSession';
import useToast, { EToastType } from '@/components/Toast/useToast';

const userHealthProfileInitialValues = {
  blood_pressure: '',
  allergies: '',
  weight: '',
  height: '',
  age: '',
  average_sleeping_time: '',
  eating_preference: 'none',
  diabetes: false,
  additional_notes: '',
};

type TUserHealthProfile = typeof userHealthProfileInitialValues;

const UserOnBoarding = () => {
  const { session, fetchSession: refetchSession } = useSession();
  const [open, setOpen] = useState(!session?.role);
  const handleClose = () => setOpen(!open);
  const [userRole, setUserRole] = useState<EUserRole>(EUserRole.TRAINER);
  const router = useRouter();
  const { showToast } = useToast();
  const [formState, formAction, isPending] = useActionState(
    async (prevState: TUserHealthProfile, formData: FormData) => {
      const userHealthProfileValues = {
        ...prevState,
        ...convertFormDataToJson(formData),
        diabetes: formData.get('diabetes') ? true : false,
      };

      try {
        await api.post(USER_ENDPOINTS.USER_SAVE_ONBOARDING_DETAILS, {
          healthInfo: {
            ...userHealthProfileValues,
            weight: Number(userHealthProfileValues.weight),
            height: Number(userHealthProfileValues.height),
            age: Number(userHealthProfileValues.age),
            average_sleeping_time: Number(
              userHealthProfileValues.average_sleeping_time
            ),
          },
          userRole,
        });
        handleClose();
        refetchSession();
        router.push(ROUTE_URLS.dashboard);
        showToast({
          severity: EToastType.SUCCESS,
          message: 'Details saved successfully',
        });
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
      }
      return userHealthProfileValues;
    },
    userHealthProfileInitialValues
  );

  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h1'>Welcome aboard 🎉</Typography>
      <Box
        width={{ xs: '100%', md: '60%' }}
        p={{ xs: 1, sm: 4, md: 6 }}
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <FormControl>
          <FormLabel sx={{ fontWeight: 'bold' }}>
            How you want to use this platform?
          </FormLabel>
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
        </FormControl>

        <form action={formAction} className='flex flex-col gap-4'>
          <FormLabel sx={{ fontWeight: 'bold' }}>
            Fill some basic information
          </FormLabel>
          <Box className='grid grid-cols-2 gap-4'>
            <TextField
              name='blood_pressure'
              label='Blood Pressure (mmHG)'
              fullWidth
              defaultValue={userHealthProfileInitialValues.blood_pressure}
            />
            <TextField
              name='allergies'
              label='Allergies'
              fullWidth
              defaultValue={userHealthProfileInitialValues.allergies}
            />
            <TextField
              name='weight'
              label='Weight (kg)'
              type='number'
              fullWidth
              defaultValue={userHealthProfileInitialValues.weight}
            />
            <TextField
              name='height'
              label='Height (cm)'
              type='number'
              fullWidth
              defaultValue={userHealthProfileInitialValues.height}
            />
            <TextField
              name='age'
              label='Age'
              type='number'
              fullWidth
              defaultValue={userHealthProfileInitialValues.age}
            />
            <TextField
              name='average_sleeping_time'
              label='Avg Sleeping Time (hrs)'
              type='number'
              fullWidth
              defaultValue={
                userHealthProfileInitialValues.average_sleeping_time
              }
            />
            <FormControl fullWidth>
              <InputLabel>Eating Preference</InputLabel>
              <Select
                name='eating_preference'
                defaultValue={userHealthProfileInitialValues.eating_preference}
              >
                <MenuItem value='none'>None</MenuItem>
                <MenuItem value='veg'>Veg</MenuItem>
                <MenuItem value='non-veg'>Non-Veg</MenuItem>
                <MenuItem value='vegan'>Vegan</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox name='diabetes' defaultChecked={formState.diabetes} />
              }
              label='Diabetic'
            />
          </Box>
          <TextField
            name='additional_notes'
            label='Additional Info'
            fullWidth
            defaultValue={userHealthProfileInitialValues.additional_notes}
            multiline
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            loading={isPending}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserOnBoarding;
