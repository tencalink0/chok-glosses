import { Hono } from 'https://deno.land/x/hono@v3.11.6/mod.ts';
import { serveStatic } from 'https://deno.land/x/hono@v3.11.6/middleware.ts';
import type { Context } from 'https://deno.land/x/hono@v3.11.6/mod.ts';

const app = new Hono();
const PORT = 3001;

// API route
app.get('/api/hello', (c: Context) => c.text('Hello from Deno + Hono'));
app.use('/static/*', serveStatic({ root: './public', rewriteRequestPath: (path: string) => path.replace(/^\/static/, '') }));
app.get('/*', serveStatic({ path: './public/index.html' }));

// Start the server on custom port
Deno.serve({ port: PORT }, app.fetch);

console.log(`Server running on http://localhost:${PORT}`);
