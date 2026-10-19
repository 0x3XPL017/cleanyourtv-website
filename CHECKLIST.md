# Before the site goes public

- [ ] Replace the three placeholder entries in `content/results.json` with real before-and-after posts (handle, one-line quote in their words, link to the post, screenshot in `public/results/`).
- [ ] Set `GITHUB_TOKEN` in the Vercel project (Settings, Environment Variables, all environments). Redeploy so the oscilloscope draws the real 48-hour star history.
- [ ] Open the site on a phone: the bottom bar replaces the remote, channels swipe, the Made-with carousel swipes.
- [ ] Open it with "Reduce motion" on: no boot sequence, no static, rows wrap instead of scrolling, every channel readable.
- [ ] Check the Open Graph preview (`/docs/new-home.jpg`) in the X card validator.
- [ ] Rename the main repo to `cleanyourtv` the same evening; GitHub redirects the old name, but update `REPO` in `lib/parse.ts` and the links in the main repo's README and release notes.
- [ ] Attach `cleanyour.tv` (and `www`) to the Vercel project, then post the update tweet with the link.
