# Микроразметка Schema.org. Зачем нужна schema и как её использовать
- Source: AVIS TV (YouTube; Russian original, the file's English caption is machine-translated, `en.vtt`) · 2021-11-05 · 13 min · https://youtu.be/BkP-a3J-yTg
- Speaker(s) and why they matter: Emil of AVIS TV, a Russian-language web-development channel. Practical microdata walkthrough with a product card. Mentions Yandex support.
- Relevance to course: 2 (lesson 6; Russian-language source, microdata not JSON-LD) · Freshness matters? moderate
- Codes: SEO
- Notes: the caption garbles schema.org as "Keima"/"Ark" and many attribute names; I describe meaning only. No sponsor; subscribe plea at the start and end.

## Core thesis
Search robots do not understand the meaning of page blocks; schema.org micro-markup in the HTML (microdata attributes `itemscope`, `itemtype`, `itemprop`, or JSON-LD) tells them what is a name, price, currency, stock status.

## Claims and advice
- [SEO] A site is "just a set of HTML tags"; robots try to infer meaning but cannot do it as humans do; markup states what is what. (0:00-1:00) — type: opinion
- [SEO] schema.org became the standard supported by Google, Bing and Yahoo (2011); Yandex also supports it but not every type; check Yandex documentation. (1:00-2:02) — type: evidence (claims not verified here)
- [SEO] Microdata example for a product: parent block with `itemscope` and `itemtype`, `itemprop` for name, description, image; price and currency inside an Offer sub-block; availability by a link element; `meta` tags can carry price and currency inside the body. (2:02-9:11) — type: practice
- [SEO] Alternative: JSON-LD; generate with an online markup constructor, then validate; the constructor's output initially failed Google's validator and needed fixing. (9:11-11:17) — type: practice
- [SEO] Validate with a micro-markup validator; fix errors, warnings about missing ratings are minor. (10:14-12:18) — type: practice

## Techniques and steps
1. Choose the schema type from schema.org docs.
2. Mark up or generate JSON-LD.
3. Validate and fix errors.

## Tools and resources
- schema.org, a markup constructor and validators (names not clear in caption) (9:11-12:18)

## Quotes
- None (machine-translated caption).

## Disagreements and contrarian points
- Uses microdata attributes as the main method; Google's own recommendation is JSON-LD.

## For the course
Lesson 6: shows the same vocabulary in microdata. Low weight; does not add rules beyond "validate".

## Other
None.
