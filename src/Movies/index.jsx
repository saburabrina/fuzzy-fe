import { useQuery } from '@tanstack/react-query';

import { useMemo, useState } from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import { filterBy } from '@progress/kendo-data-query';

import { Button } from '@progress/kendo-react-buttons';

import RateWindow from './RateWindow';
import CreateWindow from './CreateWindow';

import axios from 'axios';

function Movies() {
  const initialFilter = {
    logic: 'and',
    filters: [
      {
        field: 'title',
        operator: 'contains',
        value: '',
      },
      {
        field: 'director',
        operator: 'contains',
        value: '',
      },
    ],
  };

  const [filter, setFilter] = useState(initialFilter);
  const [rateWindowVisible, setRateWindowVisible] = useState(false);
  const [createWindowVisible, setCreateWindowVisible] = useState(false);

  const toggleRateWindow = () => {
    setRateWindowVisible(!rateWindowVisible);
  };

  const toggleCreateWindow = () => {
    setCreateWindowVisible(!createWindowVisible);
  };

  const onFilterChange = (event) => {
    setFilter(event.filter);
  };

  const {
    isLoading,
    error,
    data: movies,
  } = useQuery({
    queryFn: () => {
      return axios
        .get('http://localhost:3000/movies', { withCredentials: true, headers: { Accept: 'application/json' } })
        .then((res) => {
          return res.data;
        })
        .catch((err) => err);
    },
    queryKey: ['movies'],
  });

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return filterBy(movies, filter);
  }, [movies, filter]);

  if (isLoading) return <>{'Loading'}</>;

  if (error) return <>{'Error: ' + error}</>;

  return (
    <div>
      <Grid data={filteredMovies} filterable={true} filter={filter} onFilterChange={onFilterChange}>
        <Column field={'title'} title={'Title'} />
        <Column field={'director'} title={'Director'} />
        <Column field={'average_score'} title={'Score'} />
      </Grid>
      <div>
        <Button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={toggleRateWindow}
        >
          Rate Movies
        </Button>
        <Button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={toggleCreateWindow}
        >
          Create Movies
        </Button>
        {rateWindowVisible && <RateWindow movies={filteredMovies} toggleWindow={toggleRateWindow} />}
        {createWindowVisible && <CreateWindow toggleWindow={toggleCreateWindow} />}
      </div>
    </div>
  );
}

export default Movies;
