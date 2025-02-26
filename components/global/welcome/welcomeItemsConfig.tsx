import React from "react";
import OnlineClassIcon from "@/static/icons/welcome/convert-to-teacher.svg";
import ExamIcon from "@/static/icons/welcome/edit-message-icon.svg";
import ChatIcon from "@/static/icons/welcome/messages-icon.svg";
import FeedbackIcon from "@/static/icons/welcome/teaching-icons.svg";
import { WelcomeItems } from "@/types/welcome.types";

export const welcomeItems: WelcomeItems = {
  organ: [
    {
      icon: <FeedbackIcon className='size-6' />,
      text: "امکان شرکت در کلاس های آنلاین، آفلاین و حضوری",
    },
    {
      icon: <ChatIcon className='size-6' />,
      text: "ایجاد مبحث و یا شرکت در مباحث ایجاد شده",
    },
    {
      icon: <OnlineClassIcon className='size-6' />,
      text: "امکان تغییر کاربری دانشجو به مدرس یا ارگان",
    },
  ],
  student: [
    {
      icon: <OnlineClassIcon className='size-6' />,
      text: "امکان شرکت در کلاس های آنلاین، آفلاین و حضوری",
    },
    {
      icon: <ChatIcon className='size-6' />,
      text: "ایجاد مبحث و یا شرکت در مباحث ایجاد شده",
    },
  ],
  teacher: [
    {
      icon: <OnlineClassIcon className='size-6' />,
      text: "امکان شرکت در کلاس های آنلاین، آفلاین و حضوری",
    },
    {
      icon: <ChatIcon className='size-6' />,
      text: "ایجاد مبحث و یا شرکت در مباحث ایجاد شده",
    },
    {
      icon: <FeedbackIcon className='size-6' />,
      text: "امکان نظردهی دانشجو به مدرس با راکان",
    },
  ],
};
