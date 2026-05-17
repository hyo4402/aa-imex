import { google } from 'googleapis';

function getAuth() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON env var');
  const credentials = JSON.parse(json);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;

export type Product = {
  slug: string;
  name_en: string;
  name_vn: string;
  category_en: string;
  category_vn: string;
  desc_short_en: string;
  desc_short_vn: string;
  desc_long_en: string;
  desc_long_vn: string;
  image_url: string;
  origin: string;
  sku: string;
  packaging: string;
  capacity: string;
  specs: { label: string; value: string }[];
};

function toDirectImageUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`;
  return url;
}

function rowToProduct(row: string[]): Product {
  const specs: { label: string; value: string }[] = [];
  for (let i = 0; i < 5; i++) {
    const label = (row[14 + i * 2] || '').trim();
    const value = (row[15 + i * 2] || '').trim();
    if (label && value) specs.push({ label, value });
  }
  return {
    slug: (row[0] || '').trim(),
    name_en: (row[1] || '').trim(),
    name_vn: (row[2] || '').trim(),
    category_en: (row[3] || '').trim(),
    category_vn: (row[4] || '').trim(),
    desc_short_en: (row[5] || '').trim(),
    desc_short_vn: (row[6] || '').trim(),
    desc_long_en: (row[7] || '').trim(),
    desc_long_vn: (row[8] || '').trim(),
    image_url: toDirectImageUrl((row[9] || '').trim()),
    origin: (row[10] || '').trim(),
    sku: (row[11] || '').trim(),
    packaging: (row[12] || '').trim(),
    capacity: (row[13] || '').trim(),
    specs,
  };
}

export async function getProducts(): Promise<Product[]> {
  const sheets = google.sheets({ version: 'v4', auth: getAuth() });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'products!A2:Y',
  });
  const rows = (res.data.values as string[][] | null) ?? [];
  return rows
    .filter((row) => row[24]?.toUpperCase() === 'TRUE' && row[0])
    .map(rowToProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function appendLead(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
}): Promise<void> {
  const sheets = google.sheets({ version: 'v4', auth: getAuth() });
  const timestamp = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    dateStyle: 'short',
    timeStyle: 'short',
  });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'leads!A:H',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          timestamp,
          data.name,
          data.company,
          data.email,
          data.phone,
          data.inquiry_type,
          data.message,
          'Mới',
        ],
      ],
    },
  });
}
