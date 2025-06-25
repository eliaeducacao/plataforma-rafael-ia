import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
  enabled?: boolean;
}

export function useTypewriter({ text, speed = 5, enabled = true }: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Se não está habilitado, mostrar texto completo
    if (!enabled) {
      setDisplayText(text);
      setIsTyping(false);
      return;
    }

    // Reset para começar do zero
    setDisplayText('');
    setIsTyping(true);

    if (text.length === 0) {
      setIsTyping(false);
      return;
    }

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      } else {
        setIsTyping(false);
      }
    };

    // Começar a digitação
    timeoutId = setTimeout(typeNextCharacter, speed);

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, enabled]);

  return [displayText, isTyping] as const;
}
