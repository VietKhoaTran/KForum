import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { LABEL_COLORS, BRAND_PRIMARY } from './forum.constants.ts';
import { Topic } from './forum.types.ts';

interface Props {
  topic: Topic;
}

const TopicCard = ({ topic }: Props) => {
  return (
    <Card
      className="card"
      sx={{
        '&:hover': {
          borderLeft: `4px solid ${LABEL_COLORS[topic.label]}`,
        },
      }}
    >
      <CardContent
        sx={{
          py: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h6">{topic.title}</Typography>
          <Typography sx={{ color: BRAND_PRIMARY }}>
            {topic.description}
          </Typography>
        </Box>

        <Chip
          label={topic.label}
          sx={{
            color: LABEL_COLORS[topic.label],
            fontWeight: 'bold',
            textTransform: 'capitalize',
            minWidth: '80px',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TopicCard;
