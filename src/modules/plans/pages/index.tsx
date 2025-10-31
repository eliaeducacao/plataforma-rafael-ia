import { usePlansModel } from './plans.model';
import { PlansView } from './plans.view';

export default function PlansPage() {
  const methods = usePlansModel();

  return <PlansView {...methods} />;
}

