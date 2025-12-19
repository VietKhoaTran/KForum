import { useState, useMemo, useEffect} from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  AppBar,
  Toolbar,
  Button
} from '@mui/material';
import { Search } from 'lucide-react';
import { useOutletContext } from "react-router-dom";

import TopicList from './TopicList.tsx';
import CreateCard from './CreateCard.tsx';
import useCreateTopic from "../../hooks/topic/useCreateTopic.tsx";
import { Topic, BackendTopic } from '../../types/Forum.tsx';
import { BRAND_PRIMARY, BRAND_PRIMARY_HOVER } from './forum.constants.ts';
import '../Page.css';
import logo from '../../image/logo.png';
import useFetchTopic from '../../hooks/topic/useFetchTopic.tsx';


const ForumPage = () => {
  const { username } = useOutletContext<{ username: string }>();
  const {topics, fetchTopics, loading, error} = useFetchTopic();
  
  useEffect(() => {
    fetchTopics();
  }, []);

  const AllTopics: Topic[] = useMemo(() => {
    if (!topics) return [];
    return topics.map((topic: BackendTopic) => ({
      ID: topic.ID,
      Title: topic.Title,
      Description: topic.Description,
      Label: (topic.CreatedBy === username ? 'created' : 'none') as 'created' | 'none', 
    }));
  }, [topics, username]);

  const [UITopics, setUITopics] = useState<Topic[]>([]);

  useEffect(() => {
    setUITopics(AllTopics);
  }, [AllTopics]);
  
  const PinnedTopics: Topic[] = []

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const { topicCreate } = useCreateTopic();

  const filterTopics = (topics: Topic[]) => {
    const term = searchTerm.toLowerCase();
    return topics.filter(
      t =>
        t.Title.toLowerCase().includes(term) ||
        t.Description.toLowerCase().includes(term)
    );
  };

  const filteredAllTopics = useMemo(() => {
    return filterTopics(UITopics);
  }, [AllTopics, UITopics, searchTerm]);

  const filteredPinnedTopics = useMemo(
    () => filterTopics(PinnedTopics),
    [PinnedTopics, searchTerm]
  );

  const handleCreateSubmit = async (title: string, description: string) => {
    const createdTopic = await topicCreate(title, description);
    const newTopic :Topic= {
      ID: -1,
      Title: createdTopic[0],
      Description: createdTopic[1],
      Label: "created"
    }
    setUITopics(prev => [...prev, newTopic]);
    setCreateDialogOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh' }} className="forum">
      <AppBar sx={{ bgcolor: BRAND_PRIMARY }}>
        <Toolbar>
          <img src={logo} alt="logo" className="logo" />

          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            pt: '70px',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: BRAND_PRIMARY }}>
            Your Pinned Topics
          </Typography>

          <Button
            variant="contained"
            onClick={() => setCreateDialogOpen(true)}
            sx={{
              bgcolor: BRAND_PRIMARY,
              textTransform: 'none',
              borderRadius: '15px',
              px: 2,
              '&:hover': {
                bgcolor: BRAND_PRIMARY_HOVER,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Create a Topic
          </Button>
        </Box>

        <TopicList
          topics={filteredPinnedTopics}
          emptyMessage={ searchTerm ? `No topics found matching "${searchTerm}"` : "none"}
        />

        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: BRAND_PRIMARY, mt: 6, mb: 3 }}
        >
          All Topics
        </Typography>

        <TopicList
          topics={filteredAllTopics}
          emptyMessage={ searchTerm ? `No topics found matching "${searchTerm}"` : "none"}
        />
      </Container>

      <CreateCard
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateSubmit}
      />
    </Box>
  );
};

export default ForumPage;
