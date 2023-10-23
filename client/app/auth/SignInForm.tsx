'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database.types';
import { useRouter } from 'next/navigation';

const schema = yup
  .object()
  .shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      alert(JSON.stringify(data, null, 2));
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-8 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" {...register('email')} />
        <p className="text-red-500">{errors.email?.message}</p>
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" {...register('password')} />
        <p className="text-red-500">{errors.password?.message}</p>
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
