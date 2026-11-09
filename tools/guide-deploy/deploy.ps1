# Re-deploys the owner guide (guide/index.html + elephant.js, fonts, img) to https://islands-1000-guide.pages.dev (noindex).
# Also ships functions/ (checkmarks API, KV binding in wrangler.toml).
# Never ships guide/DESIGN.md, design.json or guide/elephants/. wrangler 4.145.0 (newer versions fail with this token).
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$site = Join-Path $here "site"; $src = Join-Path $here "..\..\guide"
Copy-Item (Join-Path $src "index.html"), (Join-Path $src "elephant.js") $site -Force
Copy-Item (Join-Path $src "fonts\*") (Join-Path $site "fonts") -Force
Copy-Item (Join-Path $src "img\*") (Join-Path $site "img") -Force
Set-Location $here
npx --yes wrangler@4.145.0 pages deploy site --project-name islands-1000-guide --branch main --commit-dirty=true
