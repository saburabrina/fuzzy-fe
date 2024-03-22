import { Button } from '@progress/kendo-react-buttons';
import { Window } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import React, { useState } from 'react';
import { useRateMovies } from '../state/mutations';

function RateWindow({ movies, toggleWindow }) {
  const { mutate: rateMovies, isSuccess } = useRateMovies();
  const [formState, setFormState] = useState(movies);

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
    <Window title={'Rate Selected Movies'} onClose={toggleWindow} initialWidth={1000}>
      <fieldset>
        <legend>Movies List</legend>
        {rateMovies.isPending && 'Loading...'}
        {rateMovies.isError && 'Something Got Wrong...'}
        <Grid data={movies}>
          <Column field={'title'} title={'Title'} />
          <Column field={'director'} title={'Director'} />
          <Column
            field={'score'}
            title={'Score (0 - 10)'}
            cells={{
              data: ({ dataIndex, dataItem }) => (
                <td>
                  <Input
                    name="score"
                    type="numeric"
                    onChange={(e) => onChangeInput(dataIndex, e.value)}
                    placeholder={dataItem.user_score}
                    min={0}
                    max={10}
                  />
                </td>
              ),
            }}
          />
        </Grid>
      </fieldset>
      <Button type="submit" onClick={handleSubmit}>
        Save
      </Button>
    </Window>
  );
}

export default RateWindow;
