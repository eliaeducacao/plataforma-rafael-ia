import { useHomeModel } from "./home.model";
import { HomeView } from "./home.view";

export default function HomeViewModel() {
  const methods = useHomeModel();

  return <HomeView {...methods} />;
}