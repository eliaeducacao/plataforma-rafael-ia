'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { allowedEmails } from '../lib/whitelist';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const senhaPadrao = '123456rafael'; // senha invisível usada por dentro

  // Redireciona se já estiver logado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!allowedEmails.includes(email)) {
      setErro('Este e-mail não está autorizado para acesso.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senhaPadrao);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro ao logar:', error);

      if (error.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email, senhaPadrao);
          router.push('/dashboard');
        } catch (erroCadastro) {
          console.error('Erro ao criar usuário:', erroCadastro);
          setErro('Erro ao criar usuário.');
        }
      } else {
        setErro('Erro ao fazer login.');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h1>Login de Aluno</h1>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleLogin} style={{ width: '100%' }}>Entrar</button>
      {erro && <p style={{ color: 'red', marginTop: 10 }}>{erro}</p>}
    </div>
  );
}
