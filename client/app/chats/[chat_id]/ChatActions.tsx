'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';

const schema = yup
  .object()
  .shape({
    content: yup.string().required(),
  })
  .required();

const ChatActions = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { content: string }) => console.log(data);

  return (
    <div className="mt-auto w-full py-6 px-5 border-t-2 border-t-gray-500">
      <form
        className="w-full flex flex-row gap-2 h-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="text-black px-4 py-3 w-full"
          type="text"
          placeholder="Message"
          {...register('content')}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded ml-auto hover:bg-green-700 transition-colors duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatActions;
