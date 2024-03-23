import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import { Button } from '@progress/kendo-react-buttons';
import { useMemo, useState } from 'react';
import { Fade } from '@progress/kendo-react-animation';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';

import { jobStatus, useMovies } from '../state/queries';

import RateWindow from './RateWindow';
import CreateWindow from './CreateWindow';

const JobNotification = ({ type, action, onClose }) => {
  const successMessage = 'Your submission was completed';
  const failureMessage = 'Your submission failed';

  return (
    <div>
      <Fade>
        <Notification
          type={{
            style: type,
            icon: true,
          }}
          closable={true}
          style={{
            fontSize: 16,
            padding: 8,
          }}
          onClose={onClose}
        >
          <span>
            {action} Movies : {type == 'success' ? successMessage : failureMessage}
          </span>
        </Notification>
      </Fade>
    </div>
  );
};

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
  const [jobs, setJobs] = useState([]);

  const { isLoading: isLoadingMovies, error: isErrorMovies, data: movies, refetch: refetchMovies } = useMovies();

  const toggleRateWindow = () => {
    setRateWindowVisible(!rateWindowVisible);
  };

  const toggleCreateWindow = () => {
    setCreateWindowVisible(!createWindowVisible);
  };

  const onFilterChange = (event) => {
    setFilter(event.filter);
  };

  const removeJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const checkJobStatus = (jobId, action) => {
    const interval = setInterval(() => {
      jobStatus(jobId).then((data) => {
        const status = data.status;
        if (status == 'complete') {
          setJobs([{ id: jobId, type: 'success', action }, ...jobs]);
          refetchMovies();
          clearInterval(interval);
        } else if (status == 'failed') {
          setJobs([{ id: jobId, type: 'error', action }, ...jobs]);
          clearInterval(interval);
        } else return;
      });
    }, 200);
  };

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return filterBy(movies, filter);
  }, [movies, filter]);

  if (isLoadingMovies) return <>{'Loading'}</>;

  if (isErrorMovies) return <>{'Error: ' + error}</>;

  return (
    <div>
      <NotificationGroup
        style={{
          right: 0,
          bottom: 0,
          alignItems: 'flex-start',
          flexWrap: 'wrap-reverse',
        }}
      >
        {jobs.map((job) => (
          <JobNotification type={job.type} action={job.action} onClose={() => removeJob(job.id)} />
        ))}
      </NotificationGroup>
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
        {rateWindowVisible && (
          <RateWindow movies={filteredMovies} toggleWindow={toggleRateWindow} onSuccess={checkJobStatus} />
        )}
        {createWindowVisible && <CreateWindow toggleWindow={toggleCreateWindow} onSuccess={checkJobStatus} />}
      </div>
    </div>
  );
}

export default Movies;
