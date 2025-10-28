import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function CheckEmailView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="max-w-md w-full mx-4 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Verifique seu e-mail
            </CardTitle>
            <CardDescription className="text-base">
              Enviamos um link para criar sua conta
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p>
                Acesse sua caixa de entrada e procure por um e-mail da Elia, verifique a caixa de spam caso não encontre.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p>
                Clique no link enviado para criar sua conta
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p>
                Após criar a conta, você já poderá usar a plataforma
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Não recebeu o e-mail? Verifique sua pasta de spam ou{' '}
              <button className="text-primary hover:underline font-medium">
                reenvie o link
              </button>
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Voltar para o início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

