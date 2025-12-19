import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { LABEL_COLORS, BRAND_PRIMARY } from './forum.constants.ts';
import {Topic} from '../../types/Forum.tsx'

import PushPinIcon from '@mui/icons-material/PushPin';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  topic: Topic;
}

const TopicCard = ({ topic }: Props) => {
  return (
    <Card
      className="card"
      sx={{
        position: 'relative',
        '&:hover': {
          borderLeft: `4px solid ${LABEL_COLORS[topic.Label]}`,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          display: 'flex',
          gap: 1,
        }}
      >
        
        <PushPinIcon sx={{ 
          color: LABEL_COLORS[topic.Label],
          padding: 0.3,
          '&:hover': {
            backgroundColor: '#d29f8eff',
            borderRadius: '50%'
          }
        }} />
        {/* should check where to put the delete/update */}
        {(topic.Label === 'created') && <CloseIcon sx={{ 
          color: LABEL_COLORS[topic.Label],
          padding: 0.2,
          '&:hover': {
            backgroundColor: '#d29f8eff',
            borderRadius: '50%'
          }
        }} />} 
      </Box>

      <CardContent
        sx={{
          py: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h6">{topic.Title}</Typography>
          <Typography sx={{ color: BRAND_PRIMARY }}>
            {topic.Description}
          </Typography>
        </Box>
        {topic.Label !== "none" && (
          <Chip
            label={topic.Label}
            sx={{
              color: LABEL_COLORS[topic.Label],
              fontWeight: 'bold',
              textTransform: 'capitalize',
              minWidth: '80px',
            }}
          />
        )}

      </CardContent>
    </Card>
  );
};

export default TopicCard;
