'use client';

import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useUserVote } from '@/hooks/useUserVote';

export type UserVoteProps = {
  id: number;
  votes: number;
};

export function UserVote({ id, votes }: UserVoteProps) {
  const { mutate, status } = useUserVote(id);
  const isLoading = status === 'pending';

  const onLikeClick = () => {
    mutate(1);
  };

  const onDislikeClick = () => {
    mutate(-1);
  };

  return (
    <Grid container width='100%' justifyContent='center'>
      <IconButton component='button' onClick={onLikeClick} disabled={isLoading}>
        {votes === 1 ? <ThumbUpIcon color='success' /> : <ThumbUpOffAltIcon />}
      </IconButton>
      <IconButton
        component='button'
        onClick={onDislikeClick}
        disabled={isLoading}
      >
        {votes === -1 ? (
          <ThumbDownIcon color='warning' />
        ) : (
          <ThumbDownOffAltIcon />
        )}
      </IconButton>
    </Grid>
  );
}
