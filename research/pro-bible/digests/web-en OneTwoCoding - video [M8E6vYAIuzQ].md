# 백엔드 개발을 위해 꼭 알아야 할 전체 구성 (the three core parts of a backend) [original in Korean]
- Source: OneTwoCoding (원투코딩, YouTube, ko; **the caption is a machine translation into English** with garbles: "Wants Coding", "washes" for WAS, "Webber" for web server, "Revelation No. 123" for post number 123) · 2025-08-30 · 13 min · https://youtu.be/M8E6vYAIuzQ
- Speaker(s) and why they matter: a Korean programming educator for beginners and interview preparation (the channel promotes its own community site, 8:17). The video explains the web server, the web application server (WAS) and the database as the backend's three parts.
- Relevance to course: 2 (lesson 5/10: what a "backend" is; useful for understanding what a hosting stack contains; vocabulary is Korean-IT specific) · Freshness matters? low
- Codes: HOST, SEC, PERF
- Notes: **machine-translated caption; no direct quotes are used.** No sponsor segment. The terms (WAS, "backend framework") follow Korean interview convention and are less common in English.

## Core thesis
A backend is three things: a web server for static files, an application server that runs code to build dynamic responses, and a database that stores data safely; each exists because the previous one could not solve a specific problem.

## Claims and advice
- [HOST] Early web servers (Nginx, Apache, IIS, Caddy) only served static files such as `index.html`; the content did not change by user or time. (0:00-2:03) — type: evidence (historical simplification)
- [HOST] An application server (WAS) generates dynamic pages by running code for each request; a backend framework (Spring, Django, FastAPI, Express) is the blueprint and the WAS is the engine that runs it; modern frameworks embed their server (Spring Boot with Tomcat, Express on Node.js). (2:03-6:14) — type: evidence/practice
- [HOST][PERF] Databases solve three things that plain files cannot: concurrent access (locks, race conditions such as the last pair of shoes), integrity (transactions such as a bank transfer) and speed (indexes). (6:14-8:17) — type: evidence
- [HOST][SEC] Worked flow: static files from the web server; a login request is proxied to the application server, which checks the database and returns a token (JWT); later requests carry the token. (8:17-11:20) — type: practice (login flow simplified)
- [HOST] Understanding the reasons each part exists is more important than learning monitoring, load balancing, caching, CI/CD or Kubernetes first. (0:00, 11:20-12:23) — type: opinion

## Techniques and steps
Not a procedure.

## Tools and resources
- Nginx, Apache, IIS, Caddy, Tomcat, Spring, Django, FastAPI, Express, JWT.

## Quotes
- None (caption unreliable).

## Disagreements and contrarian points
- Academind and Hussein Nasser describe the same chain without the WAS/web-server split; the WAS label is mostly a Korean/Java-world term. No factual conflict.
- The claim that these three are "the" essentials is an educator's opinion.

## For the course
Lessons 5 and 10: only as a vocabulary map of what sits behind a site (static server, app server, database). For a brochure travel site on static hosting only the first part matters. Not used as evidence.

## Other
A Korean-language native caption was not available.
