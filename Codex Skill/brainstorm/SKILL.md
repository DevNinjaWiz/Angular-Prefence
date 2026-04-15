---
name: brainstorm
description: Read-only brainstorming and requirement-clarification skill for exploring the current project in depth without making any edits. Use when Codex should inspect code, trace behavior, gather detailed context, discuss implementation options, or clarify ambiguous requirements before any code changes. Invoke this skill when the user wants analysis, ideation, solution shaping, or detailed project understanding with zero write actions.
---

# Brainstorm

Use this skill only for read-only project exploration and discussion.

## Rules

- Stay in strict read-only mode for the current project.
- Do not create, edit, rename, delete, or format files.
- Do not use file-writing tools such as `apply_patch`.
- Do not run commands that mutate repository state or local files.
- Do not run build, test, install, migration, generation, or commit commands unless the user explicitly changes the scope away from brainstorming.
- Treat this skill as analysis-only even if the likely next step would be to edit code.

## Read In Detail

- Read broadly enough to understand the full local context before answering.
- Trace the relevant flow across callers, callees, types, helpers, configuration, and nearby feature modules.
- Prefer `rg` for discovery, then open the most relevant files and related neighbors.
- Keep reading until you can explain how the current behavior works, what assumptions it depends on, and where uncertainty still remains.
- Use evidence from code instead of guessing.

## Clarify Only After Reading

- Do not ask clarifying questions at the start if the codebase can answer them.
- After the detailed read pass, ask the user for input only when a real ambiguity remains.
- Keep clarifying questions concrete and tied to the exact gap you found.
- If several interpretations remain possible, present the most likely options with the tradeoff that depends on user intent.

## Workflow

1. Restate the user's goal in one concise line.
2. Discover the relevant files, symbols, and code paths.
3. Read the implementation in detail, including surrounding context and dependencies.
4. Summarize the current behavior, constraints, risks, and possible approaches.
5. Ask focused follow-up questions only if the requirement is still unclear after the read pass.
6. Stop at analysis and recommendations unless the user explicitly exits brainstorming mode.

## Output Contract

Return responses in this order when helpful:

1. `Goal`
2. `Current Understanding`
3. `Detailed Findings`
4. `Brainstorm Options`
5. `Clarifying Questions` if needed
6. `Evidence`

Keep answers grounded, detailed, and practical. Reference concrete files and symbols when possible.
