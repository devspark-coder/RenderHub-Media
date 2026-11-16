# RenderHub Media admin

## Open admin

1. `npm run dev`
2. Go to **http://127.0.0.1:4321/keystatic**

## Where to edit what

| What | Keystatic collection | On the site |
| --- | --- | --- |
| Brand / tagline / email | **Site settings** | Hero + contact |
| Counting numbers | **Impact stats** | `#impact` |
| Client comments + review videos | **Testimonials** | `#comments` |
| Drive links + work posters | **Work** | `#work` |
| Format list | **Formats** | Formats |
| Process steps | **Process** | Process |

## Review videos — Supabase Storage (card-free free tier)

Firebase Storage and Cloudflare R2 both ask for a card now. Use **Supabase** instead.

### Baby steps

1. Go to [supabase.com](https://supabase.com/) → **Start your project** / sign in (GitHub login is easiest)
2. Click **New project**
3. Pick org → name it `renderhub-media` → set a DB password (save it) → region near you → **Create project**
4. Wait until the project is ready
5. Left sidebar → **Storage**
6. Click **New bucket**
7. Name: `testimonials`
8. Turn **Public bucket** **ON**
9. Click **Create bucket**
10. Open `testimonials` → **Upload file**
11. Upload your 8s `.mp4` files
12. Click a file → **Copy URL** / **Get URL**
13. Paste into `/keystatic` → **Testimonials** → **Video URL (CDN)** → save

### Public URL format (typical)

`https://<project-ref>.supabase.co/storage/v1/object/public/testimonials/daniel-wilson.mp4`

### How the site plays them

- Forced **muted**
- **Loops** the 8s clip
- Autoplays only when that card is on screen
- Pauses when it leaves the screen

## Drive links (work reels)

**Work** → **Drive / reel URL**

## Production

Cloud Keystatic editing needs `storage.kind: 'github'` in `keystatic.config.ts`.
