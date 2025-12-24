import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Post } from '../../types/Post';
import { BRAND_PRIMARY } from '../ForumPage/forum.constants.ts';

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
}

const PostCard = ({ post, onLike }: PostCardProps) => {
  const handleLike = () => {
    onLike(post.ID);
  }

  return (
    <Card 
      sx={{ 
        mb: 2.5,
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          cursor: 'pointer'
        }
      }}
    >
      <Box sx={{ height: 4, bgcolor: BRAND_PRIMARY }} />
      
      <CardContent sx={{ py: 3, px: 3 }}>
        <Typography 
          sx={{
            color: '#955d14ff',
            mb: 1,
            fontWeight: 600,
          }}
        >
          K/{post.CreatedBy}
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            fontWeight: 600,
            color: BRAND_PRIMARY
          }}
        >
          {post.Title}
        </Typography>
        
        <Typography sx={{ color: BRAND_PRIMARY, mb: 2 }}>
          {post.Details}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton 
              size="small" 
              sx={{ 
                color: '#666',
                '&:hover': { color: BRAND_PRIMARY }
              }}
              onClick={handleLike}
            >
              {post.Liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderOutlinedIcon fontSize="small" />}
            </IconButton>
            <Typography sx={{ color: BRAND_PRIMARY, fontSize: '0.9rem' }}>
              {post.NoLikes}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton 
              size="small" 
              sx={{ 
                color: '#666',
                '&:hover': { color: BRAND_PRIMARY }
              }}
            >
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ color: BRAND_PRIMARY, fontSize: '0.9rem' }}>
              {post.NoComments}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;