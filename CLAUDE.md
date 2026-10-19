# Working in this repo

- Public repo. Nothing private goes in: no tokens, no device identifiers, no personal addresses. `GITHUB_TOKEN` lives only in the Vercel project settings.
- Commits are the owner's own. Never add a `Co-Authored-By` trailer or any generated-with line to commits or pull requests.
- The site is a port of `design/cleanyour.tv.dc.html`. When changing a channel, keep the design file as the reference for layout and motion; do not edit it to match the code.
- `components/TvSite.tsx` is deliberately one class component mirroring the prototype's `Component` class, with inline styles through `S()` from `lib/site.ts`. Keep it that way rather than splitting into hooks; the animation state lives on the instance.
- Content is fetched on the server in `lib/data.ts` with an hourly revalidate and a static fallback for every value. Any new remote value needs a fallback too, so `npm run build` works offline.
- Sound is off by default and stays that way. Reduced motion must keep every channel readable.
- The fake clutter home on channel 00 uses invented app names only. No real brand logos or names there.
- `npm run build` must pass before a commit. `next.config.ts` keeps `cacheComponents` off on purpose: the page uses classic `export const revalidate`.
