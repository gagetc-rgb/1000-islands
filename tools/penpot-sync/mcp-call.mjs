// Minimal Streamable-HTTP MCP client for the local Penpot MCP server.
// Usage: node mcp.mjs list
//        node mcp.mjs call <tool> <args.json | inline JSON>
//        node mcp.mjs code <file.js>      (shortcut for execute_code)
import fs from "node:fs";

const URL_ = "http://localhost:4401/mcp";
let sid = null;

async function rpc(body) {
  const res = await fetch(URL_, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      ...(sid ? { "mcp-session-id": sid } : {}),
    },
    body: JSON.stringify(body),
  });
  sid = res.headers.get("mcp-session-id") || sid;
  const text = await res.text();
  if (!text) return null;
  if ((res.headers.get("content-type") || "").includes("event-stream")) {
    const datas = text.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim());
    return datas.length ? JSON.parse(datas[datas.length - 1]) : null;
  }
  return JSON.parse(text);
}

await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "cli", version: "1" } } });
await rpc({ jsonrpc: "2.0", method: "notifications/initialized" });

const [cmd, a, b] = process.argv.slice(2);
let out;
if (cmd === "list") {
  out = await rpc({ jsonrpc: "2.0", id: 2, method: "tools/list" });
  for (const t of out.result.tools) console.log(`## ${t.name}\n${t.description}\nARGS: ${JSON.stringify(t.inputSchema.properties)}\n`);
  process.exit(0);
}
let name = a, args;
if (cmd === "code") { name = "execute_code"; args = { code: fs.readFileSync(a, "utf8") }; }
else args = fs.existsSync(b) ? JSON.parse(fs.readFileSync(b, "utf8")) : JSON.parse(b || "{}");
out = await rpc({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name, arguments: args } });
if (out?.error) { console.log("ERROR", JSON.stringify(out.error)); process.exit(1); }
for (const c of out.result.content) {
  if (c.type === "text") console.log(c.text);
  else if (c.type === "image") { const f = `shot-${Date.now()}.png`; fs.writeFileSync(f, Buffer.from(c.data, "base64")); console.log("IMAGE saved", f); }
}
if (out.result.isError) process.exit(1);
