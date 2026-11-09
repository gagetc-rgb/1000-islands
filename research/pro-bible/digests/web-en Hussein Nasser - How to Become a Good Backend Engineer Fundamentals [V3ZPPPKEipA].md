# How to Become a Good Backend Engineer (Fundamentals)
- Source: Hussein Nasser (YouTube, en) · 2020-03-19 · 27 min · https://youtu.be/V3ZPPPKEipA
- Speaker(s) and why they matter: Hussein Nasser, a backend/software engineer with a channel on backend engineering ("I've been tasting back-end engineering for the past 15 years", 13:13). He gives a map of fundamentals (not tools) for people who want to become backend engineers. Self-described "all my personal opinion" (4:08).
- Relevance to course: 2 (lessons 5 and 10: vocabulary of what lies behind a website, and the point that nobody knows all of it; not for owners' decisions) · Freshness matters? low (2020; HTTP/3 was new)
- Codes: HOST, SEC, PERF
- Notes: no sponsor segment; asks for subscriptions. Career-advice talk; no claims are tested or cited.

## Core thesis
A backend engineer should understand concepts rather than tools (protocols, web servers, databases, proxies, caching, messaging, frameworks, message formats, security) and then pick one area to go deep in; no one is an expert in all.

## Claims and advice
- [HOST][PERF] Understand the protocols: TCP vs UDP, HTTP (1, 2 and the new 3), WebSockets (two-way, for chat and games), gRPC; knowing why TCP connections are slow to start explains why opening hundreds of connections in a loop makes an API slow. (3:05-8:08) — type: practice
- [HOST][PERF] Web servers serve static or dynamic content; important details are caching (ETags), threading models (Node.js single thread vs multi-threaded Tomcat/Apache), and that NGINX can act as both web server and proxy. (8:08-10:10) — type: practice
- [HOST] Database engineering: know ACID (atomicity, consistency, isolation, durability); NoSQL traded some of these properties for scalability. (10:10-13:13) — type: practice
- [HOST][PERF][SEC] Proxies and reverse proxies (caching layers, load balancers, TLS termination, layer 4 vs layer 7) are growing in importance, along with service meshes in microservice systems. (13:13-15:15) — type: opinion (personal favourite)
- [PERF] Caching is "one of the hardest problems in computer science"; learn when to use it and in-memory caches. (15:15-16:16) — type: opinion
- [HOST] Messaging systems (RabbitMQ, Kafka, ZeroMQ) exist for systems that talk to each other; understand what a messaging system is, not each product. (16:16-18:19) — type: practice
- [HOST] Web frameworks and API styles (REST, gRPC) and message formats (XML, JSON, protocol buffers: smaller payloads) are fundamentals. (18:19-20:24) — type: practice
- [SEC] Security: TLS, man-in-the-middle and replay attacks, keeping database credentials safe, firewalls (which ports to open), denial of service. (20:24-22:25) — type: practice
- [AIW] Do not call yourself an expert; pick a language you like (he prefers JavaScript because it runs in any browser); pick one area to specialise; full-stack is fine but "people will not hire you" for deep specialist jobs. (12:12, 22:25-26:31) — type: opinion

## Techniques and steps
Not a procedure.

## Tools and resources
- Mentions his own videos on TCP, UDP and HTTP, and several front-end educators (names garbled in the caption).

## Quotes
- "there is always a reason for anything" in software (17:19, near-verbatim)
- "all of this stuff is all my personal opinion" (4:08)

## Disagreements and contrarian points
- Differs from OneTwoCoding, who names three essentials (web server, application server, database); Nasser lists many more. Different scope, not a conflict.

## For the course
Lessons 5 and 10: gives context only (a static brochure site needs far less than this list); the sentence "no one knows all of this" helps explain why an owner needs specialists. No rules to use.

## Other
Contains no web-design or SEO claims.
