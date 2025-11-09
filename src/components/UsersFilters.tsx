import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { SearchBar } from '@/components/SearchBar';

export type UsersFiltersProps = {
  genderSearch: string;
  onGenderSearchChange: (genderSearch: string) => void;
  onNameSearchChange: (nameSearch: string) => void;
  onCitySearchChange: (citySearch: string) => void;
  ageRange: number[];
  onAgeRangeChange: (ageRange: number[]) => void;
  heightRange: number[];
  onHeightRangeChange: (heightRange: number[]) => void;
  voteSearch: number;
  onVoteSearchChange: (voteSearch: number) => void;
};

export function UsersFilters({
  genderSearch,
  onGenderSearchChange,
  onNameSearchChange,
  onCitySearchChange,
  ageRange,
  onAgeRangeChange,
  heightRange,
  onHeightRangeChange,
  voteSearch,
  onVoteSearchChange,
}: UsersFiltersProps) {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  const onMaleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onGenderSearchChange('male');
    } else {
      onGenderSearchChange('');
    }
  };

  const onFemaleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onGenderSearchChange('female');
    } else {
      onGenderSearchChange('');
    }
  };

  const onLikeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onVoteSearchChange(1);
    } else {
      onVoteSearchChange(0);
    }
  };

  const onDislikeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onVoteSearchChange(-1);
    } else {
      onVoteSearchChange(0);
    }
  };

  const handleAgeRangeChange = (event: Event, newValue: number | number[]) => {
    onAgeRangeChange(newValue as number[]);
  };

  const handleHeightRangeChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    onHeightRangeChange(newValue as number[]);
  };

  if (isServer) {
    return null;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={5}>
          <SearchBar label='Name search' onSearch={onNameSearchChange} />
        </Grid>
        <Grid size={3}></Grid>
        <Grid size={4}>
          <SearchBar label='City search' onSearch={onCitySearchChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={5}>
          <Slider
            value={ageRange}
            onChange={handleAgeRangeChange}
            valueLabelDisplay='auto'
            marks={[
              {
                value: 20,
                label: '20',
              },
              {
                value: 30,
                label: '30',
              },
              {
                value: 40,
                label: '40',
              },
              {
                value: 50,
                label: '50',
              },
            ]}
            min={20}
            max={50}
          />
        </Grid>
        <Grid size={3}></Grid>
        <Grid size={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={genderSearch === 'male'}
                onChange={onMaleSelect}
                size='large'
              />
            }
            label='M'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={genderSearch === 'female'}
                onChange={onFemaleSelect}
                size='large'
              />
            }
            label='F'
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={5}>
          <Slider
            value={heightRange}
            onChange={handleHeightRangeChange}
            valueLabelDisplay='auto'
            marks={[
              {
                value: 150,
                label: '150',
              },
              {
                value: 160,
                label: '160',
              },
              {
                value: 170,
                label: '170',
              },
              {
                value: 180,
                label: '180',
              },
              {
                value: 190,
                label: '190',
              },
              {
                value: 200,
                label: '200',
              },
            ]}
            step={5}
            min={150}
            max={200}
          />
        </Grid>
        <Grid size={3}></Grid>
        <Grid size={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={voteSearch === 1}
                onChange={onLikeSelect}
                size='large'
              />
            }
            label={<ThumbUpIcon />}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={voteSearch === -1}
                onChange={onDislikeSelect}
                size='large'
              />
            }
            label={<ThumbDownIcon />}
          />
        </Grid>
      </Grid>
    </>
  );
}
