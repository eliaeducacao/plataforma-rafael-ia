import { useAcademyModel } from './model';
import { AcademyView } from './view';

export default function AcademyViewModel() {
  const methods = useAcademyModel();

  return <AcademyView {...methods} />;
}
