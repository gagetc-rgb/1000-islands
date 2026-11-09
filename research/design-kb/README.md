# Web design knowledge base (Oct 2026)

Personal knowledge base on web design process in the AI era: moodboards and art direction, taste and references, AI-assisted workflows, studio and client process. Built from YouTube transcripts for NotebookLM ("Gemini Notebook") and for direct use by Claude.

NotebookLM (now "Gemini Notebook"): **Web Design KB 2026**, https://notebook.google.com/notebook/00e6f62f-27cf-4041-b27e-864e6ce120f8 (49 sources, one per video, uploaded 8 Oct 2026; Pro plan, 300-source cap).

## Folder

| Path | What |
|---|---|
| `videos.tsv` | Curated list: theme + YouTube id. Edit this to add or remove videos. |
| `meta.tsv` | Title, channel, publish date, duration (auto-filled by yt-dlp). |
| `raw/` | Original auto-caption files (VTT). |
| `transcripts/` | One clean transcript per video, `[m:ss]` markers every 60 s, named `date channel - title [id].md`. These are uploaded to NotebookLM, one source per video. |
| `bundles/` | One file per theme, all transcripts concatenated. For reading a whole theme at once (Claude, or NotebookLM if the source limit gets tight). |
| `build.py` | Rebuilds `transcripts/` and `bundles/` from `raw/` + `meta.tsv`. |

Refresh after editing `videos.tsv`:

```bash
python -m yt_dlp --skip-download --write-auto-subs --sub-langs "en-orig,en" --sub-format vtt --print-to-file "%(id)s	%(upload_date)s	%(channel)s	%(duration)s	%(title)s" meta.tsv -o "raw/%(id)s.%(ext)s" -a urls.txt
python build.py
```

## Freshness rule

- Tools and AI workflows: last 12 months only (tools change monthly).
- Fundamentals (moodboards, taste, client process): age does not matter if the source is strong.
- Result: 37 of 49 videos are from the last 12 months. The 12 older ones are fundamentals: moodboard process (Jesse Showalter 2017, Flux 2023, Frankie Harry and Will Paterson 2025), taste (Thiago Costa, Sara Vienna), client process (Flux 2024, Kole Jain), one top-studio talk (Unseen Studio at KIKK 2024), one award-site breakdown, and two inspiration-site roundups from 2025 (check those against current tools).

## Who is in the base, and why

Finding from the scan: the iconic web studios (Locomotive, Lusion, Active Theory, Unseen, Obys, Hello Monday, basement.studio, Immersive Garden) do not run YouTube channels. Their thinking reaches YouTube only through conference talks and interviews. So the base mixes interview hosts who bring top designers on camera with hands-on practitioners.

| # | Source | Channel | Subs (Oct 2026) | Why |
|---|---|---|---|---|
| 1 | Dive Club (host Michael "Ridd" Riddering) | @joindiveclub | 69k | Weekly long interviews with top product/web designers; heavy on AI workflows and taste (Claude Design, Claude Code designers, Meng To, Pablo Stanley, Jamey Gannon). |
| 2 | Tommy Geoco | @designertom | 170k | Industry interviews and essays; basement.studio, AI creative direction, AI slop. |
| 3 | Figma: Config 2026 + "Source Material" series | @Figma | 791k | Conference talks; "Source Material" = what inspires top art directors (Brent David Freaney, Aitana Picó, Zach Lieberman). |
| 4 | Meng To / DesignCode | @DesignCodeTeam | 349k | Hands-on AI web design: DESIGN.md, landing pages from code references, avoiding AI slop. Closest to our own pipeline. |
| 5 | Ran Segall / Flux Academy | @FluxAcademy | 1.09M | Web design agency practice: client process, selling, moodboards, Claude Skills for web design. |
| 6 | Michal Malewicz | @MalewiczHype | 195k | Web design with a conversion lens; long free courses; critical takes on AI tools. |
| 7 | Kole Jain | @KoleJain | 76k | Short, dense landing-page UI/UX videos. |
| 8 | Jamey Gannon (via interviews) | Dive Club, Tommy Geoco | n/a | AI creative direction: building moodboards and brand imagery with Midjourney / Nano Banana. |
| 9 | Brent David Freaney, Special Offer, Inc. (via Figma) | @Figma | n/a | Art director (BRAT); Config 2026 talk plus inspiration breakdown. |
| 10 | Unseen Studio (via KIKK festival) | @kikk_festival | 1.5k | One top-tier studio talk on craft (Zala Šeško). |
| + | femke.design, Louis Moss, Frankie Harry, Will Paterson, Jesse Showalter, Self-Made Web Designer | various | various | Single videos on moodboards, references and AI-design gaps. |

