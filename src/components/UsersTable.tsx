'use client';

import { useState } from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
  GridSortModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { UsersFilters } from '@/components/UsersFilters';
import { UserVote } from '@/components/UserVote';
import { useUsers, UseUsersProps } from '@/hooks/useUsers';

function GridAvatarCell(props: GridRenderCellParams) {
  if (props.value == null) {
    return null;
  }

  return (
    <Link href={`/users/${props.row.id}`}>
      <Tooltip title={props.row.description} placement='right'>
        <Avatar
          src={props.value as string}
          sx={{ width: 150, height: 150 }}
          variant={'rounded'}
        />
      </Tooltip>
    </Link>
  );
}

function GridLongTextCell(props: GridRenderCellParams) {
  return <div className='wrap-text'>{props.value || ''}</div>;
}

export function UsersTable() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [nameSearch, setNameSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [genderSearch, setGenderSearch] = useState('');
  const [ageRange, setAgeRange] = useState<number[]>([]);
  const [voteSearch, setVoteSearch] = useState(0);

  const requestQuery: UseUsersProps = {
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    nameSearch: nameSearch,
    citySearch: citySearch,
    genderSearch: genderSearch,
    ageFrom: ageRange[0],
    ageTo: ageRange[1],
  };
  if (sortModel[0]?.field) {
    requestQuery.sort = sortModel[0]?.sort as string;
    requestQuery.sortField = sortModel[0]?.field;
  }
  if (voteSearch) {
    requestQuery.voteSearch = voteSearch;
  }
  const { data, isLoading } = useUsers(requestQuery);

  const rowCount = data ? data.count : -1;
  const rows: GridRowsProp = data ? data.items : [];

  const columns: GridColDef[] = [
    {
      field: 'avatarPicture',
      headerName: 'Avatar',
      sortable: false,
      width: 170,
      renderCell: (params) => <GridAvatarCell {...params} />,
    },
    {
      field: 'lastName',
      headerName: 'Name',
      flex: 3,
      sortable: false,
      valueFormatter: (value, row) => `${row.firstName} ${row.lastName}`,
      cellClassName: 'long-text align-left',
      renderCell: (params) => <GridLongTextCell {...params} />,
    },
    { field: 'username', headerName: 'Username', flex: 3, sortable: false },
    {
      field: 'age',
      headerName: 'Age',
      flex: 1,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 1,
      valueFormatter: (value) => (value === 'male' ? 'M' : 'F'),
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 2,
      sortable: false,
      cellClassName: 'long-text align-right',
      renderCell: (params) => <GridLongTextCell {...params} />,
    },
    {
      field: 'votes',
      headerName: 'Action',
      flex: 2,
      sortable: false,
      cellClassName: 'long-text',
      renderCell: (params) => (
        <UserVote id={params.row.id} votes={params.row.votes}></UserVote>
      ),
    },
  ];

  return (
    <>
      <UsersFilters
        genderSearch={genderSearch}
        onGenderSearchChange={setGenderSearch}
        onNameSearchChange={setNameSearch}
        onCitySearchChange={setCitySearch}
        onAgeRangeChange={setAgeRange}
        voteSearch={voteSearch}
        onVoteSearchChange={setVoteSearch}
      />
      <div>
        <DataGrid
          rows={rows}
          rowHeight={160}
          rowCount={rowCount}
          columns={columns}
          loading={isLoading}
          paginationMode={'server'}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortingMode={'server'}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          disableColumnFilter={true}
          sx={{
            '& .long-text': {
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.5',
            },
            '& .align-left': {
              justifyContent: 'left',
              textAlign: 'left',
            },
            '& .align-right': {
              justifyContent: 'right',
              textAlign: 'right',
            },
          }}
        />
      </div>
    </>
  );
}
