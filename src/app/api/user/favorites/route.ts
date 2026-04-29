import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET: Return user's favorite track IDs
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ favorites: [] }, { status: 200 });
  }

  const favorites = await db.favorite.findMany({
    where: { userId: session.user.id },
    select: { trackId: true },
  });

  return NextResponse.json({ favorites: favorites.map((f: { trackId: number }) => f.trackId) });
}

// POST: Add a track to favorites
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { trackId } = await req.json();

  if (trackId === undefined) {
    return NextResponse.json({ error: 'trackId is required' }, { status: 400 });
  }

  await db.favorite.upsert({
    where: { userId_trackId: { userId: session.user.id, trackId } },
    update: {},
    create: { userId: session.user.id, trackId },
  });

  return NextResponse.json({ success: true });
}

// DELETE: Remove a track from favorites
export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { trackId } = await req.json();

  await db.favorite.deleteMany({
    where: { userId: session.user.id, trackId },
  });

  return NextResponse.json({ success: true });
}
