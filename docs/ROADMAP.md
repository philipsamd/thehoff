# 30-Day Roadmap: AI Agent + iOS Hub

Target: AI agent layer (find, tag, approve, activate assets) on a governed backend, shipped to iOS via Capacitor wrapping this React app.

| Days | Focus |
|---|---|
| 1-7 | Scope and metrics, CI, data model (`src/lib/domain.ts`), Supabase backend + auth/RLS, React Query hooks, real upload/versioning, audit log, security checklist |
| 8-14 | LLM server proxy, embeddings, RAG chat with citations, auto-tagging, agent tools (`src/lib/agentTools.ts`), action log + confirmation + rate limits, ~50-query eval set |
| 15-21 | Approvals workflow, connectors (read-only first), SEO/GEO agent features, mobile-first UI, Capacitor iOS (`capacitor.config.ts`), native features, TestFlight internal |
| 22-30 | Analytics, performance, compliance, a11y + E2E, pilot, TestFlight external, agent tuning, docs/monitoring, go/no-go |

## Risks
- Enterprise/regulatory approvals: start IT/legal in week 1
- LLM hallucination: citations, approved-only retrieval, human approval
- Connector scope creep: read-only plus one write path
- Apple signing/review: TestFlight, set up developer account on Day 1

See `docs/SECURITY_CHECKLIST.md`.
