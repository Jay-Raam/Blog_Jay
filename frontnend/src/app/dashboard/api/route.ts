import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = '251912af56ec4ec90eef105aceac1c70a67577efde07e4c8425ebacc6a9892d1';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const res = await fetch(`http://localhost:3001/users`);
  const data = await res.json();
  console.log(data);

  // Replace this with your actual authentication logic
  if (email === data.email && password === data.password) {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    const headers = new Headers();
    headers.set('Set-Cookie', `auth-token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);

    return new NextResponse('Login successful', { headers });
  }

  return new NextResponse('Invalid credentials', { status: 401 });
}
