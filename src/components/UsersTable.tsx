import { Link } from 'react-router';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useUsersTableState } from '@/contexts/UsersTableStateProvider';
import { UsersFilters } from '@/components/UsersFilters';
import { UserVote } from '@/components/UserVote';
import { useUsers, UseUsersProps, User } from '@/hooks/useUsers';

function GridAvatarCell(props: GridRenderCellParams) {
  if (props.value == null) {
    return null;
  }

  const photos = (props.row.photos || []) as { id: string; src: string }[];

  return (
    <Link to={`/users/${props.row.id}`}>
      <Tooltip title={props.row.description} placement='right'>
        <Grid container gap={1} sx={{ mt: 1 }}>
          <Grid>
            {photos[0] ? (
              <Avatar
                src={photos[0].src as string}
                sx={{ width: 150, height: 150 }}
                variant={'rounded'}
              />
            ) : (
              <Avatar
                src={props.value as string}
                sx={{ width: 150, height: 150 }}
                variant={'rounded'}
              />
            )}
          </Grid>
          <Grid>
            {photos[1] ? (
              <Avatar
                src={photos[1].src as string}
                sx={{ width: 150, height: 150 }}
                variant={'rounded'}
              />
            ) : null}
          </Grid>
          <Grid>
            {photos[2] ? (
              <Avatar
                src={photos[2].src as string}
                sx={{ width: 150, height: 150 }}
                variant={'rounded'}
              />
            ) : null}
          </Grid>
        </Grid>
      </Tooltip>
    </Link>
  );
}

function GridInfoCell(props: GridRenderCellParams) {
  const {
    username,
    shareLink,
    firstName,
    lastName,
    occupation,
    country,
    city,
    instagramUsername,
    linkedinLink,
  } = props.row as User;
  return (
    <div>
      <b>
        {firstName} {lastName}
      </b>
      <br />
      {occupation ? `${occupation}` : ''} <br />
      {country ? `${country},` : ''} {city || ''}
      <br />
      <a href={shareLink} target='_blank' rel='noreferrer'>
        {username}
      </a>
      <br />
      {instagramUsername ? (
        <>
          <b>ig:</b>{' '}
          <a
            href={`https://www.instagram.com/${instagramUsername}/`}
            target='_blank'
            rel='noreferrer'
          >
            @{instagramUsername}
          </a>
        </>
      ) : null}
      <br />
      {linkedinLink ? (
        <a href={linkedinLink} target='_blank' rel='noreferrer'>
          https://www.linkedin.com
        </a>
      ) : null}
    </div>
  );
}

export function UsersTable() {
  const {
    paginationModel,
    setPaginationModel,
    sortModel,
    setSortModel,
    nameSearch,
    setNameSearch,
    citySearch,
    setCitySearch,
    genderSearch,
    setGenderSearch,
    ageRange,
    setAgeRange,
    heightRange,
    setHeightRange,
    voteSearch,
    setVoteSearch,
  } = useUsersTableState();

  const requestQuery: UseUsersProps = {
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    nameSearch: nameSearch,
    citySearch: citySearch,
    genderSearch: genderSearch,
    ageFrom: ageRange[0],
    ageTo: ageRange[1],
    heightFrom: heightRange[0],
    heightTo: heightRange[1],
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
      width: 500,
      renderCell: (params) => <GridAvatarCell {...params} />,
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 3,
      sortable: false,
      cellClassName: 'flex-center align-left',
      renderCell: (params) => <GridInfoCell {...params} />,
    },
    {
      field: 'age',
      headerName: 'Age',
      flex: 1,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'height',
      headerName: 'Height',
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
      field: 'votes',
      headerName: 'Action',
      flex: 2,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      cellClassName: 'flex-center align-right',
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
        ageRange={ageRange}
        onAgeRangeChange={setAgeRange}
        heightRange={heightRange}
        onHeightRangeChange={setHeightRange}
        voteSearch={voteSearch}
        onVoteSearchChange={setVoteSearch}
      />
      <div>
        <DataGrid
          rows={rows}
          rowHeight={170}
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
            '& .flex-center': {
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
