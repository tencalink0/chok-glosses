import { serve } from "https://deno.land/std@0.189.0/http/server.ts";
import { serveDir } from "jsr:@std/http/file-server";
import { join } from "jsr:@std/path";

const fsRoot = "backend/dist/public";

serve(async (req: Request) => {
  try {
    const res = await serveDir(req, { fsRoot });
    if (res.status !== 404) return res;
  } catch (_) {
    console.log(" ");
  }

  return new Response(
    await Deno.readTextFile(join(fsRoot, "index.html")),
    {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    },
  );
});