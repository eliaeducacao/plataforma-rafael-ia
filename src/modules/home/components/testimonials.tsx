import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Ricardo Santos',
      role: 'Sócio - Santos & Associados',
      content:
        'A plataforma revolucionou nossa rotina. O Agente de Contratos me ajuda a revisar documentos em minutos, identificando cláusulas que eu levaria horas para analisar. Aumentamos nossa produtividade em 200%.',
      rating: 5,
      specialty: 'Direito Empresarial',
    },
    {
      name: 'Dra. Marina Silva',
      role: 'Advogada Autônoma',
      content:
        'Como advogada solo, o Agente de Prazos é fundamental. Nunca mais perdi um prazo processual. A IA me alerta com antecedência e sugere as melhores estratégias para cada fase do processo.',
      rating: 5,
      specialty: 'Direito Civil',
    },
    {
      name: 'Dr. Carlos Oliveira',
      role: 'Coordenador Jurídico - TechLaw',
      content:
        'O Agente Doutrinador transformou nossa pesquisa jurídica. Em segundos, encontro jurisprudência relevante e fundamentação sólida. Nossa equipe agora foca 100% na estratégia, não na busca por precedentes.',
      rating: 5,
      specialty: 'Direito Digital',
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Depoimentos de Advogados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Profissionais do Direito que já experimentaram a revolução da IA jurídica compartilham
            seus resultados e experiências
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-muted mb-4" />

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-card-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.specialty}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-xl p-8 max-w-4xl mx-auto shadow-lg">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Advogados Cadastrados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10k+</div>
                <div className="text-muted-foreground">Documentos Gerados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Satisfação dos Usuários</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
