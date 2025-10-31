import { ReactNode } from 'react';

import { AlertTriangle } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import type { SubscriptionStatusInfo } from '@/modules/auth/models/subscription-guard.model';

type SubscriptionGateProps = {
  isBlocking: boolean;
  statusInfo: SubscriptionStatusInfo;
  onManageSubscription: () => void;
  children: ReactNode;
};

export function SubscriptionGate({
  isBlocking,
  statusInfo,
  onManageSubscription,
  children,
}: SubscriptionGateProps) {
  if (!isBlocking) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div
        className={`flex w-full max-w-xl flex-col items-center rounded-3xl border ${statusInfo.border} ${statusInfo.bg} px-8 py-10 text-center shadow-sm`}
      >
        <AlertTriangle className={`mb-4 h-10 w-10 ${statusInfo.tone}`} />
        <h2 className="text-2xl font-semibold text-foreground">
          {statusInfo.title}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {statusInfo.description}
        </p>
        <Button className="mt-6" size="lg" onClick={onManageSubscription}>
          Gerenciar assinatura
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Se você já regularizou o pagamento, aguarde alguns minutos e recarregue a página.
      </p>
    </div>
  );
}


