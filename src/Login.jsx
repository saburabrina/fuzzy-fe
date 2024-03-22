import { Form, FormElement, FieldWrapper, Field } from '@progress/kendo-react-form';

import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

import { useState } from 'react';
import React from 'react';

import { useLogin } from './state/mutations';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useLogin();

  const handleSubmit = (v) => {
    const form = new FormData();
    form.set('email', v.email);
    form.set('password', v.password);

    const data = new URLSearchParams(form);
    login.mutate(data);
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        render={() => (
          <FormElement>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>Login</legend>
              <FieldWrapper className="k-form-field-wrap">
                <Field
                  labelClassName={'k-form-label'}
                  label={'Email: '}
                  name={'email'}
                  component={Input}
                  value={email}
                  onChange={(v) => setEmail(v)}
                ></Field>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    labelClassName={'k-form-label'}
                    label={'Password: '}
                    name={'password'}
                    component={Input}
                    value={password}
                    onChange={(v) => setPassword(v)}
                  ></Field>
                </div>
              </FieldWrapper>
            </fieldset>

            <Button type="submit">Login</Button>
          </FormElement>
        )}
      />
    </div>
  );
}

export default Login;
