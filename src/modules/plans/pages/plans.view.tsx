import { usePlansModel } from './plans.model';
import { PlanCard } from '../components/plan-card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { cn } from '@/shared/lib/utils';
import type { StripeSubscriptionStatus } from '@/shared/types';

export function PlansView(props: ReturnType<typeof usePlansModel>) {
  const {
    plans,
    isLoading,
    isError,
    handleSelectPlan,
    isCheckoutLoading,
    processingPlanId,
    activePlanId,
    subscriptionStatus,
    hasActiveSubscription,
  } = props;

  const statusMessages: Record<StripeSubscriptionStatus, { message: string; tone: string; bg: string; border: string }> = {
    active: {
      message: 'Assinatura ativa e em dia.',
      tone: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    trialing: {
      message: 'Período de avaliação em andamento. Aproveite para testar todos os agentes.',
      tone: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    paused: {
      message: 'Sua assinatura está pausada. Retome o plano quando quiser continuar.',
      tone: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    past_due: {
      message: 'Pagamento pendente. Atualize sua forma de pagamento para evitar interrupções.',
      tone: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    unpaid: {
      message: 'Assinatura suspensa por falta de pagamento. Atualize o cartão para reativar.',
      tone: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    incomplete: {
      message: 'Checkout não foi concluído. Finalize o processo para ativar sua assinatura.',
      tone: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    incomplete_expired: {
      message: 'Checkout expirado. Inicie um novo fluxo para contratar o plano.',
      tone: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    canceled: {
      message: 'Assinatura cancelada. Escolha um plano para retomar o acesso completo.',
      tone: 'text-muted-foreground',
      bg: 'bg-muted/40',
      border: 'border-muted',
    },
  };

  const statusBannerConfig = subscriptionStatus ? statusMessages[subscriptionStatus] : null;

  return (
    <div className="px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-3 text-center md:text-left">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            Planos Elia AI
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Escolha o plano ideal para o seu escritório
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Todos os planos oferecem acesso completo aos agentes especialistas e à nossa plataforma. Em breve você poderá concluir a contratação diretamente por aqui.
          </p>
        </header>

        {statusBannerConfig && (
          <div
            className={cn(
              'w-full rounded-2xl border px-5 py-4 text-sm shadow-sm',
              statusBannerConfig.bg,
              statusBannerConfig.border
            )}
          >
            <p className={cn('font-medium', statusBannerConfig.tone)}>
              {statusBannerConfig.message}
            </p>
          </div>
        )}

        {isError && (
          <Alert variant="destructive" className="mx-auto w-full max-w-3xl">
            <AlertDescription>
              Não foi possível carregar os planos no momento. Tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="space-y-4 rounded-xl border border-muted bg-card p-6">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-2/5" />
                <Skeleton className="h-4 w-3/4" />
                <div className="space-y-3 pt-4">
                  {Array.from({ length: 4 }).map((__, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-11 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => {
              const isPlanProcessing = processingPlanId === plan.id && isCheckoutLoading;
              const isCurrentPlan = activePlanId === plan.id;

              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={handleSelectPlan}
                  disabled={isPlanProcessing || isCurrentPlan}
                  isLoading={isPlanProcessing}
                  isCurrentPlan={isCurrentPlan}
                  hasActiveSubscription={hasActiveSubscription}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

