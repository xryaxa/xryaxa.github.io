#!/usr/bin/env bash
# Build and publish the static site to the gh-pages branch.
#
# GitHub Pages serves gh-pages; main holds the source. Once the `workflow`
# scope is granted to gh (see README), .github/deploy-workflow.yml.example can
# move into .github/workflows/ and this script becomes unnecessary.
set -euo pipefail

cd "$(dirname "$0")/.."

REPO_URL="$(git remote get-url origin)"
WORKTREE="$(mktemp -d)"

echo "→ building"
npm run build

echo "→ publishing to gh-pages"
cd "$WORKTREE"
git init -q -b gh-pages
git remote add origin "$REPO_URL"
cp -R "$OLDPWD/out/." .
touch .nojekyll
git add -A
git -c user.name="xryaxa" -c user.email="xryaxa@gmail.com" \
    commit -q -m "Deploy $(cd "$OLDPWD" && git rev-parse --short HEAD)"
git push -f -q origin gh-pages

cd "$OLDPWD"
rm -rf "$WORKTREE"
echo "✓ live at https://xryaxa.github.io (give it ~60s)"
