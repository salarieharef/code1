'use client';
import { ReactNode, createContext, useState } from 'react';

export const Tools_context = createContext({});

export default function ToolsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Tools_context.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </Tools_context.Provider>
  );
}
