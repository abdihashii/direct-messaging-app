import NewChatForm from './NewChatForm';

export default async function NewChatPage() {
  return (
    <section className="h-screen justify-center flex flex-col gap-8 px-8">
      <h1 className="text-2xl font-semibold">Create a new chat room</h1>

      <NewChatForm />
    </section>
  );
}
