'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database.types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);

    const { email, password } = data;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
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
          {isLoading ? (
            <>
              <Loader2 className="animate-spin inline-block mr-2" size={16} />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </section>
    </form>
  );
};

export default SignInForm;
