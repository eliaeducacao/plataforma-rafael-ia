import { useEmailToResetPassModel } from "./email-to-reset-pass.model";
import { EmailToResetPassView } from "./email-to-reset-pass.view";

export default function EmailToResetPassViewModel() {
  const methods = useEmailToResetPassModel();

  return <EmailToResetPassView {...methods} />;
}