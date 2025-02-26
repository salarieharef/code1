"use client";

import HelpImg from "@/static/images/global/help.webp";
import Image from "next/image";

// Component imports
import SearchForm from "./search-form";

// Fetch imports

export default function SearchHero() {
  //   const {
  //     data: helps,
  //     error,
  //     isLoading,
  //   } = useSWR(
  //     routes.helpRoutes.helps({ sort: "most_viewed", limit: 5 })?.url,
  //     apiFetcher,
  //     {
  //       revalidateOnFocus: false,
  //     }
  //   );

  return (
    <section
      className='relative flex w-full flex-col items-center justify-center px-4 py-24 lg:py-48'
      id='search'
    >
      <Image
        src={HelpImg}
        alt='Help Background'
        layout='fill'
        objectFit='cover'
        objectPosition='left'
        className='absolute inset-0 z-0'
      />
      <div className='relative z-10 flex w-full flex-col items-center justify-center'>
        <h1 className='mb-8 text-xl font-bold text-white md:text-4xl'>
          چطوری میتونیم کمکت کنیم؟
        </h1>
        <SearchForm />
      </div>

      {/* <div className="flex flex-col md:flex-row items-center gap-x-2 text-white mt-4">
				<span>محبوب‌ترین موضوعات کمکی:</span>
				<ul className="flex items-center gap-x-1">
					{isLoading ? (
						<Skeleton className="w-24 h-4" />
					) : (
						helps?.data?.map((help: any, i: number) => (
							<li key={i}>
								<Link href={`/help/${help?.id}`} className="hover:underline">
									{help?.title}
								</Link>
							</li>
						))
					)}
				</ul>
			</div> */}
    </section>
  );
}
