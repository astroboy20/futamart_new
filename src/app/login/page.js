import AuthLayout from "@/components/authLayout";
import { Login } from "@/container/auth/login/login";

export default function Page() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
