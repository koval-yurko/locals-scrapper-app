'use client';

import React, { useState, useEffect, useMemo, createContext } from 'react';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

interface UsersTableStateContextType {
  paginationModel: GridPaginationModel;
  setPaginationModel: (paginationModel: GridPaginationModel) => void;
  sortModel: GridSortModel;
  setSortModel: (sortModel: GridSortModel) => void;
  nameSearch: string;
  setNameSearch: (nameSearch: string) => void;
  citySearch: string;
  setCitySearch: (citySearch: string) => void;
  genderSearch: string;
  setGenderSearch: (genderSearch: string) => void;
  ageRange: number[];
  setAgeRange: (ageRange: number[]) => void;
  heightRange: number[];
  setHeightRange: (heightRange: number[]) => void;
  voteSearch: number;
  setVoteSearch: (voteSearch: number) => void;
}

const defaultContextObj: UsersTableStateContextType = {
  paginationModel: {
    pageSize: 25,
    page: 0,
  },
  setPaginationModel: () => {},
  sortModel: [],
  setSortModel: () => {},
  nameSearch: '',
  setNameSearch: () => {},
  citySearch: '',
  setCitySearch: () => {},
  genderSearch: 'female',
  setGenderSearch: () => {},
  ageRange: [20, 40],
  setAgeRange: () => {},
  heightRange: [150, 200],
  setHeightRange: () => {},
  voteSearch: 0,
  setVoteSearch: () => {},
};

const UsersTableStateContext =
  createContext<UsersTableStateContextType>(defaultContextObj);

export function UsersTableStateProvider({
  prefix,
  genderSearchDefault,
  voteSearchDefault = 0,
  children,
}: {
  prefix?: string;
  genderSearchDefault?: string;
  voteSearchDefault?: number;
  children: React.ReactNode;
}) {
  const defaults = useMemo(() => {
    return {
      ...defaultContextObj,
      genderSearch:
        typeof genderSearchDefault !== 'undefined'
          ? genderSearchDefault
          : defaultContextObj.genderSearch,
      voteSearch:
        typeof voteSearchDefault !== 'undefined'
          ? voteSearchDefault
          : defaultContextObj.voteSearch,
    };
  }, [genderSearchDefault, voteSearchDefault]);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
    () => {
      if (typeof window === 'undefined') {
        return defaults.paginationModel;
      }
      const value = window.localStorage.getItem(
        `${prefix}.usersTable.paginationModel`,
      );

      return value
        ? (JSON.parse(value) as GridPaginationModel)
        : defaults.paginationModel;
    },
  );
  const [sortModel, setSortModel] = useState<GridSortModel>(() => {
    if (typeof window === 'undefined') {
      return defaults.sortModel;
    }
    const value = window.localStorage.getItem(`${prefix}usersTable.sortModel`);

    return value ? (JSON.parse(value) as GridSortModel) : defaults.sortModel;
  });
  const [nameSearch, setNameSearch] = useState(() => {
    if (typeof window === 'undefined') {
      return defaults.nameSearch;
    }
    const value = window.localStorage.getItem(
      `${prefix}.usersTable.nameSearch`,
    );
    return value ? JSON.parse(value) : defaults.nameSearch;
  });
  const [citySearch, setCitySearch] = useState(() => {
    if (typeof window === 'undefined') {
      return defaults.citySearch;
    }
    const value = window.localStorage.getItem(
      `${prefix}.usersTable.citySearch`,
    );
    return value ? JSON.parse(value) : defaults.citySearch;
  });
  const [genderSearch, setGenderSearch] = useState(() => {
    if (typeof window === 'undefined') {
      return defaults.genderSearch;
    }
    const value = window.localStorage.getItem(
      `${prefix}.usersTable.genderSearch`,
    );
    return value ? JSON.parse(value) : defaults.genderSearch;
  });
  const [ageRange, setAgeRange] = useState(() => {
    if (typeof window === 'undefined') {
      return defaults.ageRange;
    }
    const value = window.localStorage.getItem(`${prefix}.usersTable.ageRange`);
    return value ? JSON.parse(value) : defaults.ageRange;
  });
  const [heightRange, setHeightRange] = useState(() => {
    if (typeof window === 'undefined') {
      return defaults.heightRange;
    }
    const value = window.localStorage.getItem(
      `${prefix}.usersTable.heightRange`,
    );
    return value ? JSON.parse(value) : defaults.heightRange;
  });
  const [voteSearch, setVoteSearch] = useState(() => {
    if (typeof window === 'undefined') {
      return defaults.voteSearch;
    }
    const value = window.localStorage.getItem(
      `${prefix}.usersTable.voteSearch`,
    );
    return value ? JSON.parse(value) : defaults.voteSearch;
  });

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.paginationModel`,
      JSON.stringify(paginationModel),
    );
  }, [paginationModel, prefix]);

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.sortModel`,
      JSON.stringify(sortModel),
    );
  }, [sortModel, prefix]);

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.nameSearch`,
      JSON.stringify(nameSearch),
    );
  }, [nameSearch, prefix]);

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.citySearch`,
      JSON.stringify(citySearch),
    );
  }, [citySearch, prefix]);

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.genderSearch`,
      JSON.stringify(genderSearch),
    );
  }, [genderSearch, prefix]);

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.ageRange`,
      JSON.stringify(ageRange),
    );
  }, [ageRange, prefix]);

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.heightRange`,
      JSON.stringify(heightRange),
    );
  }, [heightRange, prefix]);

  useEffect(() => {
    window.localStorage.setItem(
      `${prefix}.usersTable.voteSearch`,
      JSON.stringify(voteSearch),
    );
  }, [voteSearch, prefix]);

  return (
    <UsersTableStateContext.Provider
      value={{
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
      }}
    >
      {children}
    </UsersTableStateContext.Provider>
  );
}

export function useUsersTableState() {
  return React.useContext(UsersTableStateContext);
}
