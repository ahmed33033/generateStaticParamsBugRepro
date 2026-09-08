# generateStaticParams Bug Reproduction

start dev server with `pnpm dev`, then try navigating to the 2 different pages in different orders.

1. first, start by navigating to `/nospace`, then back to home, then to `/with space`.
2. then try navigating to `/with space` from home directly

then, observe the bug: `Page "/[url]/page" is missing param "/[url]" in "generateStaticParams()", which is required with "output: export" config.`

also notice that the `pnpm build` runs normally, without any errors.
