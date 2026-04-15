---
name: git-branching-sop
description: Manual-only skill to guide Git branching based on the project SOP. Use only when the user explicitly invokes $.git-branching-sop (or $git-branching-sop). Do not invoke automatically.
---

# Instructions

IMPORTANT:
- This skill MUST NOT run automatically.
- Only run this skill when the user explicitly invokes:
  $.git-branching-sop
- If the user does not explicitly invoke it, ignore this skill.

## Execute Workflow

1. Read [references/git-branching.md](references/git-branching.md) before giving guidance.
2. Classify the request into one branch type: `feature`, `hotfix`, `qabug`, `uatbug`, `poc`, or `bugfix-conflict-resolution`.
   - If user mentions `CR` (change request), treat it as `feature` workflow.
3. Identify the correct source branch and target branch from the SOP.
   - For `feature`, both source branch and PR target are the relevant module branch.
   - For `feature`, assume the current checked-out branch is the module branch unless the user explicitly says otherwise.
   - For `feature`, validate the current branch against the module branch format `<solution>_<initials>_<ticketnumber>_<description>` (example: `TC_LJS_TCT-1234_Description`).
   - If the current branch does not match that format, treat it as likely not a module branch and ask the developer to confirm whether they should check out and use the current branch as the module branch.
   - The downstream merge path for `feature` is `feature branch -> module branch -> development_p2`.
4. Generate a branch name that follows the required naming format from the SOP, with these normalization rules:
   - Convert `solution` to uppercase.
   - Default `initials` to `LJS` when the user does not provide initials explicitly.
   - Convert `description` to words separated by `_` (example: `Add_Bill_Number_Input`).
5. Provide a concise action plan with:
- exact branch creation command,
- pull request target,
- downstream merge path,
- review responsibility (senior/lead).
6. If required inputs are missing (`solution`, `ticketnumber`, `description`), ask for them explicitly. Only ask for `initials` if the user wants something other than the default `LJS`.
   - For `feature`, do not ask for the module branch name by default. Use the current checked-out branch as the module branch unless the user explicitly provides a different one.
   - If the current branch does not match the module branch naming format, ask the developer to confirm whether they should check out and use the current branch as the module branch before giving the final command.
7. If there is a merge conflict for `qabug`, `uatbug`, or `hotfix`, use the middle-branch conflict flow from the SOP.

## Output Contract

Return guidance in this order:
1. `Branch Type`
2. `Branch Name`
3. `Create Command`
4. `PR Route`
5. `Follow-up Merges`
6. `Notes`

Keep output short and SOP-aligned. Do not invent branch types or merge routes not documented in the reference.
