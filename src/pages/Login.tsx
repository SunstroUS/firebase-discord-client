import React from "react";
// @ts-ignore
import { useForm, useField } from "react-form";

import { auth } from "../firebase";

interface SubmitProps {
  username: string;
  password: string;
}

const UsernameInput = () => {
  const { getInputProps } = useField("username");

  return <input type="text" {...getInputProps()} />;
};

const PasswordInput = () => {
  const { getInputProps } = useField("password");

  return <input type="password" {...getInputProps()} />;
};

const Login = () => {
  const { Form } = useForm({
    onSubmit: async ({ username, password }: SubmitProps) => {
      try {
        if (!username || !password)
          throw Error("Missing username and/or password");

        await auth.signInWithEmailAndPassword(username, password);
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <Form>
        <span>
          Username: <UsernameInput />
        </span>
        <span>
          Password: <PasswordInput />
        </span>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;
