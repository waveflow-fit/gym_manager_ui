'use client';
import { Grid2 as Grid } from '@mui/material';
import { createContext, SetStateAction, useCallback, useState } from 'react';

import AddNewTrainee from '@/components/Dashboard/Widgets/AddNewTraineeWidget/AddNewTrainee';
import ListInvites from '@/components/Dashboard/Widgets/AddNewTraineeWidget/ListInvites';

export const AddNewTraineeWidgetCtx = createContext<{
  invites: IInvite[];
  addNewTraineeInvite: (invite: IInvite) => void;
  deleteTraineeInvite: (inviteId: string) => void;
  setInvites: React.Dispatch<SetStateAction<IInvite[]>>;
}>({
  invites: [],
  addNewTraineeInvite: (_invite) => {
    throw new Error('Function not implemented');
  },
  deleteTraineeInvite: (_inviteId) => {
    throw new Error('Function not implemented');
  },
  setInvites: (_value: SetStateAction<IInvite[]>) => {
    throw new Error('Function not implemented');
  },
});

const AddNewTraineeWidget = () => {
  const [invites, setInvites] = useState<IInvite[]>([]);
  const addNewTraineeInvite = useCallback((invite: IInvite) => {
    setInvites((prevInvites) => [invite, ...prevInvites]);
  }, []);
  const deleteTraineeInvite = useCallback((inviteId: string) => {
    setInvites((prevInvites) =>
      prevInvites.filter(({ id }) => id !== inviteId)
    );
  }, []);
  return (
    <AddNewTraineeWidgetCtx
      value={{ invites, setInvites, addNewTraineeInvite, deleteTraineeInvite }}
    >
      <Grid container height='50%' spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} height='fit-content'>
          <AddNewTrainee />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} height='fit-content'>
          <ListInvites />
        </Grid>
      </Grid>
    </AddNewTraineeWidgetCtx>
  );
};

export default AddNewTraineeWidget;
