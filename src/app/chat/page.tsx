'use client'

import { useState, FormEvent } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [conversation, setConversation] = useState<Msg[]>([])
  const [loading, setLoading] = useState(false)

  // 1) Função que chama sua rota /api/chat
  async function sendToApi(message: string) {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagem: message }),
    })
    if (!res.ok) throw new Error('Erro na API')
    const json = await res.json()
    return json.resposta as string
  }

  // 2) Handler do form
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    // adiciona mensagem do usuário
    setConversation(prev => [...prev, { role: 'user', content: input }])
    setLoading(true)

    try {
      const resposta = await sendToApi(input)
      // adiciona resposta da IA
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: resposta },
      ])
    } catch {
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: 'Desculpe, ocorreu um erro.' },
      ])
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      {/* Área de histórico de mensagens */}
      <div className="space-y-2 mb-4 h-64 overflow-auto border p-2">
        {conversation.map((m, i) => (
          <div
            key={i}
            className={m.role === 'user' ? 'text-right' : 'text-left'}
          >
            <span
              className={
                m.role === 'user'
                  ? 'inline-block bg-blue-100 p-2 rounded-lg'
                  : 'inline-block bg-gray-100 p-2 rounded-lg'
              }
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>

      {/* Formulário de envio */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua mensagem…"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {loading ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
    </main>
  )
}
