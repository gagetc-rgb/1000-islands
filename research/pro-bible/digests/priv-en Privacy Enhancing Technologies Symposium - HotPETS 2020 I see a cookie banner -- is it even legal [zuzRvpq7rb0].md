# HotPETS 2020: I see a cookie banner -- is it even legal?
- Source: Privacy Enhancing Technologies Symposium (HotPETS 2020, YouTube, en) · 2020-07-23 · 15 min · https://youtu.be/zuzRvpq7rb0
- Speaker(s) and why they matter: a computer-science researcher at Inria and a legal scholar (their names are garbled in the caption; the third collaborator too), presenting academic work on consent banners and the IAB Europe Transparency and Consent Framework. Research-based; the strongest "primary-leaning" voice in the privacy set, but from 2020.
- Relevance to course: 4 (lesson 7) · Freshness matters? the facts about the framework date from 2020; the law's consent test has not changed
- Codes: PRIV
- Notes: no sponsor. Interactive audience polls are described but vote counts are not audible in the transcript.

## Core thesis
Whether a cookie banner is legal depends on 22 legal and technical requirements; most real banners fail some, and the IAB Europe consent framework produced violations (consent registered before or against the user's click; advertisers using legitimate interest where consent is required).

## Claims and advice
- [PRIV] GDPR applies to EU users' data wherever the controller is established if it offers goods or services or monitors behaviour; the ePrivacy directive requires consent for non-necessary cookies. (1:03) — type: evidence (legal summary)
- [PRIV] Cookie banners have two functions: inform and collect consent. (1:03-2:03) — type: evidence
- [PRIV] Audience polling of real banners (Twitter, a generic "best user experience" banner, Zoom, CNN): most voters judged the Twitter and generic banners non-compliant. (2:03-5:06) — type: evidence (informal)
- [PRIV] Consent must be "free, specific, informed and ambiguous [unambiguous], revocable, given prior to any data collection and asked in a readable and accessible manner". (6:07) — type: evidence (their summary; the caption says "ambiguous" but means unambiguous)
- [PRIV] Their paper derives 22 legal and technical requirements (about 70 pages). (6:07) — type: evidence
- [PRIV] Clicking "I accept" on CNN's banner meant consent to 606 third-party vendors and five purposes (measured with their "cookie glasses" browser extension). (7:07-9:10) — type: evidence (one site, 2020)
- [PRIV] They found banners that pretend consent was given before the click and banners that record consent even when the user rejects. (10:12) — type: evidence
- [PRIV] Many advertisers used legitimate interest for purposes that, in the framework's own definition, require consent: 175 advertisers for ad selection/delivery/reporting, 199 for measurement. (11:13) — type: evidence
- [PRIV] Responsibility is spread across the framework body, advertisers, banner vendors and publishers; "it depends". (12:14-13:14) — type: opinion
- [PRIV] noyb filed complaints with the CNIL using their tool. (13:14) — type: evidence

## Techniques and steps
Use a browser extension like cookie glasses to see which vendors and purposes a banner records.

## Tools and resources
- "Cookie glasses" browser extension (Chrome and Firefox, open source) (7:07-9:10)

## Quotes
- "when you click i accept on this website it means that you have given your consent to 606 third-party vendors" (9:10)

## Disagreements and contrarian points
- Contrasts "it is easy, read the GDPR" with the need to read guidelines, authority guidance and court decisions: the law is not self-evident.

## For the course
Lesson 7: gives a research-based definition of valid consent to pair with the EDPB wording, and a concrete warning that one click on a big-site banner can hand data to hundreds of vendors; use as the reason to list and minimise third parties.

## Other
Mentions CCPA enforcement starting 1 July 2020.
