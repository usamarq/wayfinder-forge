# Open-application email ({{COMPANY}})

<!--
A spontaneous or open application sent to a company with no matching advertised
role. The email body IS the cover letter. Same hard rules as any letter
(CLAUDE.md Voice), plus these:

- SHORTER than a formal cover letter: 3 short paragraphs. This is an email.
- Lead with the evidence, not "I am writing to apply". Numbers trace to MASTER_CV.md.
- Name the specific fit area and ONE concrete reason for THIS company (from
  research.md or their own site), so it does not read as a mass mailout. No fake
  familiarity.
- No em dashes. No superlatives, no "passionate about", no "excited to". No
  confession of gaps: that rule applies here too.
- Never mention work-authorisation status. Answer it only if they ask back.
- The assistant DRAFTS this. You send it. Never auto-send.
- Attach the right CV: the designed base-cv/cv.pdf for a human reader, or a
  segment-tailored version if one exists.
- SIGN-OFF: one item per line, never a pipe-separated single line. A single line
  carrying an email, a phone number and two URLs runs past 80 characters, wraps
  badly in most clients, and mail clients auto-linkify the bare domains into long
  ugly anchors. One per line stays short enough never to wrap and keeps each link
  clickable.
- If the draft is created through a mail API rather than the web client, supply an
  HTML body with explicit anchors as well as the plaintext part. Otherwise the
  client rewrites bare domains into tracking-style redirect URLs, which in a cold
  email looks exactly like what it is not.
-->

**To:** {{published recruitment address, OR the open-application form URL}}
**Subject:** {{e.g. "Open application: {{field}} ({{your qualification}})"}}
**Attach:** {{cv-....pdf}}

Dear {{COMPANY}} Team,

{{P1: the strongest, most relevant piece of evidence for this company, stated plainly, with a number from MASTER_CV.md.}}

{{P2: why you are writing on your own initiative: ONE concrete, specific, verifiable reason for this company, this team, or this product. Name the fit area and how it maps to what they do.}}

{{P3: where you are based and what work model you are open to. The CV is attached. If a role along these lines is open now or opens later, you would welcome a short conversation. Thank them for their time.}}

{{SIGN-OFF}},

{{YOUR NAME}}
{{email}}
{{phone}}
{{linkedin}}
{{github or portfolio}}
