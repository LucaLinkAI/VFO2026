# VFO Collective 2026

Notes, source materials, and a static companion website for the **VFO (Virtual Family Office) Collective 2026** conference — covering advanced tax planning, the advisor + accountant partnership model, and building a virtual family office practice.

## Contents

| Path | Description |
| --- | --- |
| `site/` | Cloudflare Pages static site summarizing the conference (deep dives, strategies, personas, meeting summaries). |
| `Day 1 Talks/` | Source slide decks (PDF) for Day 1 sessions. |
| `Day 2 Talks/` | Source slide decks (PDF) for Day 2 sessions. |
| `Books/` | Reference guides and playbooks (PDF). |
| `2026 VFO-Collective Agenda.pdf` | Full conference agenda. |

## The site

The `site/` directory is a static site deployed with [Cloudflare Pages](https://pages.cloudflare.com/) (see `site/wrangler.toml`). The build output lives in `site/public/`.

Key pages:

- `index.html` — landing page and conference overview
- `strategies.html` — advanced tax-planning strategies
- `business.html` / `partnership.html` — advisor + accountant collaboration
- `personas.html` — client personas
- `meeting-summary.html` — session summaries
- Per-topic deep dives: charitable tax planning, cost segregation, premium financing ("Rothish"), subscription model, succession planning, and more

### Local preview

```bash
cd site
npx wrangler pages dev public
```

### Deploy

```bash
cd site
npx wrangler pages deploy public
```

## Sessions

**Day 1** — Estate planning, film production investments, oil & gas / QOZ, cost segregation, leveraged entity ownership, premium financing, charitable tax planning, solar tax strategy, qualified plans, cybersecurity, and multi-business structuring.

**Day 2** — Transformation of advisory firms, the VFO portal/AI solution, advisor & accountant success panel, risk mitigation, subscription business models, succession planning, energy storage tax planning, and selling tax plans.

See `Day 1 Talks/` and `Day 2 Talks/` for the full decks.

---

> The PDFs in this repository are conference materials authored by their respective presenters and are included here for reference.
