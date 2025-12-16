import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, 
    TextField, InputAdornment, AppBar, Toolbar } from '@mui/material';

import { Search } from 'lucide-react';
import { useOutletContext } from "react-router-dom";

import './Page.css'
import logo from '../image/logo.png'

const PRIMARY_COLOR = "#5f5a47";
const PRIMARY_COLOR_HOVER = "#4e4939";

const topics = [
  { id: 1, title: "Artificial Intelligence", description: "Explore the latest developments in AI and machine learning." },
  { id: 2, title: "Blockchain Technology", description: "Discuss the future of decentralized finance and cryptography." },
  { id: 3, title: "Cybersecurity", description: "Stay updated on the latest security threats and solutions." },
  { id: 4, title: "Virtual Reality", description: "Dive into the world of immersive technologies and experiences." }
];

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { username } = useOutletContext<{ username: string }>();

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh'}} className = 'forum'>
      <AppBar sx={{ bgcolor: PRIMARY_COLOR}}>
        <Toolbar>
          <img src= {logo} alt="logo" className='logo' />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Hi, {username}
          </Typography>
          <Box sx={{marginLeft: 'auto'}}>
          <TextField placeholder="Search topics..." className='search'
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color={PRIMARY_COLOR} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: PRIMARY_COLOR, paddingTop: '70px'}}>
          Trending Topics
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className='card'>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="h6">
                  {topic.title}
                </Typography>
                <Typography sx={{ color: PRIMARY_COLOR_HOVER }}>
                  {topic.description}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {filteredTopics.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: PRIMARY_COLOR }}>
                No topics found matching "{searchTerm}"
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Forum;