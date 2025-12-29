import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import {useOutletContext } from 'react-router-dom';

import Action from './Action.tsx';
import {Comment} from '../../types/Comment.tsx'
import EditIcon from '@mui/icons-material/Edit';
import EditCommment from './EditComment.tsx';
import { useState, useEffect } from 'react';
import { timeAgo } from '../../utils/TimeAgo.tsx';
import ReplyInputCard from './ReplyInputCard.tsx';
import useFetchReply from '../../hooks/comment/useFetchReply.tsx';

interface CommentCardProps {
  comment: Comment;
  onLike: (ID: number) => void;
  onReply: (commentID: number, reply: string) => void;
  onSave: (ID: number, newComment: string) => void;
  onDelete: (commentID: number) => void;
}

const CommentCard = ({ comment, onLike, onReply, onSave, onDelete }: CommentCardProps) => {
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [openReply, setOpenReply] = useState<boolean>(false);

  const {replies, fetchReplies} = useFetchReply();
  const [localReplies, setLocalReplies] = useState<Comment[]>([]);

  useEffect(() => {
    fetchReplies(comment.ID);
  }, [comment])

  useEffect(() => {
    if(replies) {
      setLocalReplies(replies);
    }
  }, [replies])

  const handleUpdate = (newComment: string) => {
    onSave(comment.ID, newComment);
    setCreateDialogOpen(false); 
  }

  const handleLike = () => {
    onLike(comment.ID)
  }

  const HandleComment = () => {
    
    setOpenReply(!openReply);
  }

  const handleReply = (reply: string) => {
    onReply(comment.ID, reply);
  }

  const { username } = useOutletContext<{ username: string }>();
  return (
    <Box>
      <Card
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: 2,
          borderLeft: '3px solid #AE887B',
          bgcolor: 'transparent',
        }}
      >
        <CardContent sx={{ px: 3, py: 2.5 }}>
          <Box  sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
          >
            <Box>
              <Typography
                sx={{
                  color: '#955d14ff',
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                K/{comment.CreatedBy}
              </Typography>

              {comment.Edited && comment.EditedAt && (
                <Typography
                  variant="caption"
                  sx={{ color: '#955d14ff', fontStyle: 'italic', marginBottom: 2, display: 'block'}}
                >
                  • Edited {timeAgo(comment.EditedAt)}
                </Typography>
              )}

              <Typography
                sx={{
                  color: '#333',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  mb: 1.5,
                }}
              >
                {comment.Comment}
              </Typography>
            </Box>

            {comment.CreatedBy === username && (
              <IconButton
                size="small"
                sx={{ color: '#955d14ff', '&:hover': { backgroundColor: '#efd5cdff' } }}
              >
                <EditIcon 
                  fontSize="small" 
                  onClick={() => setCreateDialogOpen(true)}
                />
              </IconButton>
            )}
          </Box>

          <Action
            liked={comment.Liked ?? false}
            noLikes={comment.NoLikes ?? 0}
            noComments={comment.NoComments ?? 0}
            onLike={handleLike}
            onComment={HandleComment}
          />
        </CardContent>

        <EditCommment
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          comment={comment}
          onSave={handleUpdate}
          onDelete={onDelete}
        />
      </Card>
      {openReply && (
        <Box sx = {{marginLeft: 5}}>
          {localReplies.map((comment, index) => (
            <CommentCard 
              key={index} 
              comment={comment} 
              onSave={onSave} 
              onDelete={onDelete} 
              onLike={onLike}
              onReply={onReply}
            />
          ))}
          <ReplyInputCard 
            // comment={comment}
            onReply={handleReply}
          />
        </Box>
      )}
    </Box>
  );
};

export default CommentCard;