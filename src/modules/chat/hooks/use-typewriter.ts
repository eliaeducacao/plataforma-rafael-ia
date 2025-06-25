import { useState, useEffect } from 'react';

type useTypewriterProps = {
  text: string;
  speed: number;
};

export function useTypewriter({ text, speed = 50 }: useTypewriterProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
}
