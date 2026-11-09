// Cloudflare Pages ignores Range on static assets: it always answers 200 with the whole file (checked 2 Nov 2026).
// Safari, and every browser on iPhone, will not start a <video> unless the server answers byte ranges with 206,
// so the hero, yacht and story videos stayed on their posters there. This Pages Function slices the asset itself.
// After thenextbeacon.com/insights/range-requests-video-cloudflare-workers (Oct 2026).
export async function onRequest({ request, next }) {
  const range = request.headers.get("range");
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());   // one range only; anything else gets the whole file
  if (!m || request.method !== "GET" || (m[1] === "" && m[2] === "")) return next();

  const full = await next();
  if (full.status !== 200) return full;
  const body = await full.arrayBuffer();
  const size = body.byteLength;
  let start, end;
  if (m[1] === "") { start = Math.max(0, size - Number(m[2])); end = size - 1; }   // bytes=-500: the last 500 bytes
  else { start = Number(m[1]); end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1); }

  const headers = new Headers(full.headers);
  headers.set("accept-ranges", "bytes");
  if (start >= size || start > end) {
    headers.set("content-range", `bytes */${size}`);
    headers.delete("content-length");
    return new Response(null, { status: 416, headers });
  }
  headers.set("content-range", `bytes ${start}-${end}/${size}`);
  headers.set("content-length", String(end - start + 1));
  return new Response(body.slice(start, end + 1), { status: 206, headers });
}
