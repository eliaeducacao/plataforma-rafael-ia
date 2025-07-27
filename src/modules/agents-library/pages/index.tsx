import { useAgentsModel } from './agents.model';
import { AgentsView } from './agents.view';

export default function ReportsPage() {
  const methods = useAgentsModel();

  return <AgentsView {...methods} />;
}
