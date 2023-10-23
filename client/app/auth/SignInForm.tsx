'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <form className="flex flex-col gap-8 w-full">
      <section className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" />
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" />
      </section>

      <section>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </section>
    </form>
  );
};

export default SignInForm;
