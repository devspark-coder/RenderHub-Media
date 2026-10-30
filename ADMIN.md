# RenderHub Media admin

## Open admin

1. `npm run dev`
2. Go to **http://127.0.0.1:4321/keystatic**

## Where to edit what

| What | Keystatic collection | On the site |
| --- | --- | --- |
| Brand / tagline / email | **Site settings** | Hero + contact |
| Counting numbers (clients, videos…) | **Impact stats** | Dark strip under hero (`#impact`) |
| Client comments | **Testimonials** | Comments section (`#comments`) |
| Drive links + posters / short videos | **Work** | Work grid (`#work`) |
| Format list | **Formats** | Formats section |
| Process steps | **Process** | Process section |

## Drive links (full reels)

In **Work** → each item → **Drive / reel URL**  
Paste the Google Drive (or other) link. Cards open that URL.

## Short videos (replace posters later)

1. Put files in `public/videos/` (e.g. `work-01.mp4`)
2. In **Work** → **Short video path** → `/videos/work-01.mp4`
3. Keep the poster as cover; video plays on hover when set

## Impact numbers

In **Impact stats**: set **Number**, **Suffix** (`+`), and **Label**.  
They animate when the section scrolls into view.

## Client comments

In **Testimonials**: **Comment**, **Name**, **Role / company**.

## Production

Cloud editing needs GitHub storage in `keystatic.config.ts` (`storage.kind: 'github'`).
