---
name: web-perf-memory-mcp
description: Manual-only skill to run Web Performance Memory Test using DevTools MCP. Use only when the user explicitly invokes $web-perf-memory-mcp to test page performance, Core Web Vitals, trace bottlenecks, JavaScript heap growth, or memory leak behavior.
---

# Instructions

IMPORTANT:
- This skill MUST NOT run automatically.
- Only run this skill when the user explicitly invokes:
  $web-perf-memory-mcp
- Save any generated artifact to:
  `C:\mcp screenshot\performance test`
- Create `C:\mcp screenshot\performance test` if it does not exist.

## Goal

Produce a practical browser-side performance and memory diagnosis with reproducible steps and actionable findings.

## Execution Rules

- Use DevTools MCP tools only.
- Do not start application servers; ask user to start them when page is unreachable.
- Default to the currently open page if user does not specify a URL.
- If no page is open, ask for URL and open it.
- For each test, report test conditions (URL, throttling, reload/no reload, cycle count).
- Store every output artifact (heap snapshots, screenshots, exported trace files) under `C:\mcp screenshot\performance test`.

## Workflow

1. Confirm target page:
- If user provided URL, navigate to it.
- Otherwise keep current page.
- Wait for a stable marker (page heading or key control).

2. Run performance test:
- Start trace with reload (`autoStop: true`, `reload: true`) for cold-load behavior.
- Capture and report at minimum: LCP, CLS, and top insight categories.
- Analyze at least these insights when available:
  - `LCPBreakdown`
  - `RenderBlocking`
  - `NetworkDependencyTree`
  - `Cache`
- Summarize top bottlenecks by impact, not raw list size.

3. Run memory leak test:
- Capture baseline heap metric with `performance.memory.usedJSHeapSize`.
- Perform stress loop by repeating user-relevant page actions (for example route switches, modal open/close, table filters, pagination) for at least 10 cycles unless user requests otherwise.
- Capture post-stress heap metric.
- Wait idle 8-10 seconds, capture cooldown heap metric.
- Take at least one heap snapshot file under `C:\mcp screenshot\performance test` (for example `C:\mcp screenshot\performance test\memory-final.heapsnapshot`).

4. Leak assessment logic:
- If post-stress rises but cooldown returns close to baseline, mark as no clear leak signal in this run.
- If cooldown remains materially above baseline across repeated cycles, flag potential leak and recommend deeper retained-object analysis.

5. Report format:
- Test scope: URL and actions executed.
- Performance results: key metrics and highest-impact bottlenecks.
- Memory results: baseline/post/cooldown values and conclusion.
- Artifacts: list heap snapshot file paths.
- Next recommended step (one concrete follow-up).

## Optional Extended Pass

When user asks for stricter validation:
- Emulate constrained network/CPU before tracing.
- Increase stress loop to 30-50 cycles.
- Repeat memory test twice and compare consistency.
