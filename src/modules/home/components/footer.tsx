import { Mail, Phone, Linkedin, Instagram, Youtube } from 'lucide-react';
import Logo from './logo';

const Footer = () => {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />

            <p className="text-sidebar-accent-foreground leading-relaxed">
              A primeira plataforma de agentes de IA especializados em Direito, desenvolvida para
              revolucionar a prática jurídica brasileira.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center hover:bg-sidebar-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center hover:bg-sidebar-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center hover:bg-sidebar-primary transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sidebar-foreground">Agentes IA</h3>
            <ul className="space-y-3 text-sidebar-accent-foreground">
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Diagnóstico de Caso Jurídico
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Analista de Tese Processual
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Promptador Jurídico
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Consultor de Atendimento Jurídico
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Especialista em Contratos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Tradutor Jurídico
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Pesquisador de Jurisprudência
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Modelador de Petições Jurídicas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Revisor Jurídico
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Marketing Jurídico
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sidebar-foreground">Suporte</h3>
            <ul className="space-y-3 text-sidebar-accent-foreground">
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Tutoriais
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sidebar-primary transition-colors">
                  Status da Plataforma
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sidebar-foreground">Contato</h3>
            <div className="space-y-4 text-sidebar-accent-foreground">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-sidebar-primary" />
                <a
                  href="mailto:eliaescolaadv@gmail.com"
                  className="hover:text-sidebar-primary transition-colors"
                >
                  eliaescolaadv@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-sidebar-primary" />
                <a
                  href="tel:+5511913337009"
                  className="hover:text-sidebar-primary transition-colors"
                >
                  (11) 91333-7009
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sidebar-accent-foreground/70 text-sm">
              © 2024 AdvocacIA. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sidebar-accent-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-sidebar-accent-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
              >
                Termos de Uso
              </a>
              <a
                href="#"
                className="text-sidebar-accent-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
              >
                LGPD
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sidebar-accent-foreground/50 text-xs">
              Plataforma desenvolvida por advogados, para advogados. Tecnologia GPT-4 com
              especialização jurídica.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
