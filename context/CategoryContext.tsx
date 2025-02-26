"use client"
import { createContext, ReactNode, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Define the context type
interface CategoryContextType {
  categories: number[];
  setCategories: (categories: number[]) => void;
  categoryTags: string;
  setCategoryTags: (tags: string) => void;
  categoryIntroducers: string;
  setCategoryIntroducers: (introducers: string) => void;
}

// Create the CategoryContext with default value
export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export default function CategoryContextProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const paramCategories = searchParams.get("categories");

  // States
  const [categories, setCategories] = useState<number[]>(
    paramCategories ? paramCategories.split(",").map((id) => Number(id)) : []
  );
  const [categoryTags, setCategoryTags] = useState("");
  const [categoryIntroducers, setCategoryIntroducers] = useState("");

  useEffect(() => {
    const paramCategories = searchParams.get("categories");
    const newCategories = paramCategories
      ? paramCategories.split(",").map((id) => Number(id))
      : [];
    setCategories(newCategories);
  }, [searchParams]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        categoryTags,
        setCategoryTags,
        categoryIntroducers,
        setCategoryIntroducers,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
