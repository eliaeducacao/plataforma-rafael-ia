import { useResetPassModel } from "./reset-pass.model";
import { ResetPassView } from "./reset-pass.view";

export default function ResetPassViewModel() {
  const methods = useResetPassModel();

  return <ResetPassView {...methods} />;
}