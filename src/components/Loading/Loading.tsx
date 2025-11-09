import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const FullSizeCenteredFlexBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <CircularProgress />
    </FullSizeCenteredFlexBox>
  );
}
