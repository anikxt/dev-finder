import { db } from '@/db';
import { Room, room, users } from '@/db/schema';
import { getSession } from '@/lib/auth';
import { eq, like } from 'drizzle-orm';

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}
