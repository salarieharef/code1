import { ClassCreate } from "./class-create.validations";
import { LessonCreate } from "./lesson-create.validations";
import { CommentCreate } from "./comment-create.validations";
import { AccountInfo } from "./account-info.validations";
import { CertificationCreate } from "./certification-create.validations";
import { ClassFileCreate } from "./class-file-create.validations";
import { ClassLinkCreate } from "./class-link-create.validations";
import { BankInfo } from "./bank-info-validation";
import {
  loginValidationSchema,
  signUpValidationSchema,
} from "./authentication.validation";
import { CategoryBaseFormSchema } from "./category/category.validations";
import { UserInfo } from "./user/info.validations";

const validations = {
  CategoryBaseFormSchema,
  ClassCreate,
  LessonCreate,
  CommentCreate,
  AccountInfo,
  CertificationCreate,
  ClassFileCreate,
  ClassLinkCreate,
  //authentication
  loginValidationSchema,
  signUpValidationSchema,
  UserInfo,
  BankInfo,
};

export default validations;
