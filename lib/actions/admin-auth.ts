'use server';

import { authenticateAdmin, createSession, destroySession } from '../auth';
import { redirect } from 'next/navigation';

export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const isValid = await authenticateAdmin(password);
    
    if (!isValid) {
      return { success: false, error: 'Invalid password' };
    }
    
    await createSession();
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}

export async function logoutAdmin(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}
