import { Button } from "@/shared/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Youtube, Scale } from "lucide-react";
import { ScrollAnimated } from "@/shared/components/scroll-animated";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-6 py-12">
        <ScrollAnimated animationType="scroll-bottom">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Scale className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-primary">Elia</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A única plataforma com agentes de IA treinados para o fluxo completo do advogado brasileiro.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=61576700462622"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/eliaeducacao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/rafael-roni-0404ba13a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://www.youtube.com/@eliaeducacaoadv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a></li>
                <li><a href="#agentes" className="text-muted-foreground hover:text-foreground transition-colors">Agentes</a></li>
                <li><a href="#depoimentos" className="text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a></li>
                <li><a href="#precos" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>

            {/* Suporte */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentação</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Status do Sistema</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contato</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">contato@elia.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">São Paulo, SP</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimated>

        {/* Linha de Separação */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Elia. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;