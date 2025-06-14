// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// ① instancia o cliente, usando sua OPENAI_API_KEY do .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  // ② lê o corpo JSON vindo do front
  const { mensagem } = await request.json();
  console.log("🟢 [chat] user:", mensagem);

  // ③ chama o Chat Completion
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",    // ou outro modelo que tiver acesso
    messages: [{ role: "user", content: mensagem }],
  });

  // ④ extrai a resposta gerada
  const respostaIA =
    completion.choices[0]?.message?.content ??
    "Desculpe, houve um erro ao gerar a resposta.";

  console.log("🔵 [chat] IA:", respostaIA);

  // ⑤ retorna o JSON final para o front
  return NextResponse.json({ resposta: respostaIA });
}
