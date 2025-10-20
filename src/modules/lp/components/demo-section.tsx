import { Badge } from "@/shared/components/ui/badge";
import { Avatar } from "@/shared/components/ui/avatar";
import { User, Bot, Search, CheckCircle, FileText, Shield, Clock, Loader2, Building2 } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-sm px-6 py-3 bg-background border-border">
            <Building2 className="w-4 h-4 mr-2 text-primary" />
            <span className="text-foreground font-medium">Por que escritórios escolhem Elia</span>
          </Badge>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Seu cliente envia o caso às{" "}
            <span className="text-amber-600 dark:text-amber-400">14h</span>. Às{" "}
            <span className="text-amber-600 dark:text-amber-400">14h03</span>{" "}
            você responde com diagnóstico completo
          </h2>

          <div className="space-y-6">
            <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
              Seu concorrente ainda nem visualizou a mensagem
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Velocidade impressiona. Profundidade convence. Elia entrega os dois — e o cliente percebe a diferença antes de falar com mais alguém
            </p>
          </div>
        </div>

        {/* Micro-título */}
        <div className="text-center mb-16">
          <p className="text-lg text-muted-foreground font-medium">
            Veja um caso real analisado pela Elia:
          </p>
        </div>

        {/* Chat Interface com Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-background border border-border rounded-xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">Agente Diagnóstico</h3>
                  <p className="text-sm text-muted-foreground">Online • Banco Itaú</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>14:00</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6">
              {/* User Message */}
              <div className="flex gap-3 w-full justify-end">
                <div className="flex flex-col min-w-0 max-w-[75%] items-end">
                  <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm">
                    <p className="mb-2">
                      <strong>Cliente:</strong> Banco Itaú
                    </p>
                    <p>
                      "Preciso de ajuda com um caso de cobrança indevida. O cliente está sendo cobrado por um empréstimo que não contratou. Temos os documentos que comprovam que a assinatura é falsa. Como proceder?"
                    </p>
                  </div>
                </div>
                <Avatar className="h-6 w-6 bg-muted text-muted-foreground flex-shrink-0 mt-1 flex items-center justify-center">
                  <User className="h-3 w-3" />
                </Avatar>
              </div>

              {/* Bot Response with Timeline */}
              <div className="flex gap-3 w-full justify-start">
                <Avatar className="h-6 w-6 bg-primary text-primary-foreground flex-shrink-0 mt-1 flex items-center justify-center">
                  <Bot className="h-3 w-3" />
                </Avatar>
                <div className="flex flex-col min-w-0 max-w-[75%]">
                  {/* Timeline Container */}
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>

                    {/* Timeline Steps */}
                    <div className="space-y-8">
                      {/* Step 1: Searching */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-background">
                          <Search className="h-5 w-5 text-muted-foreground animate-pulse" />
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 text-sm">
                            <span className="font-medium">Buscando documentos relevantes...</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 2: Analyzing */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-background">
                          <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 text-sm">
                            <span className="font-medium">Analisando jurisprudência...</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Diagnóstico */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-amber-50 dark:bg-amber-950/20 rounded-full flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                          <CheckCircle className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-amber-900 dark:text-amber-100">DIAGNÓSTICO JURÍDICO</span>
                            </div>
                            <p className="text-amber-800 dark:text-amber-200">
                              Caso de cobrança indevida com indícios de falsidade ideológica. Cliente tem direito à restituição integral dos valores pagos + danos morais.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Tese */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-slate-50 dark:bg-slate-900/30 rounded-full flex items-center justify-center border-2 border-slate-300 dark:border-slate-700">
                          <FileText className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-slate-900 dark:text-slate-100">TESE JURÍDICA</span>
                            </div>
                            <p className="text-slate-800 dark:text-slate-200">
                              Art. 186 do CC + Art. 5º, X da CF. Responsabilidade objetiva do banco por danos decorrentes de falha na verificação de autenticidade.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step 5: Provas */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 dark:bg-indigo-950/20 rounded-full flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-800">
                          <Shield className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/10 dark:to-blue-950/10 border border-indigo-200 dark:border-indigo-800 rounded-lg px-4 py-3 text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-indigo-900 dark:text-indigo-100">PROVAS SUGERIDAS</span>
                            </div>
                            <ul className="text-indigo-800 dark:text-indigo-200 space-y-1">
                              <li>• Perícia grafotécnica</li>
                              <li>• Extratos bancários</li>
                              <li>• Testemunhas</li>
                              <li>• Histórico de relacionamento</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Final Status */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-primary">Análise concluída em 2min 47s</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transição Final */}
        <div className="text-center mt-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Esse diagnóstico foi gerado pelo <span className="font-bold text-amber-600 dark:text-amber-400">Agente Diagnóstico</span> — 1 dos 8 agentes especializados que cobrem todo o fluxo jurídico do seu escritório.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;