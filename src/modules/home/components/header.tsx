import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Menu, X } from 'lucide-react';
import Logo from './logo';

import { navigate } from 'wouter/use-browser-location';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#como-funciona"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Como Funciona
            </a>
            <a
              href="#funcionalidades"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Funcionalidades
            </a>
            <a
              href="#agentes"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Agentes
            </a>
            <a
              href="#faq"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button className="text-primary-foreground">Acessar Biblioteca</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 mt-4">
              <a
                href="#como-funciona"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Como Funciona
              </a>
              <a
                href="#funcionalidades"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Funcionalidades
              </a>
              <a
                href="#agentes"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Agentes
              </a>
              <a
                href="#faq"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                FAQ
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary justify-start"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button className="text-primary-foreground">Acessar Biblioteca</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
