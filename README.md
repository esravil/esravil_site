# esravil-site

Personal site built with Next.js and deployed to Firebase Hosting.

## Local development

```bash
pnpm install
pnpm dev
````

Then open `http://localhost:3000`.

## Build (static export)

Firebase Hosting is configured to serve from the `out/` directory (`firebase.json` -> `"public": "out"`).
So before deploying, you must generate `out/`.

Typical flow:

```bash
pnpm install
pnpm build
```

If your `pnpm build` does **not** generate `out/`, your project may use a separate export step. In that case run:

```bash
pnpm build
pnpm export
```

After a successful export, you should have an `out/` folder at the repo root.

## Firebase Hosting redeploy (update the live site)

### One-time setup (first machine only)

```bash
npm i -g firebase-tools
firebase login
```

(Optional) Confirm the correct project is selected (your repo has `.firebaserc` with a default project):

```bash
firebase use --add
```

### Redeploy (most common)

From the repo root:

```bash
pnpm build
firebase deploy --only hosting
```

That’s it — rebuilds the site and updates Firebase Hosting.

## Notes / troubleshooting

* If you see an old version after deploy, hard refresh or wait for caching/CDN propagation.
* If `firebase deploy` complains about the `out/` folder missing, rerun the export/build step until `out/` exists.
* If you changed routes, headers, or rewrites, double-check `firebase.json` before deploying.
