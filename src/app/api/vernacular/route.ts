import { NextRequest, NextResponse } from 'next/server';
import { adaptToVernacular } from '@/lib/gemini';
import { ARTICLES } from '@/data/articles';

export async function POST(req: NextRequest) {
  try {
    const { articleId, language, region } = await req.json();
    const article = ARTICLES.find(a => a.id === articleId);
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    const adapted = await adaptToVernacular(
      { title: article.title, content: article.content },
      language || 'Hindi',
      region || 'North India'
    );
    return NextResponse.json(adapted);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
