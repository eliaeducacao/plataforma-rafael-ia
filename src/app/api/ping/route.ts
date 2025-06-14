// src/app/api/ping/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('> PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
  console.log('> CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
  console.log('> PRIVATE_KEY ok?', !!process.env.FIREBASE_PRIVATE_KEY);

  return NextResponse.json({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKeyLoaded: !!process.env.FIREBASE_PRIVATE_KEY,
  });
}
