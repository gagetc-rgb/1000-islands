# Difference between cookies, session and tokens
- Source: Valentin Despa (YouTube, en) · 2021-09-02 · 12 min · https://youtu.be/GhrvZ5nUWNg
- Speaker(s) and why they matter: Valentin Despa, a developer-educator (his background is not stated in the caption; he promises a follow-up on testing with Postman at 11:14). A plain-language explainer using analogies (cloakroom ticket, gym card, hotel wifi password) for non-coders.
- Relevance to course: 4 (lesson 5 security/privacy: what a login does, what cookies are, why servers do not trust cookie contents; links to the privacy answer on cookies) · Freshness matters? low
- Codes: SEC, PRIV, HOST
- Notes: no sponsor; asks for likes and subscriptions. Simplifies (the "gym card" analogy; "content of the cookie is secret and other websites cannot read it").

## Core thesis
A login exchanges username and password for a session ID stored in a cookie; the server keeps the real session data and validates the ID on each request. Tokens (OAuth, JWT) are a different mechanism for giving limited, revocable access to third parties.

## Claims and advice
- [SEC] After login the server creates a session record and gives the browser a random session ID in a cookie (a cloakroom ticket); the browser sends it automatically with every request; logging out or expiry invalidates the session on the server and the cookie becomes worthless. (0:01-3:03) — type: evidence (standard session mechanism)
- [SEC][PRIV] A cookie only works with the site that set it; sessions time out (banks about 5 minutes or less, social sites long-lived). (3:03-4:05) — type: practice
- [SEC] Servers store session information server-side because cookie content comes from the client and "cannot be trusted"; the session ID should be "meaningless, randomly generated and hard to guess"; cookies are only the transport. (4:05-6:07) — type: evidence (consistent with the OWASP guidance in `answers/05-security.md`)
- [SEC] Tokens (OAuth, OpenID, JWT) let an app act for you without your password, with limited scope and expiry, and can be revoked without changing the password; a JWT carries the customer ID, scope, issue and expiry times and is cryptographically signed so tampering can be detected. (6:07-9:11) — type: evidence
- [SEC] Tokens involve multiple parties who may not trust each other and usually follow a standard; some tokens need no server-side session because the token holds it, "this is not a rule"; they are sent in the `Authorization` header rather than the `Cookie` header, since apps are not browsers. (9:11-11:14) — type: practice

## Techniques and steps
Inspect login traffic in DevTools Network to see the cookie being set.

## Tools and resources
- Browser DevTools; Postman (next tutorial).

## Quotes
- "the session id is a meaningless randomly generated and hard to guess sequence of letters and numbers" (5:06, near-verbatim)
- "cookies can be modified by the client, so the server cannot trust them and always needs to validate them" (5:06, near-verbatim)

## Disagreements and contrarian points
- None in this set; the video is silent on cookie flags (HttpOnly, Secure, SameSite) and consent, which other sources cover (see `answers/16-security-addendum.md` and `answers/10-privacy-consent.md`).

## For the course
Lesson 5: use for "what a session cookie is" and "cookies do not prove identity on their own"; it does not address tracking cookies, so the privacy lesson must come from the consent answers.

## Other
The claim that a cookie "is stored on your computer's file system" is a simplification (browsers keep cookie stores).
