import { useLoginModel } from "./login.model";
import { LoginView } from "./login.view";

export default function LoginViewModel() {
  const methods = useLoginModel();

  return <LoginView {...methods} />;
}