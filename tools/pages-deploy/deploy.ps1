# Re-deploys wireframes/ to https://islands-1000-prototype.pages.dev (Cloudflare Pages, noindex).
# Uses CLOUDFLARE_API_TOKEN from the environment. wrangler 4.145.0: newer versions delegate Pages to Workers and fail with this token.
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$site = Join-Path $here "site"
$src = Join-Path $here "..\..\wireframes"
Get-ChildItem $site -Include *.html, wf.css, wf.js -Recurse | Remove-Item -Force
Copy-Item (Join-Path $src "*.html"), (Join-Path $src "wf.css"), (Join-Path $src "wf.js") $site
Set-Location $here
npx --yes wrangler@4.145.0 pages deploy site --project-name islands-1000-prototype --branch main --commit-dirty=true
