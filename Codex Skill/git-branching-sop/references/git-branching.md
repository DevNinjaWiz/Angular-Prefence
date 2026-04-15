# Standard Operating Procedure (SOP) for GIT Flow

## Purpose
This SOP outlines the Git Flow process for managing code versions efficiently across different environments (master, uat, qa, dev) and handling development work using side branches (feature, hotfix, qabug, uatbug, poc).

## Scope
This SOP applies to all developers contributing to the repository, ensuring consistency in branching, merging, and release management.

## Main Branches
* **master** – Production environment, stable code
* **uat_p2** – UAT environment for PO & user testing
* **qa_p2** – Environment for QA testing and QA bug fixes
* **development_p2** – Active development branch

---

## Side Branches

### Feature
* **feature** – New feature development (branched from a module branch)
* **Branch Name**: `<solution>_feature_<initials>_<ticketnumber>_<description>`

**Feature Branch Workflow Details (from diagram):**
* **module branch:**
  * Module branch name should follow the same format as feature branches: `<solution>_<initials>_<ticketnumber>_<description>`.
  * Example: `TC_LJS_TCT-1234_Description`
  * Feature work must branch out from the relevant module branch.
  * Developers should switch to the relevant module branch first; the current checked-out branch is treated as the module branch when creating a feature branch if it matches the module branch naming format.
  * If the current checked-out branch does not match the module branch naming format, it is likely not a module branch and the developer should confirm whether to continue from that branch.
  * Developers create Pull Request(s) from the feature branch back into the same module branch.
  * The module branch groups completed feature stories for that module before promotion to development.
* **development_p2 (development branch):**
  * Development should only contain completed module branches merged to it.
  * Senior/team lead merges the completed module branch into `development_p2`.
  * Developers should not create feature Pull Request(s) directly to `development_p2`.
* **feature (developer feature branch):**
  * Branches out from the relevant module branch.
  * Feature branch contains specific TODO feature branches relating to the story.
  * Feature Pull Request target is the same module branch it branched from.
  * Examples: 
    * `tb_feature_JN_TTXN-1192_BusinesssProfile`
    * `tc feature JL TTXN-1123 BusinesssProfile`

### Hotfix
* **hotfix** – Critical production fixes (branched from master) - Hotfix Branch contains urgent tickets that must be solved in Production version.
* All hotfix change should be tested working fine in development, QA and UAT before deploying UAT back to production.
* **Branch Name**: `<solution>_hotfix_<initials>_<ticketnumber>_<description>`
* **IF Conflict** - *Refer to description below - **BugFix Branches - IF CONFLICT**

**(BAU) - Production Flow + TC Development Workflow Details (from diagram):**
* **master (master branch):** Production Version Branch. Every release will also be tagged.
* **hotfix (hotfix branch):** Hotfix Branch contains urgent tickets that must be solved in Production version. All hotfix changes should be tested working fine in dev, qa, and uat before being deployed back to production (e.g., `tb_hotfix_<initials>_<ticketnumber>`).
* **uat_p2 (UAT Branch):** UAT should only contain QA Complete Testing branch over for user testing. Any HotFix from production should also be merged here for further testing.
* **qa_p2 (QA Branch):** qa branch should only merge at every end of the version when there is a green light from the Product Team.
* **development_p2 (development branch):** development should only contain completed CR merged to it.
* **Review Process:** Each merge from the hotfix branch to development, qa & uat will need to be reviewed by seniors/leads.

### QA Bug
* **qabug** – Bug fixes found in QA testing (branched from qa_p2).
* **Branch Name**: `<solution>_qabug_<initials>_<ticketnumber>_<description>`
* **IF Conflict** - *Refer to description below - **BugFix Branches - IF CONFLICT**

**QA Bug Fix Workflow Details (from diagram):**
* **qa_p2 (QA Branch):** qa branch should only merge at every end of the version when there is a green light from Product Team.
* **development_p2 (development branch):** development should only contain completed CR merged to it.
* **QA Bug Fix (developer QA branch):**
  * qa branch consist of bug fixing on the bugs reported by QA Team.
  * Format: `<solution>_qabug_<initials>_<ticketnumber>_<description>`
  * Example: `tb_qabug_JC_TFEE-1122_RouteSettingDuplicate`
* **Actions & Merging:**
  * Developer creates Pull Request(s) to merge to the qa branch.
  * Seniors in the team deploy & merge to qa on a group of completed version.
  * Seniors in the team deploy & merge to master on the completed QA ticket(s).

### UAT Bug
* **uatbug** – Bug fixes found in UAT testing (branched from uat_p2).
* **Branch Name**: `<solution>_uatbug_<initials>_<ticketnumber>_<description>`
* **IF Conflict** - *Refer to description below - **BugFix Branches - IF CONFLICT**

**UAT Bug Fix Workflow Details (from diagram):**
* **uat_p2 (UAT Branch):** UAT should only contain QA Complete Testing branch over for user testing. Any HotFix from production should also be merged here for further testing.
* **qa_p2 (QA Branch):** qa branch should only merge at every end of the version when there is a green light from Product Team.
* **development_p2 (development branch):** development should only contain completed CR merged to it.
* **UAT Bug Fix (developer UAT branch):**
  * UAT branch consist of bug fixing on the bugs reported by UAT Team.
  * Format: `<solution>_uatbug_<initials>_<ticketnumber>_<description>`
  * Example: `tb_uatbug_JC_TFEE-1122_ErrorLogin`
* **Actions & Merging:**
  * Seniors in team deploy & merge to uat on a group of completed QA testing to UAT.
  * Seniors in team deploy & merge to qa on a group of completed version.
  * Developer create Pull Request(s) to merge to qa branch.
  * Seniors in team deploy & merge to master on the completed QA ticket(s).

### POC
* **poc** – Proof of Concept experiments (branched from development_p2).
* **Branch Name**: `poc_<initials>_<ticketnumber>_<description>`

**POC Workflow Details (from diagram):**
* **development_p2 (development branch):** The base branch for active development.
* **poc (Proof of Concept branch):**
  * Branches out from `development_p2`.
  * Used to test out new ideas, experiments, or research safely without affecting the main development branch.
  * Example: `poc_JC_TFEE-9999_NewArchitecture`

---

## BugFix Branches - IF CONFLICT
* **IF there is conflict** in merging a PR from a Bug Fix branch -> branch to merge, create a third/middle branch to resolve the conflict.
* Create a branch from the branch to merge (e.g., `development_p2`) and pull changes from the bug fix branch to resolve the conflict.
* **Branch Name**: `<solution>_<qabug/uatbug/hotfix>_<branchToMerge>_<initials>_<ticketnumber>_<description>`
* PR the newly created branch to the branch to merge (e.g., `development_p2`).
* **Example**: QA Bug – Conflict to `development_p2`

**Conflict Resolution Workflow Details (from diagram):**
* **Target Branch (e.g., development_p2):** The branch where the bug fix ultimately needs to be merged.
* **Original Bug Fix Branch:** The branch containing your initial fix (e.g., `tb_qabug_JC_TFEE-1122_RouteSettingDuplicate`).
* **Middle/Resolution Branch:**
  * Created directly from the target branch (`development_p2`).
  * Example: `tb_qabug_development_p2_JC_TFEE-1122_RouteSettingDuplicate`
* **Resolution Steps:**
  1. Branch out the Middle Branch from the target branch (`development_p2`).
  2. Pull/merge the changes from the Original Bug Fix branch into the Middle Branch.
  3. Resolve the code conflicts locally and commit the resolved changes.
  4. Create a new Pull Request from the Middle Branch to the target branch (`development_p2`).
