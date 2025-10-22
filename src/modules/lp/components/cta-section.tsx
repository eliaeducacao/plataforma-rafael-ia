import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ArrowRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { ScrollAnimated } from "@/shared/components/scroll-animated";

const CTASection = () => {
  return (
    <section id="cta-section" className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <ScrollAnimated animationType="scroll-txt">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                Pronto para revolucionar seu escritório?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Escolha a opção que melhor se adapta ao seu ritmo e comece a ver resultados desde o primeiro dia
              </p>
            </div>
          </ScrollAnimated>

          <ScrollAnimated animationType="scroll-bottom" delay={200}>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center justify-center gap-3">

                    <h3 className="text-xl font-semibold text-foreground">
                      Teste Grátis
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Se você quer testar a Elia no seu ritmo, sem compromisso:
                    </p>

                    <Button size="lg" className="w-full">
                      Experimente 7 dias grátis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Sem cartão. Sem pegadinha.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Cancela quando quiser.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Acesso completo à plataforma</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      Demonstração
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Se você quer ver como a Elia resolve o seu caso específico antes de testar:
                    </p>

                    <Button variant="outline" size="lg" className="w-full">
                      Agende sua demonstração
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>30 minutos personalizados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>A gente mostra, você decide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span>Casos específicos da sua área</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Redes Sociais */}
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">
                Acompanhe nossas atualizações e novidades
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=61576700462622"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/eliaeducacao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/rafael-roni-0404ba13a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.youtube.com/@eliaeducacaoadv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimated>
        </div>
      </div>
    </section>
  );
};

export default CTASection;