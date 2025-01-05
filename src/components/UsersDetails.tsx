'use client';

import { useMemo } from 'react';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { UserVote } from '@/components/UserVote';
import { useUser } from '@/hooks/useUser';

export function UserDetails({ userId }: { userId: number }) {
  const { data, isLoading } = useUser({ userId });

  const photos = useMemo(() => {
    if (!data?.photos) {
      return [];
    }
    return data.photos as { id: string; src: string }[];
  }, [data]);

  const description = useMemo(() => {
    if (!data?.description) {
      return '';
    }
    return data.description.replace(/\n/g, '<br />');
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data == null) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Alert severity='info' sx={{ mb: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </Alert>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope='row'>
                {data.firstName} {data.lastName}
              </TableCell>
              <TableCell scope='row'>
                {data.age} {data.gender === 'male' ? 'M' : 'F'}
              </TableCell>
              <TableCell scope='row'>
                {data.occupation ? `${data.occupation},` : ''}{' '}
                {data.country ? `${data.country},` : ''} {data.city || ''}
              </TableCell>
              <TableCell scope='row'>
                <UserVote id={data.id} votes={data.votes}></UserVote>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Locals</TableCell>
              <TableCell>Instagram</TableCell>
              <TableCell>LinkedIn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope='row'>
                <a href={data.shareLink} target='_blank'>
                  {data.shareLink}
                </a>
              </TableCell>
              <TableCell scope='row'>
                {data.instagramUsername ? (
                  <a
                    href={`https://www.instagram.com/${data.instagramUsername}/`}
                    target='_blank'
                  >
                    @{data.instagramUsername}
                  </a>
                ) : null}
              </TableCell>
              <TableCell scope='row'>
                {data.linkedinLink ? (
                  <a href={data.linkedinLink} target='_blank'>
                    {data.linkedinLink}
                  </a>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ImageList cols={3}>
        {photos.map((photo) => (
          <ImageListItem key={photo.id}>
            <img
              src={`${photo.src}?w=164&h=164&fit=crop&auto=format`}
              alt=''
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
