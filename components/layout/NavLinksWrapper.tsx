"use client";
import { useWindowScroll } from "@mantine/hooks";
import { memo, useEffect, useState } from "react";
import { NavLinks } from "./nav-links";

const MemoizedNavLinks = memo(NavLinks);

export default function NavLinksWrapper() {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [scroll] = useWindowScroll();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollTop = scroll.y;

        if (currentScrollTop > lastScrollPosition && currentScrollTop > 100) {
          setHideNav(true);
        } else if (currentScrollTop < lastScrollPosition) {
          setHideNav(false);
        }

        setLastScrollPosition(currentScrollTop <= 0 ? 0 : currentScrollTop);
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll.y, lastScrollPosition]);

  return (
    <div
      className={`z-20 hidden transform transition-all duration-500 ${hideNav ? "invisible  -translate-y-full" : "visible translate-y-0 opacity-100"} will-change-opacity w-full flex-col bg-white px-7 py-2 will-change-transform dark:bg-slate-900 sm:flex`}
    >
      <div className='h-full w-full justify-between sm:flex'>
        <MemoizedNavLinks />
      </div>
    </div>
  );
}
