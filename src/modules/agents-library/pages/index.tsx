import { useAgentsModel } from './agents.model';
import { AgentsView } from './agents.view';
import { MaintenancePage } from '@/shared/components/maintenance-page';

export default function ReportsPage() {
  const inMaintenance = true;
  const methods = useAgentsModel();

  if (inMaintenance) {
    return (
      <MaintenancePage
        title="Biblioteca de Agentes em Manutenção"
        description="Estamos atualizando nossa biblioteca de agentes para trazer mais funcionalidades e melhor performance."
        estimatedTime="1-2 horas"
      />
    );
  }

  return <AgentsView {...methods} />;
}
