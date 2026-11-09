# Cross-check 10: privacy and cookie consent for small-business sites (digest-based, quotes from transcripts, EU/UK primary texts fetched 11 Oct 2026)

Lesson feed: lesson 7 (privacy part). **Scope warning:** all sources are EU, UK or French/Spanish/German. The client business is in Bali; GDPR still applies when it offers services to people in the EU (Art 3(2), ◆ below). Indonesian law (UU PDP) and Australian/US rules were **not researched**; treat as thin.

Sources (7 videos; languages en x4, de, fr, es). Short names: **TG** = priv-en TechGDPR [JgfPWTCogOM] (consultancy, 2023); **HP** = priv-en HotPETS 2020 academic talk [zuzRvpq7rb0]; **GR** = priv-de lawyer Röttger, Planet49 [7nRtqajnQUg] (2020); **WL** = priv-fr Webalab [gOgXlVE231E] (2021); **GA** = priv-en Google Analytics consent mode [MqAEbshMv84] (Google, 2023); **SB** = priv-en Small Business Toolbox, ICO [Fph8iuqVPBQ] (2020); **RM** = priv-es Rubén Monllor [J8sGgDAD9KA] (2024, non-expert). Plus CR (Craylor, analytics alternatives, `answers/11`). Files in `transcripts/`, digests in `digests/`.

Tags: ◆ primary page verified (PRIMARY_SOURCES.md, "Privacy and consent"), ◈ several authors, ◇ single author or disputed.
Independence: TG, HP and GR all rest on the same EU texts (GDPR, ePrivacy Directive, Planet49, EDPB guidelines); they are different people, but their agreement shows they read the law alike, not that it was independently tested. GA is Google's own account of its product; SB and RM are not lawyers.

## A. Rules agreed by at least three authors (and confirmed by primary texts)

1. ◆◈ **Non-essential cookies and similar tracking need the visitor's prior opt-in; strictly necessary ones do not.**
   - TG [2:06]: the ePrivacy directive requires controllers "to give them the ability to opt in to those cookies that are strictly that are not strictly necessary"
   - HP [1:03]: "websites needs to collect users consent before any processing of data through cookies well at least for not necessary"
   - GR [9:11]: "für die funktionalität der website technisch nicht unbedingt erforderliche cookies grundsätzlich eine einwilligung des website nutzers bedürfen"
   - WL [4:05]: "aucun coup qui ne doit être déposé sur mon navigateur" when refusing (caption garbled; meaning: no cookie may be set after Reject)
   - Primary ◆ ePrivacy Directive Art 5(3): storing or accessing information on a user's device "is only allowed on condition that the subscriber or user concerned has given his or her consent, having been provided with clear and comprehensive information", except storage "strictly necessary in order for the provider of an information society service explicitly requested by the subscriber or user to provide the service."

2. ◆◈ **Silence, pre-ticked boxes, scrolling or "continued use" are not consent.**
   - TG [4:11]: "pre-ticked boxes or the setting of cookies before the user makes a choice or regardless of whether they ignore the banner is illegal"
   - GR [18:22]: "eine aktive einwilligung ist nur dann gegeben wenn derjenige ganz bewusst auch seinen haken setzt"
   - HP [6:07]: consent must be "free, specific, informed and ambiguous [sic: unambiguous], revocable, given prior to any data collection"
   - Primary ◆ GDPR Recital 32: "Silence, pre-ticked boxes or inactivity should not therefore constitute consent."; EDPB Guidelines 05/2020: "The use of pre-ticked opt-in boxes is invalid under the GDPR." and "actions such as scrolling or swiping through a webpage ... will not under any circumstances satisfy the requirement of a clear and affirmative action"; CJEU Planet49 (C-673/17): consent "is not validly constituted if ... permitted by way of a pre-checked checkbox which the user must deselect to refuse his or her consent."

3. ◆◈ **The visitor must be told what is set, for how long, and who gets access.**
   - GR [10:13]: "die funktionsdauer ... sowie die zugriffsmöglichkeit dritter"
   - TG [4:11]: informed means "the user must have simple information given to them in order to make a decision to consent so a mere link to the privacy or cookie notice is likely illegal"
   - HP [8:07-9:10]: the vendor list behind one click on CNN's banner (606 vendors; 5 purposes)
   - Primary ◆ Planet49 answer to Question 2: "the information that the service provider must give to a website user includes the duration of the operation of cookies and whether or not third parties may have access to those cookies."

