import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'dummy_key'
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an AI DJ. The user will tell you their mood or what they are doing. 
      Based on this, reply with a short 1-2 sentence message acknowledging their mood, 
      and then recommend 1 to 3 track indices from our database [0, 1, 2] that fit the mood. 
      
      Track 0: Neon Dreams (Upbeat, Electronic)
      Track 1: Lofi Nights (Chill, Focus, Lofi)
      Track 2: Electric Sky (Energetic, Synthwave)

      Format your response exactly like this:
      Message: [Your message]
      Tracks: [0, 2]
      
      User's input: "${prompt}"`,
    });

    const text = response.text || '';
    
    // Parse the output
    const msgMatch = text.match(/Message:\s*(.*)/i);
    const tracksMatch = text.match(/Tracks:\s*\[(.*?)\]/i);

    const message = msgMatch ? msgMatch[1].trim() : "Here's a playlist for you!";
    let trackIndices = [0]; // default
    if (tracksMatch && tracksMatch[1]) {
      trackIndices = tracksMatch[1].split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    }

    return NextResponse.json({ message, trackIndices });

  } catch (error: any) {
    console.error('AI DJ Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate playlist' }, { status: 500 });
  }
}
