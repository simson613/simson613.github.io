# WORKFLOW.md — Agent Workflow

> This document is for agents. Written in English.

## Pipeline

```
CEO (Pea) → PM (Piccolo) → Agents → PM → CEO
```

### Phase 1: Architecture
- **Agent:** Architect (opus)
- **Input:** REQUIREMENTS.md
- **Output:** `docs/architecture.md` — tech stack decisions, folder structure, data models, API design
- **Approval:** PM reviews, escalates to CEO if needed

### Phase 2: Development
- **Agent:** Developer (opus or sonnet)
- **Input:** `docs/architecture.md` + PROJECT.md conventions
- **Output:** Working code in `src/`
- **Rule:** Commit after each logical unit of work

### Phase 3: Review
- **Agent:** Reviewer (sonnet)
- **Input:** Code diff or full codebase
- **Output:** Review comments, issues list
- **Rule:** Developer fixes issues, re-review until clean

## Handoff Protocol

When an agent completes a phase:
1. Write a summary to `docs/handoff-<phase>.md`
2. Include: what was done, decisions made, open questions
3. PM (Piccolo) reviews and kicks off next phase

## File Ownership

- `docs/` — Architect writes, all read
- `src/` — Developer writes, Reviewer reads
- `roles/` — PM maintains
- `PROJECT.md` — PM maintains, all follow

## Escalation

Agents report to PM (Piccolo). If blocked or uncertain:
1. Document the issue clearly
2. PM decides or escalates to CEO (Pea)
