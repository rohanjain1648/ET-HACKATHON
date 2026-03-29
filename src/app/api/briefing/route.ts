import { NextRequest, NextResponse } from 'next/server';
import { generateBriefing, chatWithNavigator } from '@/lib/gemini';
import { ARTICLES } from '@/data/articles';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, articleIds, topic, question, briefingContext } = body;

    if (action === 'generate') {
      const articles = ARTICLES.filter(a => articleIds?.includes(a.id)).map(a => ({ title: a.title, content: a.content }));
      if (articles.length === 0) return NextResponse.json({ error: 'No articles found' }, { status: 400 });
      const briefing = await generateBriefing(articles, topic || 'News Briefing');
      return NextResponse.json(briefing);
    }

    if (action === 'chat') {
      if (!question) return NextResponse.json({ error: 'Question required' }, { status: 400 });
      const answer = await chatWithNavigator(briefingContext || '', question);
      return NextResponse.json({ answer });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
