# How The Web Works - The Big Picture
- Source: Academind (YouTube, en) · 2019-04-15 · 12 min · https://youtu.be/hJHvdBlSxug
- Speaker(s) and why they matter: the Academind channel, a course business (the presenter is not named in the caption; the video asks viewers to subscribe, 0:02). A clear, non-technical overview of what happens when you open a web page; suited to non-coders.
- Relevance to course: 4 (lesson 1/5 web basics: URL, DNS, request/response, HTML/CSS/JS, HTTPS) · Freshness matters? low
- Codes: HOST, SEC, CSS, SEO
- Notes: no sponsor segment. Simplifies HTTPS ("end to end encrypted") and omits CDNs and caching.

## Core thesis
A browser requests a page from a server found via DNS; the server returns HTML (plus CSS and JavaScript); the same request/response pattern powers apps that exchange JSON instead of HTML.

## Claims and advice
- [HOST] Typing a domain makes the browser ask a DNS server to translate the name to an IP address, then request the page from that server; the server either generates the page dynamically or returns stored files. (0:02-3:08) — type: evidence (correct overview; see `answers/12-domains-dns-hosting.md` for details of DNS and hand-off)
- [HOST] A request contains a URL, a method (GET to fetch, POST to send data) and headers; a response contains headers and mostly the HTML; both can be inspected in the DevTools Network tab. (3:08-4:09) — type: evidence
- [CSS][A11Y] HTML gives structure (heading, paragraph, input, button); CSS gives appearance; JavaScript handles everything that changes in the browser after load (dropdowns, tabs, overlays). (4:09-6:09) — type: evidence
- [SEC] HTTP is the standard; HTTPS is the encrypted form, used by all modern sites so that a person sniffing the connection sees unreadable content. (6:09-7:12) — type: evidence (simplified; see `answers/05-security.md` and OWASP notes for what HTTPS does and does not protect)
- [HOST] Server-side code (Node.js, PHP, Python) and frameworks generate pages and parse requests; front-end frameworks make dynamic pages easier. (7:12-9:14) — type: practice
- [HOST] The web is more than websites: mobile apps use the same request/response model but ask for JSON, and WebSockets let a server push data. (9:14-11:16) — type: evidence

## Techniques and steps
Not a procedure; a mental model.

## Tools and resources
- Browser DevTools (Network tab).

## Quotes
- "your browser in the end is just an interpreter" (1:04, near-verbatim)

## Disagreements and contrarian points
- None; consistent with the hosting/DNS answers and the Hussein Nasser video.

## For the course
Lesson 1 (web basics) and lesson 5: the clearest plain-language chain URL, DNS, server, HTML/CSS/JS, HTTPS; use as the base for later lessons on hosting and security. Does not cover caching or CDNs.

## Other
None.
