import { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, AppBar, Toolbar, Button } from '@mui/material';
import { Search } from 'lucide-react';
import { useOutletContext } from "react-router-dom";

import TopicList from './TopicList.tsx';
// import { Topic } from './forum.types.ts';
import {Topic} from '../../types/Forum.tsx'
import { BRAND_PRIMARY, BRAND_PRIMARY_HOVER } from './forum.constants.ts';
import '../Page.css';
import logo from '../../image/logo.png';

//mock data

const pinnedTopics: Topic[] = [
  { id: 1, title: "Artificial Intelligence", description: "Explore the latest developments in AI and machine learning.", label: "created"},
  { id: 2, title: "Blockchain Technology", description: "Discuss the future of decentralized finance and cryptography.", label: "joined"},
  { id: 3, title: "Cybersecurity", description: "Stay updated on the latest security threats and solutions.", label: "joined"},
];

const trendingTopics: Topic[] = [
  { id: 4, title: "Virtual Reality", description: "Dive into the world of immersive technologies and experiences.", label: "trending"}
];

//end mock data

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { username } = useOutletContext<{ username: string }>();

  const filteredPinnedTopics = pinnedTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrendingTopics = trendingTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    // TODO: Implement topic creation
  };

  return (
    <Box sx={{ minHeight: '100vh' }} className="forum">
      <AppBar sx={{ bgcolor: BRAND_PRIMARY }}>
        <Toolbar>
          <img src={logo} alt="logo" className="logo" />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Hi, {username}
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <TextField 
              placeholder="Search topics..." 
              className="search"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color={BRAND_PRIMARY} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, paddingTop: '70px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: BRAND_PRIMARY }}>
            Your Pinned Topics
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleCreate}
            sx={{ 
              bgcolor: BRAND_PRIMARY,
              '&:hover': {
                bgcolor: BRAND_PRIMARY_HOVER,
                transform: 'translateY(-2px)',
              },
              textTransform: 'none',
              borderRadius: '15px',
              padding: '10px 10px'
            }}
          >
            Create a Topic
          </Button>
        </Box>

        <TopicList 
          topics={filteredPinnedTopics} 
          emptyMessage={`No topics found matching "${searchTerm}"`}
        />

        <Typography variant="h4" sx={{ fontWeight: 'bold', color: BRAND_PRIMARY, mt: 6, mb: 3 }}>
          Trending Topics
        </Typography>

        <TopicList 
          topics={filteredTrendingTopics} 
          emptyMessage={`No topics found matching "${searchTerm}"`}
        />
      </Container>
    </Box>
  );
};

export default Forum;