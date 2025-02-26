"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import React from "react";

interface Link {
  type: "link" | "page";
  href?: string;
  label: string;
}

interface BreadcrumbSpecialProps {
  links: Link[];
}

export function BreadcrumbSpecial({
  links,
}: BreadcrumbSpecialProps) {
  const numLinks = links?.length;

  // Only show the first link if we're on the first page
  if (numLinks === 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList className='px-3 text-sm text-muted-foreground sm:gap-1'>
          <BreadcrumbItem>
            <BreadcrumbPage className='text-blue-400'>
              {links[0].label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className='px-3 text-sm text-muted-foreground sm:gap-1'>
        {/* Render all links */}
        {links.map((link, index) => (
          <React.Fragment key={index}>
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
            {index < numLinks - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
