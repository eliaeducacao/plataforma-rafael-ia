import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  const faqs = [
    {
      question: 'Preciso entender de Inteligência Artificial para usar a plataforma?',
      answer:
        'Não! A plataforma foi desenvolvida especificamente para advogados, com interface intuitiva similar a um chat comum. Basta conversar naturalmente com os agentes, como faria com um colega especialista.',
    },
    {
      question: 'Meus dados e documentos estão protegidos?',
      answer:
        'Sim, utilizamos criptografia de ponta a ponta e servidores seguros certificados. Todos os dados são protegidos pelo sigilo profissional e não são compartilhados com terceiros. A privacidade advocatícia é nossa prioridade máxima.',
    },
    {
      question: 'Qual a diferença do GPT-4 Jurídico para outros agentes?',
      answer:
        'O Agente GPT-4 Puro Jurídico é nossa versão mais avançada, com treinamento específico em Direito brasileiro, jurisprudência atualizada e precedentes do STF/STJ. Os outros agentes são especializados em áreas específicas com prompt engineering focado.',
    },
    {
      question: 'Posso usar a plataforma no celular ou tablet?',
      answer:
        'Sim! A plataforma é 100% responsiva e funciona perfeitamente em qualquer dispositivo - desktop, tablet ou smartphone. Você pode acessar seus agentes jurídicos onde quer que esteja.',
    },
    {
      question: 'Os agentes substituem a consultoria jurídica tradicional?',
      answer:
        'Os agentes são ferramentas de apoio que potencializam sua expertise. Eles auxiliam na pesquisa, elaboração de documentos e análises, mas a decisão estratégica e o julgamento profissional continuam sendo exclusivamente seus.',
    },
    {
      question: 'Como é feita a atualização da base jurídica dos agentes?',
      answer:
        'Nossa equipe jurídica atualiza constantemente a base de conhecimento com novas leis, jurisprudência e entendimentos dos tribunais superiores. As atualizações são automáticas e transparentes para o usuário.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Esclarecemos as principais dúvidas sobre a plataforma de IA jurídica e como ela pode
            transformar sua prática advocatícia
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg mb-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary transition-colors rounded-lg"
                onClick={() => toggleItem(index)}
              >
                <span className="text-lg font-semibold text-foreground pr-4">{faq.question}</span>
                {openItems.includes(index) ? (
                  <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-4 animate-fade-in">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Support */}
        <div className="mt-16 text-center">
          <div className="bg-secondary rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Ainda tem dúvidas?</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe de especialistas em IA jurídica está pronta para ajudar você a
              implementar a automação legal em seu escritório.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:eliaescolaadv@gmail.com"
                className="text-primary hover:text-primary/80 font-medium"
              >
                eliaescolaadv@gmail.com
              </a>
              <span className="hidden sm:block text-muted-foreground">|</span>
              <a
                href="tel:+5511913337009"
                className="text-primary hover:text-primary/80 font-medium"
              >
                (11) 91333-7009
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
