import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import { EMealType } from '@/common/constants';
import HStack from '@/components/StyledComponents/HStack';
import VStack from '@/components/StyledComponents/VStack';
import { getDietId } from '@/components/TemplateCreator/Diet/DietItemList';

export type TDietItem = {
  id: string;
  foodItemName: string;
  mealType: EMealType;
  isOptional?: boolean;
  alternateFoodItems?: Record<string, TAltDietItem>;
};

export type TAltDietItem = Omit<TDietItem, 'mealType'>;

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const DietItemLogType = [
  {
    label: 'Breakfast',
    value: EMealType.BREAKFAST,
  },
  {
    label: 'Post breakfast',
    value: EMealType.POST_BREAKFAST,
  },
  {
    label: 'Lunch',
    value: EMealType.LUNCH,
  },
  {
    label: 'Evening snacks',
    value: EMealType.EVENING_SNACKS,
  },
  {
    label: 'Dinner',
    value: EMealType.DINNER,
  },
  {
    label: 'Post dinner',
    value: EMealType.POST_DINNER,
  },
  {
    label: 'Munching',
    value: EMealType.MUNCHING,
  },
];

const DietItem = ({
  dietItem,
  handleDeleteDietItem,
  isParentDiet = true,
  prefix = '',
}: {
  dietItem: TAltDietItem;
  handleDeleteDietItem?: (id: string) => void;
  isParentDiet?: boolean;
  prefix?: string;
}) => {
  const [_mealType, setMealType] = useState((dietItem as TDietItem).mealType);
  const [altFoodItem, setAltFoodItem] = useState<string[]>(
    dietItem.alternateFoodItems ? Object.keys(dietItem.alternateFoodItems) : []
  );
  return (
    <VStack gap={0.5} height='fit-content !important'>
      <HStack gap={0.5}>
        <TextField
          placeholder='ex: Oat meal'
          name={`${prefix}${dietItem.id}.foodItemName`}
          required
          sx={{ minWidth: '10rem', maxWidth: '12rem' }}
          defaultValue={dietItem.foodItemName}
        />
        {isParentDiet && (
          <FormControl>
            <InputLabel id='diet-type-selector'>Meal type</InputLabel>
            <Select
              sx={{ width: { xs: '6.5rem', sm: '10.5rem' } }}
              label='Logging type'
              name={`${prefix}${dietItem.id}.mealType`}
              defaultValue={(dietItem as TDietItem).mealType}
              input={<OutlinedInput label='Meal type' />}
              MenuProps={MenuProps}
              size='small'
              onChange={(e) => setMealType(e.target.value as EMealType)}
            >
              {DietItemLogType.map((e) => {
                return (
                  <MenuItem key={e.value} value={e.value}>
                    {e.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        <FormControlLabel
          name={`${prefix}${dietItem.id}.isOptional`}
          control={<Checkbox defaultChecked={dietItem.isOptional} />}
          label='Optional'
        />
        {handleDeleteDietItem && (
          <IconButton onClick={() => handleDeleteDietItem?.(dietItem?.id)}>
            <Delete />
          </IconButton>
        )}
      </HStack>

      {altFoodItem.map((e) => {
        return (
          <Box key={e} component='span'>
            <Divider sx={{ my: 1 }}>Or</Divider>
            <VStack gap={0.5}>
              <DietItem
                key={e}
                dietItem={
                  dietItem.alternateFoodItems?.[e] || {
                    id: e,
                    foodItemName: '',
                  }
                }
                isParentDiet={false}
                handleDeleteDietItem={(deleteId: string) => {
                  setAltFoodItem((p) => p.filter((id) => id !== deleteId));
                }}
                prefix={`${dietItem.id}.alternateFoodItems.`}
              />
            </VStack>
          </Box>
        );
      })}
      <TextField
        name={`${prefix}${dietItem.id}.id`}
        defaultValue={dietItem.id}
        sx={{ display: 'none' }}
      />
      {isParentDiet && (
        <Button
          variant='text'
          startIcon={<Add />}
          sx={{ mt: 0.5 }}
          onClick={() => setAltFoodItem((p) => [...p, getDietId()])}
        >
          Add alternate
        </Button>
      )}
    </VStack>
  );
};

export default DietItem;
