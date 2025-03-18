'use client';
import Add from '@mui/icons-material/Add';
import { Button, Drawer, TextField } from '@mui/material';
import { useState } from 'react';

import {
  createNestedObject,
  groupByPrefix,
  replaceKeyValue,
} from '@/common/app.utils';
import DrawerActionButtons from '@/components/StyledComponents/Drawer/DrawerActionButtons';
import DrawerContent from '@/components/StyledComponents/Drawer/DrawerContent';
import DrawerHeader from '@/components/StyledComponents/Drawer/DrawerHeader';
import VStack from '@/components/StyledComponents/VStack';
import { TDietItem } from '@/components/TemplateCreator/Diet/DietItem';
import DietItemList from '@/components/TemplateCreator/Diet/DietItemList';

export type TDietPlan = {
  dietName: string;
  dietFoodItem: TDietItem[];
};

const DietCreator = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => setIsDialogOpen(false);
  const handleOpen = () => setIsDialogOpen(true);
  const [dietPlan, setDietPlan] = useState<TDietPlan>({
    dietName: '',
    dietFoodItem: [],
  });
  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen}>
        Create new diet
      </Button>
      <Drawer
        anchor='right'
        open={isDialogOpen}
        onClose={handleClose}
        component='form'
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = event.currentTarget as HTMLFormElement;

          const formData = new FormData(form);
          const values = createNestedObject(
            Object.fromEntries(formData.entries())
          );
          const dietPlan = replaceKeyValue(
            groupByPrefix(values, 'dietFoodItem'),
            'isOptional',
            'on',
            true
          ) as TDietPlan;
          setDietPlan(dietPlan);
        }}
      >
        <DrawerHeader handleClose={handleClose}>Create diet</DrawerHeader>
        <DrawerContent
          containerProps={{
            sx: { width: '36rem', overflowY: 'auto', m: '-1rem', p: '1rem' },
          }}
        >
          <VStack height='100%' gap={1}>
            <TextField
              name='dietName'
              placeholder='ex: Veg diet for cutting'
              sx={{ maxWidth: '16.5rem' }}
              required
              defaultValue={dietPlan.dietName}
            />
            <DietItemList defaultDietItems={dietPlan.dietFoodItem} />
          </VStack>
        </DrawerContent>
        <DrawerActionButtons>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit'>Save</Button>
        </DrawerActionButtons>
      </Drawer>
    </>
  );
};

export default DietCreator;
