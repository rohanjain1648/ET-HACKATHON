import { NextRequest, NextResponse } from 'next/server';
import { generateScreenplay } from '@/lib/gemini';
import { ARTICLES } from '@/data/articles';

export async function POST(req: NextRequest) {
  try {
    const { articleId, style } = await req.json();
    const article = ARTICLES.find(a => a.id === articleId);
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    const screenplay = await generateScreenplay({ title: article.title, content: article.content }, style || 'breaking news');
    return NextResponse.json(screenplay);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
