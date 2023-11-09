import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingChatRooms() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <Skeleton className="ml-auto flex h-20 w-[60%] flex-col gap-2 rounded-md border border-gray-500 p-2" />
      <Skeleton className="flex h-20 w-[60%] flex-col items-start gap-2 rounded-md border border-gray-500 p-2" />
      <Skeleton className="ml-auto flex h-20 w-[60%] flex-col gap-2 rounded-md border border-gray-500 p-2" />
      <Skeleton className="flex h-20 w-[60%] flex-col items-start gap-2 rounded-md border border-gray-500 p-2" />
    </section>
  );
}
