import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const audioUrl = searchParams.get('url');

  if (!audioUrl) {
    return new NextResponse('URL parameter is required', { status: 400 });
  }

  try {
    const response = await fetch(audioUrl);
    
    if (!response.ok) {
      return new NextResponse('Failed to fetch audio', { status: response.status });
    }

    // Forward the audio stream
    const audioData = await response.blob();
    
    return new NextResponse(audioData, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*', // Allow our app to play it
      },
    });
  } catch (error) {
    console.error('Audio proxy error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
