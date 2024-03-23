import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Window } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { TextArea } from '@progress/kendo-react-inputs';
import React, { useState } from 'react';

import { useCreateMovies } from '../state/mutations';
import { z } from 'zod';

const Movie = z.array(
  z.object({
    title: z.string(),
    director: z.string(),
  }),
);

const FormField = (props) => {
  const { newMovies, setNewMovies, onAdd } = props;

  const handleUpdate = (index, field, value) => {
    const movies = newMovies;
    movies[index][field] = value;
    setNewMovies(movies);
  };

  return (
    <Grid data={newMovies}>
      <GridToolbar>
        <Button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={onAdd}>
          Add +1
        </Button>
      </GridToolbar>
      <Column
        field="title"
        title="Title"
        cells={{
          data: ({ dataItem, field, dataIndex }) => (
            <td>
              <Input
                name="title"
                defaultValue={dataItem.title}
                onBlur={(e) => handleUpdate(dataIndex, field, e.target.value)}
              />
            </td>
          ),
        }}
      />
      <Column
        field="director"
        title="Director"
        cells={{
          data: ({ dataItem, field, dataIndex }) => (
            <td>
              <Input
                name="director"
                defaultValue={dataItem.director}
                onBlur={(e) => handleUpdate(dataIndex, field, e.target.value)}
              />
            </td>
          ),
        }}
      />
    </Grid>
  );
};

const JsonField = (props) => {
  const { newMovies, setNewMovies } = props;
  const [isValid, setIsValid] = useState(true);

  const checkJson = (jsonTxt) => {
    try {
      const result = JSON.parse(jsonTxt);
      const validatedResult = Movie.parse(result);

      return validatedResult;
    } catch (err) {
      return false;
    }
  };

  const handleChange = (jsonTxt) => {
    const obj = checkJson(jsonTxt);
    if (obj) {
      setIsValid(true);
      setNewMovies(obj);
    } else setIsValid(false);
  };

  return (
    <TextArea
      rows={5}
      autoSize={true}
      validationMessage="Invalid json"
      valid={isValid}
      defaultValue={JSON.stringify(newMovies)}
      onChange={(e) => handleChange(e.value)}
    />
  );
};

function CreateWindow({ toggleWindow, ...props }) {
  const moviePattern = { title: '', director: '' };
  const [newMovies, setNewMovies] = useState([moviePattern]);
  const [rawJSON, setRawJSON] = useState(true);

  const onSuccess = (data) => {
    const jobId = data.job_id;
    props.onSuccess(jobId, 'Creation');
  };

  const { mutate: createMovies, isSuccess, isError } = useCreateMovies({ onSuccess });

  const handleSubmit = () => {
    createMovies(newMovies);
  };

  const onAdd = () => {
    setNewMovies([moviePattern, ...newMovies]);
  };

  isSuccess && toggleWindow();

  return (
    <Window
      title={'Submit Movies'}
      onClose={toggleWindow}
      initialWidth={window.innerWidth < 768 ? window.innerWidth : window.innerWidth * 0.5}
      initialHeight={window.innerHeight < 768 ? window.innerHeight : 320}
      modal
    >
      <fieldset>
        <legend>Movies</legend>
        {isError && 'Something Got Wrong...'}
        <ButtonGroup>
          <Button togglable={true} selected={!rawJSON} onClick={() => setRawJSON(false)}>
            Form
          </Button>
          <Button togglable={true} selected={rawJSON} onClick={() => setRawJSON(true)}>
            Raw JSON
          </Button>
        </ButtonGroup>
        {!rawJSON && <FormField newMovies={newMovies} setNewMovies={setNewMovies} onAdd={onAdd} />}
        {rawJSON && <JsonField newMovies={newMovies} setNewMovies={setNewMovies} />}
      </fieldset>
      <div className="button-group">
        <Button themeColor={'secondary'} type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Window>
  );
}

export default CreateWindow;
