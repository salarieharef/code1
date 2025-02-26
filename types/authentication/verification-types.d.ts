// types.ts
import { SubmitHandler } from 'react-hook-form';

export interface VerificationFormProps {
  openedLoginDialogFromClassPage?: boolean;
}

export interface FormInputs {
  first_name?: string;
  last_name?: string;
  user_type?: string;
  number: string;
  rules_agreed?: boolean;
  organ_name?: string;
  organ_type?: string;
  otp?: string;
}

export interface CountryType {
  id: string;
  name: string;
  code: string;
  image: string;
}

export interface VerificationFunctionsProps {
  form: any;
  submitForm: any;
  setIsNewUser: (value: boolean) => void;
  setValidationStep: (value: boolean) => void;
  setSignupStep: (value: boolean) => void;
  setNewUser: (value: any) => void;
  toast: any;
  searchParams: any;
  router: any;
  newUser?: any;
}