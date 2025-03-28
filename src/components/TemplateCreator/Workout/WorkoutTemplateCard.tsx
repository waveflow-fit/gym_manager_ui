'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useMemo } from 'react';

import MaxCharTypography from '@/components/StyledComponents/MaxCharTypography';
import useTemplateDelete from '@/components/TemplateCreator/useTemplateDelete';
const WorkoutTemplateCard = ({
  template,
  removeTemplate,
}: {
  template: ITemplate;
  removeTemplate: (templateId: string) => void;
}) => {
  const { isDeleting, handleDeleteTemplate } = useTemplateDelete({
    removeTemplate,
  });
  const { templateName, numberOfExercises } = useMemo(() => {
    const { template_name: templateName, template: templateJSON } = template;
    const numberOfExercises = templateJSON.workoutExercises?.length || 0;
    return {
      templateName,
      numberOfExercises,
    };
  }, [template]);

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <Box display='flex' justifyContent='space-between' gap={1}>
          <Tooltip title={templateName} placement='top'>
            <MaxCharTypography variant='h6' maxchars={30}>
              {templateName}
            </MaxCharTypography>
          </Tooltip>
          <Chip
            label={`Total exercise: ${numberOfExercises}`}
            sx={{ width: 'fit-content' }}
          />
        </Box>
        <Box display='flex'>
          <IconButton size='small'>
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size='small'
            loading={isDeleting}
            onClick={() => handleDeleteTemplate(template.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkoutTemplateCard;
