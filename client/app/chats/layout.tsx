export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-[100vh] bg-gray-500 w-full gap-6">
      {/* Header */}
      <section className="w-full flex flex-row gap-2 py-8 px-8 border-b border-b-gray-200">
        <p>Back</p>
        <p>Avatar</p>
        <p>Name</p>
        <p className="ml-auto">Settings</p>
      </section>

      {children}
    </main>
  );
}
