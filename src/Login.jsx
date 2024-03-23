import { Form, FormElement, FieldWrapper, Field } from '@progress/kendo-react-form';

import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

import { useState } from 'react';
import React from 'react';

import { useLogin } from './state/mutations';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate('/');
  };

  const login = useLogin({ onSuccess });

  const handleSubmit = (v) => {
    const form = new FormData();
    form.set('email', v.email);
    form.set('password', v.password);

    const data = new URLSearchParams(form);
    login.mutate(data);
  };

  return (
    <div className="login">
      <Form
        onSubmit={handleSubmit}
        render={() => (
          <FormElement>
            <fieldset className="k-form-fieldset">
              <legend className="k-form-legend">Login</legend>
              <FieldWrapper className="k-form-field-wrap">
                <Field
                  labelClassName="k-form-label"
                  label="Email: "
                  name="email"
                  type="email"
                  component={Input}
                  value={email}
                  onChange={(v) => setEmail(v)}
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
                    value={password}
                    onChange={(v) => setPassword(v)}
                  ></Field>
                </div>
              </FieldWrapper>
            </fieldset>

            <div className="button-group">
              <Button type="submit">Login</Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
}

export default Login;
