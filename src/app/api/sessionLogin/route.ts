import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Token não fornecido.' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: '__session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}
