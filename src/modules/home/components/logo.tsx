import { Scale } from 'lucide-react';

function Logo() {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
        <Scale className="w-6 h-6 text-primary-foreground" />
      </div>
      <span className="text-2xl font-bold font-playfair">EliaAI</span>
    </div>
  );
}

export default Logo;
