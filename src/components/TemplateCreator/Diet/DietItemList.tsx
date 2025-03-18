import { Add } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import { useState } from 'react';
import { v4 } from 'uuid';

import { EMealType } from '@/common/constants';
import VStack from '@/components/StyledComponents/VStack';
import DietItem, {
  TDietItem,
} from '@/components/TemplateCreator/Diet/DietItem';
export const getDietId = () => `dietFoodItem-${v4()}`;
const getBaseDiet = () => ({
  id: getDietId(),
  foodItemName: '',
  mealType: EMealType.BREAKFAST,
  isOptional: false,
});

const DietItemList = ({
  defaultDietItems,
}: {
  defaultDietItems: TDietItem[];
}) => {
  const [dietItems, setDietItems] = useState<TDietItem[]>(
    defaultDietItems.length > 0 ? defaultDietItems : [getBaseDiet()]
  );
  const addMoreDietItems = () => {
    setDietItems((prev) => {
      return [...prev, getBaseDiet()];
    });
  };
  const handleDeleteDietItem = (dietId: string) => {
    setDietItems((prev) => {
      return prev.filter((p) => p.id !== dietId);
    });
  };

  return (
    <>
      <VStack gap={0.5}>
        {dietItems.map((e, i) => {
          return (
            <Card key={e.id} sx={{ py: 1.25, px: 0.5, height: 'fit-content' }}>
              <DietItem
                dietItem={e}
                handleDeleteDietItem={
                  i !== 0 ? handleDeleteDietItem : undefined
                }
              />
            </Card>
          );
        })}
      </VStack>
      <Button variant='text' onClick={addMoreDietItems} startIcon={<Add />}>
        Add new diet item
      </Button>
    </>
  );
};

export default DietItemList;
