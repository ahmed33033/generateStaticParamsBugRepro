# generateStaticParams fails on build

alrighttyyyy, so the app works on dev but fails when with a built, giving the following error:

```bash
Error occurred prerendering page "/term/vibe%20code". Read more: https://nextjs.org/docs/messages/prerender-error
TypeError: Cannot read properties of undefined (reading 'general')
    at <unknown> (.next/server/chunks/ssr/[root-of-the-server]__12so-3-._.js:1:9881)
    at stringify (<anonymous>) {
  digest: '1738594519'
}
Export encountered an error on /term/[url]/page: /term/vibe%20code, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
[ELIFECYCLE] Command failed with exit code 1.
```

lets try clearing the cache to see if it can fail in dev as well

oh, works perfectly in dev. ig we have a discrepancy between dev and prod environment

reading the error, it seems that when it tried to get the general property of vibe coding object, it fails, saying it cannot be read.

lets check out definitionCard then

ok, we dont get really change outputTerm after it gets passed from the default export of the generateStaticParams page, so the error must be there

bingo, the getOutputTerm returns undefined for vibe coding. works for the other terms... weird.

maybe the %20 is somehow getting escaped in js?

i cant figure out why getOutputTerm is returning undefined for vibe coding, esp in build

i remember looking at a github issue related to this

this issue is very similar: https://github.com/vercel/next.js/issues/63002

alright, i think i found out the problem

the generateStaticParams DOES actually encode the uri, exptectedly

when passing in my term, it's double encoded

easy sol'n is to decode before gettingObjParam

but why is it different in dev and prod?

ok, so generateStaticParams is encoding the url. when we use the url to find the obj, it doesnt work b/c its use the encoded url

ok, decoding the uri before gettingOutputTerm works in prod but not in dev...

feeling like this is a bug

ok tried cloning and reproducing the bug from the repo linked in https://github.com/wesnolte/nextjs-dynamic-param-bug.git and it worked like normal.

so its not the exact same bug, may not even be a bug.

ok the error stems from the generateStaticParams directly, not from the default export

yep, i think its a bug, it cant be that dev and prod create errors at differnt times and it still all be corrrect

tried next canary, when decodingURICmponent before finding term, it works in prod but not dev

when using raw name ("vibe code"), it errors out in dev and prod

when encoding before sending in, decoding in generateStaticParams, and using directly in defaultExport, it works in prod but not dev

alright i think i want to simplify the project

---

## after simplifying

alright i think we're closer to the root of the bug

i checked the .next folder, and the prerender-manifest.json doesnt generate until one of the slugs from `generateStaticPages` is hit. issue is, with normal slugs, on a page hit, the prerender-manifest genereates accordingly, and all slugs can be accessed without issue. the problem becomes when trying to access one of the slugs with a weird character like a space (which needs to be encoded) directly, before the prerender-manifest.json is generated, which causes page miss issue

and yes this only happens with output = export, without it, it works like normal
