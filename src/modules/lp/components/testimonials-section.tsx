import { Card, CardContent } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { ScrollAnimated } from "@/shared/components/scroll-animated";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Daniela Pasqua Andreoli",
      role: "Advogada e sócia titular do escritório Pasqua Sociedade de Advogados Integrante da Comissão Especial de Direito do Terceiro Setor da Ordem dos Advogados do Brasil, Seção São Paulo.",
      company: "PASQUA",
      companyFull: "SOCIEDADE DE ADVOGADOS",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      content: "Como advogada, tenho o prazer de compartilhar minha experiência com a inteligência artificial da Elia. Esta ferramenta revolucionou completamente minha prática jurídica, oferecendo análises precisas e insights valiosos que antes demandavam horas de pesquisa manual. A capacidade da IA de processar vastas quantidades de dados jurídicos e identificar padrões relevantes tem sido fundamental para o sucesso dos meus casos.",
      isLarge: true
    },
    {
      id: 2,
      name: "Maria Adelma Augusta dos Santos",
      role: "Advogada e assessora jurídica",
      company: "ADVOCACIA E ASSESSORIA JURIDICA",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      content: "Me ajuda muito. Agora não tenho mais acúmulo de serviço e nem necessito de vários programas para me auxiliar. A Elia centraliza tudo que preciso em uma única plataforma, economizando tempo e aumentando minha produtividade significativamente.",
      isLarge: false
    },
    {
      id: 3,
      name: "Larissa Nayara de Oliveira",
      role: "Advogada",
      company: "",
      avatar: "https://images.unsplash.com/photo-1594824487628-81c7a8d0e58a?w=150&h=150&fit=crop&crop=face",
      content: "A Elia tem feito parte do meu cotidiano como advogada, muitas peças que gastava dias para a produção, agora consigo fazer em poucas horas. A qualidade dos documentos gerados é excepcional e me permite focar no que realmente importa: a estratégia do caso.",
      isLarge: false
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Título da Seção */}
        <ScrollAnimated animationType="scroll-txt">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-foreground">Quem usa </span>
              <span className="text-primary">recomenda</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja a experiência de nossos clientes
            </p>
          </div>
        </ScrollAnimated>

        {/* Grid de Depoimentos - Layout 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Card Grande - Esquerda */}
          <ScrollAnimated animationType="scroll-left" delay={200}>
            <Card className="h-full">
              <CardContent className="p-6 sm:p-8">
                {/* Logo da Empresa */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">PA</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-600">PASQUA</h3>
                    <p className="text-sm text-muted-foreground">SOCIEDADE DE ADVOGADOS</p>
                  </div>
                </div>

                {/* Conteúdo do Depoimento */}
                <p className="text-foreground leading-relaxed mb-8 text-lg">
                  {testimonials[0]?.content}
                </p>

                {/* Autor */}
                <div className="flex items-center">
                  <Avatar className="w-16 h-16 mr-4">
                    <AvatarImage src={testimonials[0]?.avatar} alt={testimonials[0]?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {testimonials[0]?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{testimonials[0]?.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {testimonials[0]?.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>

          {/* Cards Pequenos - Direita */}
          <div className="space-y-8">
            {/* Card 1 */}
            <ScrollAnimated animationType="scroll-right" delay={400}>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  {/* Logo da Empresa */}
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">⚖</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {testimonials[1]?.company}
                    </p>
                  </div>

                  {/* Conteúdo do Depoimento */}
                  <p className="text-foreground leading-relaxed mb-4">
                    "{testimonials[1]?.content}"
                  </p>

                  {/* Autor */}
                  <div>
                    <h4 className="font-bold text-foreground">{testimonials[1]?.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[1]?.role}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimated>

            {/* Card 2 */}
            <ScrollAnimated animationType="scroll-right" delay={600}>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  {/* Conteúdo do Depoimento */}
                  <p className="text-foreground leading-relaxed mb-4">
                    "{testimonials[2]?.content}"
                  </p>

                  {/* Autor */}
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarImage src={testimonials[2]?.avatar} alt={testimonials[2]?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonials[2]?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonials[2]?.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[2]?.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;