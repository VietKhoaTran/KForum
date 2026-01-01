import { CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Action from './Action.tsx';
import { Comment } from '../../types/Comment.tsx';
import EditComment from './EditComment.tsx';
import ReplyInputCard from './ReplyInputCard.tsx';
import { timeAgo } from '../../utils/TimeAgo.tsx';
import useFetchReply from '../../hooks/comment/useFetchReply.tsx';
import { BRAND_PRIMARY } from '../forum.constants.ts';
import useLikeComment from '../../hooks/comment/useLikeComment.tsx';
import { ReplyReturn } from '../../types/Comment.tsx';

interface CommentCardProps {
  comment: Comment;
  onLike: (ID: number) => void;
  onReply: (commentID: number, reply: string) => Promise<ReplyReturn>;
  onSave: (ID: number, newComment: string) => void;
  onDelete: (commentID: number) => void;
}

const CommentCard = ({ comment, onLike, onReply, onSave, onDelete }: CommentCardProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  
  const { replies, fetchReplies } = useFetchReply();
  const [localReplies, setLocalReplies] = useState<Comment[]>([]);
  const { username } = useOutletContext<{ username: string }>();
  const {likeComment} = useLikeComment();

  useEffect(() => {
    fetchReplies(comment.ID);
  }, [comment.ID]);

  useEffect(() => {
    if (replies) {
      setLocalReplies(replies);
    }
  }, [replies]);

  const handleUpdate = (newComment: string) => {
    onSave(comment.ID, newComment);
    setEditDialogOpen(false);
  };

  const handleLike = () => {
    onLike(comment.ID);
  };

  const handleToggleLikeReply = async (commentID: number) => {
    const comment = localReplies.find(c => c.ID === commentID);
    if (!comment) return;

    const NoLikes = await likeComment(commentID);

    setLocalReplies(prev =>
      prev.map(c =>
        c.ID === commentID
          ? { ...c, NoLikes, Liked: !c.Liked }
          : c
      )
    );
  };

  const handleToggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleReply = async (reply: string) => {
    const data = await onReply(comment.ID, reply);
    const newReply: Comment = {
      ID: data.id,
      Comment: data.comment,
      CreatedBy: data.created_by,
      NoLikes: 0,
      CreatedAt: null,
      Edited: false,
      EditedAt: null,
      ParentComment: comment.ID,
    }
    setLocalReplies(prev => [...prev, newReply])
    // setLocalReplies(prev => [...prev, data])
    setShowReplies(true);
    setShowReplyInput(false);
  };

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleDeleteReply = (replyID: number) => {
    setLocalReplies(prev => prev.filter(reply => reply.ID !== replyID));
  }

  return (
    <Box>
      <CardContent sx={{ px: 3, py: 1}}>
        <Box
          sx={{
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
                sx={{
                  color: '#955d14ff',
                  fontStyle: 'italic',
                  marginBottom: 2,
                  display: 'block',
                }}
              >
                • Edited {timeAgo(comment.EditedAt)}
              </Typography>
            )}
            <Box
              sx = {{
                display: 'flex',
                
              }}
            >

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
          </Box>

          {comment.CreatedBy === username && (
            <IconButton
              size="small"
              onClick={() => setEditDialogOpen(true)}
              sx={{
                color: '#955d14ff',
                '&:hover': { backgroundColor: '#efd5cdff' },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        <Box 
          sx = {{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Action
            liked={comment.Liked ?? false}
            noLikes={comment.NoLikes ?? 0}
            onLike={handleLike}
            onComment={handleToggleReplyInput}
          />
          {localReplies.length > 0 && (
            <IconButton
              size = 'small'
              onClick={handleToggleReplies}
              sx={{
                color: BRAND_PRIMARY,
                '&:hover': {
                  color: '#666',
                },
              }}
            >
              {showReplies ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
            </IconButton>
          )}
        </Box>
      </CardContent>

      <EditComment
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        comment={comment}
        onSave={handleUpdate}
        onDelete={onDelete}
      />

      {showReplyInput && (
        <Box sx={{ marginLeft: 5 }}>
          <ReplyInputCard onReply={handleReply} />
        </Box>
      )}

      {showReplies &&
        localReplies.map((reply) => (
          <Box key={reply.ID} sx={{ marginLeft: 5 }}>
            <CommentCard
              comment={reply}
              onSave={onSave}
              onDelete={handleDeleteReply}
              onLike={handleToggleLikeReply}
              onReply={onReply}
            />
          </Box>
        ))}
    </Box>
  );
};

export default CommentCard;