import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingChatRooms() {
  return (
    <div className="flex h-full flex-col py-10">
      <section className="flex flex-col gap-4">
        <Skeleton className="mx-auto flex h-[3.625rem] w-10/12 flex-col gap-2 rounded-md border border-black" />
        <Skeleton className="mx-auto flex h-[3.625rem] w-10/12 flex-col gap-2 rounded-md border border-black" />
        <Skeleton className="mx-auto flex h-[3.625rem] w-10/12 flex-col gap-2 rounded-md border border-black" />
      </section>
    </div>
  );
}
