import { FileText, Scale, Calendar, BookOpen, FileCheck, Brain, } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export const agents = [
  {
    icon: FileText,
    name: 'Agente Petições',
    specialty: 'Especialista em Petições Iniciais',
    description:
      'Elaboração de petições iniciais, contestações e demais peças processuais com fundamentação jurídica sólida',
    features: ['Petições Iniciais', 'Contestações', 'Recursos', 'Fundamentação Legal'],
  },
  {
    icon: Scale,
    name: 'Agente Civil',
    specialty: 'Direito Civil e Responsabilidade',
    description:
      'Especializado em questões de direito civil, contratos, responsabilidade civil e direitos reais',
    features: ['Contratos', 'Responsabilidade Civil', 'Direitos Reais', 'Família'],
  },
  {
    icon: Calendar,
    name: 'Agente de Prazos',
    specialty: 'Gestão de Prazos Processuais',
    description:
      'Controle inteligente de prazos, alertas automáticos e gestão de cronogramas processuais',
    features: ['Controle de Prazos', 'Alertas', 'Cronogramas', 'Agenda Processual'],
  },
  {
    icon: BookOpen,
    name: 'Agente Doutrinador',
    specialty: 'Pesquisa Doutrinária e Legal',
    description:
      'Pesquisa especializada em doutrina, jurisprudência e fundamentação teórica para seus casos',
    features: ['Pesquisa Doutrinária', 'Jurisprudência', 'Fundamentação', 'Citações'],
  },
  {
    icon: FileCheck,
    name: 'Agente Contratos',
    specialty: 'Elaboração e Revisão Contratual',
    description:
      'Criação, revisão e análise de contratos com identificação de cláusulas críticas e sugestões',
    features: ['Elaboração', 'Revisão', 'Análise de Riscos', 'Cláusulas'],
  },
  {
    icon: Brain,
    name: 'Agente GPT-4 Puro Jurídico',
    specialty: 'IA Jurídica Avançada',
    description:
      'Versão especializada do GPT-4 com treinamento específico em Direito brasileiro e práticas jurídicas',
    features: ['IA Avançada', 'Direito Brasileiro', 'Análise Complexa', 'Estratégias'],
  },
];

function AgentLibrary() {
  return (
    <section id="agentes" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Biblioteca de Agentes Especializados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada agente foi desenvolvido com expertise específica para atender diferentes áreas da
            prática jurídica com precisão e eficiência
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Agent Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                  <agent.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{agent.name}</h3>
                  <p className="text-sm text-primary font-medium">{agent.specialty}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4 leading-relaxed">{agent.description}</p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {agent.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Button className="w-full text-primary-foreground" variant="default">
                Conversar com {agent.name.split(' ')[1]}
              </Button>
            </div>
          ))}
        </div>

        {/* Library Stats */}
        <div className="mt-16 bg-secondary rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">6+</div>
              <div className="text-muted-foreground">Agentes Especializados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Disponibilidade</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Focado em Direito</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">GPT-4</div>
              <div className="text-muted-foreground">Tecnologia Avançada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentLibrary;
