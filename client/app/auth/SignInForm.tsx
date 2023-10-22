'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  })
  .required();

const SignInForm = () => {
  const {} = useForm({});

  return (
    <form>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
