export const prerender = false;

export async function GET({ locals }: { locals: any }) {
  try {
    const kv = locals.runtime.env.COUNTER;
    const current = parseInt(await kv.get('visits') || '0', 10);
    const next = current + 1;
    await kv.put('visits', String(next));
    return new Response(JSON.stringify({ count: next }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(JSON.stringify({ count: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
