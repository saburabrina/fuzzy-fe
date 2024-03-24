import { Button } from '@progress/kendo-react-buttons';
import { Window } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import React, { useState } from 'react';
import { useRateMovies } from '../state/mutations';

function RateWindow({ movies, toggleWindow, ...props }) {
  const [formState, setFormState] = useState(movies.map((v) => ({ ...v, score: v.user_score })));

  const onSuccess = (data) => {
    const jobId = data.job_id;
    props.onSuccess(jobId, 'Rating');
  };

  const { mutate: rateMovies, isSuccess } = useRateMovies({ onSuccess });

  const onChangeInput = (index, value) => {
    const form = formState;
    form[index].score = value;
    setFormState(form);
  };

  const handleSubmit = () => {
    const formattedValues = formState.map((v) => ({ movie_id: v.id, score: v.score }));
    rateMovies(formattedValues);
  };

  isSuccess && toggleWindow();

  return (
    <Window
      title={'Rate Selected Movies'}
      onClose={toggleWindow}
      initialWidth={window.innerWidth < 768 ? window.innerWidth : window.innerWidth * 0.75}
      initialHeight={window.innerHeight * 0.7}
      modal
    >
      <fieldset>
        <legend>Movies List</legend>
        {rateMovies.isPending && 'Loading...'}
        {rateMovies.isError && 'Something Got Wrong...'}
        <Grid data={formState}>
          <Column field={'title'} title={'Title'} />
          <Column field={'director'} title={'Director'} />
          <Column
            field={'score'}
            title={'Score (0 - 10)'}
            cells={{
              data: ({ dataIndex }) => (
                <td>
                  <Input
                    name="score"
                    type="numeric"
                    onChange={(e) => onChangeInput(dataIndex, e.value)}
                    value={formState[dataIndex].score}
                    min={0}
                    max={10}
                  />
                </td>
              ),
            }}
          />
        </Grid>
      </fieldset>
      <div className="button-group">
        <Button themeColor={'secondary'} type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Window>
  );
}

export default RateWindow;
