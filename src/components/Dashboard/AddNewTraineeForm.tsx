'use client';
import { Button, TextField } from '@mui/material';
import { useActionState, useState } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_ENDPOINTS } from '@/common/apiEndpoints';
import { convertFormDataToJson } from '@/common/app.utils';
import { API_KEYS } from '@/common/constants';
import { useApiRefresher } from '@/components/ApiRefresher';
import useToast, { EToastType } from '@/components/Toast/useToast';
const addNewTraineeInitValues = {
  traineeEmail: '',
};
type TAddNewTrainee = typeof addNewTraineeInitValues;

const AddNewTraineeForm = () => {
  const { showToast } = useToast();
  const [traineeEmailInput, setTraineeEmailInput] = useState('');
  const { refreshApi: refreshPendingInvitesAPI } = useApiRefresher(
    API_KEYS.PENDING_TRAINEE_INVITES_DASHBOARD
  );
  const [_formState, formAction, isPending] = useActionState(
    async (prevState: TAddNewTrainee, formData: FormData) => {
      const updatedFormState = {
        ...prevState,
        ...convertFormDataToJson(formData),
      };
      try {
        const response = await api.post(
          MANAGEMENT_ENDPOINTS.SEND_INVITE,
          updatedFormState
        );
        setTraineeEmailInput('');
        showToast({
          severity: EToastType.SUCCESS,
          message: response.message,
        });
        refreshPendingInvitesAPI();
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
      }
      return updatedFormState;
    },
    addNewTraineeInitValues
  );
  return (
    <form action={formAction} className='flex flex-col gap-3'>
      <TextField
        name='traineeEmail'
        label='Email'
        fullWidth
        type='email'
        value={traineeEmailInput}
        onChange={(e) => setTraineeEmailInput(e.target.value)}
        required
      />
      <Button
        type='submit'
        loading={isPending}
        variant='contained'
        sx={{ width: 'fit-content' }}
        disabled={!traineeEmailInput}
      >
        Invite
      </Button>
    </form>
  );
};

export default AddNewTraineeForm;
