import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  InputAdornment, 
  AppBar, 
  Toolbar, 
  Button,
  Card,
  CardContent,
  Chip,
  Divider
} from '@mui/material';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BRAND_PRIMARY, BRAND_PRIMARY_HOVER, STATUS_JOINED } from '../ForumPage/forum.constants.ts';
import '../Page.css';
import logo from '../../image/logo.png';

interface Post {
  id: number;
  title: string;
  description: string;
  status: string;
}

const TopicDetailPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - replace with actual data from route/context
  const topic = {
    id: 1,
    title: "Artificial Intelligence",
    description: "Explore the latest developments in AI and machine learning.",
    label: "created"
  };

  const posts: Post[] = [
    { id: 1, title: "Post 1", description: "Discussion about AI developments", status: "Active" },
    { id: 2, title: "Post 2", description: "Machine learning best practices", status: "Active" },
    { id: 3, title: "Post 3", description: "Neural networks and deep learning", status: "Active" },
  ];

  const handleBack = () => {
    navigate('/forum');
  };

  const handleCreatePost = () => {
    // TODO: Implement post creation
    console.log('Create post');
  };

  const handleEditTopic = () => {
    // TODO: Implement topic editing
    console.log('Edit topic');
  };

  const handleDeleteTopic = () => {
    // TODO: Implement topic deletion
    console.log('Delete topic');
  };

  const handlePostClick = (postId: number) => {
    // TODO: Navigate to post detail
    console.log('Navigate to post:', postId);
  };

  return (
    <Box sx={{ minHeight: '100vh' }} className="forum">
      <AppBar sx={{ bgcolor: BRAND_PRIMARY }}>
        <Toolbar>
          <img src={logo} alt="logo" className="logo" />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Hi, Khoa
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
        <Box sx={{ paddingTop: '70px' }}>
          <Button
            startIcon={<ArrowLeft size={20} />}
            onClick={handleBack}
            sx={{
              color: BRAND_PRIMARY,
              textTransform: 'none',
              fontSize: '16px',
              mb: 3,
              '&:hover': {
                bgcolor: 'transparent',
                color: BRAND_PRIMARY_HOVER,
              },
            }}
          >
            Back to Topics
          </Button>

          <Divider sx={{ mb: 3 }} />

          <Card
            className="card"
            sx={{
              mb: 3,
              borderLeft: `4px solid ${BRAND_PRIMARY}`,
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
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {topic.title}
                </Typography>
                <Typography sx={{ color: BRAND_PRIMARY }}>
                  {topic.description}
                </Typography>
              </Box>

              <Chip
                label={topic.label}
                sx={{
                  color: BRAND_PRIMARY,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  minWidth: '80px',
                }}
              />
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              onClick={handleCreatePost}
              sx={{
                bgcolor: BRAND_PRIMARY,
                '&:hover': {
                  bgcolor: BRAND_PRIMARY_HOVER,
                  transform: 'translateY(-2px)',
                },
                textTransform: 'none',
                borderRadius: '15px',
                padding: '10px 20px',
              }}
            >
              Create Post
            </Button>
            <Button
              variant="contained"
              onClick={handleEditTopic}
              sx={{
                bgcolor: BRAND_PRIMARY,
                '&:hover': {
                  bgcolor: BRAND_PRIMARY_HOVER,
                  transform: 'translateY(-2px)',
                },
                textTransform: 'none',
                borderRadius: '15px',
                padding: '10px 20px',
              }}
            >
              Edit Topic
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteTopic}
              sx={{
                bgcolor: BRAND_PRIMARY,
                '&:hover': {
                  bgcolor: BRAND_PRIMARY_HOVER,
                  transform: 'translateY(-2px)',
                },
                textTransform: 'none',
                borderRadius: '15px',
                padding: '10px 20px',
              }}
            >
              Delete
            </Button>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 'bold', color: BRAND_PRIMARY, mb: 3 }}>
            Posts
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts.map(post => (
              <Card
                key={post.id}
                className="card"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    borderLeft: `4px solid ${BRAND_PRIMARY}`,
                  },
                }}
                onClick={() => handlePostClick(post.id)}
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
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {post.title}
                    </Typography>
                    <Typography sx={{ color: BRAND_PRIMARY }}>
                      {post.description}
                    </Typography>
                  </Box>

                  <Chip
                    label={post.status}
                    sx={{
                      color: '#666',
                      fontWeight: 500,
                      minWidth: '80px',
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TopicDetailPage;