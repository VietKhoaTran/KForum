import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Container,
  TextField,
} from '@mui/material';
import {useOutletContext, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import Header from '../Header.tsx';
import CommentCard from './CommentCard.tsx';
import Action from './Action.tsx';
import { Post } from '../../types/Post.tsx';
import { BRAND_PRIMARY, BRAND_PRIMARY_HOVER } from '../forum.constants.ts';

import useFetch1Post from '../../hooks/post/useFetch1Post.tsx';
import useLikePost from '../../hooks/post/useLikePost.tsx';

import EditCard from './EditCard.tsx';
import { timeAgo } from '../../utils/TimeAgo.tsx';
import { useNavigate } from 'react-router-dom';
import useCreateComment from '../../hooks/comment/userCreateComment.tsx';
import useFetchComments from '../../hooks/comment/useFetchComment.tsx';
import { useLocation } from 'react-router-dom';
import useLikeComment from '../../hooks/comment/useLikeComment.tsx';
import useReplyComment from '../../hooks/comment/useReplyComment.tsx';
import { Comment } from '../../types/Comment.tsx';
import { ReplyReturn } from '../../types/Comment.tsx';

const PostPage = () => {
  // const { post } = useParams<string>();
  // const title = post ? decodeURIComponent(post).replaceAll('_', ' ') : '';
  // const title = post?.replaceAll('_', ' ');
  // console.log(title)
  const { username } = useOutletContext<{ username: string }>();
  const [localPost, setLocalPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const {likePost} = useLikePost();
  const {likeComment} = useLikeComment();

  const {commentCreate} = useCreateComment();

  const navigate = useNavigate();
  const location = useLocation();
  const {postID} = location.state || {};
  console.log(postID)

  const { postFetch, fetch1Post } = useFetch1Post();
  const {commentReply} = useReplyComment();

  const {comments, fetchComments} = useFetchComments();
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  // if (postFetch) {return}

  useEffect(() => {
    if (postID) {
      fetch1Post(postID);
    }
  }, [postID]);

  useEffect(() => {
    if (postFetch) setLocalPost(postFetch);
  }, [postFetch]);


  useEffect(() => {
    if (localPost) {
      fetchComments(localPost.ID)
    }
  }, [localPost])

  useEffect(() => {
    if (!comments) {
      setLocalComments([]);
      return;
    }

    setLocalComments(
      comments.map(comment => ({
        ID: comment.ID,
        Comment: comment.Comment,
        CreatedBy: comment.CreatedBy,
        CreatedAt: comment.CreatedAt,
        Edited: comment.Edited,
        EditedAt: comment.EditedAt,
        NoLikes: comment.NoLikes,
        Liked: comment.Liked,
        NoComments: comment.NoComments,
        ParentComment: comment.ParentComment
      }))
    );
  }, [comments]);

  const isPostOwner = localPost?.CreatedBy === username;

  const handleToggleLike = async () => {
    if (postFetch) {
        const NoLikes = await likePost(postFetch.Title)
        setLocalPost(prev =>
            prev
                ? {
                    ...prev,
                    NoLikes,
                    Liked: !prev.Liked,
                }
                : prev
        );
    }
  };

  const handleSubmitComment = async() => {
    if (!commentText.trim()) return;
    if (localPost) {
      // console.log(commentText, localPost.ID)
      const data = await commentCreate(commentText, localPost.ID)
      // const newComment : Comment = {
      //   ID: -1,
      //   Comment: data,
      //   CreatedBy: username,
      //   NoLikes: 0,
      //   CreatedAt: null,
      //   Edited: false,
      //   EditedAt: null,
      //   ParentComment: null,
      // }
      // setLocalComments(prev => [...prev, newComment])

      setLocalPost(prev =>
            prev
                ? {
                    ...prev,
                    NoComments: prev.NoComments + 1,
                }
                : prev
        );
    }
    setCommentText('');
  };

  const handleUpdate = (newTitle: string, newDetails: string) => {
    if (localPost) {
      const newPost: Post = {
        ID: localPost.ID,
        Title: newTitle,
        Details: newDetails,
        NoLikes: localPost?.NoLikes,
        NoComments: localPost.NoComments,
        Edited: localPost.Edited,
        EditedAt: localPost.EditedAt,
        Liked: localPost.Liked,
        CreatedBy: localPost.CreatedBy
      }
      setLocalPost(newPost);
      navigate(`/post/${newPost.Title}`, {replace: true})
    }
  }

  const handleUpdateComment = (ID: number, updatedComment: string) => {
    setLocalComments(prev =>
      prev?.map(comment =>
        comment.ID === ID
          ? { 
              ...comment, 
              Comment: updatedComment, 
              Edited: true, 
              EditedAt: new Date().toISOString() 
            }
          : comment
      )
    );
  };

  const handleDeleteComment = (commentID: number) => {
    setLocalComments(prev => prev.filter(comment => comment.ID !== commentID));
  }
  
  const handleToggleLikeComment = async (commentID: number) => {
    const comment = localComments.find(c => c.ID === commentID);
    if (!comment) return;

    const NoLikes = await likeComment(commentID);

    setLocalComments(prev =>
      prev.map(c =>
        c.ID === commentID
          ? { ...c, NoLikes, Liked: !c.Liked }
          : c
      )
    );
  };

  const handleReplyComment = async(commentID: number, reply: string) => {
    const  data :ReplyReturn = await commentReply(reply, commentID, postID)
    return data
  }

  if (!localPost) return <Typography>Loading post...</Typography>;

  return (
    <Box sx={{ minHeight: '100vh' }} className="forum">
      <Header
        username={username}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        pageType="post"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card sx={{ mt: 10, mb: 3, borderRadius: 2 }}>
          <CardContent sx={{ px: 3, py: 3, borderTop: `4px solid ${BRAND_PRIMARY}` }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box>
                <Typography sx={{ color: '#955d14ff', fontWeight: 600 }}>
                  K/{localPost.CreatedBy}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 600, color: BRAND_PRIMARY }}>
                  {localPost.Title}
                </Typography>
              </Box>

              {isPostOwner && (
                <IconButton
                  size="small"
                  sx={{ color: BRAND_PRIMARY_HOVER, '&:hover': { backgroundColor: '#efd5cdff' } }}
                >
                  <EditIcon 
                    fontSize="small" 
                    onClick={() => setCreateDialogOpen(true)}
                  />
                </IconButton>
              )}
            </Box>

            {localPost.Edited && localPost.EditedAt && (
                <Typography
                  variant="caption"
                  sx={{ color: '#955d14ff', fontStyle: 'italic', marginBottom: 2, display: 'block'}}
                >
                  • Edited {timeAgo(localPost.EditedAt)}
                </Typography>
              )}

            <Typography sx={{ color: BRAND_PRIMARY, mb: 2 }}>
              {localPost.Details}
            </Typography>

            <Action
              liked={localPost.Liked}
              noLikes={localPost.NoLikes}
              noComments={localPost.NoComments}
              onLike={handleToggleLike}
            />
          </CardContent>
        </Card>

        <TextField
          fullWidth
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmitComment();
            }
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 5,
              bgcolor: '#F5F0E8',
              '& fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: '1px solid #AE887B' },
            },
          }}
        />

        <Box>
          {/* Only show the comments, not replies */}
          {localComments.filter(comment => comment.ParentComment == null).map((comment) => (
            <CommentCard 
              key={comment.ID} 
              comment={comment} 
              onSave={handleUpdateComment} 
              onDelete={handleDeleteComment} 
              onLike={handleToggleLikeComment}
              onReply={handleReplyComment}
            />
          ))}
        </Box>
      </Container>

      <EditCard
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        post={localPost}
        onSave={handleUpdate}
        // username={username}
      />    
    </Box>
  );
};

export default PostPage;
