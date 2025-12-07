import { neon } from '@neondatabase/serverless';

export async function getIndicatorByDate(date: string) {
  const sql = neon(process.env.DATABASE_URL!);

  const rows = await sql`
    SELECT *
    FROM market_indicators
    WHERE date = ${date}
    LIMIT 1;
  `;

  return rows[0] ?? null;
}
