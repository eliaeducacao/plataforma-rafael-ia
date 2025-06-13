import { ButtonHTMLAttributes } from 'react';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full bg-blue-600 text-white p-2 rounded ${props.className || ''}`}
    />
  );
}

// 👇 Esta linha extra garante que o arquivo seja sempre tratado como módulo
export default Button;