4. ◆◈ **The banner must actually block scripts until consent; test it.**
   - GR [28:37]: "euch bringt der beste content banner nix wenn er nicht funktioniert ... dann haftet ihr weiterhin dafür"
   - WL [4:05]: "ce qui est très important dans un bandeau ce n'est pas juste de mettre le bandeau" and the private-window test (1:01-4:05)
   - HP [10:12]: researchers found "websites that pretend that you accepted even before you clicked on the banner" and "websites that register your positive consent even if you explicitly reject it"
   - GA [3:04-5:06]: default consent state denied, set before the tag loads; update on choice (Google's own pattern; ◆ Google tag-platform guide shows `gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'})`; the 2023 video predates `ad_user_data` and `ad_personalization`).

5. ◆◈ **Consent can be changed or withdrawn later, as easily as it was given.**
   - GR [29:38-30:38]: put a link to the consent settings in the privacy statement and in the footer
   - TG [11:23]: "make sure they are accessible at any time best practices include leaving a cookie icon hovering in one corner of the page"
   - HP [6:07]: "revocable"
   - Primary ◆ GDPR Art 7(3): "It shall be as easy to withdraw as to give consent."

6. ◈ **Installing a banner product does not make you compliant; the site owner stays responsible.**
   - TG [11:23-12:25]: "relying on a cookie Banner solution even those from reputable providers does not make you compliant"
   - HP [12:14-13:14]: responsibility is shared across the framework, advertisers, banner providers and publishers; "website publishers have their share of responsibility if they choose non-compliant banners"
   - GR [27:36-28:37]: banner and site code must be wired together by someone technical
   - RM [12:12]: use a consent tool or consult a privacy lawyer (weak)

7. ◆ **Refusing must be as easy as accepting; hiding Reject is a violation.** Video support is partial (TG [6:15-7:15] false hierarchy and sneaking; RM [11:11] "los botones tienen que ser exactamente igual"; WL [23:28] shows Accept and Reject aligned in a test), so this is ◈ at two to three authors, but ◆ by primary text:
   - EDPB Cookie Banner Taskforce (18 Jan 2023): "a vast majority of authorities considered that the absence of refuse/reject/not consent options on any layer with a consent button of the cookie consent banner is not in line with the requirements for a valid consent and thus constitutes an infringement."
   - CNIL: "L'utilisateur doit pouvoir accepter ou refuser le dépôt et/ou la lecture des cookies avec le même degré de simplicité."
   - Caution ◆: the same taskforce report says "a general banner standard concerning colour and/or contrast cannot be imposed on data controllers", so RM's "exactly equal" is a simplification: the test is "same degree of simplicity", assessed case by case.

8. ◆ **A non-EU business is covered when it targets people in the EU.** Primary only (no video states it clearly, HP [1:03] touches it): GDPR Art 3(2) applies to controllers not established in the Union where processing relates to "the offering of goods or services, irrespective of whether a payment of the data subject is required, to such data subjects in the Union" or "the monitoring of their behaviour as far as their behaviour takes place within the Union."

## B. Single-author items

- GR [6:06, 12:15]: pure audience counting could rest on "legitimate interest"; profiling and remarketing need consent. ◇ the lawyer's 2020 risk view. ◆ The later EDPB report says "the legal basis for the placement/reading of cookies pursuant to Article 5 (3) cannot be the legitimate interests of the controller." So the legitimate-interest route is closed for cookies; the only audience-measurement route is the strictly-necessary exemption (next item).
- ◆ CNIL (France): audience-measurement cookies "peuvent être exemptés de consentement sous certaines conditions": purpose "strictement limitée à la seule mesure de l’audience ... pour le compte exclusif de l’éditeur", "données statistiques anonymes uniquement", no cross-referencing with other processing, no transfer of non-anonymous data to third parties, no cross-site tracking. This is the nuance behind CR's "no banner needed" claim for Umami/Plausible ([3:06]); it holds only for a configuration that meets those conditions and only under French regulator guidance; for GA4 default configuration this is **not verified**. UK: the ICO page has a section "What is the ‘statistical purposes’ exception?", details not extracted.
- GR [3:04, 25:34] and SB [14:23]: opt-in analytics loses most of the traffic ("weit unter fünf Prozent"; the ICO reported "approximately 90 percent drop in sessions" after switching its own analytics off by default). ◇ anecdotal, but consistent; use as "expect much less data".
- GR [35:47]: Spanish fine of 30,000 euros for fingerprinting without consent. ◇ **not verified**.
- RM [13:14]: fines of up to 20 million euros or 4% of turnover. ◇ that is the GDPR maximum, not the cookie-specific scale; **not verified** for cookies.
- RM [5:06]: "new changes in January 2024 in Spain". ◇ **not verified**.
- WL [16:18-21:26]: IAB TCF v2; WL [0:00]: the CNIL tolerance period ended on 1 April 2021. ◇ **not verified** (TCF irrelevant for a small site).
- SB [7:10]: the EU's January 2017 proposal said counting visitors would no longer require consent. ◇ a proposal for a regulation that was not adopted.
- GA [2:03]: anonymous pings are used for behavioural modelling to fill gaps. ◇ vendor claim, **not verified**.

## C. Disagreements

- **Is audience measurement exempt?** GR (2020 lawyer): maybe on legitimate interest. TG and the EDPB taskforce: Art 5(3) needs consent or an exemption, never legitimate interest. CNIL: exempt only under strict conditions. SB (2020): analytics should obviously be exempt, regulators are wrong. Reading: no universal "analytics is exempt"; tell the lesson to ask for a CNIL-compliant configuration or to accept opt-in with data loss.
- **Optimise the banner for acceptance?** WL [23:28-24:30] describes A/B testing banners to raise consent; TG [5:13-8:17] treats nudging as a dark pattern. Reading: test for clarity, not for coercion.
- **Strictness of "equal prominence".** RM says identical buttons; EDPB taskforce says no fixed colour/contrast rule; CNIL says same simplicity.
- **Value of the law.** SB complains the rules are vague and unenforced (ICO had issued no cookie fines as of 2019); the Spanish fine and the EDPB taskforce show enforcement elsewhere. Do not base a client's risk on one regulator's past behaviour.

## D. Notes for the lesson

- Four numbers to keep: none are numeric thresholds; the lesson is a checklist: (1) list every third-party script and cookie; (2) nothing non-essential fires before consent (test in a private window with DevTools); (3) Reject as easy as Accept; (4) settings link in the footer, privacy policy names providers and duration.
- Ask the AI for: "block all non-essential scripts until consent; default denied; store the choice; provide a footer link to reopen settings; no pre-ticked boxes; no cookie wall; list every cookie with purpose, duration, provider."
- For a Bali business with EU tourists: GDPR scope applies (Art 3(2)); the practical choice is opt-in banner with Reject on first layer, or no non-essential trackers at all. Local-law check (Indonesia, Australia) is open work.
