# cleanyour.tv

The website for [cleanyourtv](https://github.com/Gathin23/cleanyourtv), formerly tv-vibehack: debloat any Android TV or Google TV over Wi-Fi and swap the ad-filled home screen for a clean launcher.

The whole site is one old television. Six channels, a remote in the corner, static between channels, and a power button that actually turns it off.

| Channel | What is on |
|---|---|
| 00 Boot | The stock home screen, the clean-up, then the launcher with live stars, forks and contributors |
| 01 The story | The tweet that started it and a 48-hour star oscilloscope |
| 02 On air | Before-and-after screens from people who ran it (`content/results.json`) |
| 03 How to | Three-step wizard, copy-the-prompt button, a terminal that types itself |
| 04 The community | The credits roll: everyone whose pull request was merged, from the GitHub API |
| 05 Made with | Showcase projects from `SHOWCASE.md` and the themes from `themes/` |

Keys: `0`–`5` change channel, arrows move, `Enter` is OK, `I` switches the site theme, `M` toggles sound, `P` is power. The Konami code does something too.

## Run it

```sh
npm install
npm run dev
```

Content comes from the cleanyourtv repo and the GitHub API at build time and is re-fetched at most once an hour (ISR). Every value has a static fallback, so the site builds without network access and never depends on the public GitHub rate limit at request time.

Optional: set `GITHUB_TOKEN` in the environment (Vercel project settings, never in a file) to raise the API rate limit and turn on the real star history behind the oscilloscope. Without it the chart draws a placeholder curve.

## Add a result screen

`content/results.json` is a list of `{ handle, quote, image, link, tv }`. Put the screenshot in `public/results/` and point `image` at it (`/results/name.png`). Keep the quote to one line, in the person's own words, with `link` going to their original post.

## Layout

- `app/` page, layout, fonts (Outfit and VT323 via `next/font`), global CSS
- `components/TvSite.tsx` the television: one client component holding all channels, the remote and the effects
- `lib/parse.ts` parsers shared by server and client; `lib/data.ts` the server loader with fallbacks; `lib/site.ts` static copy and helpers
- `design/` the Claude Design prototype this was ported from
- `public/docs/` the tweet card and the before/after screenshots; `public/themes/aurora/` the wallpaper

MIT, like the main repo.
