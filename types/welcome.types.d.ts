import { ReactNode } from "react";

export type UserType = "organ" | "student" | "teacher";

export interface WelcomeItem {
  icon: ReactNode;
  text: string;
}

export type WelcomeItems = {
  [K in UserType]: WelcomeItem[];
};
