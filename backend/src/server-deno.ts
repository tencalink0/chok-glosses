import { Hono } from 'https://deno.land/x/hono@v3.11.6/mod.ts';
import { serveStatic } from 'https://deno.land/x/hono@v3.11.6/middleware.ts';
import { dirname, fromFileUrl, join } from "https://deno.land/std@0.224.0/path/mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const app = new Hono();
const PORT = 3001;

const publicDir = join(__dirname, '..', 'dist', 'public');

app.get('/api/hello', (c) => c.text('Test'));

app.use('/*', serveStatic({ root: './dist/public' }));

app.get('/*', async (c) => {
    const indexPath = join(publicDir, 'index.html');
    const content = await Deno.readTextFile(indexPath);
    return c.html(content);
});

console.log(`Server running on http://localhost:${PORT}`);
Deno.serve({ port: PORT }, app.fetch);