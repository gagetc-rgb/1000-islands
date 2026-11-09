# Архитектура веб-приложений: от простых до высоконагруженных (Web application architecture: from simple to high-load) [original in Russian]
- Source: Senior Software Vlogger (YouTube, ru; **the caption is a machine translation into English** with garbles, e.g. "Caucasian" for Kafka, "oak tree" for Hadoop, "SG" for SendGrid, "memкш" for Memcached) · 2020-07-05 · 25 min · https://youtu.be/9mZmc6a0tmM
- Speaker(s) and why they matter: a Russian-speaking senior software developer who lives in Germany (he offers to send a book "from Germany", 22:30) and runs a vlog; this video adapts a popular architecture article (the caption's like-count is garbled, 23:31). Contains a **sponsored segment for a hosting provider** (a ".ua" domain, name garbled in the caption, with a promo code and "60% discount" for three months, 3:03-4:04) and a book giveaway.
- Relevance to course: 2 (lesson 5 and hosting hand-off: what a typical server stack contains; for a brochure site, only the first stage matters) · Freshness matters? low
- Codes: HOST, PERF, ANALYTICS
- Notes: **machine-translated caption; no direct quotes are used.** The sponsor segment is advertising and not evidence. The hosting recommendation is not used.

## Core thesis
A web application starts as one server with the application and database and grows in stages: a cache, cloud file storage, a separate database and cache, several application servers behind a load balancer, background queues and workers, search, third-party services, streaming events and a data warehouse. Add each piece only when a business problem needs it.

## Claims and advice
- [HOST] A single server holding the application and its database "can withstand quite serious loads" and is a perfectly workable start; shared/virtual hosting is simply what the host gives you. (0:00-2:02) — type: opinion/practice (experience)
- [HOST][PERF] Add a cache (Memcached, which loses data on restart, or Redis, which can write to disk) to avoid hitting the database for every page. (2:02-3:03) — type: practice
- [HOST] Keep user uploads in cloud storage (for example Amazon S3) rather than on the server disk. (5:05-6:06) — type: practice
- [HOST][PERF] For reliability, move the database and the cache to their own servers; then run several application servers behind a load balancer (Nginx or HAProxy); the DNS records point to the balancers, not to the application servers, so servers can be added or replaced. (6:06-9:09) — type: practice
- [HOST][PERF] Heavy jobs (video transcoding, sending email, image previews) run in background workers fed by a queue (RabbitMQ), so requests stay fast; a database table can work as a queue early on but "this is not the database's job". (9:09-13:15) — type: practice
- [HOST] Use third-party services for email (a mail service rather than your own server) and, if needed, a search engine (Elasticsearch, Solr) instead of database search. (14:17-16:20) — type: practice
- [ANALYTICS] Stream processing (Kafka) for real-time dashboards of events such as registrations; a data warehouse for periodic reports. (17:21-20:27) — type: opinion/practice (only for large systems)
- [HOST] Microservices mainly make it easier to organise many teams and to scale parts separately. (16:20) — type: opinion
- [HOST] The book he recommends (not named in the sampled caption) is "less than 400 pages" and goes from simple to complex. (21:28-22:30) — type: promotion/giveaway

## Techniques and steps
Not a procedure; a growth path.

## Tools and resources
- Redis, Memcached, S3, Nginx, HAProxy, RabbitMQ, Elasticsearch, Solr, Kafka, Hadoop (names from the caption's garbled forms).

## Quotes
- None (caption unreliable).

## Disagreements and contrarian points
- Compared with OneTwoCoding: same direction (web server to application to database), but this video builds much further. The sponsor segment recommends a specific hosting provider; not relied on.

## For the course
Lesson 5/hosting hand-off: shows that a first stage (one server, no extra services) is normal and that scaling pieces are added later; useful against over-engineering a brochure site. Not used for specific recommendations.

## Other
Mentions that "an excellent hosting service" was the sponsor; flag any use of this video's hosting statements as promotional.
