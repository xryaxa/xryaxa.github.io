# xryaxa.github.io

Personal portfolio — [xryaxa.github.io](https://xryaxa.github.io)

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and
Motion. Statically exported and deployed to GitHub Pages on every push to `main`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

## Where things live

```
src/
  app/                 routes, metadata, SEO, 404
  components/
    sections/          one file per page section
    ui/                reusable primitives (reveal, magnetic, buttons, backdrop)
    boot-sequence.tsx  the terminal cold-open
    command-palette.tsx ⌘K
    terminal.tsx       ` to open
  lib/
    content.ts         ALL copy and project data — edit here, not in components
```

## Editing content

Everything a visitor reads lives in `src/lib/content.ts`. Adding a project to
the `PROJECTS` array is enough — the work section, the terminal's `projects`
command and the structured data all read from it.

Project screenshots go in `public/projects/` and are referenced by the `image`
field. A project without an image renders a designed typographic placeholder
instead, so a missing screenshot never looks broken.

## Keyboard

| Key | What it does |
| --- | --- |
| `⌘K` / `Ctrl+K` | Command palette |
| `` ` `` | Terminal (`help` lists commands) |
| `↑↑↓↓←→←→BA` | Developer mode — shows the layout grid |

## Notes

- Dark theme only, on purpose. One committed look, no theme flash.
- `prefers-reduced-motion` is honoured everywhere, including the intro.
- The particle canvas stops rendering when it scrolls out of view or the tab
  is hidden.
