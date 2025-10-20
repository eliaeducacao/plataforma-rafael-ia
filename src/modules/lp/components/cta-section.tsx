import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ArrowRight, Calendar, Play } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Título Principal */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
              Pronto para revolucionar seu escritório?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha a opção que melhor se adapta ao seu ritmo e comece a ver resultados desde o primeiro dia
            </p>
          </div>

          {/* Cards de Opções */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Opção 1: Teste Grátis */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-300"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Play className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Teste Grátis
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg font-medium text-foreground">
                      Se você quer testar a Elia no seu ritmo, sem compromisso:
                    </p>
                    
                    <Button size="lg" className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">
                      Experimente 7 dias grátis
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>✅ Sem cartão. Sem pegadinha.</p>
                      <p>✅ Cancela quando quiser.</p>
                      <p>✅ Acesso completo à plataforma</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opção 2: Demonstração */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-300"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Demonstração
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg font-medium text-foreground">
                      Se você quer ver como a Elia resolve o seu caso específico antes de testar:
                    </p>
                    
                    <Button variant="outline" size="lg" className="w-full text-lg py-6 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      Agende sua demonstração
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>✅ 30 minutos personalizados</p>
                      <p>✅ A gente mostra, você decide</p>
                      <p>✅ Casos específicos da sua área</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mensagem Final */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <p className="text-lg font-semibold text-foreground mb-2">
              Todo dia que você gasta 4 horas formatando petição é um dia que você poderia estar fechando um novo cliente.
            </p>
            <p className="text-muted-foreground">
              A matemática é clara: quanto mais você espera, mais dinheiro você deixa na mesa.
            </p>
          </div>

          {/* Garantia Final */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Garantia de 7 dias - 100% do dinheiro de volta
            </div>
            <p className="text-sm text-muted-foreground">
              Sem condições. Sem perguntas. Sem burocracia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;