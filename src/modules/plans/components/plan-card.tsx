import { Plan } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface PlanCardProps {
  plan: Plan;
  onSelect: (planId: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isCurrentPlan?: boolean;
  hasActiveSubscription?: boolean;
}

export function PlanCard({
  plan,
  onSelect,
  disabled = false,
  isLoading = false,
  isCurrentPlan = false,
  hasActiveSubscription = false,
}: PlanCardProps) {
  const frequencyLabel = plan.recurring === 'month' ? 'mês' : 'ano';

  return (
    <Card
      className={cn(
        'relative h-full border-muted bg-gradient-to-br from-background via-background to-muted/30 transition-all duration-200 hover:border-primary/60 hover:shadow-lg',
        plan.isPopular &&
        'border-primary/80 shadow-xl shadow-primary/10 ring-1 ring-primary/20 via-primary/5',
        isCurrentPlan && 'border-emerald-500 shadow-emerald-500/20 hover:border-emerald-500/90'
      )}
    >
      {(plan.isPopular || isCurrentPlan) && (
        <Badge
          variant="secondary"
          className={cn(
            'absolute right-6 top-6 text-primary-foreground shadow-md',
            isCurrentPlan ? 'bg-emerald-500' : 'bg-primary'
          )}
        >
          {isCurrentPlan ? 'Plano Atual' : 'Mais Popular'}
        </Badge>
      )}

      <CardHeader className="space-y-2 pb-0">
        <CardTitle className="text-2xl font-semibold text-foreground">
          {plan.recurring === 'month' ? 'Plano Mensal' : 'Plano Anual'}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">
          {plan.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        <div className="space-y-1">
          <p className="text-4xl font-bold tracking-tight text-primary">
            {plan.amount}
            <span className="ml-1 text-base font-medium text-muted-foreground">
              /{frequencyLabel}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Cobrança recorrente {frequencyLabel === 'mês' ? 'mensal' : 'anual'}.
          </p>
        </div>

        <div className="space-y-3">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          className="w-full text-base"
          size="lg"
          onClick={() => onSelect(plan.id)}
          disabled={disabled}
          variant={isCurrentPlan ? 'outline' : 'default'}
        >
          {isCurrentPlan
            ? hasActiveSubscription
              ? 'Plano ativo'
              : 'Plano selecionado'
            : isLoading
              ? 'Processando...'
              : 'Selecionar plano'}
        </Button>
      </CardFooter>
    </Card>
  );
}

