# RenderHub Media admin

## Open admin

1. `npm run dev`
2. Go to **http://127.0.0.1:4321/keystatic**

## Where to edit what

| What | Keystatic collection | On the site |
| --- | --- | --- |
| Brand / tagline / email | **Site settings** | Hero + contact |
| Counting numbers | **Impact stats** | `#impact` |
| Client comments (text only) | **Testimonials** | `#comments` |
| Drive links + posters + preview clips | **Work** | `#work` |
| Format list | **Formats** | Formats |
| Process steps | **Process** | Process |

## Work preview clips — Supabase Storage (card-free free tier)

Testimonials stay **text only**. Short muted loops belong on **Work** cards.

Firebase Storage and Cloudflare R2 both ask for a card now. Use **Supabase** instead.

### Baby steps

1. Go to [supabase.com](https://supabase.com/) → **Start your project** / sign in (GitHub login is easiest)
2. Click **New project**
3. Pick org → name it `renderhub-media` → set a DB password (save it) → region near you → **Create project**
4. Wait until the project is ready
5. Left sidebar → **Storage**
6. Click **New bucket**
7. Name: `work`
8. Turn **Public bucket** **ON**
9. Click **Create bucket**
10. Open `work` → **Upload file**
11. Upload your short `.mp4` preview clips
12. Click a file → **Copy URL** / **Get URL**
13. Paste into `/keystatic` → **Work** → **Preview clip URL** → save

### Local preview (before Supabase)

Clips in `Videos/` can be copied to `public/work/1.mp4` … `9.mp4` and set as `/work/1.mp4` etc. Those files are gitignored and will **not** deploy to Netlify.

### Public URL format (typical)

`https://<project-ref>.supabase.co/storage/v1/object/public/work/supplement-hook-pack.mp4`

### How the site plays them

- Forced **muted**
- **Loops** the short clip
- Autoplays when that work card is on screen (also on hover)
- Pauses when it leaves the screen
- Click still opens the Drive / full reel URL

## Drive links (work reels)

**Work** → **Drive / reel URL**

## Production

Cloud Keystatic editing needs `storage.kind: 'github'` in `keystatic.config.ts`.
