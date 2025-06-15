import { MousePointer, MessageCircle, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MousePointer,
      title: 'Acesse a Plataforma',
      description: 'Entre na biblioteca jurídica com seu login seguro e exclusivo',
    },
    {
      icon: MessageCircle,
      title: 'Escolha um Agente Jurídico',
      description: 'Selecione o agente especializado na área do Direito que você precisa',
    },
    {
      icon: Zap,
      title: 'Converse e Receba Suporte',
      description: 'Interaja por chat e receba orientações especializadas imediatamente',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Como Funciona a Plataforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Três passos simples para revolucionar sua prática jurídica com inteligência artificial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform transition-all duration-300 group-hover:-translate-y-2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-20">
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 pt-12 z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-card-foreground mb-4">{step.title}</h3>

                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
