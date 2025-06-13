import { HTMLAttributes } from 'react';

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`bg-white shadow-md rounded p-4 ${props.className || ''}`}
    />
  );
}

export function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`mt-2 ${props.className || ''}`}
    />
  );
}

// ✅ Linha necessária para o TypeScript reconhecer como um módulo
export {};
