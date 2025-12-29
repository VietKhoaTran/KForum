import { Card, CardContent, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

interface ReplyProps {
  onReply: (reply: string) => void;
}

const ReplyInputCard = ({onReply}: ReplyProps) => {
  const [reply, setReply] = useState<string>('');
  
  const handleSubmit = () => {
    if (reply.trim()) {
      onReply(reply);
      setReply('');
    }
  }

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 1,
        borderLeft: '3px solid #AE887B',
        bgcolor: 'transparent',
      }}
    >
      <CardContent>
        <TextField
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          fullWidth
          multiline
          placeholder="Write a reply..."
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#AE887B',
              },
              '&:hover fieldset': {
                borderColor: '#955d14ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#955d14ff',
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button 
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#AE887B',
              color: 'white',
              textTransform: 'none',
              '&:hover': { bgcolor: '#955d14ff' },
            }}
          >
            Reply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReplyInputCard;