# Angular Preference

A personal reference repo for Angular coding conventions, reusable components, route guards, and Codex agent skills used across projects.

## 📖 Contents

- [Overview](#-overview)
- [Repository Structure](#-repository-structure)
- [Coding Guidelines](#-coding-guidelines-agentsmd)
- [Components](#-components)
- [Guards](#-guards)
- [Codex Skills](#-codex-skills)

## 🔍 Overview

This repo collects the Angular patterns, standards, and tooling I rely on day to day — naming conventions, an RxJS "watcher" pattern, a reusable timeline stepper component, route-mode guards, and a set of Codex agent skills for exploring, consulting on, and testing projects.

## 🗂 Repository Structure

```
Angular-Preference/
├── AGENTS.md                  # Angular coding guidelines & RxJS patterns
├── Codex Skill/                # Codex agent skills
│   ├── brainstorm/
│   ├── chrome-devtools-mcp/
│   ├── git-branching-sop/
│   ├── project-consult/
│   └── web-perf-memory-mcp/
├── Components/
│   └── timeline-stepper/       # Reusable Angular timeline/stepper component
├── Guards/
│   ├── factory.ts               # Generic CanMatch guard factory
│   └── mode-guard.ts            # Page-mode route guard
└── prettierrc                  # Shared Prettier config
```

## 📐 Coding Guidelines (`AGENTS.md`)

Core Angular conventions used across projects, including:

- **Function naming** — template-bound handlers use an `on...` prefix (`onClick`, `onNext`, `onSubmit`); everything else is `private`.
- **RxJS Watcher Pattern** — UI actions emit to `Subject`s rather than running logic inline; watchers set up in `ngOnInit` handle the actual business logic.

See [`AGENTS.md`](./AGENTS.md) for the full guidelines.

## 🧩 Components

### `timeline-stepper`

A standalone Angular timeline/stepper component with:

- `timeline-stepper.component.ts` / `.html` / `.scss` — core component
- `timeline-step.component.ts` — individual step
- `timeline-stepper-next.directive.ts` / `timeline-stepper-previous.directive.ts` — navigation directives
- `timeline-stepper.stories.ts` — Storybook stories

## 🛡 Guards

- **`factory.ts`** — `createCanMatchFactory`, a generic helper for building `CanMatchFn` guards from an injectable guard class.
- **`mode-guard.ts`** — `ModeGuard` / `modeCanMatch`, restricts route segments to an allowed set of `PAGEMODE` values, redirecting to a default page otherwise.

## 🧠 Codex Skills

Agent skills under `Codex Skill/`, most of which are **manual-only** (must be explicitly invoked):

| Skill | Invocation | Purpose |
|---|---|---|
| `brainstorm` | Automatic | Read-only exploration and requirement clarification — no file edits. |
| `project-consult` | `$project-consult` | Read-only Q&A over the currently opened project. |
| `git-branching-sop` | `$.git-branching-sop` | Guides Git branching per project SOP. |
| `chrome-devtools-mcp` | `$chrome-devtools-mcp` / "customer tc" | Drives Chrome DevTools MCP, including a predefined customer login flow. |
| `web-perf-memory-mcp` | `$web-perf-memory-mcp` | Runs Web Performance / memory leak tests via DevTools MCP. |

---

*This is a personal reference repo — conventions and tooling evolve as projects do.*
