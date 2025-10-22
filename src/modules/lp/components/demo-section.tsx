import { Badge } from "@/shared/components/ui/badge";
import { Avatar } from "@/shared/components/ui/avatar";
import { User, Bot, CheckCircle, Building2 } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="relative py-4 overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="text-base px-8 py-4 bg-background border-border">
            <Building2 className="size-6! mr-3 text-primary shrink-0" />
            <span className="text-foreground font-medium">Por que escritórios escolhem Elia</span>
          </Badge>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Seu cliente envia o caso às{" "}
            <span className="text-purple-600 dark:text-purple-400">14h</span>. Às{" "}
            <span className="text-purple-600 dark:text-purple-400">14h03</span>{" "}
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
        <div className="max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div className="bg-background border border-border rounded-xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">Agente Diagnóstico</h3>
                  <p className="text-sm text-muted-foreground">Online • Banco Itaú</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6">
              {/* User Message */}
              <div className="flex gap-3 w-full justify-end">
                <div className="flex flex-col min-w-0 max-w-[75%] items-end">
                  <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 lg:px-5 lg:py-3 text-sm lg:text-base">
                    <p className="mb-2">
                      <strong>Cliente:</strong> Banco Itaú
                    </p>
                    <p>
                      Caso: Desconto indevido por título de capitalização (Banco Itaú) | Cliente relata que recebe seu benefício pelo Banco Itaú e, após realizar a prova de vida em 2024, passou a ter descontos mensais de R$ 90,00 (12/60) referentes a um título de capitalização que afirma não ter contratado. Desde o ano passado vem solicitando o cancelamento diretamente na agência, sem sucesso. No dia 24/07/2025, voltou à agência, solicitou novamente o cancelamento e foi informada de que o produto foi finalmente cancelado no dia 26/07, porém o valor devolvido foi apenas parcial. Informa que não recebeu protocolo de atendimento, não autorizou contratação, e segue sem o ressarcimento integral dos valores descontados.
                    </p>
                  </div>
                </div>
                <Avatar className="h-10 w-10 bg-muted text-muted-foreground flex-shrink-0 mt-1 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </Avatar>
              </div>

              {/* Bot Response with Timeline */}
              <div className="flex gap-3 w-full justify-start">
                <Avatar className="h-10 w-10 bg-primary text-primary-foreground flex-shrink-0 mt-1 flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </Avatar>
                <div className="flex flex-col min-w-0 max-w-[75%]">
                  {/* Timeline Container */}
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>

                    {/* Timeline Steps */}
                    <div className="space-y-6 lg:space-y-8">
                      {/* Step 1: Analyzing Case - Completed */}
                      <div className="relative flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-green-50 text-green-800 rounded-lg px-4 py-3 text-sm">
                            <span className="font-medium">Analisando caso enviado...</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 2: Researching Similar Cases - Completed */}
                      <div className="relative flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-green-50 text-green-800 rounded-lg px-4 py-3 text-sm">
                            <span className="font-medium">Pesquisando casos semelhantes...</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Montando diagnóstico - Completed */}
                      <div className="relative flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-green-50 text-green-800 rounded-lg px-4 py-3 text-sm">
                            <span className="font-medium">Montando diagnóstico...</span>
                          </div>
                        </div>
                      </div>

                      {/* Resposta Completa do Bot */}
                      <div className="relative flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                          <CheckCircle className="h-5 w-5 lg:h-5 lg:w-5 text-primary" />
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 lg:px-5 lg:py-3 text-sm lg:text-base">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-semibold text-primary">Análise concluída em 2min 47s</span>
                            </div>

                            <div className="space-y-3 text-foreground">
                              <div>
                                <p className="font-semibold mb-2">📝 Resumo da Situação Apresentada</p>
                                <p className="leading-relaxed">
                                  O cliente, que recebe seu benefício pelo Banco Itaú, começou a notar descontos mensais indevidos de R$ 90,00 referentes a um título de capitalização, após realizar a prova de vida em 2024. O cliente insiste que não contratou tal título. Desde o ano passado, tenta sem sucesso cancelar essa cobrança diretamente na agência. Em 24/07/2025, voltou à agência e foi informado que o produto foi cancelado, mas o reembolso foi apenas parcial. Não recebeu protocolo de atendimento, não autorizou a contratação, e ainda não obteve o ressarcimento integral dos valores.
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold mb-2">⚖️ Área do Direito Envolvida</p>
                                <p>Direito do Consumidor</p>
                              </div>

                              <div>
                                <p className="font-semibold mb-2">🧠 Possível Tese Aplicável</p>
                                <p className="leading-relaxed">
                                  A tese mais apropriada aqui seria a de cobrança indevida, conforme previsto no Código de Defesa do Consumidor (CDC). O cliente poderá requerer a devolução em dobro dos valores pagos, caso se comprove que a cobrança foi feita de forma injustificada e que houve má-fé por parte do banco. Além disso, pode ser argumentado vício do serviço por ausência de manifestação de vontade na contratação do produto (no caso, o título de capitalização).
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold mb-2">📂 Documentos ou Provas Recomendados</p>
                                <ul className="space-y-1">
                                  <li>• Extratos bancários demonstrando os débitos mensais</li>
                                  <li>• Registro ou qualquer documentação relacionada às interações na agência</li>
                                  <li>• Prova dos benefícios recebidos</li>
                                  <li>• Cópia do documento da prova de vida realizada</li>
                                  <li>• Qualquer correspondência ou comprovante, ainda que informal, de contato com o banco</li>
                                </ul>
                              </div>

                              <div>
                                <p className="font-semibold mb-2">📈 Grau de Viabilidade Inicial</p>
                                <p className="leading-relaxed">
                                  Viabilidade condicionada à prova – A tese de cobrança indevida e solicitação de ressarcimento em dobro é plausível, mas dependerá de demonstração clara da falta de autorização para a contratação e do histórico de tentativas de cancelamento.
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold mb-2">🧭 Próximos Passos Sugeridos</p>
                                <ul className="space-y-1">
                                  <li>• Colete todos os documentos e comprovantes necessários para embasar a reclamação.</li>
                                  <li>• Formule um pedido formal de ressarcimento ao banco, incluindo a devolução em dobro dos valores, e envie por meio formal (carta registrada com AR, por exemplo).</li>
                                  <li>• Caso o banco não responda de forma satisfatória, considere acionar o Procon ou entrar com uma ação judicial.</li>
                                  <li>• Avalie a possibilidade de resolução extrajudicial com um mediador ou árbitro, caso o cliente deseje uma solução mais rápida.</li>
                                </ul>
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
        </div>

        {/* Transição Final */}
        <div className="text-center mt-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Esse diagnóstico foi gerado pelo <span className="font-bold text-primary">Agente Diagnóstico</span> — 1 dos 8 agentes especializados que cobrem todo o fluxo jurídico do seu escritório.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;