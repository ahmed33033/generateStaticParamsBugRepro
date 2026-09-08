# Bug report

Link to bug report: https://github.com/vercel/next.js/issues/98344

### To Reproduce

First Path to Error

1. Start the application in dev mode wih `pnpm dev` (`next dev`)
2. Load up `localhost:3000` in browser, and view home page.
3. Click on the link: `/with space`, and **observe error:** `[browser] Uncaught Error: Page "/[url]/page" is missing param "/[url]" in "generateStaticParams()", which is required with "output: export" config.`

---

Second Path to Error

1. Go back to the home page at `localhost:3000`
2. Click on the link: `/nospace`.
3. Then, click on the link `Go Home` to go back to the home page.
4. Then, click on the link: `/with space` and observe that **there is no error this time around.**
5. Then, click on the link: `Go Home` to go back to the home page.
6. Finally, click on the link: `/with space` again, and observe that the **error now reappears.**

---

Verifying that build works normally

1. In your terminal, run `pnpm build` (`next build`)
2. Observe that the application **builds normally without errors.**

### Current vs. Expected behavior

#### Bug Description

The bug originates in a dev environment, when using `generateStaticParams` with params that needed to be encoded, i.e. params that contain URL characters like space or ampersand, as seen in the parameter `/with space`.

When navigating to the static routes with params that need to be encoded, the dev console encounters an error, as if the static route doesn't exist. On the other hand, static routes without illegal characters, like `/nospace`, do not generate any errors and work like normal in a dev environment.

#### Flaky Error, as Seen By Navigation Order

Notably, static routes like `/with space` return successfully when visiting a regular static route like `/nospace`, then visiting the route `/with space`. This shows that, unexpectedly, the order of navigation to the static route affects whether it renders successfully or not.

#### Error Only Appears with output=export

The error only appears when `output=export` is set in `next.config` file. If that option is removed, the dev environment works normally.

#### Affected Environment

This bug is only present in dev environment, since the application builds normally.

---

So, to summarize, I expect:

- The route `/with space`, which includes a parameter that needs to be encoded, to return successfully in a dev environment.
- The dev environment to not generate any errors, thus matching the prod environment.

### Provide environment information

```bash
Operating System:
  Platform: linux
  Arch: x64
  Version: #31-Ubuntu SMP PREEMPT_DYNAMIC Sat Aug  1 04:26:38 UTC 2026
  Available memory (MB): 11080
  Available CPU cores: 16
Binaries:
  Node: 25.9.0
  npm: 11.13.0
  Yarn: 1.22.22
  pnpm: 11.25.0
Relevant Packages:
  next: 16.4.0-canary.19 // There is a newer canary version (16.4.0-canary.20) available, please upgrade!
  eslint-config-next: N/A
  react: 19.2.8
  react-dom: 19.2.8
  typescript: 6.0.3
Next.js Config:
  output: export
```

### Which area(s) are affected? (Select all that apply)

Dynamic Routes

### Which stage(s) are affected? (Select all that apply)

next dev (local)

### Additional context

_No response_
