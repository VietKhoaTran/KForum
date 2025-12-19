import { Box, Typography } from '@mui/material';
import TopicCard from './TopicCard.tsx';
import {Topic} from '../../types/Forum.tsx'
import { BRAND_PRIMARY } from './forum.constants.ts';

interface Props {
  topics: Topic[];
  emptyMessage?: string;
}

const TopicList = ({ topics, emptyMessage }: Props) => {
  // if (emptyMessage == "none") {
  //   return (
  //     <Box sx={{ py: 1 }}>
  //       <Typography variant="h6" sx={{ color: BRAND_PRIMARY }}>
  //         No Topics Yet
  //       </Typography>
  //     </Box>
  //   );
  // }
  if (topics.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: BRAND_PRIMARY }}>
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {topics.map(topic => (
        <TopicCard key={topic.ID} topic={topic} />
      ))}
    </Box>
  );
};

export default TopicList;
