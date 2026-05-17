import { NextRequest, NextResponse } from 'next/server';
import { appendLead } from '@/lib/sheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, inquiry_type, message } = body;

    if (!name || !company || !email || !inquiry_type || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await appendLead({ name, company, email, phone: phone || '', inquiry_type, message });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead submission error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
