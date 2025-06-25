import { useTypewriter } from "../hooks/use-typewriter";

type Typewriter = {
  text: string
  speed: number
}

export function Typewriter({ text, speed }: Typewriter) {
  const displayText = useTypewriter({ text, speed });

  return { displayText };
};