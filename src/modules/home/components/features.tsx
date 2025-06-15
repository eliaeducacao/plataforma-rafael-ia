import { FileText, Scale, Clock, BookOpen, FileCheck, Brain } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: 'Geração de Petições e Contratos',
      description:
        'Criação automatizada de documentos jurídicos com base nas melhores práticas e jurisprudência atualizada',
    },
    {
      icon: Scale,
      title: 'Sugestões para Peças Processuais',
      description:
        'Orientações especializadas para elaboração de contestações, recursos e demais peças do processo',
    },
    {
      icon: Clock,
      title: 'Consultas Rápidas à Legislação',
      description:
        'Acesso instantâneo a leis, decretos e regulamentações com explicações contextualizadas',
    },
    {
      icon: BookOpen,
      title: 'Resumo de Jurisprudência',
      description:
        'Análise e síntese de decisões judiciais relevantes para fundamentar seus argumentos',
    },
    {
      icon: FileCheck,
      title: 'Otimização de Tarefas Administrativas',
      description: 'Automatização de atividades repetitivas para focar no que realmente importa',
    },
    {
      icon: Brain,
      title: 'Análise de Riscos Processuais',
      description: 'Avaliação inteligente de probabilidades de sucesso e estratégias processuais',
    },
  ];

  return (
    <section id="funcionalidades" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Funcionalidades Especializadas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ferramentas de IA jurídica desenvolvidas especificamente para otimizar cada aspecto da
            sua prática advocatícia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg font-semibold text-card-foreground mb-3">{feature.title}</h3>

              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-secondary rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Pronto para Experimentar a Eficiência Processual?
            </h3>
            <p className="text-muted-foreground mb-6">
              Cada funcionalidade foi desenvolvida com prompt engineering jurídico especializado
              para garantir precisão e relevância em suas demandas advocatícias.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Prompt Engineering Jurídico
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Multiplataforma
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Suporte 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
