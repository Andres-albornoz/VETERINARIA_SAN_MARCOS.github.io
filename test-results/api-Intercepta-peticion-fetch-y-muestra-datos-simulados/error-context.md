# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.js >> Intercepta peticion fetch y muestra datos simulados
- Location: e2e\api.spec.js:3:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Expected pattern: /Consultas|Vacunación/i
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toContainText" locator('body') with timeout 5000ms
  - waiting for locator('body')
    14 × locator resolved to <body></body>
       - unexpected value ""

```

# Test source

```ts
  1 | import{test,expect} from '@playwright/test';
  2 | 
  3 | test('Intercepta peticion fetch y muestra datos simulados', async ({page}) =>{
  4 | 
> 5 |     await expect(page.locator('body')).toContainText(/Consultas|Vacunación/i);
    |                                        ^ Error: expect(locator).toContainText(expected) failed
  6 | 
  7 | });
```