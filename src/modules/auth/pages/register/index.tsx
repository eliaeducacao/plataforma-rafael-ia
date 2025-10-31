import { useRegisterModel } from "./register.model";
import { RegisterView } from "./register.view";

export default function RegisterViewModel() {
  const methods = useRegisterModel();

  return <RegisterView {...methods} />;
}

