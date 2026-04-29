import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET: Return user's recently played track IDs
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ recents: [] }, { status: 200 });
  }

  const recents = await db.recentTrack.findMany({
    where: { userId: session.user.id },
    orderBy: { playedAt: 'desc' },
    take: 10, // Only last 10
    select: { trackId: true },
  });

  // Deduplicate while maintaining order
  const uniqueIds = Array.from(new Set(recents.map((r: { trackId: number }) => r.trackId)));

  return NextResponse.json({ recents: uniqueIds });
}

// POST: Add a track to recently played
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { trackId } = await req.json();

  if (trackId === undefined) {
    return NextResponse.json({ error: 'trackId is required' }, { status: 400 });
  }

  await db.recentTrack.create({
    data: { userId: session.user.id, trackId },
  });

  return NextResponse.json({ success: true });
}
