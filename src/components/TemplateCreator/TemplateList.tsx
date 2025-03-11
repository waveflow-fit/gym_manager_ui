import { Grid2 as Grid, Typography } from '@mui/material';
import { JSX } from 'react';

import HStack from '@/components/StyledComponents/HStack';
import SectionContainer from '@/components/StyledComponents/SectionContainer';

type Props = {
  listName: string;
  creator: () => JSX.Element;
  templateCard: () => JSX.Element;
};

const TemplateList = ({
  listName,
  creator: Creator,
  templateCard: TemplateCard,
}: Props) => {
  return (
    <SectionContainer>
      <HStack justifyContent='space-between' height='8%' pb={1}>
        <Typography variant='h3'>{listName}</Typography>
        <Creator />
      </HStack>
      <Grid
        container
        spacing={2}
        sx={{ overflowY: 'auto', height: '92%', mx: '-0.75rem', px: '0.75rem' }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((e) => (
          <Grid size={3} key={e}>
            <TemplateCard />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default TemplateList;
