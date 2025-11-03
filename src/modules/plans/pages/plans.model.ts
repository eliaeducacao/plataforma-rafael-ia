import { api } from '@/shared/lib/axios';
import { Plan, StripeSubscriptionStatus } from '@/shared/types';
import { useMutation, useMutationState, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useMemo } from 'react';

type ApiPlan = {
  id: string;
  description: string;
  features: string[];
  is_popular: string;
  currency: string;
  recurring: string;
  amount: string;
};

function mapPlan(plan: ApiPlan): Plan {
  const recurring = plan.recurring === 'year' ? 'year' : 'month';

  return {
    id: plan.id,
    description: plan.description,
    features: plan.features,
    isPopular: (plan.is_popular ?? '').toLowerCase() === 'true',
    currency: plan.currency,
    recurring,
    amount: plan.amount,
  };
}

// Função para calcular o preço mensal efetivo
function getMonthlyPrice(plan: Plan): number {
  const amount = parseFloat(plan.amount.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
  return plan.recurring === 'year' ? amount / 12 : amount;
}

export function usePlansModel() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await api.get<ApiPlan[]>('/webhook/api/v1/plans');
      return response.data.map(mapPlan);
    },
  });

  // Ordenar planos do mais barato para o mais caro
  const sortedPlans = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const priceA = getMonthlyPrice(a);
      const priceB = getMonthlyPrice(b);
      return priceA - priceB;
    });
  }, [data]);

  const checkoutMutation = useMutation<
    { url: string },
    unknown,
    { planId: string; cancelUrl: string; successUrl: string }
  >({
    mutationKey: ['plans', 'checkout'],
    mutationFn: async variables => {
      const { planId, cancelUrl, successUrl } = variables;
      const endpoint = `/webhook/8d37c0bd-4bb1-485b-8206-88fa4bae5c64/stripe/prices/${planId}/checkout/`;
      const response = await api.post<{ url: string }>(endpoint, {
        cancel_url: cancelUrl,
        success_url: successUrl,
      });
      return response.data;
    },
    onSuccess: data => {
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      toast.error('Não foi possível abrir o checkout. Tente novamente.');
    },
    onError: () => {
      toast.error('Não foi possível iniciar o checkout. Tente novamente.');
    },
  });

  function handleSelectPlan(planId: string) {
    if (checkoutMutation.isPending) {
      return;
    }

    const origin = window.location.origin;
    checkoutMutation.mutate({
      planId,
      cancelUrl: `${origin}/plans?status=cancel`,
      successUrl: `${origin}/plans?status=success`,
    });
  }

  const pendingCheckout = useMutationState({
    filters: { mutationKey: ['plans', 'checkout'], status: 'pending' },
    select: mutation => {
      const variables = mutation.state.variables as { planId?: string } | undefined;
      return variables?.planId ?? null;
    },
  });

  const processingPlanId = pendingCheckout[0] ?? null;
  const rawActivePlanId = user?.plan ?? null;
  const rawSubscriptionId = user?.subscription ?? null;
  const subscriptionStatus = (user?.status ?? null) as StripeSubscriptionStatus | null;
  const criticalStatuses: StripeSubscriptionStatus[] = [
    'past_due',
    'unpaid',
    'incomplete',
    'incomplete_expired',
  ];
  const warningStatuses: StripeSubscriptionStatus[] = ['trialing', 'paused'];

  const isCriticalStatus = subscriptionStatus
    ? criticalStatuses.includes(subscriptionStatus)
    : false;

  const isWarningStatus = subscriptionStatus ? warningStatuses.includes(subscriptionStatus) : false;
  const isSubscriptionCanceled = subscriptionStatus === 'canceled';
  const isSubscriptionActive = subscriptionStatus === 'active' || subscriptionStatus === 'trialing';

  const activePlanId = isSubscriptionCanceled ? null : rawActivePlanId;
  const hasActiveSubscription = isSubscriptionActive && Boolean(rawSubscriptionId);

  return {
    plans: sortedPlans,
    isLoading,
    isError,
    handleSelectPlan,
    isCheckoutLoading: checkoutMutation.isPending,
    processingPlanId,
    activePlanId,
    subscriptionId: rawSubscriptionId,
    subscriptionStatus,
    isCriticalStatus,
    isWarningStatus,
    hasActiveSubscription,
  };
}
