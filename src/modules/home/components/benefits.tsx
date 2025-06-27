import { Clock, TrendingUp, Shield, Users, Zap, CheckCircle } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Redução de Tempo na Produção',
      description: 'Diminua em até 70% o tempo gasto na elaboração de documentos jurídicos',
      metric: '70% mais rápido',
    },
    {
      icon: TrendingUp,
      title: 'Aumento da Produtividade',
      description:
        'Concentre-se em estratégias jurídicas enquanto a IA cuida das tarefas operacionais',
      metric: '3x mais produtivo',
    },
    {
      icon: Shield,
      title: 'Suporte Técnico 24h com IA',
      description: 'Assistência jurídica especializada disponível a qualquer hora do dia',
      metric: '24/7 disponível',
    },
    {
      icon: Users,
      title: 'Centralização de Atividades',
      description: 'Unifique todas as suas demandas jurídicas em uma única plataforma inteligente',
      metric: '1 plataforma',
    },
    {
      icon: Zap,
      title: 'Acesso Seguro e Exclusivo',
      description: 'Proteção de dados com criptografia avançada e acesso controlado',
      metric: '100% seguro',
    },
    {
      icon: CheckCircle,
      title: 'Automação Legal Inteligente',
      description: 'Automatize processos repetitivos mantendo a qualidade jurídica',
      metric: 'Zero erros',
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Vantagens para o Advogado Moderno
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme sua prática jurídica com benefícios mensuráveis que impactam diretamente sua
            eficiência e resultados profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {benefit.metric}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-card-foreground mb-3">{benefit.title}</h3>

              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* ROI Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 text-primary-foreground">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Retorno sobre Investimento</h3>
              <p className="text-primary-foreground/80 mb-6">
                Profissionais que utilizam IA no seu dia a dia relatam uma economia expressiva de tempo, aumento na produtividade e elevação significativa na qualidade dos serviços prestados.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-primary-foreground/10 rounded-lg p-6">
                <TrendingUp className="w-16 h-16 text-primary-foreground/70 mx-auto mb-4" />
                <p className="text-primary-foreground/80">
                  "A IA jurídica não substitui o advogado,
                  <br />
                  <strong>ela o potencializa</strong>"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
