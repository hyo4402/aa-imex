import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/sheets';

export const revalidate = 60;

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error('Products fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
