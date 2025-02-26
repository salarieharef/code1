import { VerificationForm } from "@/components/authentication/verification-form";
import AuthCover from "@/components/authentication/AuthCover";

export default function Login() {
  return (
    <div className='grid h-screen items-center overflow-hidden bg-white md:grid-cols-2 md:flex-row'>
      <div className='lg:mx-auto lg:w-3/4'>
        <VerificationForm />
      </div>
      <AuthCover />
    </div>
  );
}
