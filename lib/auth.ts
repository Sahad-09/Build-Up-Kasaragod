import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'default-secret-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.warn('ADMIN_PASSWORD not set in environment variables');
}

export async function authenticateAdmin(password: string): Promise<boolean> {
  if (!ADMIN_PASSWORD) {
    return false;
  }
  return password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = generateSessionToken();
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!session) {
    return false;
  }
  
  // Validate session token (simple check for now)
  return validateSessionToken(session.value);
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

function generateSessionToken(): string {
  // Simple session token generation
  // In production, consider using a more secure method
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return Buffer.from(`${timestamp}-${random}-${SESSION_SECRET}`).toString('base64');
}

function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split('-');
    if (parts.length !== 3) return false;
    
    // Check if session is not expired (7 days)
    const timestamp = parseInt(parts[0]);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    if (Date.now() - timestamp > maxAge) {
      return false;
    }
    
    // Verify secret matches
    return parts[2] === SESSION_SECRET;
  } catch {
    return false;
  }
}

export async function requireAuth(): Promise<void> {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}
