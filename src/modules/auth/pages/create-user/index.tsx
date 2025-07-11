import { useCreateUserModel } from "./create-user.model";
import { CreateUserView } from "./create-user.view";

export default function CreateUserViewModel() {
  const methods = useCreateUserModel();

  return <CreateUserView {...methods} />;
}