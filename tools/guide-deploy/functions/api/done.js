// Guide checkmarks ("сделал"), stored server-side so they survive any browser or device.
// One shared record: the guide has one reader (the owner). KV binding DONE (see wrangler.toml).
const KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export async function onRequestGet({ env }) {
  const v = await env.DONE.get("done");
  return json(v ? JSON.parse(v) : {});
}

export async function onRequestPut({ request, env }) {
  const text = await request.text();
  if (text.length > 300) return json({ error: "too large" }, 413);
  let body; try { body = JSON.parse(text); } catch { return json({ error: "bad json" }, 400); }
  const clean = {}; for (const k of KEYS) if (body && body[k] === true) clean[k] = true;
  await env.DONE.put("done", JSON.stringify(clean));
  return json(clean);
}
