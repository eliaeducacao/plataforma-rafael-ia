import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { DynamicIcon } from '../lib/icon-utils';
import { RefreshCcw } from 'lucide-react';

interface MaintenancePageProps {
  title?: string;
  description?: string;
  estimatedTime?: string;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({
  title = "Site em Manutenção",
  description = "Estamos trabalhando para melhorar sua experiência. Em breve estaremos de volta com novidades!",
  estimatedTime = "2-3 horas",
  showRefreshButton = true,
  onRefresh
}) => {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center border-0 shadow-2xl bg-background/95 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <DynamicIcon
                name="brain"
                className="h-10 w-10 text-primary"
                size={40}
              />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <DynamicIcon name="calendar" className="h-4 w-4" size={16} />
              <span>Tempo estimado: {estimatedTime}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <span>Manutenção em andamento</span>
              </div>

              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>

            {showRefreshButton && (
              <Button
                onClick={handleRefresh}
                className="w-full"
                variant="outline"
              >
                <RefreshCcw className="w-4 h-4" />
                Tentar novamente
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Agradecemos sua paciência durante este processo
          </p>
        </div>
      </div>
    </div>
  );
}; 