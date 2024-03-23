import { Form, FormElement, FieldWrapper, Field } from '@progress/kendo-react-form';

import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

import React from 'react';

import { useCreateUser } from './state/mutations';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate('/');
  };

  const createUser = useCreateUser({ onSuccess });

  const handleSubmit = (v) => {
    const form = new FormData();
    form.set('user[username]', v.username);
    form.set('user[email]', v.email);
    form.set('user[password]', v.password);
    form.set('user[password_confirmation]', v.password_confirmation);

    const data = new URLSearchParams(form);
    createUser.mutate(data);
  };

  return (
    <div className="register">
      <Form
        onSubmit={handleSubmit}
        render={() => (
          <FormElement>
            <fieldset className="k-form-fieldset">
              <legend className="k-form-legend">Register</legend>
              <FieldWrapper className="k-form-field-wrap">
                <Field
                  labelClassName="k-form-label"
                  label="Username: "
                  name="username"
                  type="text"
                  component={Input}
                ></Field>
              </FieldWrapper>

              <FieldWrapper className="k-form-field-wrap">
                <Field
                  labelClassName="k-form-label"
                  label="Email: "
                  name="email"
                  type="email"
                  component={Input}
                ></Field>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    labelClassName="k-form-label"
                    label="Password: "
                    name="password"
                    type="password"
                    component={Input}
                  ></Field>
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    labelClassName="k-form-label"
                    label="Confirm Password: "
                    name="password_confirmation"
                    type="password"
                    component={Input}
                  ></Field>
                </div>
              </FieldWrapper>
            </fieldset>

            <div className="button-group">
              <Button type="submit">Register</Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
}

export default CreateUser;
