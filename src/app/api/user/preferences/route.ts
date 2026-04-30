import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { genres } = await req.json();
    if (!genres || !Array.isArray(genres)) {
      return NextResponse.json({ error: 'Invalid genres' }, { status: 400 });
    }

    await db.user.update({
      where: { email: session.user.email },
      data: {
        preferences: genres.join(','),
      },
    });

    return NextResponse.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Preferences update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
