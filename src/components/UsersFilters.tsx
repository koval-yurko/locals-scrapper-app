'use client';

import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { SearchBar } from '@/components/SearchBar';

export type UsersFiltersProps = {
  genderSearch: string;
  onGenderSearchChange: (genderSearch: string) => void;
  onNameSearchChange: (nameSearch: string) => void;
  onCitySearchChange: (citySearch: string) => void;
  onAgeRangeChange: (ageRange: number[]) => void;
};

export function UsersFilters({
  genderSearch,
  onGenderSearchChange,
  onNameSearchChange,
  onCitySearchChange,
  onAgeRangeChange,
}: UsersFiltersProps) {
  const [ageRange, setAgeRange] = useState([20, 37]);

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

  const handleChange = (event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
    onAgeRangeChange(newValue as number[]);
  };

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
            getAriaLabel={() => 'Temperature range'}
            value={ageRange}
            onChange={handleChange}
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
    </>
  );
}
