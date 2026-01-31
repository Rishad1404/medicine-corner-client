import AuthBackgroundShape from "@/assets/svg/auth-background-shape";
import { RegisterForm } from "@/components/shadcn-studio/blocks/register-page-01/register-form";


const Register = () => {
  return (
    <div className="relative flex py-20 mb-20 items-center justify-center overflow-x-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Shape */}
      <div className="absolute">
        <AuthBackgroundShape />
      </div>

      {/* The isolated form component */}
      <RegisterForm />
    </div>
  );
};

export default Register;