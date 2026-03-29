import { NextRequest, NextResponse } from 'next/server';
import { extractStoryArcEntities } from '@/lib/gemini';
import { ARTICLES } from '@/data/articles';

export async function POST(req: NextRequest) {
  try {
    const { articleIds } = await req.json();
    const articles = ARTICLES.filter(a => articleIds?.includes(a.id)).map(a => ({ title: a.title, content: a.content }));
    if (articles.length === 0) return NextResponse.json({ error: 'No articles found' }, { status: 400 });
    const entities = await extractStoryArcEntities(articles);
    return NextResponse.json(entities);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
