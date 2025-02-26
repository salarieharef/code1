// Component imports
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";

// Util imports

export default function Links({ links, title }: any) {
  const addHttpToLink = (link: string) => {
    const regex = /^(http|https):\/\//i;
    if (!regex.test(link)) {
      return `http://${link}`;
    }
    return link;
  };

  return (
    <div className='text-medium flex flex-wrap items-center justify-between px-4 py-2'>
      <span>{title}</span>
      {links?.length ? (
        <div className='flex flex-wrap gap-1'>
          {links.map((item: any, index: number) => (
            <a href={addHttpToLink(item.link)} key={index} target='_blank'>
              <Button className='h-6 rounded-full bg-gradient-to-b from-indigo-300 to-blue-500 px-4 text-sm font-medium text-white shadow'>
                {item.title}
              </Button>
            </a>
          ))}
        </div>
      ) : (
        <Skeleton className='h-8 w-full' />
      )}
    </div>
  );
}
