import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useState } from "react";

interface Link {
  type: "link" | "page";
  href?: string;
  label: string;
}

interface BreadcrumbComponentProps {
  links: Link[];
}

export function BreadcrumbComponent({ links }: BreadcrumbComponentProps) {
  const numLinks = links?.length;
  const shouldShowDropdown = numLinks >= 4;

  return (
    <Breadcrumb>
      <BreadcrumbList className='px-3 text-sm text-muted-foreground sm:gap-1'>
        {/* Render the first link */}
        <React.Fragment>
          <BreadcrumbItem>
            {links[0].type === "link" ? (
              <BreadcrumbLink href={links[0].href||""}>
                {links[0].label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className='text-blue-400'>
                {links[0].label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {numLinks > 1 && <BreadcrumbSeparator />}
        </React.Fragment>

        {/* Render middle links in dropdown in mobile view */}
        {shouldShowDropdown && (
          <>
            <BreadcrumbItem className='md:hidden'>
              <DropdownMenu dir='rtl'>
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  <BreadcrumbEllipsis className='h-4 w-4' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {links.slice(1, -1).map((link, idx) => (
                    <DropdownMenuItem dir='rtl' key={idx}>
                      {link.type === "link" ? (
                        <Link href={link.href || ""} className='w-full'>
                          {link.label}
                        </Link>
                      ) : (
                        <span className='w-full'>{link.label}</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            <BreadcrumbSeparator className='md:hidden' />
          </>
        )}

        {/* Render middle links normally in desktop view */}
        {!shouldShowDropdown &&
          links.slice(1, -1).map((link, index) => (
            <React.Fragment key={index + 1}>
              <BreadcrumbItem>
                {link.type === "link" ? (
                  <BreadcrumbLink href={link.href || ""}>
                    {link.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className='text-blue-400'>
                    {link.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}

        {/* Render the last link */}
        <React.Fragment>
          {shouldShowDropdown && (
            <div className='hidden items-center gap-1.5 md:flex'>
              {links.slice(1, -1).map((link, index) => (
                <React.Fragment key={index + 1}>
                  <BreadcrumbItem>
                    {link.type === "link" ? (
                      <BreadcrumbLink href={link.href || ""}>
                        {link.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className='text-blue-400'>
                        {link.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              ))}
            </div>
          )}
          <BreadcrumbItem>
            {links[numLinks - 1].type === "link" ? (
              <BreadcrumbLink href={links[numLinks - 1].href}>
                {links[numLinks - 1].label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className='text-blue-400'>
                {links[numLinks - 1].label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </React.Fragment>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// export function BreadcrumbComponent({
//   links,
//   // dropdownItems,
// }: BreadcrumbComponentProps) {
//   return (
//     <Breadcrumb className='rtl'>
//       <BreadcrumbList className='text-md flex-row-reverse px-3 text-muted-foreground sm:gap-1.5'>
//         {links.slice(0, 1).map((link, index) => (
//           <React.Fragment key={index}>
//             <BreadcrumbItem>
//               {link.type === "link" ? (
//                 <BreadcrumbLink href={link.href||""}>{link.label}</BreadcrumbLink>
//               ) : (
//                 <BreadcrumbPage className='text-blue-400'>
//                   {link.label}
//                 </BreadcrumbPage>
//               )}
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//           </React.Fragment>
//         ))}
//         {/* {dropdownItems ? ( */}
//         <>
//           <BreadcrumbItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger className='flex items-center gap-1'>
//                 <BreadcrumbEllipsis className='h-4 w-4' />
//                 <span className='sr-only'>Toggle menu</span>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align='end'>
//                 {/* {dropdownItems.map((item: any, idx: any) => (
//                   <DropdownMenuItem key={idx}>{item}</DropdownMenuItem>
//                 ))} */}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//         </>
//         {/* ) : (
//           <></>
//         )} */}

// //         {links.slice(1).map((link, index) => (
// //           <React.Fragment key={index + 1}>
// //             <BreadcrumbItem>
// //               {link.type === "link" ? (
// //                 <BreadcrumbLink href={link.href||""}>{link.label}</BreadcrumbLink>
// //               ) : (
// //                 <BreadcrumbPage>{link.label}</BreadcrumbPage>
// //               )}
// //             </BreadcrumbItem>
// //             {index < links.length - 2 && <BreadcrumbSeparator />}
// //           </React.Fragment>
// //         ))}
// //       </BreadcrumbList>
// //     </Breadcrumb>
// //   );
// // }
