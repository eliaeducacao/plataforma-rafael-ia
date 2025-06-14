// src/app/api/ping/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

export async function GET(_request: Request) {
  // 1) Referência ao documento "teste" na coleção "ping"
  const ref = db.collection('ping').doc('teste')

  // 2) Grava um objeto simples com timestamp
  await ref.set({ ok: true, ts: Date.now() })

  // 3) Lê de volta
  const snap = await ref.get()
  const data = snap.data()

  // 4) Retorna JSON para o cliente
  return NextResponse.json({ success: data })
}
