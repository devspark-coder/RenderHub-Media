# RenderHub Media admin

## Local editing

1. `npm install`
2. `npm run dev`
3. Open http://127.0.0.1:4321/keystatic

Edit **Site settings**, **Work**, **Formats**, and **Process**. Saves write into `src/content/`.

## Production

Keystatic needs the Node adapter (configured) plus GitHub storage for cloud editing. Switch `storage.kind` in `keystatic.config.ts` to `github` when the repo is connected.