Also checked and left out: Awwwards YouTube (@AwwwardsTV, almost no uploads in the last year; talks moved to the paid Awwwards Academy "Creative Pass"), The Cutting Edge School (pivoted to general AI), DesignCourse, Jesse Showalter's Framer content, Mizko, Juxtopposed (tool tutorials, low relevance).

Not found: Scandinavian or Asian studios with active English-language YouTube in the last 12 months. Japanese studios (Garden Eight, SONICJAM and others) publish courses on Awwwards Academy (paid).

## Themes in the base

1. **Moodboards and art direction with clients** (7 videos)
2. **Taste, references and where inspiration comes from** (11)
3. **AI-era web design workflow** (28: +2 DesignCode, +4 Flux Academy picked 8 Oct)
4. **Studio and client process** (12: +3 Flux Academy)
5. **Luminaries: interviews and talks** (25 videos, added 8 Oct). Selection rule: the person is asked about their profession (process, clients, decisions), English, strong views or a direct hit on our topics; age allowed because these are fundamentals. Videos without any captions were dropped (Hello Monday 2018, Active Theory at KIKK 2021, Paula Scher "AI: Threat or Tool?" 2025).
   - Web studios: Awwwards jury "Deconstructing Winning Websites" (x2, 2021-22), Locomotive (x2), Dogstudio, Ueno / Haraldur Thorleifsson (x2), Kurppa Hosk (SE), Obys, Build in Amsterdam, monopo (Tokyo), Koto (x2).
   - Brand and graphic legends: Brian Collins, Michael Bierut (x2, incl. "Let's Talk About Clients"), Paula Scher (Netflix "Abstract" episode), Natasha Jen / Pentagram (x2), Jessica Walsh.
   - UX: Jakob Nielsen (x2, incl. AI 2026), Steve Krug (usability testing), Brad Frost (agentic design systems, Dec 2025), Tobias Ahlin (SE, AI noise 2025).
6. **Studio spotlights (text)**: 14 Codrops "Studio Spotlight" articles (Sep 2025 to Sep 2026) where top studios describe how they work and decide: Resn, Studio Freight, Garden Eight (JP), Unseen, makemepulse, Lusion, Obys, Metalab, Exo Ape, basement.studio, Zajno, 14islands (SE), Bonhomme (luxury brands), Akaru. In `articles/`, fetched by `fetch_articles.py` from `articles.tsv`.

## Text sources for luminaries (beyond YouTube)

- Codrops (tympanus.net/codrops): "Studio Spotlight" (28 studios so far), "Designer Spotlight", "Developer Spotlight", and "Case Study" (studios explain how they built award-winning sites; mostly WebGL/portfolio, so secondary for us). Blocks simple fetchers (403); a browser user agent works.
- Awwwards: conference talks (YouTube @AwwwardsTV, mostly 2014-2022), "Deconstructing Winning Websites" and "Live Jury Website Reviews" streams (2020-22), Academy courses (paid).
- Not yet tapped: It's Nice That and AIGA Eye on Design (studio profiles), Typewolf and Fonts In Use (which typefaces great sites use), The Futur and Design Indaba (legend interviews), Netflix "Abstract" (full episodes on YouTube; Ilse Crawford's interior/hospitality episode could matter for a travel brand).

## Reference and moodboard tools mentioned (to verify in the transcripts)

- Galleries of live sites: Awwwards, Godly, Land-book, SiteInspire, Lapa Ninja, One Page Love, Httpster, Minimal Gallery.
- Product screens and flows: Mobbin, Refero. Refero also sells an MCP server so AI agents can pull real references; the business tier has a USD 2,000 minimum (doc.refero.design/mcp/business). Personal-plan MCP access not checked.
- Visual bookmarking and moodboards: Cosmos, Savee, Are.na, Pinterest, Milanote, PureRef, Kosmik, Adobe Firefly Boards, Figma/FigJam.
- Type: Typewolf, Fonts In Use.

## Open: deep dive candidates

- Meng To / DesignCode: all relevant videos from the last 12 months (most direct value for AI-built sites).
- Ran Segall / Flux Academy: agency process and AI, last 12 months.
- Dive Club: full last-12-month archive (about 120 interviews; large).
