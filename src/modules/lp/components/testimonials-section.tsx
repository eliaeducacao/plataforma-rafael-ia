import { Card, CardContent } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Rafael Lefoco",
      role: "Advogado Civil",
      company: "Escritório Lefoco & Associados",
      avatar: "/avatars/rafael.jpg",
      content: "A Elia revolucionou meu escritório. Em 3 minutos tenho um diagnóstico completo que antes demorava horas. Meus clientes ficam impressionados com a velocidade e qualidade da resposta.",
      rating: 5,
      highlight: "3 minutos vs horas"
    },
    {
      id: 2,
      name: "Dra. Maria Silva",
      role: "Advogada Trabalhista",
      company: "Silva Advocacia",
      avatar: "/avatars/maria.jpg",
      content: "A precisão dos agentes é impressionante. Eles entendem o contexto jurídico brasileiro como nenhuma outra IA. Minha produtividade aumentou 300%.",
      rating: 5,
      highlight: "300% mais produtiva"
    },
    {
      id: 3,
      name: "Dr. João Santos",
      role: "Advogado Criminal",
      company: "Santos & Partners",
      avatar: "/avatars/joao.jpg",
      content: "Implementei em 15 minutos exatamente como prometido. Não precisei de treinamento complexo. A interface é intuitiva e os resultados são profissionais.",
      rating: 5,
      highlight: "Implementação em 15min"
    },
    {
      id: 4,
      name: "Dra. Ana Costa",
      role: "Advogada Empresarial",
      company: "Costa Legal",
      avatar: "/avatars/ana.jpg",
      content: "Os contratos gerados pela Elia são impecáveis. Economizo 4 horas por contrato e a qualidade é superior ao que eu fazia manualmente.",
      rating: 5,
      highlight: "4h economizadas por contrato"
    },
    {
      id: 5,
      name: "Dr. Carlos Mendes",
      role: "Advogado Tributário",
      company: "Mendes Advocacia",
      avatar: "/avatars/carlos.jpg",
      content: "A pesquisa de jurisprudência ficou 10x mais rápida. O agente encontra casos relevantes que eu demoraria dias para localizar.",
      rating: 5,
      highlight: "10x mais rápida"
    },
    {
      id: 6,
      name: "Dra. Fernanda Lima",
      role: "Advogada Família",
      company: "Lima & Associados",
      avatar: "/avatars/fernanda.jpg",
      content: "Meus clientes ficam impressionados com a rapidez do atendimento. Respondo em minutos com diagnósticos completos e teses jurídicas sólidas.",
      rating: 5,
      highlight: "Resposta em minutos"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Quem usa recomenda
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advogados de todo o Brasil já estão usando a Elia para acelerar seus processos e impressionar seus clientes
          </p>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Header do Depoimento */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Highlight */}
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  {testimonial.highlight}
                </div>

                {/* Conteúdo do Depoimento */}
                <blockquote className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Advogados Ativos</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">15min</div>
            <div className="text-sm text-muted-foreground">Tempo de Implementação</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">300%</div>
            <div className="text-sm text-muted-foreground">Aumento de Produtividade</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;