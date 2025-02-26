"use client";
import { ReactNode, createContext, useState } from "react";

export const global_context = createContext({});

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  type userTypes = "student" | "teacher" | "organ";

  const [signupDialog, setSignupDialog] = useState(false);
  const [teachingHelpDialog, setTeachingHelpDialog] = useState(false);

  const [loginDialog, setLoginDialog] = useState(false);
  const [welcomeDialog, setWelcomeDialog] = useState(false);
  const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);
  const [signupUserType, setSignupUserType] = useState<userTypes>("student");

  const [lessonVideo, setLessonVideo] = useState(false);

  const [dropzoneImageFileSearch, setDropzoneImageFileSearch] = useState(null);

  const [openedLoginDialogFromClassPage, setOpenedLoginDialogFromClassPage] =
    useState(false);

  return (
    <global_context.Provider
      value={{
        signupDialog,
        setSignupDialog,
        teachingHelpDialog,
        setTeachingHelpDialog,
        loginDialog,
        setLoginDialog,
        forgotPasswordDialog,
        setForgotPasswordDialog,
        signupUserType,
        setSignupUserType,
        lessonVideo,
        setLessonVideo,
        openedLoginDialogFromClassPage,
        setOpenedLoginDialogFromClassPage,
        dropzoneImageFileSearch,
        setDropzoneImageFileSearch,
        welcomeDialog,
        setWelcomeDialog,
      }}
    >
      {children}
    </global_context.Provider>
  );
}
