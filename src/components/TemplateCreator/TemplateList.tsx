'use client';

import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { JSX, useEffect, useState } from 'react';

import { api } from '@/common/api.utils';
import { TEMPLATE_CREATOR_ENDPOINTS } from '@/common/apiEndpoints';
import { ETemplateType } from '@/common/constants';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import SearchByText from '@/components/Search/SearchByText';
import HStack from '@/components/StyledComponents/HStack';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import useToast, { EToastType } from '@/components/Toast/useToast';
import useDebounceInput from '@/hooks/useDebounceInput';

type Props = {
  listName: string;
  creator: () => JSX.Element;
  templateCard: () => JSX.Element;
  templateType: ETemplateType;
};

const TemplateList = ({
  listName,
  creator: Creator,
  templateCard: TemplateCard,
  templateType,
}: Props) => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(true);
  const [isError, setIsError] = useState(false);
  const { showToast } = useToast();
  const { searchText, setInputVal, inputVal } = useDebounceInput();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsFetchingTemplates(true);
        setIsError(false);
        const response = await api.post(
          TEMPLATE_CREATOR_ENDPOINTS.GET_ALL_TEMPLATES,
          {
            filters: {
              ...(searchText ? { template_name: searchText } : {}),
              template_type: templateType,
            },
          }
        );
        setTemplates(response.data);
      } catch (e: any) {
        setIsError(true);
        showToast({
          message: e.message,
          severity: EToastType.ERROR,
        });
      } finally {
        setIsFetchingTemplates(false);
      }
    };
    fetchTemplates();
  }, [searchText, showToast, templateType]);

  return (
    <SectionContainer sx={{ py: 1 }}>
      <HStack justifyContent='space-between' pb={0.5}>
        <Typography variant='h3'>{listName}</Typography>
        <Box display='flex' gap={1}>
          <SearchByText
            placeholder='Template name'
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onClearIconClick={() => setInputVal('')}
          />
          <Creator />
        </Box>
      </HStack>
      <Grid
        container
        spacing={1}
        sx={{ overflowY: 'auto', height: '92%', mx: '-0.75rem', px: '0.75rem' }}
      >
        <DynamicRenderer
          isLoading={isFetchingTemplates}
          isError={isError}
          isNoResultFound={!isFetchingTemplates && templates.length === 0}
        >
          {templates.map((template) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              key={template.id}
            >
              <TemplateCard />
            </Grid>
          ))}
        </DynamicRenderer>
      </Grid>
    </SectionContainer>
  );
};

export default TemplateList;
