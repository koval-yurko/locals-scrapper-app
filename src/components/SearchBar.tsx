import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export type SearchBarProps = {
  label: string;
  onSearch: (value: string) => void;
};

export const SearchBar = ({ label, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value);
  };

  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value) {
      setValue('');
      onSearch('');
    } else {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ width: '100%', marginBottom: 10 }}>
      <FormControl variant='outlined' fullWidth>
        <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
        <OutlinedInput
          type='text'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton component='button' onClick={onClick} edge='end'>
                {value ? <CloseIcon /> : <SearchIcon />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
    </form>
  );
};
