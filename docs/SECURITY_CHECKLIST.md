# Security Review Checklist (regulated healthcare content)

- [ ] No PHI/PII in assets; scan uploads (Day 24)
- [ ] LLM keys server-side only; client calls a proxy
- [ ] RAG retrieves approved assets only, filtered by user permissions
- [ ] Agent write actions require human confirmation and are audit-logged
- [ ] Row-level security on all tables; role-based access (Legal, Brand, Agency, Sales)
- [ ] SSO/MDM review; data retention policy defined
- [ ] Philips IT and Legal/Regulatory sign-off before pilot and release
