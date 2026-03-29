import { NextRequest, NextResponse } from 'next/server';
import { adaptArticleForPersona } from '@/lib/gemini';
import { ARTICLES } from '@/data/articles';

export async function POST(req: NextRequest) {
  try {
    const { articleId, persona, depth } = await req.json();
    const article = ARTICLES.find(a => a.id === articleId);
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    const adapted = await adaptArticleForPersona(
      { title: article.title, content: article.content },
      persona || 'investor',
      depth || 'standard'
    );
    return NextResponse.json(adapted);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
