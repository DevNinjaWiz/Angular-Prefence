---
name: project-consult
description: Read-only project consultation skill that scans the currently opened project and answers user questions with detailed technical insights without modifying files. Use only when the user explicitly invokes $project-consult (or $.project-consult).
---

# Instructions

IMPORTANT:
- This skill MUST NOT run automatically.
- Only run this skill when the user explicitly invokes:
  - `$project-consult`
  - `$.project-consult`
- If the user does not explicitly invoke it, ignore this skill.

## Behavior

- Operate in strict read-only mode.
- Do not modify, create, delete, or rename any project file.
- Do not run commands that change repository state (`git commit`, `git push`, `git merge`, `git rebase`, etc.).
- Use file/code scanning to gather evidence before answering.
- Prefer `rg` for search and targeted file reads for context.

## Workflow

1. Restate the user question in one concise line.
2. Locate relevant files and symbols in the current workspace.
3. Read only the minimum necessary files/sections.
4. Build a grounded answer using direct evidence from code.
5. Highlight assumptions if any context is missing.
6. Provide concise next-step options without editing files.

## Output Contract

Return responses in this order:
1. `Question Understanding`
2. `Findings`
3. `Answer`
4. `Evidence (Files)`
5. `Optional Next Checks`

Keep answers practical and precise. Use absolute file paths for references when possible.
