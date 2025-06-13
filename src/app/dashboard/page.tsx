'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function DashboardPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (!usuario) {
        router.push('/login');
      } else {
        setCarregando(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (carregando) {
    return <p>Verificando acesso...</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Bem-vindo à Área do Aluno 👨‍🎓</h1>
      <p>Aqui você verá os agentes, conteúdos e recursos exclusivos.</p>
    </div>
  );
}
