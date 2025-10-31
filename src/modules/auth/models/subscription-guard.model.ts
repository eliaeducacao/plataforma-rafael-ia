import { useMemo } from 'react';
import { useLocation } from 'wouter';

import { useAuth } from '@/modules/auth/hooks/use-auth';
import type { StripeSubscriptionStatus } from '@/shared/types';

type SubscriptionStatusKey = StripeSubscriptionStatus | 'unknown';

type StatusInfo = {
  title: string;
  description: string;
  sidebarMessage: string;
  tone: string;
  bg: string;
  border: string;
};

const statusMessages: Record<SubscriptionStatusKey, StatusInfo> = {
  active: {
    title: 'Assinatura ativa',
    description: 'Sua assinatura está ativa. Aproveite os recursos da plataforma.',
    sidebarMessage: 'Sua assinatura está ativa.',
    tone: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  trialing: {
    title: 'Período de teste',
    description: 'Você está no período de teste. Explore todos os agentes disponíveis.',
    sidebarMessage: 'Período de teste em andamento.',
    tone: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  past_due: {
    title: 'Pagamento em atraso',
    description: 'Atualize sua forma de pagamento para reativar o acesso aos agentes.',
    sidebarMessage: 'Atualize o pagamento para retomar o acesso.',
    tone: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  canceled: {
    title: 'Assinatura cancelada',
    description: 'Escolha um plano para voltar a usar os agentes especializados.',
    sidebarMessage: 'Selecione um novo plano para retomar o acesso.',
    tone: 'text-muted-foreground',
    bg: 'bg-muted/40',
    border: 'border-muted',
  },
  unpaid: {
    title: 'Assinatura suspensa',
    description: 'Os pagamentos falharam. Atualize o cartão para continuar usando a plataforma.',
    sidebarMessage: 'Atualize o cartão para liberar o acesso.',
    tone: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  incomplete: {
    title: 'Pagamento não finalizado',
    description: 'Finalize o checkout para concluir a contratação do plano.',
    sidebarMessage: 'Finalize o checkout para liberar o acesso.',
    tone: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  incomplete_expired: {
    title: 'Checkout expirado',
    description: 'Inicie um novo checkout para contratar o plano desejado.',
    sidebarMessage: 'Inicie um novo checkout para contratar o plano.',
    tone: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  paused: {
    title: 'Assinatura pausada',
    description: 'Retome sua assinatura para continuar usando os agentes.',
    sidebarMessage: 'Retome a assinatura para liberar o acesso.',
    tone: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  unknown: {
    title: 'Plano indisponível',
    description: 'Não conseguimos identificar o status da assinatura. Acesse a página de planos para regularizar.',
    sidebarMessage: 'Regularize sua assinatura para continuar.',
    tone: 'text-muted-foreground',
    bg: 'bg-muted/40',
    border: 'border-muted',
  },
};

export function useSubscriptionGuardModel() {
  const { user } = useAuth();
  const [currentPath, setLocation] = useLocation();

  const subscriptionStatus = user?.status ?? null;
  const isRestricted = subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing';
  const isOnPlansPage = currentPath.startsWith('/plans');
  const isBlocking = isRestricted && !isOnPlansPage;

  const statusInfo = useMemo(() => {
    const key: SubscriptionStatusKey = subscriptionStatus ?? 'unknown';
    return statusMessages[key];
  }, [subscriptionStatus]);

  function goToPlans() {
    if (!isOnPlansPage) {
      setLocation('/plans');
    }
  }

  function wrap<T extends unknown[], TResult>(handler: (...args: T) => TResult) {
    return (...args: T): TResult | undefined => {
      if (isBlocking) {
        goToPlans();
        return undefined;
      }

      return handler(...args);
    };
  }

  return {
    subscriptionStatus,
    isRestricted,
    isOnPlansPage,
    isBlocking,
    statusInfo,
    goToPlans,
    wrap,
  };
}

export type SubscriptionGuardModel = ReturnType<typeof useSubscriptionGuardModel>;
export type SubscriptionStatusInfo = StatusInfo;

