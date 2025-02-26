import Login from "@/app/auth/login/page";
import { PaginationType } from "@/types/api-pagination";
import { verify } from "crypto";

const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const userRoutes = {
  changePassword: `${apiHost}/${apiVersion}/change/password`,

  likedCourses: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/liked/courses?page=${page}`,
  likedLessons: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/liked/lessons?page=${page}`,

  savedCourses: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/saved/courses?page=${page}`,
  savedLessons: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/saved/lessons?page=${page}`,

  viewedCourses: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/viewed/courses?page=${page}`,
  viewedLessons: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/viewed/lessons?page=${page}`,

  recommendationCourses: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/recommendation/courses?page=${page}`,
  recommendationLessons: ({ page = 1, limit }: PaginationType) =>
    `${apiHost}/${apiVersion}/user/recommendation/lessons?page=${page}`,

  details: (id: any) => `${apiHost}/${apiVersion}/user/${id}/details`,
  me: `${apiHost}/${apiVersion}/user/me`,
  edit: `${apiHost}/${apiVersion}/user/edit`,
  avatar: `${apiHost}/${apiVersion}/user/upload/image`,
  remove: `${apiHost}/${apiVersion}/user/remove/image`,

  certificates: (id: any, page: number = 1) =>
    `${apiHost}/${apiVersion}/user/${id}/certificates?page=${page}`,
  addCertificate: `${apiHost}/${apiVersion}/user/certificates/add`,
  removeCertificate: (id: any) =>
    `${apiHost}/${apiVersion}/user/certificates/${id}/remove`,

  uploadEducation: `${apiHost}/${apiVersion}/user/upload/education`,

  uploadIntroductionVideo: `${apiHost}/${apiVersion}/user/upload/introduction_video`,
  removeIntroductionVideo: `${apiHost}/${apiVersion}/user/remove/introduction_video`,

  uploadResume: `${apiHost}/${apiVersion}/user/upload/resume`,
  removeResume: `${apiHost}/${apiVersion}/user/remove/resume`,

  achievements: (id: any, page: number = 1) =>
    `${apiHost}/${apiVersion}/user/${id}/achievements?page=${page}`,

  follow: `${apiHost}/${apiVersion}/user/follow`,
  unFollow: `${apiHost}/${apiVersion}/user/unfollow`,

  //
  // check-Login
  checkLogin: `${apiHost}/${apiVersion}/login/check`,
  checkVerify: `${apiHost}/${apiVersion}/login/check/verify`,

  // check-verify
};
