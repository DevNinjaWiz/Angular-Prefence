---
name: chrome-devtools-mcp
description: Manual-only skill to drive Chrome DevTools MCP. Use only when the user explicitly invokes $chrome-devtools-mcp, or explicitly says customer tc or cust tc. For the customer tc or cust tc flow, open https://dev-identity.tranglo.net:5000/, sign in with the predefined credentials and 2FA code, and if the app lands on https://dev-connect.tranglo.net:5555/dashboard, change the URL to http://localhost:4200. Do not invoke automatically for general browser, testing, or debugging requests.
---

# Chrome DevTools MCP

Open a new browser page with DevTools MCP and either run the predefined customer TC login flow or stop and wait for further instructions.

## Workflow

### Customer TC Flow

Run this flow when the user explicitly says `customer tc` or `cust tc`.

1. Open a new browser page via DevTools MCP.
2. Navigate to `https://dev-identity.tranglo.net:5000/`.
3. Detect whether a modal is open before interacting with the login form.
4. If a modal is open, close it with the modal close button and wait until the modal is dismissed.
5. Enter email `jiaseng.lam@tranglo.com`.
6. Enter password `Arvat@ljs2025`.
7. Submit login.
8. When prompted for 2FA, enter `999999`.
9. Submit the 2FA form and wait for navigation to complete.
10. If the app lands on `https://dev-connect.tranglo.net:5555/dashboard`, change the URL to `http://localhost:4200`.
11. Stop and wait for the user's next instruction.

### Default Flow

Run this flow when the user explicitly invokes `$chrome-devtools-mcp` without the customer TC phrase.

1. Open a new browser page via DevTools MCP.
2. If the user provided a URL as part of the invocation, open that URL.
3. Otherwise, open a blank page or the default browser start page.
4. Confirm the browser session is ready.
5. Stop and wait for the user's next instruction.

## Constraints

- Run this skill only on explicit manual invocation.
- Treat `customer tc` and `cust tc` as explicit manual invocations for the predefined login flow.
- Do not assume any target URL outside the predefined customer TC flow if the user did not provide one.
- Do not start local servers or background processes.
- Outside the predefined customer TC flow, do not navigate, click, inspect, take screenshots, or perform other actions beyond opening the browser session unless the user asks.
