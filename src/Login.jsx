import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { 
    Form,
    FormElement,
    FieldWrapper,
    Field
} from "@progress/kendo-react-form";

import axios from "axios";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { useState, useRef } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = useMutation(
        {mutationFn: data => {
            return axios.post("http://localhost:3000/sessions", data, { withCredentials: true })
        },
        onSuccess: res => {
            window.headers = res.headers
            console.log(res.headers.get('Set-Cookie'));
        }
    })

    const handleSubmit = (v) => {
        const form = new FormData();
        form.set("email", v.email);
        form.set("password", v.password);
        const data = new URLSearchParams(form);
        login.mutate(data);
    }

    return (
        <div>
            <Form
                onSubmit={handleSubmit}
                render={(formProps) => (
                    <FormElement>
                        Login
                        <FieldWrapper>
                            <Field
                                name={"email"}
                                component={Input}
                                label={"Email: "}
                                value={email}
                                onChange={(v)=> setEmail(v)}
                            ></Field>
                        </FieldWrapper>
                        
                        <FieldWrapper>
                            <div className="k-form-field-wrap">
                                <Field
                                    name={"password"}
                                    component={Input}
                                    labelClassName={"k-form-label"}
                                    label={"Password: "}
                                    value={password}
                                    onChange={(v)=>setPassword(v)}
                                ></Field>
                            </div>
                        </FieldWrapper>
                        <Button type="submit">Login</Button>
                </FormElement> 
                )} />
        </div>
    )
}

export default Login